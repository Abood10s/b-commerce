import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/slices/authSlice";
import ProductLister from "../../components/ProductLister";
import {
  useGetProductsByCategoryQuery,
  useGetProductsBySubcategoryQuery,
  useGetProductsQuery,
} from "../../features/api/productsApi";
import {
  useGetAllCategoriesQuery,
  useGetSubCategoriesByCategoryQuery,
} from "../../features/api/subCategoryApi";

import MainBanner from "../../components/MainBanner";
import CategoryFilter from "../../components/CategoryFilter";

const HomePage = () => {
  const dispatch = useDispatch();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);

  const { data: categories, isLoading: categoriesAreLoading } =
    useGetAllCategoriesQuery();
  const {
    data: allProducts,
    isLoading: allProductsAreLoading,
    isError: allProductsError,
  } = useGetProductsQuery({ page: 1 });
  const { data: ProductsByCategory, isLoading: ProductsByCategoryAreLoading } =
    useGetProductsByCategoryQuery(selectedCategoryId, {
      skip: !selectedCategoryId,
    });
  const {
    data: subCategories,
    isLoading: subCategoriesAreLoading,
    isError: subCategoriesError,
  } = useGetSubCategoriesByCategoryQuery(selectedCategoryId, {
    skip: !selectedCategoryId,
  });
  const {
    data: ProductsBySubcategory,
    isLoading: ProductsBySubcategoryLoading,
    isError: ProductsBySubcategoryError,
  } = useGetProductsBySubcategoryQuery(selectedSubcategoryId, {
    skip: !selectedSubcategoryId,
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategoryId(subcategoryId);
  };

  const handleAllClick = () => {
    setSelectedCategoryId(null);
  };

  useEffect(() => {
    if (!selectedCategoryId) {
      setSelectedSubcategoryId(null);
    }
  }, [selectedCategoryId]);

  const productsToDisplay =
    selectedSubcategoryId && ProductsBySubcategory
      ? ProductsBySubcategory.data
      : selectedCategoryId && ProductsByCategory
      ? ProductsByCategory.data
      : allProducts?.data?.products;

  return (
    <div>
      <MainBanner />
      <div className="container">
        <CategoryFilter
          categories={categories?.data || []}
          selectedCategoryId={selectedCategoryId}
          handleCategoryClick={handleCategoryClick}
          subCategories={subCategories?.data || []}
          selectedSubcategoryId={selectedSubcategoryId}
          handleSubcategoryClick={handleSubcategoryClick}
        />
        <ProductLister products={productsToDisplay || []} />
      </div>
    </div>
  );
};

export default HomePage;

import React, { useState } from "react";
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

import Spinner from "../../components/Spinner";
import CategoryFilter from "../../components/CategoryFilter";

const HomePage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);

  const { data: categories, isLoading: categoriesAreLoading } =
    useGetAllCategoriesQuery();
  const { data: allProducts, isLoading: allProductsAreLoading } =
    useGetProductsQuery({ page: 1 });

  const { data: ProductsByCategory } = useGetProductsByCategoryQuery(
    selectedCategoryId,
    { skip: !selectedCategoryId }
  );
  const { data: subCategories } = useGetSubCategoriesByCategoryQuery(
    selectedCategoryId,
    { skip: !selectedCategoryId }
  );
  const { data: ProductsBySubcategory } = useGetProductsBySubcategoryQuery(
    selectedSubcategoryId,
    { skip: !selectedSubcategoryId }
  );

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubcategoryId(null); // Reset subcategory
  };

  const handleSubcategoryClick = (subcategoryId) => {
    setSelectedSubcategoryId(subcategoryId);
  };

  const productsToDisplay =
    selectedSubcategoryId && ProductsBySubcategory?.data
      ? ProductsBySubcategory.data
      : selectedCategoryId && ProductsByCategory?.data
      ? ProductsByCategory.data
      : allProducts?.data?.products || [];

  if (categoriesAreLoading || allProductsAreLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="container">
        <CategoryFilter
          categories={categories?.data || []}
          selectedCategoryId={selectedCategoryId}
          handleCategoryClick={handleCategoryClick}
          subCategories={subCategories?.data || []}
          selectedSubcategoryId={selectedSubcategoryId}
          handleSubcategoryClick={handleSubcategoryClick}
        />
        <ProductLister products={productsToDisplay} />
      </div>
    </div>
  );
};

export default HomePage;

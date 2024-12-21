import React, { useState, useEffect } from "react";
import EditProductModal from "../../../components/EditProductModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // استيراد CSS الخاص بـ Toastify
import "./controlProducts.css";
import {
  useGetProductsQuery,
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useDeleteProductMutation,
} from "../../../features/api/productsApi";

const ControlProducts = () => {
  const { data: products, isLoading, error } = useGetProductsQuery({ page: 1 });
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subcategoryId: "",
    price: "",
    discount: "",
    image: null,
    images: [],
  });

  const { data: productDetails, isLoading: isProductDetailsLoading } =
    useGetProductDetailsQuery(selectedProduct?.id, {
      skip: !selectedProduct?.id,
    });

  let discountPercentagePublic = 0;

  useEffect(() => {
    if (error) {
      toast.error("خطأ في تحميل البيانات.");
    }
  }, [error]);

  const handleEdit = async (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);

    if (product?.id) {
      setFormData({
        name: product.name,
        description: product.description,
        subcategoryId: product.subcategoryId,
        price: product.price,
        discount: product.discount,
        image: null,
        images: [],
      });

      // حساب نسبة الخصم
      const discountAmount = product.price - product.priceAfterDiscount;
      discountPercentagePublic = (discountAmount / product.price) * 100;
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId).unwrap();
      toast.success("تم حذف المنتج بنجاح!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("حدث خطأ في حذف المنتج.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "price") {
      const discountAmount = selectedProduct.price - value;
      discountPercentagePublic = (discountAmount / selectedProduct.price) * 100;
    }
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "images" ? Array.from(files) : files[0],
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedProduct.id) {
      console.error("Selected product ID is missing.");
      return;
    }

    const updatedFormData = new FormData();
    updatedFormData.append("Id", selectedProduct.id);
    updatedFormData.append("Name", formData.name);
    updatedFormData.append("Description", formData.description);
    updatedFormData.append("SubcategoryId", formData.subcategoryId);
    updatedFormData.append("Price", formData.price);

    const discountAmount = selectedProduct.price - formData.price;
    const discountPercentage = (discountAmount / selectedProduct.price) * 100;
    updatedFormData.append("Discount", discountPercentage.toFixed(2));

    if (formData.image) {
      updatedFormData.append("Image", formData.image);
    }

    formData.images.forEach((image) => {
      updatedFormData.append("Images", image);
    });

    try {
      await updateProduct(updatedFormData).unwrap();
      toast.success("تم تحديث المنتج بنجاح!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(`فشل تحديث المنتج: ${error.data.errors}`);
    }
  };

  return (
    <div className="control-products-container">
      {isLoading && <p>يتم التحميل...</p>}
      {error && <p>خطأ في جلب البيانات.</p>}
      {products?.data.products && (
        <table className="products-table">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الصورة</th>
              <th>الوصف</th>
              <th>السعر</th>
              <th>نسبة الخصم</th>
              <th>تعديل/حذف</th>
            </tr>
          </thead>
          <tbody>
            {products.data.products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  <img
                    src={`${process.env.REACT_APP_API_MAIN_IMAGE_URL}${product?.image}`}
                    alt="product.name"
                  />
                </td>

                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>
                  {(
                    ((product.price - product.priceAfterDiscount) /
                      product.price) *
                    100
                  ).toFixed(2)}
                  %
                </td>
                <td>
                  <button
                    className="control-edit"
                    onClick={() => handleEdit(product)}
                  >
                    تعديل
                  </button>
                  <button
                    className="control-delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && selectedProduct && (
        <EditProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUpdate}
          formData={formData}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          selectedProduct={selectedProduct}
          productDetails={productDetails}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default ControlProducts;

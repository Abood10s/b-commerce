import React, { useState, useEffect } from "react";
import EditProductModal from "../../../components/EditProductModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    quantity: "",
    image: null,
    images: [],
  });

  const { data: productDetails, isLoading: isProductDetailsLoading } =
    useGetProductDetailsQuery(selectedProduct?.id, {
      skip: !selectedProduct?.id,
    });

  useEffect(() => {
    if (error) {
      toast.error("خطأ في تحميل البيانات.");
    }
  }, [error]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);

    if (product?.id) {
      setFormData({
        name: product.name,
        description: product.description,
        subcategoryId: product.subcategoryId,
        price: product.price,
        discount: product.discount || 0,
        quantity: product.quantity || 0,
        image: null,
        images: [],
      });
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

    setFormData({
      ...formData,
      [name]: name === "quantity" ? parseInt(value, 10) : value,
    });
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
    const updatedFormData = new FormData();
    updatedFormData.append("Id", selectedProduct.id);
    updatedFormData.append("Name", formData.name);
    updatedFormData.append("Description", formData.description);
    updatedFormData.append("SubcategoryId", formData.subcategoryId);
    updatedFormData.append("Price", formData.price);
    updatedFormData.append("quantity", formData.quantity);
    updatedFormData.append("discount", formData.discount);

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
    <div className="controlling-products-container">
      {isLoading && <p>يتم التحميل...</p>}
      {error && <p>خطأ في جلب البيانات.</p>}
      {products?.data?.products?.length > 0 ? (
        <table className="products-table">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الصورة</th>
              <th>الوصف</th>
              <th>السعر</th>
              <th>نسبة الخصم</th>
              <th>الكمية</th>
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
                    alt={product.name}
                  />
                </td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>
                  {product.discount ? `${product.discount.toFixed(2)}%` : "0%"}
                </td>
                <td>{product.quantity}</td>
                <td className="action-btns">
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
      ) : (
        <p>ليس هناك منتجات لعرضها</p>
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

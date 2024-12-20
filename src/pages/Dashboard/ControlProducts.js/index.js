import React, { useState } from "react";
import EditProductModal from "../../../components/EditProductModal";
import { toast } from "react-toastify";
import "./controlProducts.css";
import {
  useGetProductsQuery,
  useUpdateProductMutation,
  useGetProductDetailsQuery, // Import the query
} from "../../../features/api/productsApi";

const ControlProducts = () => {
  const { data: products, isLoading, error } = useGetProductsQuery({ page: 1 });
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
  const handleEdit = async (product) => {
    setSelectedProduct(product); // Set the selected product
    setIsModalOpen(true); // Open the modal

    // Fetch product details if product.id exists
    if (product?.id) {
      // Update formData with the selected product details
      setFormData({
        name: product.name,
        description: product.description,
        subcategoryId: product.subcategoryId,
        price: product.price,
        discount: product.discount,
        image: null,
        images: [], // Reset image field
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    updatedFormData.append("Id", selectedProduct.id); // Correct field name
    updatedFormData.append("Name", formData.name);
    updatedFormData.append("Description", formData.description);
    updatedFormData.append("SubcategoryId", formData.subcategoryId);
    updatedFormData.append("Price", formData.price);
    updatedFormData.append("Discount", formData.discount);

    if (formData.image) {
      updatedFormData.append("Image", formData.image); // Correct field name
    }

    formData.images.forEach((image) => {
      updatedFormData.append("Images", image); // Correct field name
    });

    try {
      await updateProduct(updatedFormData).unwrap();
      toast.success("Product updated successfully!");
      setIsModalOpen(false); // Close modal if update is successful
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(`Failed to update product: ${error.message}`);
    }
  };
  return (
    <div className="control-products-container">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching products.</p>}
      {products?.data.products && (
        <table className="products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.data.products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.discount}%</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
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
          selectedProduct={selectedProduct} // Pass selected product to modal
          productDetails={productDetails} // Pass productDetails to modal
        />
      )}
    </div>
  );
};

export default ControlProducts;

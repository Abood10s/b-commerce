import React from "react";
import ReactDOM from "react-dom";
import "./editmodal.css";
const EditProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  handleInputChange,
  handleImageChange,
  selectedProduct,
  productDetails, // Pass productDetails from ControlProducts
}) => {
  console.log("Selected Product:", selectedProduct);
  console.log("Product Details:", productDetails); // Debugging

  return ReactDOM.createPortal(
    isOpen ? (
      <div className="edit-modal-overlay">
        <div className="edit-modal-content">
          <h2>Edit Product</h2>
          <form onSubmit={onSubmit} className="edit-product-form">
            <div className="edit-product-form-header">
              <img
                src={`${
                  process.env.REACT_APP_API_SINGLE_PRODUCT_MAIN_IMAGE_URL
                }${selectedProduct?.image || ""}`}
                alt={selectedProduct?.name || ""}
                className="edit-product-image"
              />
              <p>{selectedProduct?.name}</p>
            </div>

            {/* Display existing images */}
            {productDetails?.images?.length > 0 && (
              <div>
                <label>Existing Images:</label>
                <div className="existing-images">
                  {productDetails.images.map((image, index) => (
                    <img
                      key={index}
                      src={`${process.env.REACT_APP_API_SINGLE_PRODUCT_IMAGE_URL}${image}`}
                      alt={`Product Image ${index + 1}`}
                      className="existing-product-image"
                    />
                  ))}
                </div>
              </div>
            )}

            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Discount:</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Main Image:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div>
              <label>Additional Images:</label>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </div>

            <button type="submit">Update Product</button>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          </form>
        </div>
      </div>
    ) : null,
    document.getElementById("modal-root")
  );
};

export default EditProductModal;

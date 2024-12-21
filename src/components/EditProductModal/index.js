import React, { useState } from "react";
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
  productDetails,
}) => {
  const [discountPercentagePublic, setDiscountPercentagePublic] = useState(
    formData.discount || 0
  );

  const handleDiscountChange = (e) => {
    const discountValue = parseFloat(e.target.value) || 0;
    setDiscountPercentagePublic(discountValue);

    // إذا كنت تريد تحديث formData، قم بتحديث الحقل المناسب
    handleInputChange({
      target: { name: "discount", value: discountValue },
    });
  };

  return ReactDOM.createPortal(
    isOpen ? (
      <div className="edit-modal-overlay">
        <div className="edit-modal-content">
          <h2>تعديل المنتج</h2>
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
              <label>اسم المنتج:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>الوصف:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>السعر:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>نسبة الخصم:</label>
              <input
                type="number"
                name="discount"
                value={discountPercentagePublic.toFixed(2)}
                onChange={handleDiscountChange} // تحديث الحقل
              />
            </div>

            <div>
              <label>الصورة الرئيسية:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div>
              <label>الصور الإضافية:</label>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </div>

            <button type="submit" style={{ marginBottom: "5px" }}>
              تعديل
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              إلغاء
            </button>
          </form>
        </div>
      </div>
    ) : null,
    document.getElementById("modal-root")
  );
};

export default EditProductModal;

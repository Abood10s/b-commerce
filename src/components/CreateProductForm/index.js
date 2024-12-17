import React from "react";
import { useFormik } from "formik";
import { productSchema } from "../../Schemas";
import { useCreateProductMutation } from "../../features/api/productsApi";
import { useGetAllSubCategoriesQuery } from "../../features/api/subCategoryApi";
import { useGetProductsQuery } from "../../features/api/productsApi"; // Import getProducts query
import { toast } from "react-toastify";
import SelectComponent from "./SelectComponent";
import "./style.css";

const ProductForm = () => {
  const { data: subcategories, isLoading: subcategoriesLoading } =
    useGetAllSubCategoriesQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const { data: products, isLoading: productsLoading } = useGetProductsQuery({
    page: 1,
    subcategoryId: 1,
  });
  const [createdProductId, setCreatedProductId] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      subcategoryId: "",
      price: "",
      discount: "",
      image: null,
      images: [],
    },
    validationSchema: productSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("subcategoryId", values.subcategoryId);
      formData.append("price", values.price);
      formData.append("discount", values.discount);
      formData.append("image", values.image);

      for (const image of values.images) {
        formData.append("images", image);
      }

      const errors = formik.errors;
      if (errors.image || errors.images) {
        let errorMessage = "Please select required images!";
        if (errors.image) {
          errorMessage = "Main image is required.";
        } else if (errors.images) {
          errorMessage = "At least one additional image is required.";
        }
        toast.error(errorMessage);
        return;
      }

      try {
        const response = await createProduct(formData);
        toast.success("Product created successfully!");
        resetForm();
      } catch (error) {
        console.error("Error creating product:", error);
        toast.error("Error creating product. Please try again.");
      }
    },
  });

  return (
    <div className="product-form-container">
      <form onSubmit={formik.handleSubmit} className="product-form">
        <h2 className="form-title">Create Product</h2>

        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Product Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="form-error">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="form-input form-textarea"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="form-error">{formik.errors.description}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="subcategoryId" className="form-label">
            Subcategory
          </label>
          {subcategoriesLoading ? (
            <div className="form-loading">Loading subcategories...</div>
          ) : (
            <SelectComponent
              id="subcategoryId"
              name="subcategoryId"
              options={subcategories?.data.map((subcat) => ({
                value: subcat.id,
                label: subcat.name,
              }))}
              onChange={(option) =>
                formik.setFieldValue("subcategoryId", option.value)
              }
              value={formik.values.subcategoryId}
            />
          )}
          {formik.touched.subcategoryId && formik.errors.subcategoryId ? (
            <div className="form-error">{formik.errors.subcategoryId}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="form-error">{formik.errors.price}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="discount" className="form-label">
            Discount
          </label>
          <input
            id="discount"
            name="discount"
            type="number"
            className="form-input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.discount}
          />
          {formik.touched.discount && formik.errors.discount ? (
            <div className="form-error">{formik.errors.discount}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">
            Main Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            className="form-input"
            onChange={(event) =>
              formik.setFieldValue("image", event.target.files[0])
            }
          />
          {formik.touched.image && formik.errors.image ? (
            <div className="form-error">{formik.errors.image}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="images" className="form-label">
            Additional Images
          </label>
          <input
            id="images"
            name="images"
            type="file"
            multiple
            className="form-input"
            onChange={(event) =>
              formik.setFieldValue("images", Array.from(event.target.files))
            }
          />
          {formik.touched.images && formik.errors.images ? (
            <div className="form-error">{formik.errors.images}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="form-submit-button"
          disabled={isCreating}
        >
          {isCreating ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;

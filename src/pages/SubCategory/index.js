import React, { useState } from "react";
import {
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetSubCategoriesByCategoryQuery,
  useUpdateSubCategoryMutation,
} from "../../features/api/subCategoryApi";
import { useGetAllCategoriesQuery } from "../../features/api/categoryApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const SubCategory = () => {
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [editingSubcategoryId, setEditingSubcategoryId] = useState(null);
  const [editedSubcategoryName, setEditedSubcategoryName] = useState("");

  // Fetch categories
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  const {
    data: subCategoryData,
    isLoading: subCategoriesLoading,
    error: subCategoriesError,
  } = useGetSubCategoriesByCategoryQuery(selectedCategoryId, {
    skip: !selectedCategoryId,
  });

  const [
    createSubCategory,
    { isLoading: isCreating, isSuccess, isError, error: createError },
  ] = useCreateSubCategoryMutation();

  const [
    updateSubCategory,
    { isLoading: UpdateisUpdating, UpdateisSuccess, UpdateisError, error },
  ] = useUpdateSubCategoryMutation();

  const [
    deleteSubCategory,
    { isLoading: isDeleting, isSuccess: deleteSuccess, error: deleteError },
  ] = useDeleteSubCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (subcategoryName.trim() && selectedCategoryId) {
      try {
        const response = await createSubCategory({
          name: subcategoryName,
          categoryId: selectedCategoryId,
        });

        if (response?.data) {
          toast.success("Subcategory created successfully!");
        } else {
          toast.error("Something went wrong, please try again.");
        }

        setSubcategoryName("");
      } catch (error) {
        console.error("Error creating subcategory:", error);
        toast.error("An error occurred while creating the subcategory.");
      }
    } else {
      toast.error(
        "Please provide a valid subcategory name and select a category."
      );
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleEditClick = (subcategoryId, subcategoryName) => {
    setEditingSubcategoryId(subcategoryId);
    setEditedSubcategoryName(subcategoryName);
  };

  const handleSaveEdit = async () => {
    if (editedSubcategoryName.trim()) {
      const updatedSubCategory = {
        id: editingSubcategoryId,
        name: editedSubcategoryName,
        categoryId: selectedCategoryId,
      };

      try {
        const response = await updateSubCategory(updatedSubCategory);

        if (response?.data) {
          toast.success("Subcategory updated successfully!");
          setEditingSubcategoryId(null);
        }
      } catch (error) {
        console.error("Error updating subcategory:", error);
        toast.error("An error occurred while updating the subcategory.");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingSubcategoryId(null);
    setEditedSubcategoryName("");
  };

  const handleDeleteClick = async (subcategoryId) => {
    try {
      await deleteSubCategory(subcategoryId);
      toast.success("Subcategory deleted successfully!");
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      toast.error("An error occurred while deleting the subcategory.");
    }
  };

  const categoryList = Array.isArray(categories?.data) ? categories.data : [];

  return (
    <div className="subcategory-dashboard-container">
      <h2 className="subcategory-heading">Create a New Subcategory</h2>
      <form onSubmit={handleSubmit} className="subcategory-form">
        <div className="form-group">
          <label htmlFor="subcategoryName" className="label">
            Subcategory Name
          </label>
          <input
            type="text"
            id="subcategoryName"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="categorySelect" className="label">
            Select Category
          </label>
          {categoriesLoading ? (
            <p className="loading-text">Loading categories...</p>
          ) : categoriesError ? (
            <p className="error-text">
              Error fetching categories: {categoriesError.message}
            </p>
          ) : (
            <select
              id="categorySelect"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              required
              className="select"
            >
              <option value="">Select a category</option>
              {categoryList.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <button type="submit" disabled={isCreating} className="btn-submit">
          {isCreating ? "Creating..." : "Create Subcategory"}
        </button>
      </form>

      {isError && createError && (
        <p className="error-text">Error: {createError.data.ExtendedMessage}</p>
      )}
      {isSuccess && (
        <p className="success-text">Subcategory created successfully!</p>
      )}

      <h3>Categories</h3>
      {categoriesLoading ? (
        <p>Loading categories...</p>
      ) : categoriesError ? (
        <p>Error fetching categories: {categoriesError.message}</p>
      ) : (
        <div className="category-list">
          {categoryList.map((category) => (
            <div
              key={category.id}
              className="category-item"
              onClick={() => handleCategoryClick(category.id)}
            >
              <h4>{category.name}</h4>

              {selectedCategoryId === category.id && (
                <div>
                  {subCategoriesLoading ? (
                    <p>Loading subcategories...</p>
                  ) : subCategoriesError ? (
                    <p>
                      Error fetching subcategories: {subCategoriesError.message}
                    </p>
                  ) : (
                    <ul>
                      {subCategoryData?.data?.length === 0 ? (
                        <p>No subcategories available.</p>
                      ) : (
                        subCategoryData?.data?.map((subcategory) => (
                          <li key={subcategory.id} className="subcategory-item">
                            {editingSubcategoryId === subcategory.id ? (
                              <div className="subcategory-edit-form">
                                <input
                                  type="text"
                                  value={editedSubcategoryName}
                                  onChange={(e) =>
                                    setEditedSubcategoryName(e.target.value)
                                  }
                                />
                                <button
                                  onClick={handleSaveEdit}
                                  className="btn-save"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="btn-cancel"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="subcategory-item-content">
                                <span>{subcategory.name}</span>
                                <button
                                  onClick={() =>
                                    handleEditClick(
                                      subcategory.id,
                                      subcategory.name
                                    )
                                  }
                                  className="btn-edit"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteClick(subcategory.id)
                                  }
                                  className="btn-delete"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default SubCategory;

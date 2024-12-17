import React, { useState } from "react";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../features/api/categoryApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const Category = () => {
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const [createCategory, { isLoading, isSuccess, error }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const {
    data: responseData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();

  const categories = responseData?.data || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      createCategory({ name })
        .unwrap()
        .then(() => {
          toast.success("Category created successfully!");
          setName("");
        })
        .catch(() => {
          toast.error("Error creating category!");
        });
    }
  };

  const handleDelete = (id) => {
    deleteCategory(id)
      .unwrap()
      .then(() => {
        toast.success("Category deleted successfully");
      })
      .catch((err) => {
        toast.error("Error deleting category: " + err.message);
      });
  };

  const handleEdit = (category) => {
    setEditingCategoryId(category.id);
    setEditName(category.name); // Set the category name to the input field
  };

  const handleSaveEdit = () => {
    if (editName.trim()) {
      updateCategory({ id: editingCategoryId, name: editName })
        .unwrap()
        .then(() => {
          setEditingCategoryId(null);
          toast.success("Category updated successfully!");
        })
        .catch(() => {
          toast.error("Error updating category!");
        });
    }
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setEditName("");
  };

  return (
    <div className="category-dashboard-container">
      <h2>Create a New Category</h2>
      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            id="categoryName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="category-input"
          />
        </div>
        <button type="submit" disabled={isLoading} className="btn-submit">
          {isLoading ? "Creating..." : "Create Category"}
        </button>
      </form>

      {isSuccess && (
        <p className="message success">Category created successfully!</p>
      )}
      {error && <p className="message error">Error: {error.message}</p>}

      <h3>Categories</h3>

      {categoriesLoading && <p>Loading categories...</p>}
      {categoriesError && (
        <p>Error fetching categories: {categoriesError.message}</p>
      )}

      {categories.length === 0 && !categoriesLoading && (
        <p>No categories available.</p>
      )}

      <ul className="category-list">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.id} className="category-item">
              {editingCategoryId === category.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="edit-input"
                  />
                  <button
                    onClick={handleSaveEdit}
                    disabled={isUpdating}
                    className="btn-save"
                  >
                    {isUpdating ? "Saving..." : "Save"}
                  </button>
                  <button onClick={handleCancelEdit} className="btn-cancel">
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="category-item-content">
                  <span className="category-name">{category.name}</span>
                  <div className="category-actions">
                    <button
                      onClick={() => handleEdit(category)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </ul>

      <ToastContainer />
    </div>
  );
};

export default Category;

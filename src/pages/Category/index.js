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
          toast.success("تمت إضافة الفئة بنجاح!");
          setName("");
        })
        .catch(() => {
          toast.error("خطأ في إضافة الفئة!");
        });
    }
  };

  const handleDelete = (id) => {
    deleteCategory(id)
      .unwrap()
      .then(() => {
        toast.success("تم حذف الفئة بنجاح");
      })
      .catch((err) => {
        toast.error("خطأ في حذف الفئة: " + err.message);
      });
  };

  const handleEdit = (category) => {
    setEditingCategoryId(category.id);
    setEditName(category.name);
  };

  const handleSaveEdit = () => {
    if (editName.trim()) {
      updateCategory({ id: editingCategoryId, name: editName })
        .unwrap()
        .then(() => {
          setEditingCategoryId(null);
          toast.success("تم تعديل الفئة بنجاح!");
        })
        .catch(() => {
          toast.error("خطأ في تعديل الفئة!");
        });
    }
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setEditName("");
  };

  return (
    <div className="category-dashboard-container">
      <h2>إنشاء فئة جديدة</h2>
      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label htmlFor="categoryName">اسم الفئة</label>
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
          {isLoading ? "يتم الإنشاء..." : "إضافة"}
        </button>
      </form>

      {isSuccess && <p className="message success">تمت إضافة الفئة بنجاح!</p>}
      {error && <p className="message error">خطأ: {error.message}</p>}

      <h3>Categories</h3>

      {categoriesLoading && <p>يتم تحميل الفئات...</p>}
      {categoriesError && <p>خطأ في تحميل الفئات: {categoriesError.message}</p>}

      {categories.length === 0 && !categoriesLoading && <p>لا يوجد فئات.</p>}

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
                    {isUpdating ? "يتم الحفظ..." : "حفظ"}
                  </button>
                  <button onClick={handleCancelEdit} className="btn-cancel">
                    الغاء
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
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="btn-delete"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>لا يتوفر فئات .</p>
        )}
      </ul>

      <ToastContainer />
    </div>
  );
};

export default Category;

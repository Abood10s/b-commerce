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
          toast.success("تمت إضافة الفئة الفرعية بنجاح!");
        } else {
          toast.error("حدث خطأ.");
        }

        setSubcategoryName("");
      } catch (error) {
        console.error("هناك خطأ:", error);
        toast.error("خطأ طرأ عند إضافة الفئة الفرعية.");
      }
    } else {
      toast.error("يجب اختيار فئة فرعية.");
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
          toast.success("تم تعديل الفئة الفرعية بنجاح!");
          setEditingSubcategoryId(null);
        }
      } catch (error) {
        console.error("خطأ في تعديل الفئة الفرعية:", error);
        toast.error("خطأ طرأ أثناء تعديل الفئة الفرعية.");
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
      <h2 className="subcategory-heading">أدخل فئة فرعية</h2>
      <form onSubmit={handleSubmit} className="subcategory-form">
        <div className="form-group">
          <label htmlFor="subcategoryName" className="label">
            اسم الفئة الفرعية
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
            اختار الفئة
          </label>
          {categoriesLoading ? (
            <p className="loading-text">يتم تحميل الفئات...</p>
          ) : categoriesError ? (
            <p className="error-text">
              خطأ في تحميل الفئات: {categoriesError.message}
            </p>
          ) : (
            <select
              id="categorySelect"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              required
              className="select"
            >
              <option value="">اختر فئة</option>
              {categoryList.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <button type="submit" disabled={isCreating} className="btn-submit">
          {isCreating ? "يتم الإنشاء..." : "إنشاء فئة فرعية"}
        </button>
      </form>

      {isError && createError && (
        <p className="error-text">خطأ: {createError.data.ExtendedMessage}</p>
      )}
      {isSuccess && (
        <p className="success-text">تمت إضافة الفئة الفرعية بنجاح</p>
      )}

      <h3>الفئات</h3>
      {categoriesLoading ? (
        <p>يتم تحميل الفئات...</p>
      ) : categoriesError ? (
        <p>خطأ في جلب البيانات: {categoriesError.message}</p>
      ) : (
        <div className="category-list">
          {categoryList.map((category) => (
            <div
              key={category.id}
              className="category-item"
              onClick={() => handleCategoryClick(category.id)}
            >
              <h4>{category.name} (اضغط لعرض الفئات الفرعية)</h4>

              {selectedCategoryId === category.id && (
                <div>
                  {subCategoriesLoading ? (
                    <p>يتم تحميل الفئات الفرعية...</p>
                  ) : subCategoriesError ? (
                    <p>
                      خطأ في جلب الفئات الفرعية: {subCategoriesError.message}
                    </p>
                  ) : (
                    <ul>
                      {subCategoryData?.data?.length === 0 ? (
                        <p>لا يوجد فئات فرعية.</p>
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
                                  حفظ
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="btn-cancel"
                                >
                                  الغاء
                                </button>
                              </div>
                            ) : (
                              <div className="subcategory-item-content">
                                <span>{subcategory.name}</span>
                                <div>
                                  <button
                                    onClick={() =>
                                      handleEditClick(
                                        subcategory.id,
                                        subcategory.name
                                      )
                                    }
                                    className="btn-edit"
                                  >
                                    تعديل
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteClick(subcategory.id)
                                    }
                                    className="btn-delete"
                                  >
                                    حذف
                                  </button>
                                </div>
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

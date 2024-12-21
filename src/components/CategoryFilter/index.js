import React from "react";
import styled from "styled-components";

export const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

export const Chip = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: #333;
  cursor: pointer;
  font-size: 0.875rem;
  border: 1px solid #e0e0e0;

  &.active {
    background-color: #123;
    color: #fff;
    border: 1px solid #fff;
  }

  &:hover {
    background-color: #123;
    color: #fff;
    border: 1px solid #fff;
    transition: all 0.3s ease;
  }

  &.category-chip {
    border-color: #e0e0e0;
  }

  &.subcategory-chip {
    border-color: orange;
  }
`;
export const SubCatChip = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 50px;
  color: orange;
  cursor: pointer;
  font-size: 0.875rem;
  border: 1px solid #e0e0e0;

  &.active {
    background-color: orange;
    color: #fff;
    border: 1px solid #fff;
  }

  &:hover {
    background-color: orange;
    color: #fff;
    border: 1px solid #fff;
    transition: all 0.3s ease;
  }

  &.category-chip {
    border-color: #e0e0e0;
  }

  &.subcategory-chip {
    border-color: orange;
  }
`;
const CategoryFilter = ({
  categories,
  selectedCategoryId,
  handleCategoryClick,
  subCategories,
  handleSubcategoryClick,
  selectedSubcategoryId,
}) => {
  return (
    <div>
      <ChipContainer>
        <Chip
          className={`chip ${
            selectedCategoryId === null
              ? "active category-chip"
              : "category-chip"
          }`}
          onClick={() => handleCategoryClick(null)}
        >
          الكل
        </Chip>
        {categories.map((cat) => (
          <Chip
            key={cat.id}
            className={`chip ${
              selectedCategoryId === cat.id
                ? "active category-chip"
                : "category-chip"
            }`}
            onClick={() => handleCategoryClick(cat.id)}
          >
            {cat.name}
          </Chip>
        ))}
      </ChipContainer>

      {selectedCategoryId && subCategories?.length > 0 && (
        <ChipContainer>
          {subCategories.map((subCat) => (
            <SubCatChip
              key={subCat.id}
              className={`chip ${
                selectedSubcategoryId === subCat.id
                  ? "active subcategory-chip"
                  : "subcategory-chip"
              }`}
              onClick={() => handleSubcategoryClick(subCat.id)}
            >
              {subCat.name}
            </SubCatChip>
          ))}
        </ChipContainer>
      )}
    </div>
  );
};

export default CategoryFilter;

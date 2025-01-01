import React from "react";
import {
  HeroContainer,
  HeroContent,
  TilesContainer,
  Tile,
  MoreTitle,
} from "./style";
import Clothes from "../../assets/clothes.jpg";
import Electronics from "../../assets/electronics.jpg";
import Skincare from "../../assets/skincare.jpg";

const MainBanner = () => {
  const categories = [
    {
      id: 1,
      name: "ملابس",
      img: Clothes,
    },
    {
      id: 2,
      name: "عناية بالبشرة",
      img: Skincare,
    },
    {
      id: 3,
      name: "أجهزة إلكترونية",
      img: Electronics,
    },
  ];

  return (
    <HeroContainer>
      <HeroContent>
        <h1>مرحباً بكم في متجركم</h1>
        <p>استعرض الفئات واكتشف منتجاتك المفضلة!</p>
      </HeroContent>

      <TilesContainer>
        {categories.map((category) => (
          <Tile key={category.id}>
            <img src={category.img} alt={category.name} />
            <h3>{category.name}</h3>
          </Tile>
        ))}
      </TilesContainer>
      <MoreTitle>والمزيد...</MoreTitle>
      <a href="#content-start" className="directive-link">
        تسوّق الآن
      </a>
    </HeroContainer>
  );
};

export default MainBanner;

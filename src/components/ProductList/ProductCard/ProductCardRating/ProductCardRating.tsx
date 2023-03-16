import React from "react";
import "./ProductCardRating.scss";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
}

const ProductCardRating = ({ rating, maxStars = 5 }: RatingStarsProps) => {
  const roundedRating = Math.round(rating * 2) / 2; // làm tròn rating đến 0.5
  const fullStars = Math.floor(roundedRating);
  const halfStarVisible = roundedRating - fullStars > 0;
  const emptyStars = maxStars - fullStars - (halfStarVisible ? 1 : 0);

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<BsStarFill key={`full_${i}`} />);
  }

  if (halfStarVisible) {
    stars.push(<BsStarHalf key="half" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<BsStar key={`empty_${i}`} />);
  }

  return <div className={"cardRating"}>{stars}</div>;
};

export default React.memo(ProductCardRating);

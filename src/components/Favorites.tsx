import { cloneElement } from "react";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/outline";

interface FavoritesActionsProps {
  isFavorite: boolean;
  handleClick: () => void;
}

export const Favorites = ({
  isFavorite,
  handleClick,
}: FavoritesActionsProps) => {
  const favoritesTrigger = isFavorite ? <StarIconSolid /> : <StarIcon />;

  return cloneElement(favoritesTrigger, {
    onClick: handleClick,
    className: `icon ${isFavorite && "favorite"}`,
  });
};

import { FC } from "react";
import React, { useCallback, useMemo } from "react";
import axios from "axios";
import { motion as m } from "framer-motion";

import useCurrentUser from "../hooks/useCurrentUser";
import { useFavorites } from "../hooks/useFavorites";

import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();

  const { data: currentUser, mutate } = useCurrentUser();

  // check the favorite movie
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const IconMovie = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <m.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <IconMovie className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </m.div>
  );
};

export default FavoriteButton;

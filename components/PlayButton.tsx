import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { motion as m } from "framer-motion";

interface PlayButtonProps {
  movieId: string;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();
  console.log(movieId);

  return (
    <m.button
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => router.push(`/watch/${movieId}`)}
      className="bg-white rounded-md  py-1 md:py-2  px-2 md:px-4 w-auto  text-xs lg:text-lg  font-semibold flex flex-row items-center hover:bg-neutral-300 transition"
    >
      <BsFillPlayFill className="w-4 md:w-7  mr-1" />
      Play
    </m.button>
  );
};

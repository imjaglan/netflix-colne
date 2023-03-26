import { FC } from "react";
import usInfoModal from "../hooks/useInfoModal";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/router";
import { BsFillPlayFill } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { motion as m } from "framer-motion";

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: FC<MovieCardProps> = ({ data }) => {
  const { openModal } = usInfoModal();
  const router = useRouter();
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        src={data.thumbnailUrl}
        alt="Movie"
        draggable={false}
        className="cursor-pointer  object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0  delay-300  w-full  h-[12vw]"
      />
      <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
        <img
          src={data.thumbnailUrl}
          alt="Movie"
          draggable={false}
          className=" cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
        />
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <m.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
            >
              <BsFillPlayFill
                size={30}
                onClick={() => router.push(`/watch/${data?.id}`)}
              />
            </m.div>
            <FavoriteButton movieId={data?.id} />
            <m.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => openModal(data?.id)}
              className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
            >
              <BiChevronDown
                size={30}
                className="text-white group-hover/item:text-neutral-300 w-4 "
              />
            </m.div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>
          <div className="flex mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

import React, { useCallback } from "react";
import { useBillboard } from "../hooks/useBillboard";
import { PlayButton } from "./PlayButton";
import usInfoModal from "../hooks/useInfoModal";
import { motion as m } from "framer-motion";

import { AiOutlineInfoCircle } from "react-icons/ai";

const Billboard = () => {
  const { data } = useBillboard();
  const { openModal } = usInfoModal();
  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data]);
  return (
    <div className="relative h-[56.25vw]">
      <video
        poster={data?.thumbnailUrl}
        className="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500"
        autoPlay
        muted
        loop
        src={data?.videoUrl}
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <m.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.7 } }}
          className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl"
        >
          {data?.title}
        </m.p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-4">
          <PlayButton movieId={data?.id} />
          <m.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpenModal}
            className="bg-white
            text-white bg-opacity-30   rounded-md py-1 md:py-2 px-2 md:px-4w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
          >
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </m.button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;

import React from "react";
import { motion as m } from "framer-motion";
interface NavbarItemProps {
  label: string;
  axis: number;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, axis }) => {
  return (
    <m.div
      initial={{ opacity: 0, x: axis }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.7 } }}
      className="text-white cursor-pointet hover:text-grey-300 transition-all"
    >
      {label}
    </m.div>
  );
};

export default NavbarItem;

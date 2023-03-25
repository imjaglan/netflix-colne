import React from "react";
interface NavbarItemProps {
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  return (
    <div className="text-white cursor-pointet hover:text-grey-300 transition-all">
      {label}
    </div>
  );
};

export default NavbarItem;

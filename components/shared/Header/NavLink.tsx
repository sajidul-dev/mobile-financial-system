import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { NavLinkProps } from "@/types/navLinkProps";

const NavLink = ({
  route,
  children,
  color,
  large,
  onClick,
  className,
  onMouseEnter,
  onMouseLeave,
}: NavLinkProps) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <Link
      href={route}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      color={color}
      className={`${className} ${
        currentRoute === route ? "text-[#30C47E]" : ""
      }`}>
      {children}
    </Link>
  );
};

export default NavLink;

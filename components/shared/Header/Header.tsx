import React from "react";
import NavLink from "./NavLink";
import Icon from "../Icon/Icon";
import { BiUser } from "react-icons/bi";

const Header = () => {
  return (
    <>
      <div className="sticky z-[1100] top-0 bg-green-300 py-3">
        <div className="container mx-auto flex justify-between items-center gap-8 py-2 px-5 md:px-3 lg:px-0">
          <div className="flex items-center gap-8 w-full">
            <NavLink route="/">
              {/* <Icon name="nav_logo" /> */}
              <p>Logo</p>
            </NavLink>
          </div>
          <div className="hidden md:flex gap-4 lg:gap-8">
            {/* <NavLink
          className="px-[10px] flex items-center space-x-2 hover:bg-common hover:rounded-lg"
          route={shop ? "/dashboard/shop" : "/auth/seller"}>
          <BsInboxes />
          <p className="whitespace-nowrap">
            {shop ? shop.shopName : "Become a Seller"}
          </p>
        </NavLink> */}
            {/* {!user && !shop ? ( */}
            <>
              <NavLink
                className="px-[10px] flex items-center space-x-2 hover:bg-common hover:rounded-lg"
                route="/auth/login">
                <BiUser />
                <p className="whitespace-nowrap">Sign in</p>
              </NavLink>
              <NavLink
                className="px-[10px] flex items-center space-x-2 hover:bg-common hover:rounded-lg"
                route="/auth/register">
                <BiUser />
                <p className="whitespace-nowrap">Sign up</p>
              </NavLink>
            </>
            {/* ) : ( */}
            {/* <div
            onClick={(e) => {
              e.stopPropagation();
              setOpenDropDown(!openDropDown);
            }}
            className="py-[14px] cursor-pointer flex items-center gap-3 whitespace-nowrap">
            {shop ? shop.name : user?.name}
            {openDropDown ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div> */}
            {/* )} */}
            {/* <NavDropDown
              className={`absolute top-10 right-8 bg-white shadow-2xl mt-[30px] z-50 text-white w-[400px] transition-all ease-in-out duration-500 ${
                openDropDown ? "h-[200px] opacity-100" : "h-0 opacity-0"
              }`}
              openDropDown
              setOpenDropDown
              handleLogout={handleLogout}
            />
            <NavLink
              className="py-[14px] relative flex items-center text-2xl cursor-pointer"
              route="/cart">
              <AiOutlineShoppingCart />
              <div className="absolute top-[0px] right-[-15px] text-base bg-[#000] text-white rounded-full w-full flex justify-center items-center">
                <span>{cartItem?.totalQuantity}</span>
              </div>
            </NavLink> */}
            {/* <div className="py-[14px] flex items-center space-x-2 text-2xl cursor-pointer">
        <MdOutlineFavorite />
        {favouriteItem?.length}
      </div> */}
          </div>
          {/* <div
            onClick={() => setOpenSidebar(!openSidebar)}
            className="block md:hidden text-2xl">
            {openSidebar ? <RxCross2 /> : <CiMenuFries />}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Header;

import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./nav.css";
import { AiOutlineSetting } from "react-icons/ai";
import { useAuthStore } from "../../Store/useAuthStore";
import { assets } from "../../assets/assets";
import { FaChevronDown } from "react-icons/fa";
import logo from "/fav.png"

const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-center justify-between text-sm py-4 border-b bg-base-100 border-b-gray-400 fixed top-0 left-0 w-full z-[100]">
      <div className="pl-10">
        <Link className="flex justify-center items-top" to={"/"}>
          <img src={logo} className="h-9" alt="" />
          <h1 className="text-2xl font-[900]">EDIGEN</h1>
        </Link>
      </div>
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to={"/"}>
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/store"}>
          <li className="py-1">Medicine Store</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4 px-2">
        {user ? (
          <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className="btn p-1">
              <div className="flex items-center gap-1">
                <img
                  className="w-8 rounded-full"
                  src={assets.profile_pic}
                  alt=""
                />
                <div>
                  <FaChevronDown className="w-2.5 " />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <p
                  onClick={() => navigate("/my-profile")}
                  className="text-nowrap hover:text-secondary cursor-pointer"
                >
                  My Profile
                </p>
              </li>
              <li>
                <p
                  onClick={() => navigate("/my-appointment")}
                  className="text-nowrap hover:text-secondary cursor-pointer"
                >
                  My Appointment
                </p>
              </li>
              <li>
                <p
                  onClick={() => {}}
                  className="text-nowrap hover:text-secondary cursor-pointer"
                >
                  LogOut
                </p>
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="btn btn-primary px-8 py-1 rounded-full font-medium hidden md:block  text-center"
          >
            Create Account
          </button>
        )}

        <NavLink
          to={"/setting"}
          className="p-2 bg-base-300 rounded-full shadow w-8"
        >
          <AiOutlineSetting />
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;

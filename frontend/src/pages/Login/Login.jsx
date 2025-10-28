import React, { useState } from "react";
import { LuUserRound } from "react-icons/lu";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Login.scss";
import "./a.css";
import { Link } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { useAuthStore } from "../../Store/useAuthStore";
import Footer from "../../components/Footer/Footer";

const Login = () => {
  const { isLoading } = useAuthStore();
  const [isShowPass, setIsShowPass] = useState(false);
  return (
    <div className="min-h-screen w-full px-20 pt-5 flex justify-center items-start relative ">
      <div className="l-login overflow-hidden shadow-2xl bg-base-100">
        <div className="square left-bottom hu_hu_animation bg-primary"></div>
        <div className="square top-right hu__hu_r_  bg-secondary"></div>

        <div className="l-login__form shadow-2xl p-10 rounded-2xl min-w-150">
          <div className="flex justify-center items-center py-5">
            <img
              className="l-login__form-logo zoomInDown w-17"
              src="fav.png"
              alt="Company Logo"
            />
            <h1 className="text-5xl font-bold">EDIGEN</h1>
          </div>
          <div className="">
            <p className="font-semibold textarea-lg">Login</p>
            <p className="text-sm">Please log in to book appointment</p>
          </div>
          <div className="flex flex-col items-center gap-4 py-5 text-left w-full">
            <div className="w-4/5">
              <label className="input validator w-full">
                <LuUserRound className="opacity-50" />
                <input
                  type="email"
                  placeholder="Type Email"
                  required
                  className="w-full"
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>

            <div className="w-4/5">
              <label className="input validator pr-0  w-full">
                <RiLockPasswordLine className="opacity-50" />
                <input
                  type={isShowPass ? "test" : "password"}
                  required
                  placeholder="Password"
                  minlength="6"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                />
                <button
                  className="btn h-full w-fit px-2 bg-transparent border-none "
                  onClick={() => setIsShowPass(!isShowPass)}
                >
                  {" "}
                  {isShowPass ? (
                    <FiEye className="size-4 opacity-60" />
                  ) : (
                    <FiEyeOff className="size-4 opacity-60" />
                  )}{" "}
                </button>
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number
                <br />
                At least one lowercase letter
                <br />
                At least one uppercase letter
              </p>
            </div>
          </div>
          <button className="btn l-login__form__button bg-secondary text-base-100 px-10 py-4 shadow-xl">
            <h1>Login</h1>
                        {isLoading && (
                          <div className="bg-red-300 relative w-fit h-fit flex justify-center items-center">
                            <CgSpinner className="absolute font-extrabold -rotate-90 animate-spin size-6" />
                          </div>
                        )}
          </button>
          <p className="py-3">
            Create an new account?{" "}
            <Link to={"/signup"} className="underline text-primary">
              click here
            </Link>
          </p>
        </div>

        <div className="c-wind-turbine big">
          <div className="c-wind-turbine__inner">
            <svg
              version="1.1"
              id="Capa_1"
              className="c-wind-turbine__propeller big"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 50 50"
              style={{ enableBackground: "new 0 0 50 50" }}
              xmlSpace="preserve"
            >
              <circle style={{ fill: "transparent" }} cx="25" cy="25" r="25" />
              <polyline
                style={{
                  fill: "none",
                  strokeWidth: 2,
                  strokeLinecap: "round",
                  strokeMiterlimit: 10,
                }}
                points="16,34 25,25 34,16"
                className="stroke-primary"
              />
              <polyline
                style={{
                  fill: "none",
                  strokeWidth: 2,
                  strokeLinecap: "round",
                  strokeMiterlimit: 10,
                }}
                points="16,16 25,25 34,34"
                className="stroke-primary"
              />
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
            <svg
              version="1.1"
              id="Capa_1_poll"
              className="c-wind-turbine__poll big"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="100"
              height="225"
              // width="554.625px"
              // height="554.625px"
              viewBox="0 0 554.625 554.625"
              style={{ enableBackground: "new 0 0 554.625 554.625" }}
              xmlSpace="preserve"
            >
              <g>
                <polygon
                  points="293.772,554.625 280.222,258.188 265.486,258.188 253.925,554.625"
                  className="fill-primary"
                />
                <circle
                  cx="273.853"
                  cy="212.766"
                  r="19.823"
                  className="fill-primary"
                />
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </div>
        </div>
        <div className="c-wind-turbine">
          <div className="c-wind-turbine__inner">
            <svg
              version="1.1"
              id="Capa_1"
              className="c-wind-turbine__propeller"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 50 50"
              style={{ enableBackground: "new 0 0 50 50" }}
              xmlSpace="preserve"
            >
              <circle style={{ fill: "transparent" }} cx="25" cy="25" r="25" />
              <polyline
                style={{
                  fill: "none",
                  strokeWidth: 2,
                  strokeLinecap: "round",
                  strokeMiterlimit: 10,
                }}
                points="16,34 25,25 34,16"
                className="stroke-secondary"
              />
              <polyline
                style={{
                  fill: "none",
                  strokeWidth: 2,
                  strokeLinecap: "round",
                  strokeMiterlimit: 10,
                }}
                points="16,16 25,25 34,34"
                className="stroke-secondary"
              />
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
            <svg
              version="1.1"
              id="Capa_1_poll"
              className="c-wind-turbine__poll"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="100"
              height="225"
              viewBox="0 0 554.625 554.625"
              style={{ enableBackground: "new 0 0 554.625 554.625" }}
              xmlSpace="preserve"
            >
              <g>
                <polygon
                  points="293.772,554.625 280.222,258.188 265.486,258.188 253.925,554.625 	"
                  className="fill-secondary"
                />
                <circle
                  cx="273.853"
                  cy="212.766"
                  r="19.823"
                  className="fill-secondary"
                />
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAuthStore } from "../Store/useAuthStore";
import Footer from "../components/Footer/Footer";

const Profile = () => {
  const { user } = useAuthStore();
  const [userData, setUserData] = useState(user);

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="px-20 w-full pt-7">
      <img src={userData.image} alt="" className="rounded-2xl" />
      <div className="flex flex-col py-2">
        <div className="">
          {isEdit ? (
            <input
              type="text"
              className="input"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          ) : (
            <h2 className="input border-none font-bold text-2xl">
              {userData.name}
            </h2>
          )}

          <hr className="w-full my-2" />
          <div className="p-4">
            <h1 className="font-light underline -pl-2 mb-4">
              Contact Information
            </h1>
            <p className="flex px-2 items-center my-1">
              <span className="w-30 block">Email:</span>

              {isEdit ? (
                <input
                  type="email"
                  disabled
                  className="input "
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              ) : (
                <span className="input border-none">{userData.email}</span>
              )}
            </p>
            <p className="flex px-2 items-center my-1">
              <span className="w-30 block">Phone:</span>

              {isEdit ? (
                <input
                  type="email"
                  className="input"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              ) : (
                <span className="input border-none">{userData.phone}</span>
              )}
            </p>
            <p className="flex px-2 items-center my-1">
              <span className="w-30 block">Contry:</span>

              {isEdit ? (
                <input
                  type="email"
                  className="input"
                  value={userData.address.contry}
                  onChange={(e) =>
                    setUserData({ ...userData, address: {...userData.address, contry: e.target.value }})
                  }
                />
              ) : (
                <span className="input uppercase">
                  {userData.address.contry}
                </span>
              )}
            </p>
            <div className="flex px-2 items-start md:items-center my-1">
              <span className="w-30 block">Address:</span>
              <div className="flex gap-2 flex-wrap items-center">
                <div>
                  <h1 className="text-xs px-2">city</h1>
                  {isEdit ? (
                    <input
                      type="text"
                      className="input  min-w-30"
                      value={userData.address.city}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          address: {
                            ...userData.address,
                            city: e.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    <div className="input min-w-30 w-fit">
                      {userData.address.city}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-xs px-2">state</h1>
                  {isEdit ? (
                    <input
                      type="text"
                      className="input  min-w-30"
                      value={userData.address.state}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          address: {
                            ...userData.address,
                            state: e.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    <div className="input w-30 ">{userData.address.state}</div>
                  )}
                </div>
                <div>
                  <h1 className="text-xs px-2">zip code</h1>
                  {isEdit ? (
                    <input
                      type="number"
                      className="input  min-w-30"
                      value={userData.address.zip}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          address: {
                            ...userData.address,
                            zip: e.target.value,
                          },
                        })
                      }
                    />
                  ) : (
                    <div className="input w-30 ">{userData.address.zip}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h1 className="font-light underline -pl-2 mb-4">
              Basic Information
            </h1>
            <p className="flex px-2 items-center my-1">
              <span className="w-30 block">Gender:</span>

              {isEdit ? (
                <select
                  className="select"
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData({ ...userData, gender: e.target.value })
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <span className="input border-none">{userData.gender}</span>
              )}
            </p>
            <p className="flex px-2 items-center my-1">
              <span className="w-30 block">Birthday:</span>
              {isEdit ? (
                <input
                  type="date"
                  className="input"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData({ ...userData, dob: e.target.value })
                  }
                />
              ) : (
                <span className="input border-none">{userData.dob}</span>
              )}
            </p>
          </div>
        </div>
      </div>
      <button className="btn" onClick={() => setIsEdit(!isEdit)}>
        {isEdit && userData != user ? "Save" : "Edit"}
      </button>
      <Footer />
    </div>
  );
};

export default Profile;

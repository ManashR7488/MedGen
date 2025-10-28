import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { useGenStore } from "../../Store/GenStore";
import { assets } from "../../assets/assets";
import { AiOutlineLoading } from "react-icons/ai";
import ReactMarkdown from "react-markdown";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import logo from "/fav.png"

const MedGenAi = () => {
  const messageEndRef = useRef(null);
  const [promt, setPromt] = useState("");
  const { messages, generate, isLoading } = useGenStore();
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleInput = (e) => {
    e.preventDefault();
    generate(promt);
    setPromt("");
  };

  return (
    <div className="h-[87vh] fixed right-2 z-[20] flex items-center justify-center md:justify-end">
      <div className="flex  gap-3 w-fit ">
        <div className={`rounded-2xl overflow-hidden shadow-lg bg-base-200 ${showChat ? 'block' : 'hidden'}`}>
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center justify-between ">
            <div className="flex items-center">
              <img src={logo} alt="" className="w-8" />
              <h1 className=" font-bold">edGenAi</h1>
            </div>
            <button className="btn rounded-xl px-2 py-2" onClick={() => setShowChat(!showChat)}>
              <FaChevronDown />
            </button>
            {/* <p className=''>A medical AI that provides personalized health advice and recommendations.</p> */}
          </div>

          {/* Chat */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 w-135 h-110">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat ${
                  msg.sender === "user" ? "chat-end" : "chat-start"
                } overflow-hidden`}
                ref={messageEndRef}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="sender"
                      src={
                        msg.sender === "user"
                          ? `${assets.profile_pic}`
                          : logo
                      }
                    />
                  </div>
                </div>
                <div className="chat-bubble text-sm text-wrap">
                  {" "}
                  {msg.sender === "user" ? (
                    msg.message
                  ) : (
                    <ReactMarkdown>{msg.message}</ReactMarkdown>
                  )}{" "}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div>
            <div className="">
              <form onSubmit={handleInput} className="py-2 px-2 flex gap-2 ">
                <input
                  type="text"
                  value={promt}
                  onChange={(e) => setPromt(e.target.value)}
                  placeholder="Type a message..."
                  className="input w-full border-2 border-gray-300 rounded-lg p-2"
                />
                <button
                  type="submit"
                  className="btn px-3 py-2 rounded-full text-white bg-primary"
                  onClick={handleInput}
                  disabled={(promt.length > 0 || isLoading) ? false : true}
                >
                  {isLoading ? (
                    <div className="animate-spin text-base-100 size 5">
                      <AiOutlineLoading />
                    </div>
                  ) : (
                    <LuSend />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className={`h-10 w-20 ${showChat ? 'block' : 'hidden'}`} ></div>
        <div className="flex justify-end absolute bottom-2 right-20 bg-transparent">
          <button
            className="btn rounded-xl px-2 py-2 bg-primary shadow-2xl"
            onClick={() => setShowChat(!showChat)}
          >
            <IoChatbubbleEllipsesOutline className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedGenAi;

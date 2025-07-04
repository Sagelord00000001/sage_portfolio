"use client";
import React from "react";

const ProfileCard = ({
  avatarUrl = "./avater.png",
  name = "Javi A. Torres",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact",
  onContactClick,
}) => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] rounded-3xl shadow-2xl overflow-hidden transition-transform hover:scale-[1.015] duration-300">
        <div className="relative w-full pt-[125%]">
          <img
            src={avatarUrl}
            alt={name}
            className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-t-3xl"
          />
          <div className="absolute inset-0 bg-black/10 backdrop-blur-xs rounded-t-3xl" />
        </div>

        <div className="p-6 text-white flex flex-col gap-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              {name}
            </h3>
            <p className="text-sm text-gray-300">@{handle}</p>
            <span className="text-sm mt-1 inline-block px-2 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-300">
              {status}
            </span>
          </div>

          <button
            onClick={onContactClick}
            className="mt-2 py-2 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all text-white font-semibold"
          >
            {contactText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfileCard);

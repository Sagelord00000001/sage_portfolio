"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import ProfileCard from "@/components/ui/ProfileCard";

export default function Home() {
  
  return (
    <>
      <div className="pt-30 flex items-center justify-center flex-col">
        <div>
          <span className="bg-gradient-to-r pb-4 from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text text-[20px] font-extrabold">Hello I'm </span>
          <TypeAnimation
            sequence={[
              "a Computer Scientist",
              1000,
              "a Web Developer",
              1000,
              "an Ethical Hacker",
              1000,
              "an AI Analyst",
              1000,
            ]}
            wrapper="span"
            speed={70}
            repeat={Infinity}
            style={{ fontSize: "20px", fontWeight: "bold" }}
          />
        </div>

        <div>
          <ProfileCard
            name="Okonkwo Chukwuebuka .E."
            handle="sagelord"
            status="Online"
            contactText="Contact Me"
            showUserInfo={true}
            enableTilt={true}
            onContactClick={() => console.log("Contact clicked")}
          />
        </div>
      </div>
    </>
  );
}

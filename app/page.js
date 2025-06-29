"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import ProfileCard from "@/components/ui/ProfileCard";
import { useRef } from "react";
import { LampDemo } from "./components/Lamp";

export default function Home() {
  const contactRef = useRef(null)

  const scrollToSection = (ref) =>{
    if (ref.current){
      ref.current.scrollIntoView({behavior: "smooth"})
    }
  }
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

        <div className="h-full mt-3">
          <ProfileCard
            name="Okonkwo Chukwuebuka .E."
            handle="sagelord"
            status="Online"
            contactText="Contact Me"
            showUserInfo={true}
            enableTilt={true}
            onContactClick={() => scrollToSection(contactRef)}
          />
        </div>
      </div>
      {/* About Section */}
      <section id="#about">
            <LampDemo />
      </section>
       {/* Contact Section */}
             <section ref={contactRef} id="#" className="min-h-screen flex items-center justify-center bg-gray-800 text-white px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
          <p>Put your contact form or contact details here.</p>
        </div>
      </section>
    </>
  );
}

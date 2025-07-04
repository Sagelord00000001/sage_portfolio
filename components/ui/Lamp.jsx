"use client";
import React from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.div
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
      >
        <Typography
          component="h1"
          align="center"
          sx={{
            background: "linear-gradient(to right, #38bdf8, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 800,
            mt: 8,
            mb: 4,
            fontSize: {
              xs: "2.25rem",
              sm: "3rem",
              md: "4rem",
              lg: "5rem",
              xl: "6rem",
            },
            lineHeight: 1.2,
          }}
        >
          About Me
        </Typography>
      </motion.div>

      <Typography
        variant="body1"
        sx={{
          mt: 2,
          px: { xs: 2, sm: 4 },
          color: "#CBD5E1",
          textAlign: "justify",
          fontSize: {
            xs: "1rem",
            sm: "1.125rem",
            md: "1.25rem",
          },
          lineHeight: 1.75,
          maxWidth: "850px",
        }}
      >
        I’m a passionate <strong>AI Engineer in training</strong>, a <strong>full-stack JavaScript and Next.js developer</strong>, a <strong>cybersecurity specialist</strong>, and an <strong>ethical hacker</strong> with expertise in Kali Linux. I build fast, scalable, and visually striking web applications using <strong>Next.js</strong>, <strong>Tailwind CSS</strong>, <strong>React</strong>.
        <br /><br />
        I also specialize in <strong>SEO</strong>, helping websites dominate search rankings through keyword strategy, technical optimization, content structuring, and performance tuning. My goal is always to get you ranking #1 on Google.
        <br /><br />
        As a dedicated <strong>tech enthusiast</strong>, I offer mentorship and hands-on training in <strong>web development, cybersecurity, AI fundamentals, and SEO</strong>. Whether you're a business aiming to grow your online presence, or a student eager to break into tech, I provide the tools and guidance you need to succeed.
      </Typography>
    </LampContainer>
  );
}

export const LampContainer = ({ children, className }) => {
  return (
    <Box
      className={className}
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        width: "100%",
        // bgcolor: "#0f172a",
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      {/* Gradient Effects */}
      <motion.div
        initial={{ opacity: 0.5, width: "8rem" }}
        whileInView={{ opacity: 1, width: "15rem" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "conic-gradient(from 70deg at center top, #06b6d4, transparent 75%)",
        }}
        className="absolute right-1/2 h-80 w-70 sm:w-80 md:w-96 lg:w-[30rem] z-10"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0.5, width: "8rem" }}
        whileInView={{ opacity: 1, width: "15rem" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "conic-gradient(from 290deg at center top, transparent, #06b6d4 75%)",
        }}
        className="absolute left-1/2 h-80 w-70 sm:w-80 md:w-96 lg:w-[30rem] z-10"
      ></motion.div>

      {/* Central Glow */}
      <motion.div
        initial={{ width: "6rem" }}
        whileInView={{ width: "12rem" }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="absolute z-30 h-28 sm:h-32 md:h-36 bg-cyan-400 rounded-full blur-2xl"
        style={{ top: "45%", left: "50%", transform: "translate(-50%, -50%)" }}
      ></motion.div>

      {/* Glow Ring */}
      <Box
        className="absolute z-20 rounded-full blur-3xl"
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "16rem", sm: "20rem", md: "24rem", lg: "28rem" },
          height: { xs: "6rem", sm: "8rem", md: "9rem" },
          bgcolor: "cyan.500",
          opacity: { xs: 0.3, sm: 0.4, md: 0.5 },
        }}
      />

      {/* Content */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 50 }}>
        {children}
      </Container>
    </Box>
  );
};

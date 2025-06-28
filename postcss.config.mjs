const config = {
  plugins: ["@tailwindcss/postcss"],
  theme:{
    extend:{
      sunpillar:{
          1: 'hsl(2, 100%, 73%)',
          2: 'hsl(53, 100%, 69%)',
          3: 'hsl(93, 100%, 69%)',
          4: 'hsl(176, 100%, 76%)',
          5: 'hsl(228, 100%, 74%)',
          6: 'hsl(283, 100%, 73%)',
      }
    }
  }
};

export default config;

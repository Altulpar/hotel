import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coast: {
          ink: "#16211d",
          deep: "#214237",
          sage: "#78927f",
          mist: "#eef3ef",
          sand: "#d7c6a5",
          clay: "#b46f4d"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(22, 33, 29, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;

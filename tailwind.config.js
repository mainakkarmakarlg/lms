/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C6FBB",
        highlight: "#FFAF5E",
        success: "#10B981",
        danger: "#FF3957",
        // primary: "#4CB1E1  ",
        secondary: "#2c6fbb",
        neutral: "#EAEAEA",
        "light-green": "#ECFDF5",
        "light-red": "#FEF2F2",
        "custom-blue": "#4473C5",
        "custom-red": "#ED7D31",
        "custom-gray": "#A5A5A5",
        "custom-black": "#636363",
        "dark-blue": "#2c6fbb",
        "light-gray": "#D1D5DB",
        "primary-hover": "#2c79d1",
        "secondary-hover": "#849CE4",
        heading: "#34363F",
        caption: "#8C8F9F",
        "sub-heading": "#64748B",
      },
      boxShadow: {
        "bottom-left": "-8px 8px 8px rgba(0, 0, 0, 0.2)", // Left and bottom shadow only
        subject: "0px 1px 10px 0px #B1B1B126",
        card: "1px 1px 4px 0px #00000012, -1px -1px 4px 0px #00000012;",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

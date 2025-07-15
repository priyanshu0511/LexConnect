import React from "react";
import { LuLoader } from "react-icons/lu";
import { useThemeStore } from "../store/useThemeStore";

const PageLoader = () => {
  const { theme } = useThemeStore();

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      data-theme="theme"
    >
      <LuLoader className="animate-spin size-10 text-primary" />
    </div>
  );
};

export default PageLoader;

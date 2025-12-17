import type { ReactNode } from "react";
import { Link, useMatch } from "react-router-dom";

interface CustomLinkType {
  to: string,
  children: ReactNode,
}

export const CustomLink = ({children, to}: CustomLinkType) => {
  const match = useMatch(to)
  const baseClasses = "text-sm font-medium transition-colors"
  const activeClasses = match 
    ? "text-blue-500 hover:text-blue-400" 
    : "text-gray-400 hover:text-gray-100"
  
  return (
    <Link 
      className={`${baseClasses} ${activeClasses}`}
      to={to}
    >
      {children}
    </Link>
  );
};
import React from "react";

import classes from "../assets/Breadcrumb.module.css";

interface BreadcrumbProps {
  path: string[];
  onNavigate: (index: number) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, onNavigate }) => {
  return (
    <div>
      {path.map((part, index) => (
        <span key={index} onClick={() => onNavigate(index)}>
          {part}
          {index < path.length - 1 && " > "}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;

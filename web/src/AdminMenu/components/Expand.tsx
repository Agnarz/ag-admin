import { useState } from "react";
import { Collapse } from "@mantine/core";

interface ExpandProps {
  label: string | React.ReactNode;
  children: React.ReactNode;
}

const Expand: React.FC<ExpandProps> = (props) => {
  const { label, children } = props;
  const [isExpanded, setExpand] = useState<boolean>(false);

  const handleClick = () => {
    setExpand(!isExpanded);
  };

  const expandedStyle = {
    background: isExpanded ? "#1864AB" : "",
    color: isExpanded ? "white" : "",
  };

  const expandIcon = {
    transform: isExpanded ? "rotate(-180deg)" : "",
    transition: "all 0.2s ease",
    fontSize: 14,
  };

  return (
    <div className="Expand-container">
      <div className="Expand-header" style={expandedStyle}>
        <div className="Expand-icon">
          <i className="fas fa-chevron-down" style={expandIcon} />
        </div>
        <div className="Expand-label" onClick={handleClick}>
          {label}
        </div>
      </div>

      <Collapse transitionDuration={200} in={isExpanded}>
        <div className="Expand-content">
          {children}
        </div>
      </Collapse>
    </div>
  );
};

export default Expand;
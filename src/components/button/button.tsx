import { getValidClassNames } from "../../helpers/get-valid-class-names.helper";

import styles from "./styles.module.css";

type Properties = {
  className?: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  size?: "medium" | "small";
  type?: "button" | "submit";
};

const Button: React.FC<Properties> = ({
  className = "",
  label,
  onClick,
  size = "medium",
  type = "button",
}: Properties) => {
  const buttonClassName = getValidClassNames(
    className,
    styles["button"],
    styles[size]
  );
  return (
    <button className={buttonClassName} onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export { Button };

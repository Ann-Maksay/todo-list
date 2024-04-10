import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";

import { getValidClassNames } from "../../helpers/get-valid-class-names.helper";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
  className?: string;
  control: Control<T, null>;
  label: string;
  name: FieldPath<T>;
  placeholder?: string;
  isRequired?: boolean;
  type?: "text" | "radio";
  value?: string | number;
};

const Input = <T extends FieldValues>({
  className = "",
  control,
  label,
  name,
  placeholder,
  isRequired = false,
  type = "text",
  value,
}: Properties<T>): JSX.Element => {
  const { field } = useController({ control, name });

  const inputClassNames = getValidClassNames(
    className,
    styles["input"],
    styles[type]
  );
  return (
    <label className={styles[`container-${type}`]}>
      <span className={styles["label"]}>{label}</span>
      <input
        className={inputClassNames}
        placeholder={placeholder}
        type={type}
        {...field}
        required={isRequired}
        value={type === "radio" ? value : field.value}
        checked={field.value === value}
      />
    </label>
  );
};

export { Input };

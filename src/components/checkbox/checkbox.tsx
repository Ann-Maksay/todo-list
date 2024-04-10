import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";

import { getValidClassNames } from "../../helpers/helpers.js";

import styles from "./styles.module.css";

type Properties<T extends FieldValues> = {
  className?: string | undefined;
  control: Control<T, null>;
  label: string;
  name: FieldPath<T>;
};

const Checkbox = <T extends FieldValues>({
  className = "",
  control,
  label,
  name,
}: Properties<T>): JSX.Element => {
  const { field } = useController({ control, name });

  const inputClasses = getValidClassNames(className, styles["checkbox"]);

  return (
    <label className={styles["checkbox-container"]}>
      <span className={styles["label"]}>{label}</span>
      <input
        {...field}
        checked={Boolean(field.value)}
        className={inputClasses}
        type="checkbox"
      />
    </label>
  );
};

export { Checkbox };

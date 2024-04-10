import { useCallback } from "react";
import { useForm } from "react-hook-form";

import { FilterOption } from "../../enums/enums.js";
import { Input } from "../input/input.jsx";
import styles from "./styles.module.css";

type Properties = {
  onSubmit: (
    search: string,
    filerOption: (typeof FilterOption)[keyof typeof FilterOption]
  ) => void;
};

const Filter: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: "",
      filter: FilterOption.ALL,
    },
    mode: "onChange",
  });

  const handleSearch = handleSubmit(({ search, filter }) => {
    onSubmit(search, filter);
  });

  const handleFormSubmit = useCallback(
    (event_: React.FormEvent<HTMLFormElement>): void => {
      event_.preventDefault();
    },
    []
  );

  return (
    <form
      className={styles["container"]}
      onChange={handleSearch}
      onSubmit={handleFormSubmit}
    >
      <Input
        control={control}
        label="Search"
        placeholder="Enter search value"
        name="search"
        isRequired={true}
      />
      <div className={styles["radio-groups"]}>
        <Input
          control={control}
          label="All"
          name="filter"
          value={FilterOption.ALL}
          type="radio"
        />
        <Input
          control={control}
          label="To do"
          name="filter"
          value={FilterOption.TO_DO}
          type="radio"
        />
        <Input
          control={control}
          label="Completed"
          name="filter"
          value={FilterOption.COMPLETED}
          type="radio"
        />
      </div>
    </form>
  );
};

export { Filter };

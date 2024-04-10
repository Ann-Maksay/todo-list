import { useForm } from "react-hook-form";
import { CreateTaskDto } from "../../types/types";
import { getValidClassNames } from "../../helpers/get-valid-class-names.helper";
import { Input } from "../input/input.jsx";
import { Button } from "../button/button.jsx";
import styles from "./styles.module.css";

type Properties = {
  isFormOpen: boolean;
  onSubmit: (payload: CreateTaskDto) => void;
};

const AddTaskForm: React.FC<Properties> = ({
  isFormOpen,
  onSubmit,
}: Properties) => {
  const { control, handleSubmit, reset } = useForm<CreateTaskDto>({
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onSubmit",
  });

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
    reset();
  });

  return (
    <form
      className={getValidClassNames(
        styles["container"],
        isFormOpen && styles["open"]
      )}
      onSubmit={handleFormSubmit}
    >
      <Input
        control={control}
        label="Title"
        placeholder="Enter title"
        name="title"
        isRequired={true}
      />
      <Input
        control={control}
        label="Description (optional)"
        placeholder="Enter description"
        name="description"
      />
      <Button label="Add task" type="submit" />
    </form>
  );
};

export { AddTaskForm };

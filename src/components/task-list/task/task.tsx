import { useCallback } from "react";
import { useForm } from "react-hook-form";

import { type Task } from "../../../types/types";
import { Button } from "../../button/button";
import { Checkbox } from "../../checkbox/checkbox";
import styles from "./styles.module.css";

type Properties = {
  task: Task;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
};

const TaskItem: React.FC<Properties> = ({
  task,
  onDelete,
  onToggleComplete,
}: Properties) => {
  const { id, description, title, completed } = task;

  const { control } = useForm({
    defaultValues: {
      completed,
    },
  });

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  const handleToggle = useCallback((): void => {
    onToggleComplete(id);
  }, [onToggleComplete, id]);

  return (
    <li className={styles["task"]}>
      <div className={styles["task-content"]}>
        <h2 className={styles["title"]}>{title}</h2>
        {description ? (
          <p className={styles["description"]}>{description}</p>
        ) : (
          <p className={styles["empty-description"]}>There is no description</p>
        )}
      </div>
      <div className={styles["toolbar"]}>
        <form onChange={handleToggle}>
          <Checkbox
            control={control}
            label={completed ? "Completed" : "Todo"}
            name="completed"
          />
        </form>
        <Button label="Delete" size="small" onClick={handleDelete} />
      </div>
    </li>
  );
};

export { TaskItem };

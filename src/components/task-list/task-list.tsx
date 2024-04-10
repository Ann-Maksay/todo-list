import { type Task } from "../../types/types";
import { TaskItem } from "./task/task";

import styles from "./styles.module.css";

type Properties = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
};

const TaskList: React.FC<Properties> = ({
  tasks,
  onDelete,
  onToggleComplete,
}: Properties) => {
  return (
    <ul className={styles["task-list"]}>
      {tasks.map((task) => {
        return (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        );
      })}
    </ul>
  );
};

export { TaskList };

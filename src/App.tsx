import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { type CreateTaskDto, type Task } from "./types/types";
import { FilterOption } from "./enums/enums";
import { LocalStorageHandler } from "./helpers/local-storage-handler.helper";
import { AddTaskForm, Button, Filter, TaskList } from "./components/components";

const todoLocalStorageHandler = new LocalStorageHandler<Task[]>("todos");

const App: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [todos, setTodos] = useState<Task[]>([]);
  const [filtredTodos, setFiltredTodos] = useState<Task[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterValue, setFilterValue] = useState<
    (typeof FilterOption)[keyof typeof FilterOption]
  >(FilterOption.ALL);

  const handleOpenForm = useCallback(() => {
    setIsFormOpen(isFormOpen ? false : true);
  }, [isFormOpen, setIsFormOpen]);

  const handleFormSubmit = useCallback(
    (payload: CreateTaskDto) => {
      const newTodo: Task = {
        id: uuidv4(),
        title: payload.title,
        description: payload.description,
        completed: false,
      };
      const newTodos = [newTodo, ...todos];
      setTodos(newTodos);

      todoLocalStorageHandler.setItem(newTodos);

      setIsFormOpen(false);
    },
    [todos, setIsFormOpen, setTodos]
  );

  const handleDeleteTodos = useCallback(
    (id: string) => {
      const newTodos = todos.filter((task) => task.id !== id);
      setTodos(newTodos);
      todoLocalStorageHandler.setItem(newTodos);
    },
    [todos, setTodos]
  );

  const handleToggleComplete = useCallback(
    (id: string) => {
      const newTodos = todos.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setTodos(newTodos);
      todoLocalStorageHandler.setItem(newTodos);
    },
    [todos, setTodos]
  );

  const handleSearch = useCallback(
    (
      search: string,
      filerOption: (typeof FilterOption)[keyof typeof FilterOption]
    ) => {
      setSearchValue(search.toLowerCase());
      setFilterValue(filerOption);
    },
    [setFilterValue, setSearchValue]
  );

  useEffect(() => {
    const allTodos = todoLocalStorageHandler.getItem();
    setTodos(allTodos);
    setFiltredTodos(allTodos);
  }, []);

  useEffect(() => {
    let searchResult;
    switch (filterValue) {
      case FilterOption.ALL:
        searchResult = todos.filter(
          (task) =>
            task.description?.toLowerCase().includes(searchValue) ||
            task.title.toLowerCase().includes(searchValue)
        );
        setFiltredTodos(searchResult);
        break;

      case FilterOption.COMPLETED:
        searchResult = todos.filter(
          (task) =>
            (task.description?.toLowerCase().includes(searchValue) ||
              task.title.toLowerCase().includes(searchValue)) &&
            task.completed
        );
        setFiltredTodos(searchResult);
        break;

      case FilterOption.TO_DO:
        searchResult = todos.filter(
          (task) =>
            (task.description?.toLowerCase().includes(searchValue) ||
              task.title.toLowerCase().includes(searchValue)) &&
            !task.completed
        );
        setFiltredTodos(searchResult);
        break;

      default:
        setFiltredTodos(todos);
        break;
    }
  }, [filterValue, searchValue, setFiltredTodos, todos]);

  return (
    <>
      <header>
        <h1 className="title">To Do</h1>
      </header>
      <main className="main">
        <div>
          <Filter onSubmit={handleSearch} />
        </div>
        <div>
          <Button
            label={isFormOpen ? "Cancel" : "Create task"}
            onClick={handleOpenForm}
          />
          <AddTaskForm isFormOpen={isFormOpen} onSubmit={handleFormSubmit} />
        </div>
        <TaskList
          tasks={filtredTodos}
          onDelete={handleDeleteTodos}
          onToggleComplete={handleToggleComplete}
        />
      </main>
      <footer>
        <p className="footer-text">by Anna Maksai</p>
      </footer>
    </>
  );
};

export default App;

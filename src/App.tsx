import { useEffect, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import { Loader } from "./components/Loader/Loader";
import { sortData } from "./utils/sortData";
import { setAPIChecked } from "./utils/setCheckedAPI";

function App() {
  const [todos, setTodos] = useState<TODO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMyAPI() {
      setIsLoading(true);
      let response = await fetch(`${import.meta.env.VITE_API_URL}/get`, {
        headers: {
          "X-Api-Key": import.meta.env.VITE_POSTMAN_KEY,
        },
      });
      response = await response.json();
      console.log(response);
      setTodos(sortData(response as unknown as TODO[]));
      setIsLoading(false);
    }

    fetchMyAPI();
  }, []);

  async function setChecked(id: string) {
    setIsLoading(true);
    const newTodos = [...todos];
    const updateItem = newTodos.find((td) => td.id === id);
    if (updateItem && !updateItem.isComplete) {
      const res = await setAPIChecked(id);
      if (res.status === "success") {
        updateItem.isComplete = true;
        setTodos(sortData(newTodos));
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      <div className="header">
        <h1>ToDo App</h1>
      </div>

      <div className="todo-container">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} setChecked={setChecked} />
        ))}
      </div>
      {isLoading && (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "10px" }}
        >
          <Loader />
        </div>
      )}
    </>
  );
}

export default App;

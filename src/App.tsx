import { useEffect, useState } from "react";

import "./App.css";
import { Todo } from "./types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/todos").then((resp) =>
      resp.json().then((todosFromServer) => setTodos(todosFromServer))
    );
  }, []);
  return (
    <div className="App">
      <header className="header">
        <h1>ToDo List✨</h1>
        <input placeholder="Search a todo..."></input>
      </header>
      <main className="main">
        <ul className="todo-list">
          {todos.map((item) => (
            <li className={item.completed ? "completed" : "not-completed"}>
              {item.content}
            </li>
          ))}
        </ul>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            let newTodo = {
              content: event.target.newTodo.value,
              completed: false,
            };
            setTodos([...todos, newTodo]);
            fetch('http://localhost:4000/todos', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
              content: event.target.newTodo.value,
              completed: false,
              })
            })
            event.target.reset();
          }}
        >
          <input placeholder="add a todo" name="newTodo"></input>
          <button>Submit</button>
        </form>
      </main>
    </div>
  );
}

export default App;

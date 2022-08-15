import { useEffect, useState } from "react";

import "./App.css";
import { Todo } from "./types"

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const[query, setQuery]=useState('')

  useEffect(() => {
    fetch("http://localhost:4000/todos").then((resp) =>
      resp.json().then((todosFromServer) => setTodos(todosFromServer))
    );
  }, []);

  function toggleTodo(item: Todo) {
    const copyTodos = structuredClone(todos);
    let match = copyTodos.find((todo) => todo.id === item.id);
    match.completed = !item.completed;
    setTodos(copyTodos);
  }

  function searchTodo(){
let filteredEmails=todos.filter(todo=> todo.content.toLowerCase().includes(query.toLowerCase()));
return filteredEmails
  }

  return (
    <div className="App">
      <header className="header">
        <h1>ToDo List✨</h1>
        <input placeholder="Search a todo..."
        onChange={(event)=>{
          setQuery(event.target.value)
          searchTodo()
        }}
        ></input>
      </header>

      <main className="main">
        <ul className="todo-list">
          {searchTodo().map((item) => (
            <li key={item.id}
            className={item.completed ? "completed" : "not-completed"}
            onClick={()=>{
              toggleTodo(item)
              fetch(`http://localhost:4000/todos/${item.id}`,{
                method:'PATCH',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  completed: !item.completed
                })
              })
            }
            }
            >
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
            fetch("http://localhost:4000/todos", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                content: event.target.newTodo.value,
                completed: false,
              }),
            });
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

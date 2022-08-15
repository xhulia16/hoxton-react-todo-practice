import { useEffect, useState } from 'react'

import './App.css'
import { Todo } from './types'

function App() {

  const [todos, setTodos]=useState<Todo[]>([])

  useEffect(()=>{
    fetch('http://localhost:4000/todos')
    .then(resp=>resp.json()
    .then(todosFromServer=> setTodos(todosFromServer)))
  },[])
  return (
    <div className="App">
     <header className="header">
      <h1>ToDo List✨</h1>
      <input placeholder='Search a todo...'>
  
      </input>
      </header>
     <main className="main">
      <ul className="todo-list">
        {todos.map(item=>
        <li className={item.completed? 'completed': 'not-completed'}>{item.content}</li>
          )}
      </ul>
      <form>
        <input placeholder="add a todo"></input>
        <button>Submit</button>
      </form>
     </main>
    </div>
  )
}

export default App

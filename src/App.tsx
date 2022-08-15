import { useState } from 'react'

import './App.css'

function App() {

  return (
    <div className="App">
     <header className="header">
      <h1>ToDo List✨</h1>
      <input placeholder='Search a todo...'>
  
      </input>
      </header>
     <main className="main">
      <ul className="todo-list">
      <li>This is a todo</li>
      <li>This is a todo</li>
      <li>This is a todo</li>
      <li>This is a todo</li>
      <li>This is a todo</li>
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

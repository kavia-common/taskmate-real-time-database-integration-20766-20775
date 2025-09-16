import React from 'react';
import './App.css';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>TaskMate Dashboard</h1>
      </header>
      <main>
        <TaskList />
      </main>
    </div>
  );
}

export default App;

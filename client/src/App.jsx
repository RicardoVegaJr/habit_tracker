import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import {
  buildTaskStats,
  readStoredTasks,
  writeStoredTasks,
} from './utils/taskUtils';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => readStoredTasks());

  useEffect(() => {
    writeStoredTasks(tasks);
  }, [tasks]);

  const addTask = (taskInput) => {
    const timestamp = new Date().toISOString();

    setTasks((currentTasks) => [
      {
        id:
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : String(Date.now()),
        title: taskInput.title,
        notes: taskInput.notes,
        priority: taskInput.priority,
        deadline: taskInput.deadline,
        createdAt: timestamp,
        completedAt: null,
      },
      ...currentTasks,
    ]);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        return {
          ...task,
          completedAt: task.completedAt ? null : new Date().toISOString(),
        };
      }),
    );
  };

  const deleteTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  };

  const stats = buildTaskStats(tasks);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="app-backdrop app-backdrop-one" />
        <div className="app-backdrop app-backdrop-two" />
        <Navbar stats={stats} />
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                tasks={tasks}
                stats={stats}
                onAddTask={addTask}
                onDeleteTask={deleteTask}
                onToggleTaskCompletion={toggleTaskCompletion}
              />
            }
          />
          <Route path="/analytics" element={<Analytics tasks={tasks} stats={stats} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

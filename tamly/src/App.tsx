import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useAppRouting } from './utils/routeUtils';
import { AppLink } from './components/AppLink';
import { Calendar } from './components/Calendar';
import './App.css';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete project proposal for Warmly', completed: false },
    { id: 2, text: 'Review code changes', completed: true },
    { id: 3, text: 'Update documentation', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="tamly-page">
      <h2>Task Management</h2>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span>{task.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Projects: React.FC = () => (
  <div className="tamly-page">
    <h2>Project Overview</h2>
    <p>Track progress across all your projects.</p>
    <div className="project-list">
      <div className="project-card">
        <h4>Website Redesign</h4>
        <div className="progress-bar">
          <div className="progress" style={{ width: '75%' }}></div>
        </div>
        <p>75% Complete • Due: Dec 30, 2024</p>
      </div>
      <div className="project-card">
        <h4>Mobile App Development</h4>
        <div className="progress-bar">
          <div className="progress" style={{ width: '45%' }}></div>
        </div>
        <p>45% Complete • Due: Jan 15, 2025</p>
      </div>
      <div className="project-card">
        <h4>Marketing Campaign</h4>
        <div className="progress-bar">
          <div className="progress" style={{ width: '90%' }}></div>
        </div>
        <p>90% Complete • Due: Dec 25, 2024</p>
      </div>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const { internalPath } = useAppRouting('tamly');
  
  return (
    <div className="tamly-app">
      <div className="tamly-nav">
        <h3>Tamly</h3>
        <nav>
          <AppLink to="/" className={internalPath === '/' ? 'nav-active' : ''}>
            Tasks
          </AppLink>
          <AppLink to="/projects" className={internalPath === '/projects' ? 'nav-active' : ''}>
            Projects
          </AppLink>
          <AppLink to="/calendar" className={internalPath === '/calendar' ? 'nav-active' : ''}>
            Calendar
          </AppLink>
        </nav>
      </div>
      <div className="tamly-content">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  // Detect if we're running standalone or as part of micro-frontend
  // Standalone: either localhost:3002 or not loaded via Module Federation
  const isStandalone = window.location.port === '3002' || 
                      !window.location.pathname.startsWith('/tamly') ||
                      !document.querySelector('[data-react-router]');

  // If standalone, wrap with BrowserRouter, otherwise just return content
  if (isStandalone) {
    return (
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    );
  }

  return <AppContent />;
};

export default App;

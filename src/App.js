
import React from 'react';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Manager</h1>
      <TaskList />
    </div>
  );
};

export default App;

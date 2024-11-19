import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(''); // State for the new task input

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === '') return; // Prevent empty tasks
    try {
      const response = await axios.post('/tasks', { name: newTask });
      setTasks([...tasks, response.data]); // Add the new task to the list
      setNewTask(''); // Clear the input
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        p: 3,
        mt: 5,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Task Manager
      </Typography>

      {/* Add Task Form */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addTask}>
          Add
        </Button>
      </Box>

      {/* Task List */}
      <Paper elevation={3}>
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTask(task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={task.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default TaskList;

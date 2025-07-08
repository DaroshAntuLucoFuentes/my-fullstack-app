import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskItem from "./components/TaskItem";

function App() {
  const handleToggleComplete = async (id, completed) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });

    // Actualiza el estado local
    setTasks(
      tasks.map((task) => (task._id === id ? { ...task, completed } : task))
    );
  };

  const [tasks, setTasks] = useState([]);

  // Cargar tareas al iniciar
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  // Agregar una nueva tarea (desde TaskForm)
  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  // Eliminar una tarea (opcional si quieres manejarlo desde App)
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div>
      <h1>Mi Lista de Tareas</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onDelete={handleDelete}
            onToggle={handleToggleComplete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;

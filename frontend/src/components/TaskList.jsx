import { useEffect, useState } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  // Cargar tareas desde el backend
  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  // Eliminar una tarea
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
    });

    // Filtra la tarea eliminada de la lista
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

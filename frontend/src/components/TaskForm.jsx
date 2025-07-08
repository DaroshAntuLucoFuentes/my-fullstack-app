import { useState } from 'react';
import taskform from '../taskform.css';

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();
      onTaskAdded(data); // avisar al padre
      setTitle('');
    } catch (err) {
      console.error('Error al crear tarea:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='hacedordetareas'
        type="text"
        placeholder="Escribe una tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default TaskForm;

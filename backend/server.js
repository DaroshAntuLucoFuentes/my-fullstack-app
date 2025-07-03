const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar:', err));

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ message: 'Hola desde el backend' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

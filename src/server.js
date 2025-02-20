const express = require('express');
const cors = require('cors');
const app = express();

// Habilitar CORS
app.use(cors({
  origin: 'http://localhost:4200' // Permitir solicitudes desde Angular
}));

// Rutas de tu API
app.get('/api/masa/usuario/:user', (req, res) => {
  // Tu lógica para manejar la solicitud
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
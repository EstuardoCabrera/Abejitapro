import express from 'express';
import cors from 'cors';
import sequelize from './src/db/config.js'; 
import usuarioRoutes from './src/routes/usuarios/usuarioRoutes.js'
import loginRoutes from './src/routes/usuarios/loginRoutes.js'
import emailRoutes from './src/controllers/usuarios/sendEmail.js'
import { apiArduinoAction } from './src/controllers/usuarios/usuarioController.js';
import datosRoutes from './src/routes/usuarios/datosRoutes.js'; 


const app = express();
app.use(cors("*"));
app.use(express.json());

// Usar las rutas

app.use('/api', usuarioRoutes);
app.use('/auth', loginRoutes);
app.use('/api', usuarioRoutes);

app.use('/api', datosRoutes);


app.post('/api/arduino', apiArduinoAction);

// Sincronizar los modelos con la base de datos
sequelize.sync({ force: false }) // Cambia a { force: true } para recrear las tablas en cada reinicio (¡Úsalo con precaución en producción!)
  .then(() => {
    console.log('Tablas sincronizadas con la base de datos');
    // Iniciar el servidor solo después de que las tablas estén sincronizadas
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar tablas:', error);
  });

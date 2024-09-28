// Code  for mongoose config in backend
// Filename - backend/index.js

// To connect with your mongoDB database
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/basicReactMongoDB'; // Definir mongoURI aquí
const connectToMongo = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Conexión exitosa a MongoDB');
    } catch (error) {
      console.error('Error al conectar a MongoDB:', error.message);
    }
  };

  connectToMongo();


// Schema for users of app
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

    resp.send("App is Working");
    // You can check backend is working or not by 
    // entering http://loacalhost:5000
    
    // If you see App is working means
    // backend working properly
});

app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(result); // Cambiar req.body a result
            console.log(result);
        } else {
            console.log("User already register");
        }
    } catch (e) {
        resp.send("Something Went Wrong");
    }
});

app.get("/users", async (req, resp) => {
    try {
        const users = await User.find(); // Obtener todos los usuarios
        resp.json(users); // Devolver la lista de usuarios
    } catch (error) {
        resp.status(500).send("Error al obtener usuarios");
    }
});

app.get("/user/:name", async (req, resp) => {
    try {
        const user = await User.findOne({ name: req.params.name }); // Buscar usuario por nombre
        if (user) {
            resp.json({ email: user.email }); // Devolver el correo electrónico
        } else {
            resp.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        resp.status(500).send("Error al buscar usuario");
    }
});

app.listen(5000);

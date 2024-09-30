import React, { useState } from "react";
import axios from "axios";
import styles from "../src/App.css";

const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [searchName, setSearchName] = useState(""); // Estado para el nombre de búsqueda
  const [foundEmail, setFoundEmail] = useState(""); // Estado para el correo encontrado

  const [respuestas, setRespuestas] = useState([]);
  const [combinacion, setCombinacion] = useState("");
  const [veredicto, setVeredicto] = useState("");
  const [searchCombinacion, setSearchCombinacion] = useState(""); // Estado para el nombre de búsqueda
  const [foundVeredicto, setFoundVeredicto] = useState(""); // Estado para el correo encontrado


  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = { name, email };
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        userData
      );
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const fetchRespuestas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/respuestas");
      setRespuestas(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const fetchEmailByName = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/${searchName}`
      );
      setFoundEmail(response.data.email); // Guardar el correo encontrado
    } catch (error) {
      console.error("Error al buscar usuario:", error);
      setFoundEmail(""); // Limpiar el correo si hay error
    }
  };

  const fetchVeredictoByCombinacion = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/respuesta/${searchCombinacion}`
      );
      setFoundVeredicto(response.data.veredicto); // Guardar el correo encontrado
    } catch (error) {
      console.error("Error al buscar usuario:", error);
      setFoundVeredicto(""); // Limpiar el correo si hay error
    }
  };

  return (
    <div>
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleRegister}>
        <input
          className={styles.input}
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
      {userInfo && (
        <label>
          Usuario Registrado: {userInfo.name} - {userInfo.email}
        </label>
      )}
      <button onClick={fetchUsers}>Consultar Usuarios</button>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      <button onClick={fetchRespuestas}>Consultar Veredictos</button>

      <ul>
        {respuestas.map((respuesta) => (
          <li key={respuesta._id}>
            {respuesta.combinacion} - {respuesta.veredicto}
          </li>
        ))}
      </ul>

      <h2>Buscar Correo por Nombre</h2>
      <input
        type="text"
        placeholder="Nombre a buscar"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <button onClick={fetchEmailByName}>Buscar Correo</button>
      {foundEmail && <p>Correo encontrado: {foundEmail}</p>}

      <h2>Buscar Veredicto por Combinación</h2>
      <input
        type="text"
        placeholder="Combinación"
        value={searchCombinacion}
        onChange={(e) => setSearchCombinacion(e.target.value)}
      />
      <button onClick={fetchVeredictoByCombinacion}>Buscar Combinación</button>
      {foundVeredicto && <p>Veredicto encontrado: {foundVeredicto}</p>}
    </div>
  );
};

export default App;

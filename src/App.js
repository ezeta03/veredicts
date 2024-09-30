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
  const [responses, setResponses] = useState(Array(7).fill("")); // Estado para las respuestas de las 7 preguntas
  const [respuestas, setRespuestas] = useState([]);
  const [combinacion, setCombinacion] = useState("");
  const [veredicto, setVeredicto] = useState("");
  const [searchCombinacion, setSearchCombinacion] = useState(""); // Estado para el nombre de búsqueda
  const [foundVeredicto, setFoundVeredicto] = useState(""); // Estado para el correo encontrado

  const questions = [
    {
      _id: "1",
      question: "¿Cuál es el propósito principal de nuestro sitio web?",
      options: [
        "Aumentar las ventas en línea",
        "Mejorar la visibilidad de la marca",
        "Proporcionar información y soporte a clientes",
        "Generar leads para nuestro equipo de ventas",
      ],
    },
    {
      _id: "2",
      question:
        "¿Qué aspecto es más crítico en la planificación de nuestro sitio web?",
      options: [
        "Definir el presupuesto y los recursos necesarios",
        "Establecer un cronograma realista",
        "Identificar las tecnologías adecuadas",
        "Crear un mapa del sitio detallado",
      ],
    },
    {
      _id: "3",
      question:
        "¿Cuál debería ser nuestra prioridad en el diseño del sitio web?",
      options: [
        "Un diseño visualmente atractivo",
        "Una navegación intuitiva y fácil de usar",
        "Optimización para dispositivos móviles",
        "Reflejar fielmente la identidad de marca",
      ],
    },
    {
      _id: "4",
      question: "¿Qué tipo de contenido debería ser nuestro enfoque principal?",
      options: [
        "Textos informativos y persuasivos",
        "Imágenes y gráficos de alta calidad",
        "Videos explicativos y testimoniales",
        "Contenido generado por usuarios (reseñas, comentarios)",
      ],
    },
    {
      _id: "5",
      question: "¿Cuál es el aspecto más importante en la fase de desarrollo?",
      options: [
        "Velocidad de carga del sitio",
        "Seguridad y protección de datos",
        "Integración con sistemas existentes (CRM, ERP)",
        "Facilidad de actualización y mantenimiento",
      ],
    },
    {
      _id: "6",
      question: "¿Qué deberíamos priorizar en la fase de pruebas?",
      options: [
        "Funcionamiento en diferentes navegadores y dispositivos",
        "Pruebas de seguridad y vulnerabilidades",
        "Experiencia del usuario y facilidad de navegación",
        "Rendimiento y tiempo de carga",
      ],
    },
    {
      _id: "7",
      question:
        "Después del lanzamiento, ¿cuál debería ser nuestra prioridad principal?",
      options: [
        "Monitoreo constante del rendimiento del sitio",
        "Actualizaciones regulares de contenido",
        "Optimización continua para motores de búsqueda (SEO)",
        "Recopilación y análisis de feedback de los usuarios",
      ],
    },
  ];

  //   const handleRegister = async (e) => {
  //     e.preventDefault();
  //     const userData = { name, email };
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:5000/register",
  //         userData
  //       );
  //       setUserInfo(response.data);
  //     } catch (error) {
  //       console.error("Error al registrar:", error);
  //     }
  //   };

  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/users");
  //       setUsers(response.data);
  //     } catch (error) {
  //       console.error("Error al obtener usuarios:", error);
  //     }
  //   };

  //   const fetchRespuestas = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/respuestas");
  //       setRespuestas(response.data);
  //     } catch (error) {
  //       console.error("Error al obtener usuarios:", error);
  //     }
  //   };

  //   const fetchEmailByName = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/user/${searchName}`
  //       );
  //       setFoundEmail(response.data.email); // Guardar el correo encontrado
  //     } catch (error) {
  //       console.error("Error al buscar usuario:", error);
  //       setFoundEmail(""); // Limpiar el correo si hay error
  //     }
  //   };

  //   const fetchVeredictoByCombinacion = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/respuesta/${searchCombinacion}`
  //       );
  //       setFoundVeredicto(response.data.veredicto); // Guardar el correo encontrado
  //     } catch (error) {
  //       console.error("Error al buscar usuario:", error);
  //       setFoundVeredicto(""); // Limpiar el correo si hay error
  //     }
  //   };

  const handleOptionChange = (questionIndex, option) => {
    const newResponses = [...responses];
    newResponses[questionIndex] = option; // Actualizar la respuesta para la pregunta correspondiente
    setResponses(newResponses);
  };

  const handleSubmit = async () => {
    // Validar que todas las preguntas tengan respuestas
    if (responses.includes("")) {
      setVeredicto("Por favor, responde todas las preguntas antes de enviar."); // Mensaje de error
      return; // No continuar si hay preguntas sin respuesta
    }

    const combinacion = responses.join(","); // Crear la combinación a partir de las respuestas
    try {
      const response = await axios.get(
        `http://localhost:5000/respuesta/${combinacion}`
      );
      if (response.data && response.data.veredicto) {
        setVeredicto(response.data.veredicto); // Guardar el veredicto encontrado
      } else {
        setVeredicto("No se encontró un veredicto para esta combinación."); // Mensaje si no hay veredicto
      }
    } catch (error) {
      console.error("Error al buscar veredicto:", error);
      setVeredicto("Error al buscar veredicto."); // Mensaje de error
    }
  };

  return (
    <div className={styles.escena}>
      <h2 className={styles.h2}>Encuesta</h2>
      {questions.map((question, index) => (
        <div key={question._id} className={styles.question}>
          <h4>{question.question}</h4>
          {question.options.map((option, optionIndex) => (
            <label key={optionIndex}>
              <input
                className={styles.input}
                type="radio"
                name={`question${index}`}
                value={option} // Asignar el valor de la opción
                checked={responses[index] === optionIndex}
                onChange={() => handleOptionChange(index, optionIndex)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className={styles.nextButton}>
        Enviar Encuesta
      </button>
      {veredicto && <h3>Veredicto: {veredicto}</h3>}{" "}
      {/* Mostrar el veredicto */}
    </div>
  );
};

export default App;

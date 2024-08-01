import "./style.css";
import Login from './src/pages/Login/Login';
import { EventPage } from './src/pages/eventPage/eventPage';
import EventList from "./src/pages/eventsList/eventList";

Login();

// -->>> LLAMADAS A LA BBDD <<<--

//consulta a la bbdd para obtener los eventos disponibles
const fetchEvents = async () => {
  try {
      const res = await fetch('http://localhost:3000/events/events');
      if (!res.ok) {
          throw new Error('Error al obtener los eventos');
      }
      const eventos = await res.json();
      return eventos;
  } catch (error) {
      console.error('Error al obtener los eventos:', error);
      return [];
  }
};

//obtiene el listado de eventos disponibles
window.handleListEvents = async () => {
      const eventos = await fetchEvents();
      EventList(eventos);
};

//Solicitamos la info de un evento con determinado id
const fetchEventDetails = async (eventId) => {
    try {
        const res = await fetch(`http://localhost:3000/events/${eventId}`);
        if (!res.ok) {
            throw new Error('Error al obtener los detalles del evento');
        }
        return await res.json();
    } catch (error) {
        console.error('Error al obtener los detalles del evento:', error);
        return null;
    }
};

//obtiene los detalles del evento con ID x y llama a eventPage pasandole la info de este evento
window.handleViewEvent = async (eventId) => {
    const event = await fetchEventDetails(eventId);
    if (event) {
        EventPage(event); //ejecutamos la función para pintar la página con la info del evento proporcionado
        
      const btnVolver = `<button class="btn btn-header" onclick="handleListEvents();">Volver</button>`;
      const header = document.querySelector('.header-btns');
      // Insertar el botón en el header
      header.innerHTML += btnVolver;

    } else {
        console.error('Error al cargar los detalles del evento');
    }
};

//confirmar asistencia a un evento con determinado id
const fetchConfirmarAsistencia = async (eventId) => {
  const token = localStorage.getItem('token'); // Recupera el token de localStorage
  const errorMessage = document.querySelector('#error-message');

  if (!token) {
    console.error('No se encontró el token de autenticación.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/events/${eventId}/confirmarAsistencia`, {
      method: 'POST',
      body: JSON.stringify({ eventId }),
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}` // Incluye el token
      }
    });

    if (!response.ok) {
      throw new Error(`Error al confirmar asistencia: ${response.statusText}`);
    }

    const data = await response.json();
    errorMessage.textContent= 'Se ha confirmado tu asistencia al evento.';

    return data;

  } catch (error) {
    console.error('Error:', error);
  }
}

window.handleConfirmarAsistencia = async (eventId) => {
  await fetchConfirmarAsistencia(eventId);
};

// muestro los asistentes a un evento con determinado id
const fetchVerAsistentes = async (eventId) => {
  const token = localStorage.getItem('token'); // Recupera el token de localStorage

  const divAsistentes = document.querySelector('.asistentes');
  const errorMessage = document.querySelector('#error-message');

  if (!token) {
    console.error('No se encontró el token de autenticación.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/events/${eventId}/asistentes`, {
      method: 'GET',
      // body: JSON.stringify({ eventId }),
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}` // Incluye el token
      }
    });

    if (!response.ok) {
      throw new Error(`Error al consultar los asistentes a este evento: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0) {

      divAsistentes.innerHTML = `
        <h3>Estos son los asistentes al evento:</h3>
        <ul>
          ${data.map(a => `<li><strong>Usuario:</strong> ${a.userName} - ${a.email}</li>`).join('\n')}
        </ul>
      `;

    } else {
      errorMessage.textContent= 'No hay asistentes al evento.';
    }
    // return data;
    return;

  } catch (error) {
    console.error('Error:', error);
  }
}

window.handleVerAsistentes = async (eventId) => {
  await fetchVerAsistentes(eventId);
};
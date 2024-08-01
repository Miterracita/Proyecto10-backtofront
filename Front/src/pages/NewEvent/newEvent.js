import "./newEvent.css";
import EventList from "../eventsList/eventList";

export const NewEvent = () => {

    //Seleccionamos la etiqueta body de la página y le agregamos la clase
    const newEventBody = document.querySelector('body');
    newEventBody.className = '';
    newEventBody.classList.add('body-newEvent');

    //Creamos el contenido html de la página y lo insertamos en el main
    const mainNewEvent = document.querySelector('main');
    const newEventHtml = `
        <section class="main-newEvent">
            <h1 class="new-event">New Event</h1>
            <h2 class="new-event">2024</h2>
            <h2 class="new-event">Summer Events</h2>
            <div id="error-message"></div>
            <div class="box-newEvent">
                <form id="newEventForm">
                    <div class="box-form-newEvent">
                        <div class="line-flex">
                            <label>Nombre: </label>
                            <input type="text" name="event-name" id="event-name">
                        </div>
                        <div class="line-flex">
                            <label>Descripción: </label>
                            <textarea name="textarea" rows="10" cols="50" name="description" id="description">Descripción del evento</textarea>
                        </div>
                        <div class="line-flex">
                            <label>Fecha: </label>
                            <input type="date" id="date" name="trip-start" value="2024-06-01" min="2024-06-01" max="2024-12-01" />

                            <label class="m-l-20">Hora: </label>
                            <input type="time" id="time" name="time" min="19:00" max="05:00" required />
                        </div>
                        <div class="line-flex">
                            <label>Localización: </label>
                            <input type="text" id="location" name="location" value="location">
                        </div>
                    </div>

                    <button type="submit" class="btn" id="btn-event-save">Guardar</button>
                </form>

            </div>
        </section>
    `;

    mainNewEvent.innerHTML = newEventHtml;

    // Asume que el token está almacenado en localStorage
    const token = localStorage.getItem('token');

    

    // Creamos un nuevo evento en la bbdd
    const newEventForm = document.querySelector('#newEventForm');

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

    const submitNewEvent = async (name, date, time, location, description) => {

        const objetoNewEvent = JSON.stringify({
            name,
            date,
            time,
            location,
            description
        });

        const opciones = {
            method: "POST",
            body: objetoNewEvent,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Incluye el token aquí
            }
        }

        try {
            const res = await fetch('http://localhost:3000/events/nuevoEvento', opciones);

            if (!res.ok) {
                console.error("Error en la respuesta del servidor:", res.statusText);
                return;
            }

            const errorMessage = document.querySelector('#error-message');

            //si el evento se ha creado correctamente
            const respuestaFinal = await res.json();
            console.log("Respuesta del servidor:", respuestaFinal);

            errorMessage.textContent= 'El evento se ha creado correctamente.';

            const eventos = await fetchEvents();
            // Esperar 8 segundos antes de volver a la página de login
            setTimeout(() => {
                EventList(eventos);
            }, 8000);
            

        } catch (error){
            console.error('Error en la solicitud:', error);
        }
    }

    newEventForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.querySelector('#event-name').value;
        const description = document.querySelector('#description').value;
        const date = document.querySelector('#date').value;
        const time = document.querySelector('#time').value;
        const location = document.querySelector('#location').value;

        console.log('Name:', name);
        console.log('Description:', description);
        console.log('Date:', date);
        console.log('Time:', time);
        console.log('Location:', location);

        submitNewEvent(name, date, time, location, description);
    });

}

export default NewEvent;

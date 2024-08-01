import "./eventPage.css";

export const EventPage = (event) => {

  //Seleccionamos la etiqueta body de la página y le agregamos la clase
  const bodyEventPage = document.querySelector('body');
  bodyEventPage.className = '';
  bodyEventPage.classList.add('body-eventPage');

  const mainEventPage = document.querySelector('main');

  //generamos el html de la página del evento
  const eventPageHtml = `
        <div class="eventPage-box-page">
            <div class="eventPage-img"><img src="${event.img}" /></div>
            <div class="eventPage-info">              
                <h2 class="eventPage-name">${event.name}</h2>
                <div id="error-message"></div>
                <p class="eventPage-location">${event.location}</p>
                <p class="eventPage-description">${event.description}</p> 
                <p class="eventPage-date"><span>Date:</span> ${event.date}</p>
                <p class="eventPage-hour"><span>Hour:</span> ${event.hour}</p>
                <p class="eventPage-hour"><span>Id:</span> ${event._id}</p>
                <div class="asistentes"></div>             
            </div>
            <div class="eventPage-buttons">
                <button class="btn" onclick="handleVerAsistentes('${event._id}')">Ver Asistentes</button>
                <button class="btn" onclick="handleConfirmarAsistencia('${event._id}')">Confirmar Asistencia</button>
            </div>
        </div>
    `;
    mainEventPage.innerHTML = eventPageHtml;
};

export default EventPage;

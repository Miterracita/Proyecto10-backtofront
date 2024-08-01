import "./event.css"

export const EventBox = (event) => {
    
    //contenido de cada elemento event del listado eventlist
    return `
        <div class="event-box">
            <div class="event-img"><img src="${event.img}" /></div>
            <div class="event-info">              
                <h2 class="event-name">${event.name}</h2>
                <div id="error-message"></div>
                <p class="event-location">${event.location}</p>
                <p class="event-description">${event.description}</p> 
                <p class="event-date"><span>Date:</span> ${event.date}</p>
                <p class="event-hour"><span>Hour:</span> ${event.hour}</p>
                <p class="event-hour"><span>Id:</span> ${event._id}</p>                
            </div>
            <div class="event-buttons">
                <button class="btn" onclick="handleViewEvent('${event._id}')">Ver Evento</button>
                <button class="btn" onclick="handleConfirmarAsistencia('${event._id}')">Confirmar Asistencia</button>
            </div>
        </div>
    `;

};

export default EventBox;
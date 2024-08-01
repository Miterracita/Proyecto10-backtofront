import "./header.css";
import NewEvent from '../../pages/NewEvent/newEvent';

export const Header = () => {
    
    //Seleccionamos la etiqueta body de la página y le agregamos la clase
    const header = document.querySelector('header');
    header.innerHTML = `
        <div class="header-btns">
            <button type="submit" class="btn btn-header" id="new-event-link">Crear nuevo evento</button>
        </div>
    `;

    // Añadimos los event listeners para los enlaces
    const newEventLink = document.querySelector('#new-event-link');

    newEventLink.addEventListener('click', (event) => {
        event.preventDefault();
        NewEvent();
        const btnVolver = `<button class="btn btn-header" onclick="handleListEvents();">Volver</button>`;
        const header = document.querySelector('.header-btns');
        // Insertar el botón en el header
        header.innerHTML += btnVolver;
    });
};

export default Header;

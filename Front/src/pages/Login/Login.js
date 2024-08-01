import "./Login.css";
import NewUser from '../NewUser/newUser';
import EventList from "../eventsList/eventList";


//Generamos el HTML de la página de login
const renderLoginHtml = () => {
    //Seleccionamos la etiqueta body de la página y le agregamos la clase
    const bodyLogin = document.querySelector('body');
    bodyLogin.classList.add('body-login');

    const mainLogin = document.querySelector('main');

    //creamos el contenido del main
    const mainLoginHtml = `
        <section id="main-login">
            <h1>Summer Events</h1>
            <h2>2024</h2>
            <div id="error-message"></div>
            <div class="box-login">
                <form id="loginForm">
                    <div class="box-form">
                        <div>
                            <label for="username">UserName: </label>
                            <input type="text" name="username" id="username" autocomplete="username">
                        </div>
                        <div>
                            <label for="password">Password: </label>
                            <input type="password" name="password" id="password" autocomplete="current-password">
                        </div>
                    </div>
                    <button type="submit" class="btn" id="btn-enviar">Enviar</button>
                </form>

                <div class="box-info">
                    <p class="txt">Si no recuerdas tu userName o password - Recordar</p>
                    <p class="txt">Si no estás registrado <a href="#" id="register-link">Regístrate</a></p>
                </div>
            </div>
        </section>
    `;

    //agregamos el main al body de la página
    mainLogin.innerHTML = mainLoginHtml;

    //redirigimos a la página de nuevo usuario / registro
    const registerLink = document.querySelector('#register-link');
    registerLink.addEventListener('click', (event) => {
        event.preventDefault();
        NewUser();
    });

}

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


export const Login = () =>{
    renderLoginHtml();

    const loginForm = document.querySelector('#loginForm');
    const userName = document.querySelector('#username');
    const password = document.querySelector('#password');
    const errorMessage = document.querySelector('#error-message');
    
    const submit = async (userName, password) => {
        
        // al fetch necesita que le pasemos además de la ruta
        // el metodo POST, un JSON con el userName y el password 
        // e indicarle a la petición qué tipo de contenido está utilizando mediante los headers

        const objetoFinal = JSON.stringify({
            userName,
            password,
        });

        const opciones = {
            method: "POST",
            body: objetoFinal,
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            //ruta a la que queremos realizar la petición
            const res = await fetch('http://localhost:3000/users/login', opciones);
            
            if (res.status === 400) {
                errorMessage.textContent= "Usuario o contraseña incorrectos";
                return;
            }
            //eliminamos el mensaje de error
            if (errorMessage) {
                errorMessage.remove();
            }

            const respuestaFinal = await res.json();
            console.log("Respuesta del servidor:", respuestaFinal);

            if (respuestaFinal.token) {
                // guardamos el token una vez identificados, en el localStorage
                localStorage.setItem("token", respuestaFinal.token);

                //--> una vez identificados correctamente nos redirige a la página de eventos <--
                const eventos = await fetchEvents();
                EventList(eventos);

            } else {
                console.error('El token no está definido en la respuesta:', respuestaFinal);
                errorMessage.textContent = "Error al iniciar sesión. Por favor, inténtalo de nuevo.";
            }
        } catch (error) {
            console.error('Error en la petición:', error);
            errorMessage.textContent = "Error en la conexión. Por favor, inténtalo de nuevo.";
        }
    }
    
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        submit(userName.value, password.value);
    });

}


export default Login;
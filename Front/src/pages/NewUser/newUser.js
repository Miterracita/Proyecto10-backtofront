import "./newUser.css";
import Login from '../Login/Login';

export const NewUser = () => {

    //Seleccionamos la etiqueta body de la página y le agregamos la clase
    const bodyRegister = document.querySelector('body');
    bodyRegister.className = '';
    bodyRegister.classList.add('body-newRegister');

    const mainRegister = document.querySelector('main');

    //creamos el contenido del main
    const mainRegisterHtml = `
        <section class="main-newRegister">
            <h1 class="register">New User</h1>
            <h2 class="register">2024</h2>
            <h2 class="register">Summer Events</h2>
            <div id="error-message"></div>
            <div class="box-newRegister">
                <form id="newRegisterForm">
                    <div class="box-form">
                        <div>
                            <label for="userName">UserName: </label>
                            <input type="text" name="username" id="username" >
                        </div>
                        <div>
                            <label for="password">Pasword: </label>
                            <input type="password" id="password" name="password" minlength="8" required />
                        </div>
                        <div>
                            <label for="email">Email: </label>
                            <input type="email" id="email" name="email" size="30" required />
                        </div>
                    </div>
                    <button type="submit" class="btn" id="btn-save-user">Guardar</button>
                </form>
            </div>
        </section>
    `;

    //agregamos el main al body de la página
    mainRegister.innerHTML = mainRegisterHtml;

    //MANEJAMOS LA SOLICITUD DE NUEVO REGISTRO
    
    const newRegisterForm = document.querySelector('#newRegisterForm');
    const errorMessage = document.querySelector('#error-message');

    const submitNewRegister = async (userName, password, email) => {

        const objetoNewRegister = JSON.stringify({
            userName,
            password,
            email
        });

        const opciones = {
            method: "POST",
            body: objetoNewRegister,
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        try {
            const res = await fetch('http://localhost:3000/users/registro', opciones);

            if (!res.ok) {
                if (res.status === 400) { //usuario ya existe
                    errorMessage.textContent= 'El nombre de usuario ya existe. Por favor, elija otro.';
                } else {
                    console.error("Error en la respuesta del servidor:", res.statusText);
                }
                return;
            }

            //eliminamos el mensaje de error
            if (errorMessage) {
                errorMessage.textContent='';
            }

            //si el usuario se ha creado correctamente
            const respuestaFinal = await res.json();
            console.log("Respuesta del servidor:", respuestaFinal);

            errorMessage.textContent= 'Usuario creado correctamente.';

            // Esperar 8 segundos antes de volver a la página de login
            setTimeout(() => {
                Login();
            }, 8000);

        } catch (error){
            console.error('Error en la solicitud:', error);
            errorMessage.textContent = 'Error en la solicitud. Inténtalo de nuevo más tarde.';
        }
    }

    newRegisterForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const userName = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const email = document.querySelector('#email').value;

        console.log('Username:', userName);
        console.log('Password:', password);
        console.log('Email:', email);

        submitNewRegister(userName, password, email);
    });
}

export default NewUser;
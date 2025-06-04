document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.start-button');
    const initialScreen = document.querySelector('.initial-screen');
    const loginScreen = document.querySelector('.login-screen');
    const loginContainer = document.querySelector('.login-container');
    const circleTransition = document.querySelector('.circle-transition');
    const loginForm = document.querySelector('form');

    // Usuario de ejemplo
    const usuarioEjemplo = {
        cedula: '1234',
        password: 'admin123'
    };

    // Mostrar el botón de inicio después de 3 segundos
    setTimeout(() => {
        startButton.classList.add('visible');
    }, 3000);

    // Manejar el clic en el botón de inicio
    startButton.addEventListener('click', (e) => {
        // Obtener la posición del clic
        const rect = startButton.getBoundingClientRect();
        const clickX = rect.left + rect.width / 2;
        const clickY = rect.top + rect.height / 2;

        // Posicionar el círculo en el punto de clic
        circleTransition.style.top = `${clickY}px`;
        circleTransition.style.left = `${clickX}px`;

        // Iniciar la animación
        initialScreen.classList.add('fade-out');
        circleTransition.classList.add('active');
        
        setTimeout(() => {
            loginScreen.style.display = 'block';
            
            setTimeout(() => {
                loginScreen.classList.add('visible');
                loginContainer.classList.add('visible');
            }, 500);
        }, 500);
    });

    // Manejar el envío del formulario de login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const cedula = document.getElementById('cedula').value;
        const password = document.getElementById('password').value;

        // Validar credenciales
        if (cedula === usuarioEjemplo.cedula && password === usuarioEjemplo.password) {
            // Guardar datos de sesión
            const userSession = {
                cedula: cedula,
                nombre: 'Administrador',
                rol: 'admin',
                fechaLogin: new Date().toISOString()
            };
            localStorage.setItem('userSession', JSON.stringify(userSession));

            // Redirigir al dashboard
            window.location.href = '/index.html';
        } else {
            alert('Credenciales incorrectas. Por favor, intente nuevamente.');
        }
    });
});
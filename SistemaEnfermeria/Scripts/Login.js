document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.start-button');
    const initialScreen = document.querySelector('.initial-screen');
    const loginScreen = document.querySelector('.login-screen');
    const loginContainer = document.querySelector('.login-container');
    const circleTransition = document.querySelector('.circle-transition');
    const loginForm = document.querySelector('form');

    // Mostrar el botón de inicio después de 3 segundos
    setTimeout(() => {
        startButton.classList.add('visible');
    }, 3000);

    // Manejar el clic en el botón de inicio
    startButton.addEventListener('click', (e) => {
        const rect = startButton.getBoundingClientRect();
        const clickX = rect.left + rect.width / 2;
        const clickY = rect.top + rect.height / 2;

        circleTransition.style.top = `${clickY}px`;
        circleTransition.style.left = `${clickX}px`;

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
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(loginForm);

        try {
            const response = await fetch('../Controllers/AuthController.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('userSession', JSON.stringify(data.usuario));
                window.location.href = '../index.php';
            } else {
                alert('❌ Credenciales incorrectas.');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('❌ Error de conexión con el servidor.');
        }
    });
});

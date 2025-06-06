<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../Images/LogoSoloOlivia.png">
    
    <title>Login Olivia</title>
    <link rel="stylesheet" href="../Styles/Login.css">
</head>
<body>
    <div class="initial-screen">
        <div class="button-container">
            <button class="start-button">INICIAR</button>
        </div>
    </div>

    <div class="circle-transition"></div>

    <div class="login-screen">
        <video class="video-background" autoplay muted loop>
            <source src="../Images/VideoFondo.mp4" type="video/mp4">
        </video>
        
        <div class="login-container">
            <h2 style="text-align: center; color: #0077be; margin-bottom: 2rem;">Iniciar Sesión</h2>
            <form method="POST" action="">
                <div class="form-group">
                    <label for="correo">Correo</label>
                    <input type="email" id="correo" name="correo" required>
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="submit-btn">ENTRAR</button>
            </form>
        </div>
    </div>

    <script src="../Scripts/Login.js"></script>
</body>
</html>
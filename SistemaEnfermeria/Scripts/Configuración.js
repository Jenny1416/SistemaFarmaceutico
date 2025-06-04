// filepath: vsls:/Scripts/Configuración.js

// Variables globales
let configuracionActual = {
    general: {
        nombreFarmacia: '',
        direccion: '',
        telefono: '',
        email: '',
        zonaHoraria: 'America/Guayaquil'
    },
    notificaciones: {
        stockBajo: true,
        productosVencer: true,
        ventas: false,
        diasAnticipacion: 30
    },
    apariencia: {
        tema: 'light',
        colorPrincipal: '#4ADE80',
        fuente: 'Arial',
        tamanoFuente: 'medium'
    },
    baseDatos: {
        ultimaOptimizacion: new Date(),
        espacioUtilizado: 650,
        espacioTotal: 1000
    },
    backup: {
        ultimoBackup: new Date(),
        frecuencia: 'daily',
        historial: []
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Cargar configuración guardada
    cargarConfiguracion();
    
    // Event listeners para el panel de configuración
    const configBtn = document.querySelector('.menu-item:has(i.fas.fa-cog)');
    const configModal = document.getElementById('configuracionModal');
    const closeConfigBtn = document.getElementById('closeConfiguracionBtn');
    const cancelarConfigBtn = document.getElementById('cancelarConfiguracionBtn');
    const guardarConfigBtn = document.getElementById('guardarConfiguracionBtn');
    
    // Mostrar panel de configuración
    if (configBtn && configModal) {
        configBtn.addEventListener('click', (e) => {
            e.preventDefault();
            configModal.style.display = 'flex';
            actualizarInterfaz();
        });
    }
    
    // Cerrar panel
    if (closeConfigBtn && configModal) {
        closeConfigBtn.addEventListener('click', () => {
            configModal.style.display = 'none';
        });
    }
    
    if (cancelarConfigBtn && configModal) {
        cancelarConfigBtn.addEventListener('click', () => {
            configModal.style.display = 'none';
        });
    }
    
    // Guardar cambios
    if (guardarConfigBtn) {
        guardarConfigBtn.addEventListener('click', () => {
            guardarConfiguracion();
            mostrarProcesoModal('exito', 'Configuración guardada exitosamente');
            configModal.style.display = 'none';
        });
    }
    
    // Navegación entre secciones
    const navButtons = document.querySelectorAll('.config-nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            navButtons.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            btn.classList.add('active');
            
            // Ocultar todas las secciones
            document.querySelectorAll('.config-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Mostrar la sección correspondiente
            const sectionId = btn.getAttribute('data-section');
            const section = document.getElementById(`section-${sectionId}`);
            if (section) {
                section.classList.add('active');
            }
        });
    });
    
    // Event listeners para cambios en la configuración
    setupConfigListeners();
});

// Función para cargar la configuración guardada
function cargarConfiguracion() {
    const savedConfig = localStorage.getItem('configuracion');
    if (savedConfig) {
        configuracionActual = JSON.parse(savedConfig);
    }
}

// Función para guardar la configuración
function guardarConfiguracion() {
    // Recopilar valores actuales
    configuracionActual.general = {
        nombreFarmacia: document.getElementById('nombreFarmacia').value,
        direccion: document.getElementById('direccionFarmacia').value,
        telefono: document.getElementById('telefonoFarmacia').value,
        email: document.getElementById('emailFarmacia').value,
        zonaHoraria: document.getElementById('zonaHoraria').value
    };
    
    configuracionActual.notificaciones = {
        stockBajo: document.getElementById('notifStock').checked,
        productosVencer: document.getElementById('notifVencimiento').checked,
        ventas: document.getElementById('notifVentas').checked,
        diasAnticipacion: parseInt(document.getElementById('diasAnticipacion').value)
    };
    
    configuracionActual.apariencia = {
        tema: document.getElementById('temaPrincipal').value,
        colorPrincipal: document.getElementById('colorPrincipal').value,
        fuente: document.getElementById('fuentePrincipal').value,
        tamanoFuente: document.getElementById('tamanoFuente').value
    };
    
    // Guardar en localStorage
    localStorage.setItem('configuracion', JSON.stringify(configuracionActual));
    
    // Aplicar cambios inmediatos
    aplicarConfiguracion();
}

// Función para actualizar la interfaz con los valores actuales
function actualizarInterfaz() {
    // General
    document.getElementById('nombreFarmacia').value = configuracionActual.general.nombreFarmacia;
    document.getElementById('direccionFarmacia').value = configuracionActual.general.direccion;
    document.getElementById('telefonoFarmacia').value = configuracionActual.general.telefono;
    document.getElementById('emailFarmacia').value = configuracionActual.general.email;
    document.getElementById('zonaHoraria').value = configuracionActual.general.zonaHoraria;
    
    // Notificaciones
    document.getElementById('notifStock').checked = configuracionActual.notificaciones.stockBajo;
    document.getElementById('notifVencimiento').checked = configuracionActual.notificaciones.productosVencer;
    document.getElementById('notifVentas').checked = configuracionActual.notificaciones.ventas;
    document.getElementById('diasAnticipacion').value = configuracionActual.notificaciones.diasAnticipacion;
    
    // Apariencia
    document.getElementById('temaPrincipal').value = configuracionActual.apariencia.tema;
    document.getElementById('colorPrincipal').value = configuracionActual.apariencia.colorPrincipal;
    document.getElementById('fuentePrincipal').value = configuracionActual.apariencia.fuente;
    document.getElementById('tamanoFuente').value = configuracionActual.apariencia.tamanoFuente;
    
    // Actualizar barra de almacenamiento
    const porcentaje = (configuracionActual.baseDatos.espacioUtilizado / configuracionActual.baseDatos.espacioTotal) * 100;
    document.querySelector('.storage-progress').style.width = `${porcentaje}%`;
    document.querySelector('.storage-bar span').textContent = 
        `${porcentaje.toFixed(0)}% (${configuracionActual.baseDatos.espacioUtilizado}MB/${configuracionActual.baseDatos.espacioTotal}MB)`;
}

// Función para aplicar la configuración al sistema
function aplicarConfiguracion() {
    // Aplicar tema
    document.documentElement.setAttribute('data-theme', configuracionActual.apariencia.tema);
    
    // Aplicar color principal
    document.documentElement.style.setProperty('--primary-color', configuracionActual.apariencia.colorPrincipal);
    
    // Aplicar fuente
    document.body.style.fontFamily = configuracionActual.apariencia.fuente;
    
    // Aplicar tamaño de fuente
    const tamanoFuente = {
        small: '14px',
        medium: '16px',
        large: '18px'
    };
    document.body.style.fontSize = tamanoFuente[configuracionActual.apariencia.tamanoFuente];
}

// Función para configurar los event listeners de la configuración
function setupConfigListeners() {
    // Cambios en apariencia
    document.getElementById('temaPrincipal').addEventListener('change', function() {
        document.documentElement.setAttribute('data-theme', this.value);
    });
    
    document.getElementById('colorPrincipal').addEventListener('change', function() {
        document.documentElement.style.setProperty('--primary-color', this.value);
    });
    
    document.getElementById('fuentePrincipal').addEventListener('change', function() {
        document.body.style.fontFamily = this.value;
    });
    
    document.getElementById('tamanoFuente').addEventListener('change', function() {
        const tamanoFuente = {
            small: '14px',
            medium: '16px',
            large: '18px'
        };
        document.body.style.fontSize = tamanoFuente[this.value];
    });
    
    // Optimización de base de datos
    document.querySelector('.optimize-btn').addEventListener('click', function() {
        mostrarProcesoModal('exito', 'Base de datos optimizada exitosamente');
        configuracionActual.baseDatos.ultimaOptimizacion = new Date();
        actualizarInterfaz();
    });
    
    // Backup
    document.querySelector('.backup-btn').addEventListener('click', function() {
        mostrarProcesoModal('exito', 'Respaldo creado exitosamente');
        configuracionActual.backup.ultimoBackup = new Date();
        configuracionActual.backup.historial.unshift({
            id: configuracionActual.backup.historial.length + 1,
            fecha: new Date(),
            tamaño: '150MB'
        });
        actualizarInterfaz();
    });
    
    // Restaurar backup
    document.querySelectorAll('.restore-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('¿Está seguro de restaurar este respaldo? Se perderán los datos actuales.')) {
                mostrarProcesoModal('exito', 'Respaldo restaurado exitosamente');
            }
        });
    });
    
    // Vaciar base de datos
    document.querySelector('.danger-btn').addEventListener('click', function() {
        if (confirm('¿Está seguro de vaciar la base de datos? Esta acción no se puede deshacer.')) {
            mostrarProcesoModal('exito', 'Base de datos vaciada exitosamente');
        }
    });
    
    // Contactar soporte
    document.querySelector('.contact-btn').addEventListener('click', function() {
        window.open('mailto:soporte@farmacia.com', '_blank');
    });
    
    // Búsqueda de ayuda
    document.querySelector('.search-help input').addEventListener('input', function() {
        // Implementar búsqueda en la ayuda
        console.log('Buscando:', this.value);
    });
}

// Scripts/Estadistica.js

// Variables globales para almacenar las instancias de los gráficos
let graficaProductosChart = null;
let graficaVentasChart = null;
let ventasPorPeriodoChart = null;
let ventasPorCategoriaChart = null;
let analisisVentasDetalladoChart = null;
let productosMasVendidosChart = null;
let categoriasMasVendidasChart = null;
let tendenciaProductosVendidosChart = null;
let clientesActivosChart = null;
let ticketPromedioClienteChart = null;
let analisisClientesChart = null;

// Función para destruir un gráfico si existe
function destroyChart(chart) {
    if (chart) {
        chart.destroy();
    }
}

// Función para mostrar el panel de estadísticas
function abrirEstadisticas() {
    document.getElementById('estadisticasModal').style.display = 'flex';
    cargarResumen();
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Configurar el botón de cerrar
    const closeBtn = document.getElementById('closeEstadisticasBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.getElementById('estadisticasModal').style.display = 'none';
        });
    }

    // Configurar las pestañas
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabSections = document.querySelectorAll('.tab-section');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            tabButtons.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');

            // Ocultar todas las secciones
            tabSections.forEach(sec => sec.classList.remove('active'));
            
            // Mostrar la sección correspondiente
            const tabId = 'tab-' + this.dataset.tab;
            const tabSection = document.getElementById(tabId);
            if (tabSection) {
                tabSection.classList.add('active');
            }

            // Cargar contenido según la pestaña
            switch(this.dataset.tab) {
                case 'resumen':
                    cargarResumen();
                    break;
                case 'ventas':
                    cargarVentas();
                    break;
                case 'productos':
                    cargarProductos();
                    break;
                case 'clientes':
                    cargarClientes();
                    break;
            }
        });
    });

    // Configurar el botón de estadísticas en el menú
    const btnEstadisticas = document.getElementById('btnEstadisticas');
    if (btnEstadisticas) {
        btnEstadisticas.addEventListener('click', function(e) {
            e.preventDefault();
            abrirEstadisticas();
        });
    }

    // Abrir modal
    document.getElementById('exportarBtn').addEventListener('click', function() {
        document.getElementById('exportModal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Cerrar modal
    document.getElementById('closeExportModal').addEventListener('click', function() {
        document.getElementById('exportModal').style.display = 'none';
        document.body.style.overflow = '';
    });

    // Selección de formato
    document.querySelectorAll('.export-format-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.export-format-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Mostrar fechas personalizadas si elige "otro"
    document.getElementById('tipoReporte').addEventListener('change', function() {
        if (this.value === 'otro') {
            document.getElementById('fechasPersonalizadas').style.display = 'block';
        } else {
            document.getElementById('fechasPersonalizadas').style.display = 'none';
        }
    });

    // Confirmar exportación (simulación)
    document.getElementById('confirmarExportacion').addEventListener('click', function() {
        const formato = document.querySelector('.export-format-btn.selected')?.dataset.format;
        const tipo = document.getElementById('tipoReporte').value;
        const entidad = document.getElementById('entidadExportar').value;
        let fechas = '';
        if (tipo === 'otro') {
            fechas = ` del ${document.getElementById('fechaInicio').value} al ${document.getElementById('fechaFin').value}`;
        }
        if (!formato) {
            alert('Por favor selecciona un formato de exportación.');
            return;
        }
        mostrarProcesoModal("exito", `¡${entidad.charAt(0).toUpperCase() + entidad.slice(1)} exportado correctamente!`);
        document.getElementById('exportModal').style.display = 'none';
        document.body.style.overflow = '';
    });
});

// Ejemplo de función para cargar el contenido de "Resumen"
function cargarResumen() {
    document.getElementById('tab-resumen').innerHTML = `
        <div class="stats-cards">
            <div class="stats-card">
                <h3>Ventas Totales</h3>
                <h2>$24,565</h2>
                <div class="stat-change">+15% desde el periodo anterior</div>
            </div>
            <div class="stats-card">
                <h3>Clientes Activos</h3>
                <h2>340</h2>
                <div class="stat-change">+8% desde el periodo anterior</div>
            </div>
            <div class="stats-card">
                <h3>Productos Vendidos</h3>
                <h2>1,245</h2>
                <div class="stat-change">+12% desde el periodo anterior</div>
            </div>
            <div class="stats-card">
                <h3>Ticket Promedio</h3>
                <h2>$72.25</h2>
                <div class="stat-change">+5% desde el periodo anterior</div>
            </div>
        </div>
        <div class="graficas-resumen-row">
            <div class="grafica-box grafica-linea">
                <canvas id="graficaVentas"></canvas>
            </div>
            <div class="grafica-box grafica-pastel">
                <canvas id="graficaProductos"></canvas>
                <div id="leyendaPastel" class="leyenda-pastel"></div>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        // Destruir gráficos existentes
        destroyChart(graficaProductosChart);
        destroyChart(graficaVentasChart);

        // Crear nuevo gráfico de productos
        graficaProductosChart = new Chart(document.getElementById('graficaProductos').getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Paracetamol', 'Ibuprofeno', 'Amoxicilina', 'Loratadina', 'Omeprazol'],
                datasets: [{
                    data: [30, 23, 18, 15, 14],
                    backgroundColor: ['#38bdf8', '#34d399', '#fbbf24', '#f87171', '#a78bfa']
                }]
            },
            options: {
                responsive: true,
                animation: { duration: 1200, easing: 'easeOutQuart' },
                plugins: { legend: { display: false } }
            }
        });

        // Crear nuevo gráfico de ventas
        graficaVentasChart = new Chart(document.getElementById('graficaVentas').getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Ventas ($)',
                    data: [3200, 4500, 3000, 2100, 3400, 4100, 3900, 4200, 4800, 5100, 5300, 6000],
                    borderColor: '#22d3ee',
                    backgroundColor: 'rgba(34,211,238,0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: '#22d3ee'
                }]
            },
            options: {
                responsive: true,
                animation: { duration: 1200, easing: 'easeOutQuart' },
                plugins: { legend: { display: false } }
            }
        });

        // Actualizar leyenda
        const leyenda = document.getElementById('leyendaPastel');
        const labels = ['Paracetamol', 'Ibuprofeno', 'Amoxicilina', 'Loratadina', 'Omeprazol'];
        const colors = ['#38bdf8', '#34d399', '#fbbf24', '#f87171', '#a78bfa'];
        leyenda.innerHTML = labels.map((l, i) => 
            `<span style="display:inline-flex;align-items:center;margin-right:12px;margin-bottom:4px;">
                <span style="display:inline-block;width:14px;height:14px;background:${colors[i]};border-radius:3px;margin-right:6px;"></span>${l}
            </span>`
        ).join('');
    }, 100);
}

// Repite para cargarVentas, cargarProductos, cargarClientes con sus gráficas y tarjetas correspondientes

// Puedes llamar abrirEstadisticas() desde un botón del menú de tu dashboard

function cargarVentas() {
    document.getElementById('tab-ventas').innerHTML = `
        <div class="graficas-resumen-row">
            <div class="grafica-box" style="flex:2;">
                <h4>Ventas por Período</h4>
                <canvas id="ventasPorPeriodo"></canvas>
            </div>
            <div class="grafica-box" style="flex:1;">
                <h4>Ventas por Categoría</h4>
                <canvas id="ventasPorCategoria"></canvas>
                <div id="leyendaVentasCategoria" class="leyenda-pastel"></div>
            </div>
        </div>
        <div class="grafica-box">
            <h4>Análisis de Ventas Detallado</h4>
            <canvas id="analisisVentasDetallado"></canvas>
        </div>
    `;

    setTimeout(() => {
        // Destruir gráficos existentes
        destroyChart(ventasPorPeriodoChart);
        destroyChart(ventasPorCategoriaChart);
        destroyChart(analisisVentasDetalladoChart);

        // Crear nuevos gráficos
        ventasPorPeriodoChart = new Chart(document.getElementById('ventasPorPeriodo').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Ventas ($)',
                    data: [3200, 5400, 3000, 2100, 3400, 4100, 3900, 4200, 4800, 5100, 5300, 6000],
                    backgroundColor: '#4ADE80',
                    borderRadius: 6,
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } } }
        });

        ventasPorCategoriaChart = new Chart(document.getElementById('ventasPorCategoria').getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Analgésicos', 'Antibióticos', 'Antialérgicos', 'Antiacidos', 'Vitaminas'],
                datasets: [{
                    data: [29, 21, 19, 17, 14],
                    backgroundColor: ['#38bdf8', '#34d399', '#fbbf24', '#f87171', '#a78bfa']
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } } }
        });

        analisisVentasDetalladoChart = new Chart(document.getElementById('analisisVentasDetallado').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [
                    {
                        label: 'Ventas ($)',
                        data: [3200, 5400, 3000, 2100, 3400, 4100, 3900, 4200, 4800, 5100, 5300, 6000],
                        backgroundColor: '#4ADE80',
                        borderRadius: 6,
                        yAxisID: 'y',
                    },
                    {
                        label: 'Clientes',
                        data: [120, 180, 100, 90, 110, 130, 140, 150, 160, 170, 180, 200],
                        backgroundColor: '#60A5FA',
                        borderRadius: 6,
                        yAxisID: 'y1',
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: true } },
                scales: {
                    y: { beginAtZero: true, position: 'left' },
                    y1: { beginAtZero: true, position: 'right', grid: { drawOnChartArea: false } }
                }
            }
        });

        // Actualizar leyenda
        const leyenda = document.getElementById('leyendaVentasCategoria');
        const labels = ['Analgésicos', 'Antibióticos', 'Antialérgicos', 'Antiacidos', 'Vitaminas'];
        const colors = ['#38bdf8', '#34d399', '#fbbf24', '#f87171', '#a78bfa'];
        leyenda.innerHTML = labels.map((l, i) => 
            `<span style="display:inline-flex;align-items:center;margin-right:12px;margin-bottom:4px;">
                <span style="display:inline-block;width:14px;height:14px;background:${colors[i]};border-radius:3px;margin-right:6px;"></span>${l}
            </span>`
        ).join('');
    }, 100);
}

function cargarProductos() {
    document.getElementById('tab-productos').innerHTML = `
        <div class="graficas-resumen-row">
            <div class="grafica-box" style="flex:2;">
                <h4>Productos Más Vendidos</h4>
                <canvas id="productosMasVendidos"></canvas>
            </div>
            <div class="grafica-box" style="flex:1;">
                <h4>Categorías Más Vendidas</h4>
                <canvas id="categoriasMasVendidas"></canvas>
                <div id="leyendaCategoriasVendidas" class="leyenda-pastel"></div>
            </div>
        </div>
        <div class="grafica-box">
            <h4>Tendencia de Productos Vendidos</h4>
            <canvas id="tendenciaProductosVendidos"></canvas>
        </div>
    `;
    setTimeout(() => {
        new Chart(document.getElementById('productosMasVendidos').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Paracetamol', 'Ibuprofeno', 'Amoxicilina', 'Loratadina', 'Omeprazol'],
                datasets: [{
                    label: 'Unidades vendidas',
                    data: [580, 420, 320, 270, 210],
                    backgroundColor: ['#38bdf8', '#34d399', '#fbbf24', '#f87171', '#a78bfa']
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } } }
        });
        new Chart(document.getElementById('categoriasMasVendidas').getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Analgésicos', 'Antibióticos', 'Antialérgicos', 'Antiacidos', 'Vitaminas'],
                datasets: [{
                    data: [29, 21, 19, 17, 14],
                    backgroundColor: ['#38bdf8', '#34d399', '#fbbf24', '#f87171', '#a78bfa']
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } } }
        });
        // Leyenda personalizada para categorías más vendidas
        const leyenda = document.getElementById('leyendaCategoriasVendidas');
        const labels = ['Analgésicos', 'Antibióticos', 'Antialérgicos', 'Antiacidos', 'Vitaminas'];
        const colors = ['#38bdf8', '#34d399', '#fbbf24', '#f87171', '#a78bfa'];
        leyenda.innerHTML = labels.map((l, i) => `<span style="display:inline-flex;align-items:center;margin-right:12px;margin-bottom:4px;"><span style="display:inline-block;width:14px;height:14px;background:${colors[i]};border-radius:3px;margin-right:6px;"></span>${l}</span>`).join('');
        new Chart(document.getElementById('tendenciaProductosVendidos').getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Productos vendidos',
                    data: [320, 450, 300, 210, 340, 410, 390, 420, 480, 510, 530, 600],
                    borderColor: '#a78bfa',
                    backgroundColor: 'rgba(167,139,250,0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: '#a78bfa'
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } } }
        });
    }, 100);
}

function cargarClientes() {
    document.getElementById('tab-clientes').innerHTML = `
        <div class="graficas-resumen-row">
            <div class="grafica-box" style="flex:1;">
                <h4>Clientes Activos</h4>
                <canvas id="clientesActivos"></canvas>
            </div>
            <div class="grafica-box" style="flex:1;">
                <h4>Ticket Promedio por Cliente</h4>
                <canvas id="ticketPromedioCliente"></canvas>
            </div>
        </div>
        <div class="grafica-box">
            <h4>Análisis de Clientes</h4>
            <canvas id="analisisClientes"></canvas>
        </div>
    `;
    setTimeout(() => {
        new Chart(document.getElementById('clientesActivos').getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Clientes activos',
                    data: [120, 180, 100, 90, 110, 130, 140, 150, 160, 170, 180, 200],
                    borderColor: '#60A5FA',
                    backgroundColor: 'rgba(96,165,250,0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: '#60A5FA'
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } } }
        });
        new Chart(document.getElementById('ticketPromedioCliente').getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Ticket promedio ($)',
                    data: [3200, 5400, 3000, 2100, 3400, 4100, 3900, 4200, 4800, 5100, 5300, 6000],
                    backgroundColor: '#fbbf24',
                    borderRadius: 6,
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } } }
        });
        new Chart(document.getElementById('analisisClientes').getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [
                    {
                        label: 'Clientes',
                        data: [120, 180, 100, 90, 110, 130, 140, 150, 160, 170, 180, 200],
                        borderColor: '#60A5FA',
                        backgroundColor: 'rgba(96,165,250,0.1)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 4,
                        pointBackgroundColor: '#60A5FA'
                    },
                    {
                        label: 'Ventas ($)',
                        data: [3200, 5400, 3000, 2100, 3400, 4100, 3900, 4200, 4800, 5100, 5300, 6000],
                        borderColor: '#4ADE80',
                        backgroundColor: 'rgba(74,222,128,0.1)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 4,
                        pointBackgroundColor: '#4ADE80'
                    }
                ]
            },
            options: { responsive: true, plugins: { legend: { display: true } } }
        });
    }, 100);
}

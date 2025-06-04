<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema Farmacéutico</title>
    <link rel="stylesheet" href="Styles/index.css">
    <!-- Incluir Font Awesome para los iconos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="icon" type="image/x-icon" href="Images/LogoSoloOlivia.png">
    <link rel="stylesheet" href="Styles/Inventario.css">
    <link rel="stylesheet" href="Styles/Estadisticas.css">
    <link rel="stylesheet" href="Styles/proveedores.css">
    <link rel="stylesheet" href="Styles/Usuarios.css">
    <link rel="stylesheet" href="Styles/Facura.css">
    <link rel="stylesheet" href="Styles/Configuración.css">
</head>

<body>
    <div class="container">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="logo">
                <img src="Images/LogoOlivia.png" alt="Logo Farmacia" style="width: 200px; height: auto;">
            </div>

            <nav class="menu">
                <a href="#" class="menu-item active">
                    <i class="fas fa-home"></i>
                    <span>Dashboard</span>
                </a>
                <a href="#" class="menu-item">
                    <i class="fas fa-box"></i>
                    <span>Inventario</span>
                </a>
                <a href="#" class="menu-item" id="btnEstadisticas">
                    <i class="fas fa-chart-bar"></i>
                    <span>Estadísticas</span>
                </a>
                <a href="#" class="menu-item" id="btnProveedores">
                    <i class="fas fa-truck"></i>
                    <span>Proveedores</span>
                </a>
                <a href="#" class="menu-item" id="btnFacturas">
                    <i class="fas fa-file-invoice"></i>
                    <span>Facturas</span>
                </a>
                <a href="#" class="menu-item" id="btnUsuarios">
                    <i class="fas fa-users"></i>
                    <span>Usuarios</span>
                </a>
                <a href="#" class="menu-item" id="btnClientes">
                    <i class="fas fa-user-friends"></i>
                    <span>Clientes</span>
                </a>
                <a href="#" class="menu-item">
                    <i class="fas fa-cog"></i>
                    <span>Configuración</span>
                </a>
            </nav>

            <div class="theme-toggle">
                <button id="themeToggle" class="theme-toggle-btn">
                    <i class="fas fa-sun"></i>
                    <i class="fas fa-moon"></i>
                    <span class="toggle-slider"></span>
                </button>
            </div>

            <div class="user-info">
                <img src="Images/LogoUsuario.png" alt="Admin" class="avatar">
                <div class="user-details">
                    <h4>Admin Farmacia</h4>
                    <p>Administrador</p>
                </div>
            </div>

            <a href="#" class="logout">
                <i class="fas fa-sign-out-alt"></i>
                <span>Cerrar Sesión</span>
            </a>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <h1>Dashboard</h1>

            <!-- Stats Cards -->
            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-info">
                        <h3>Total Productos</h3>
                        <h2>156</h2>
                        <p class="stat-change">+180 desde el último mes</p>
                    </div>
                    <i class="fas fa-box-open stat-icon"></i>
                </div>

                <div class="stat-card">
                    <div class="stat-info">
                        <h3>Ventas del Día</h3>
                        <h2>$2.260.250</h2>
                        <p class="stat-change">+20.1% desde ayer</p>
                    </div>
                    <i class="fas fa-shopping-cart stat-icon"></i>
                </div>

                <div class="stat-card">
                    <div class="stat-info">
                        <h3>Productos Bajo Stock</h3>
                        <h2>12</h2>
                        <p class="stat-change">Requieren reposición</p>
                    </div>
                    <i class="fas fa-exclamation-triangle stat-icon"></i>
                </div>

                <div class="stat-card">
                    <div class="stat-info">
                        <h3>Ventas Mensuales</h3>
                        <h2>$34.250.300</h2>
                        <p class="stat-change">+15% desde el mes pasado</p>
                    </div>
                    <i class="fas fa-chart-line stat-icon"></i>
                </div>
            </div>

            <!-- Charts and Tables Section -->
            <div class="dashboard-bottom">
                <!-- Sales Chart -->
                <div class="sales-chart">
                    <h2>Resumen de Ventas</h2>
                    <canvas id="salesChart"></canvas>
                </div>

                <!-- Recent Sales -->
                <div class="recent-sales">
                    <h2>Últimas Ventas</h2>
                    <p class="sales-subtitle">Has realizado 265 ventas este mes.</p>
                    <div class="sales-list">
                        <!-- Sales items will go here -->
                    </div>
                </div>
            </div>

            <!-- Inventario Panel (oculto por defecto) -->
            <div id="inventarioModalBg" class="inventario-modal-bg" style="display: none;">
                <div id="inventarioPanel" class="inventario-panel">
                    <div class="inventario-header">
                        <h2>Inventario de Productos</h2>
                        <button class="close-inventario" id="closeInventarioBtn">&times;</button>
                    </div>
                    <div class="inventario-controls" style="position: relative;">
                        <input type="text" id="buscarProducto"
                            placeholder="Buscar por nombre, categoría o proveedor...">
                        <div style="position: relative;">
                            <button class="filter-btn" id="filterBtn">
                                <i class="fas fa-filter"></i>
                                <span class="filtro-texto">Filtrar</span>
                            </button>
                            <div id="filtroDropdown" class="filtro-dropdown">
                                <div class="filtro-opcion" data-filtro="nombre">Nombre</div>
                                <div class="filtro-opcion" data-filtro="categoria">Categoría</div>
                                <div class="filtro-opcion" data-filtro="estado">Estado</div>
                                <div class="filtro-opcion" data-filtro="fecha">Fecha de Expiración</div>
                            </div>
                        </div>
                        <button class="nuevo-producto-btn" id="nuevoProductoBtn"><i class="fas fa-plus"></i> Nuevo
                            Producto</button>
                    </div>
                    <div class="inventario-table-container">
                        <table class="inventario-table">
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre del Producto</th>
                                    <th>Precio Unitario</th>
                                    <th>Precio de Venta</th>
                                    <th>Cantidad</th>
                                    <th>Estado</th>
                                    <th>Categoría</th>
                                    <th>Fecha de Expiración</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="inventarioBody">
                                <!-- JS llenará las filas aquí -->
                            </tbody>
                        </table>
                    </div>
                    <div class="inventario-footer">
                        <span id="inventarioCount"></span>
                        <button class="paginacion-btn" id="anteriorBtn" disabled>Anterior</button>
                        <button class="paginacion-btn" id="siguienteBtn">Siguiente</button>
                    </div>
                </div>
            </div>

            <!-- Panel de Proveedores y Pedidos -->
            <div id="proveedoresModal" class="proveedores-modal" style="display: none;">
                <div class="proveedores-panel">
                    <div class="proveedores-header">
                        <h2><i class="fas fa-truck"></i> Proveedores y Pedidos</h2>
                        <button class="cerrar-btn" id="closeProveedoresBtn"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="proveedores-filtros">
                        <input type="text" id="buscarProveedor" placeholder="Buscar por nombre, contacto o producto...">
                        <button class="proveedor-filter-btn"><i class="fas fa-search"></i></button>
                        <button class="proveedor-filter-btn"><i class="fas fa-filter"></i></button>
                        <button class="proveedor-filter-btn"><i class="fas fa-sync-alt"></i></button>
                        <button class="nuevo-proveedor-btn" id="nuevoProveedorBtn"><i class="fas fa-plus"></i> Nuevo
                            Proveedor</button>
                    </div>
                    <div class="proveedores-tabs">
                        <button class="tab-btn active" data-tab="proveedores">Proveedores</button>
                        <button class="tab-btn" data-tab="pedidos">Pedidos</button>
                    </div>
                    <div class="proveedores-content">
                        <!-- TAB PROVEEDORES -->
                        <div id="tab-proveedores" class="tab-section active">
                            <table class="proveedores-table">
                                <thead>
                                    <tr>
                                        <th>Proveedor</th>
                                        <th>Contacto</th>
                                        <th>Productos</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="proveedoresBody">
                                    <!-- JS llenará aquí -->
                                </tbody>
                            </table>
                        </div>
                        <!-- TAB PEDIDOS -->
                        <div id="tab-pedidos" class="tab-section">
                            <table class="proveedores-table">
                                <thead>
                                    <tr>
                                        <th>ID Pedido</th>
                                        <th>Proveedor</th>
                                        <th>Fecha</th>
                                        <th>Productos</th>
                                        <th>Total</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="pedidosBody">
                                    <!-- JS llenará aquí -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Panel de Clientes -->
            <div id="clientesModal" class="usuarios-modal clientes-modal-ancho" style="display: none;">
                <div class="usuarios-panel clientes-panel-ancho">
                    <div class="usuarios-header">
                        <h2><i class="fas fa-user-friends"></i> Gestión de Clientes</h2>
                        <button class="cerrar-btn" id="closeClientesModal"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="usuarios-barra">
                        <input type="text" id="buscarCliente" placeholder="Buscar por nombre, email o teléfono...">
                        <button class="usuarios-barra-btn"><i class="fas fa-search"></i></button>
                        <button class="usuarios-barra-btn"><i class="fas fa-filter"></i></button>
                        <button class="usuarios-barra-btn"><i class="fas fa-file-export"></i></button>
                        <button class="nuevo-usuario-btn" id="nuevoClienteBtn"><i class="fas fa-user-plus"></i> Agregar
                            Nuevo Cliente</button>
                    </div>
                    <table class="usuarios-table clientes-table">
                        <thead>
                            <tr>
                                <th style="text-align:center;">Imagen</th>
                                <th style="text-align:left;">Nombre</th>
                                <th style="text-align:left;">Email</th>
                                <th style="text-align:left;">Teléfono</th>
                                <th style="text-align:center;">Ventas Realizadas</th>
                                <th style="text-align:left;">Productos Comprados</th>
                                <th style="text-align:center;">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="clientesBody">
                            <!-- JS llenará aquí -->
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="Scripts/index.js"></script>
    <script src="Scripts/Configuración.js"></script>
    <script src="Scripts/Estadistica.js"></script>
    <script src="Scripts/inventario.js"></script>
    <script src="Scripts/proveedores.js"></script>
    <script src="Scripts/Usuarios.js"></script>
    <script src="Scripts/Factura.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

    <!-- Modal de proceso (éxito/error) -->
    <div id="procesoModal" class="proceso-modal" style="display: none;">
        <div class="proceso-panel">
            <div class="proceso-animacion" id="procesoAnimacion"></div>
            <div class="proceso-mensaje" id="procesoMensaje">¡Proceso exitoso!</div>
        </div>
    </div>

    <!-- Panel Nuevo Producto (oculto por defecto) -->
    <div id="nuevoProductoModal" class="nuevo-producto-modal" style="display: none;">
        <div class="nuevo-producto-panel">
            <div class="nuevo-producto-header">
                <h2>Agregar Nuevo Producto</h2>
                <button class="close-nuevo-producto" id="closeNuevoProductoBtn">&times;</button>
            </div>
            <form id="formNuevoProducto" autocomplete="off">
                <div class="form-group">
                    <label for="npImagen">Imagen del Producto</label>
                    <div class="imagen-preview-container">
                        <img id="npImagenPreview" src="Images/LogoSoloOlivia.png" alt="Vista previa">
                        <input type="file" id="npImagen" accept="image/*" style="display: none;">
                        <button type="button" class="cambiar-imagen-btn"
                            onclick="document.getElementById('npImagen').click()">
                            <i class="fas fa-camera"></i> Subir imagen
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="npNombre">Nombre del Producto</label>
                    <input type="text" id="npNombre" placeholder="Ej: Paracetamol 500mg" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="npCantidad">Cantidad</label>
                        <input type="number" id="npCantidad" min="0" placeholder="Ej: 100" required>
                    </div>
                    <div class="form-group">
                        <label for="npStock">Stock Mínimo</label>
                        <input type="number" id="npStock" min="0" placeholder="Ej: 10" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="npUnitario">Precio Unitario</label>
                        <input type="number" id="npUnitario" min="0" step="0.01" placeholder="Ej: 3.50" required>
                    </div>
                    <div class="form-group">
                        <label for="npVenta">Precio de Venta</label>
                        <input type="number" id="npVenta" min="0" step="0.01" placeholder="Ej: 5.99" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="npExpiracion">Fecha de Expiración</label>
                        <input type="date" id="npExpiracion" required>
                    </div>
                    <div class="form-group">
                        <label for="npCategoria">Categoría</label>
                        <div class="categoria-select-group">
                            <select id="npCategoria" required></select>
                            <button type="button" class="add-categoria-btn" id="addCategoriaBtn"
                                title="Agregar nueva categoría">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="guardar-btn">Guardar Producto</button>
                    <button type="button" class="cancelar-btn" id="cancelarNuevoProductoBtn">Cancelar</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Panel Editar Producto (oculto por defecto) -->
    <div id="editarProductoModal" class="nuevo-producto-modal" style="display: none;">
        <div class="nuevo-producto-panel">
            <div class="nuevo-producto-header">
                <h2>Editar Producto</h2>
                <button class="close-nuevo-producto" id="closeEditarProductoBtn">&times;</button>
            </div>
            <form id="formEditarProducto" autocomplete="off">
                <div class="form-group">
                    <label for="epImagen">Imagen del Producto</label>
                    <div class="imagen-preview-container">
                        <img id="epImagenPreview" src="Images/LogoSoloOlivia.png" alt="Vista previa">
                        <input type="file" id="epImagen" accept="image/*" style="display: none;">
                        <button type="button" class="cambiar-imagen-btn"
                            onclick="document.getElementById('epImagen').click()">
                            <i class="fas fa-camera"></i> Cambiar imagen
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="epNombre">Nombre del Producto</label>
                    <input type="text" id="epNombre" placeholder="Ej: Paracetamol 500mg" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="epCantidad">Cantidad</label>
                        <input type="number" id="epCantidad" min="0" placeholder="Ej: 100" required>
                    </div>
                    <div class="form-group">
                        <label for="epStock">Stock Mínimo</label>
                        <input type="number" id="epStock" min="0" placeholder="Ej: 10" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="epUnitario">Precio Unitario</label>
                        <input type="number" id="epUnitario" min="0" step="0.01" placeholder="Ej: 3.50" required>
                    </div>
                    <div class="form-group">
                        <label for="epVenta">Precio de Venta</label>
                        <input type="number" id="epVenta" min="0" step="0.01" placeholder="Ej: 5.99" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="epExpiracion">Fecha de Expiración</label>
                        <input type="date" id="epExpiracion" required>
                    </div>
                    <div class="form-group">
                        <label for="epCategoria">Categoría</label>
                        <div class="categoria-select-group">
                            <select id="epCategoria" required></select>
                            <button type="button" class="add-categoria-btn" id="addCategoriaBtnEdit"
                                title="Agregar nueva categoría">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="guardar-btn">Guardar Cambios</button>
                    <button type="button" class="cancelar-btn" id="cancelarEditarProductoBtn">Cancelar</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Mini panel para agregar nueva categoría -->
    <div id="nuevaCategoriaModal" class="nueva-categoria-modal" style="display: none;">
        <div class="nueva-categoria-panel">
            <h3>Nueva Categoría</h3>
            <input type="text" id="inputNuevaCategoria" placeholder="Nombre de la categoría">
            <div class="mini-actions">
                <button id="guardarCategoriaBtn" class="guardar-btn">Agregar</button>
                <button id="cancelarCategoriaBtn" class="cancelar-btn">Cancelar</button>
            </div>
        </div>
    </div>

    <!-- Panel de Estadísticas y Reportes -->
    <div id="estadisticasModal" class="estadisticas-modal" style="display: none;">
        <div class="estadisticas-panel">
            <div class="estadisticas-header">
                <h2><i class="fas fa-chart-line"></i> Estadísticas y Análisis</h2>
                <button class="cerrar-btn" id="closeEstadisticasBtn"><i class="fas fa-times"></i></button>
            </div>
            <div class="estadisticas-filtros">
                <select id="periodoTiempo">
                    <option>Este año</option>
                    <option>Este mes</option>
                    <option>Últimos 7 días</option>
                </select>
                <button id="calendarioBtn"><i class="fas fa-calendar"></i> Calendario</button>
                <div class="rango-slider">
                    <label>Ajustar rango (0% - 100%)</label>
                    <input type="range" min="0" max="100" value="100" id="rangoAjuste">
                </div>
                <button id="exportarBtn"><i class="fas fa-download"></i> Exportar</button>
            </div>
            <div class="estadisticas-menu">
                <button class="tab-btn active" data-tab="resumen">Resumen</button>
                <button class="tab-btn" data-tab="ventas">Ventas</button>
                <button class="tab-btn" data-tab="productos">Productos</button>
                <button class="tab-btn" data-tab="clientes">Clientes</button>
            </div>
            <div class="estadisticas-content">
                <div id="tab-resumen" class="tab-section active"></div>
                <div id="tab-ventas" class="tab-section"></div>
                <div id="tab-productos" class="tab-section"></div>
                <div id="tab-clientes" class="tab-section"></div>
            </div>
        </div>
    </div>

    <!-- Modal de Exportación -->
    <div id="exportModal" class="export-modal" style="display:none;">
        <div class="export-panel">
            <div class="export-header">
                <h2><i class="fas fa-file-export"></i> Exportar Reporte</h2>
                <button class="cerrar-btn" id="closeExportModal"><i class="fas fa-times"></i></button>
            </div>
            <div class="export-content">
                <div class="export-section">
                    <label>Formato:</label>
                    <div class="export-formats">
                        <button class="export-format-btn" data-format="pdf"><i class="fas fa-file-pdf"></i> PDF</button>
                        <button class="export-format-btn" data-format="excel"><i class="fas fa-file-excel"></i>
                            Excel</button>
                        <button class="export-format-btn" data-format="word"><i class="fas fa-file-word"></i>
                            Word</button>
                    </div>
                </div>
                <div class="export-section">
                    <label>Tipo de Reporte:</label>
                    <select id="tipoReporte">
                        <option value="diario">Diario</option>
                        <option value="semanal">Semanal</option>
                        <option value="mensual">Mensual</option>
                        <option value="trimestral">Trimestral</option>
                        <option value="anual">Anual</option>
                        <option value="otro">Otro (elige fechas)</option>
                    </select>
                </div>
                <div class="export-section" id="fechasPersonalizadas" style="display:none;">
                    <label>Rango de Fechas:</label>
                    <input type="date" id="fechaInicio"> a
                    <input type="date" id="fechaFin">
                </div>
                <div class="export-section">
                    <label>¿Qué deseas exportar?</label>
                    <select id="entidadExportar">
                        <option value="ventas">Ventas</option>
                        <option value="productos">Productos</option>
                        <option value="clientes">Clientes</option>
                    </select>
                </div>
                <div class="export-section">
                    <button id="confirmarExportacion" class="confirmar-export-btn">
                        <i class="fas fa-download"></i> Exportar Ahora
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de Nuevo Proveedor -->
    <div id="nuevoProveedorModal" class="nuevo-proveedor-modal" style="display: none;">
        <div class="nuevo-proveedor-panel">
            <div class="nuevo-proveedor-header">
                <h2><i class="fas fa-truck"></i> Nuevo Proveedor</h2>
                <button class="cerrar-btn" id="closeNuevoProveedorBtn"><i class="fas fa-times"></i></button>
            </div>
            <form id="formNuevoProveedor" class="nuevo-proveedor-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="npCedula">Cédula/RUC</label>
                        <input type="text" id="npCedula" placeholder="Ingrese la cédula o RUC" required>
                    </div>
                    <div class="form-group">
                        <label for="npNombreProveedor">Nombre del contacto</label>
                        <input type="text" id="npNombreProveedor" placeholder="Nombre del contacto" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="npTelefono">Teléfono</label>
                        <input type="tel" id="npTelefono" placeholder="Número de contacto" required>
                    </div>
                    <div class="form-group">
                        <label for="npEmail">Correo Electrónico</label>
                        <input type="email" id="npEmail" placeholder="correo@ejemplo.com" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="npEmpresa">Nombre de la Empresa</label>
                    <input type="text" id="npEmpresa" placeholder="Nombre de la empresa proveedora" required>
                </div>
                <div class="form-group">
                    <label for="npDireccion">Dirección</label>
                    <input type="text" id="npDireccion" placeholder="Dirección de la empresa" required>
                </div>
                <div class="form-group productos-grupo">
                    <label>Productos que Ofrece</label>
                    <div class="productos-input-container">
                        <input type="text" id="npProducto"
                            placeholder="Ingrese un producto y presione Enter o el botón +">
                        <button type="button" id="agregarProductoBtn" class="agregar-producto-btn">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div id="productosLista" class="productos-lista">
                        <!-- Los productos se agregarán aquí dinámicamente -->
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="guardar-btn">
                        <i class="fas fa-save"></i> Guardar Proveedor
                    </button>
                    <button type="button" class="cancelar-btn" id="cancelarNuevoProveedorBtn">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal de Pedido a Proveedor -->
    <div id="pedidoProveedorModal" class="pedido-proveedor-modal" style="display: none;">
        <div class="pedido-proveedor-panel">
            <div class="pedido-proveedor-header">
                <h2><i class="fas fa-shopping-cart"></i> Nuevo Pedido a Proveedor</h2>
                <button class="cerrar-btn" id="closePedidoProveedorBtn"><i class="fas fa-times"></i></button>
            </div>
            <div class="pedido-proveedor-content">
                <div class="pedido-proveedor-info">
                    <span id="pedidoProveedorNombre" class="proveedor-nombre"></span>
                    <span id="pedidoProveedorEmpresa" class="proveedor-empresa"></span>
                </div>
                <table class="pedido-productos-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Stock</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="pedidoProductosBody">
                        <!-- JS llenará aquí -->
                    </tbody>
                </table>
                <div class="pedido-lista-container">
                    <h4>Productos a pedir:</h4>
                    <div id="pedidoLista" class="pedido-lista"></div>
                </div>
                <div class="pedido-anotaciones">
                    <input type="text" id="pedidoAnotaciones" placeholder="Más anotaciones para el proveedor...">
                </div>
                <div class="pedido-acciones">
                    <button id="enviarPedidoBtn" class="enviar-pedido-btn"><i class="fas fa-paper-plane"></i> Enviar
                        Pedido</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de Gestión de Usuarios y Clientes -->
    <div id="usuariosModal" class="usuarios-modal" style="display: none;">
        <div class="usuarios-panel">
            <div class="usuarios-header">
                <h2><i class="fas fa-users"></i> Gestión de Usuarios y Clientes</h2>
                <button class="cerrar-btn" id="closeUsuariosModal"><i class="fas fa-times"></i></button>
            </div>
            <div class="usuarios-tabs">
                <button class="tab-btn active" data-tab="usuarios">Usuarios del Sistema</button>
                <button class="tab-btn" data-tab="roles">Gestión de Roles</button>
                <!-- <button class="tab-btn" data-tab="clientes">Clientes</button> -->
            </div>
            <div class="usuarios-content">
                <!-- USUARIOS DEL SISTEMA -->
                <div id="tab-usuarios" class="tab-section active">
                    <div class="usuarios-barra">
                        <input type="text" id="buscarUsuario" placeholder="Buscar por nombre, email o rol...">
                        <button class="usuarios-barra-btn"><i class="fas fa-search"></i></button>
                        <button class="usuarios-barra-btn"><i class="fas fa-filter"></i></button>
                        <button class="usuarios-barra-btn"><i class="fas fa-file-export"></i></button>
                        <button class="nuevo-usuario-btn" id="nuevoUsuarioBtn"><i class="fas fa-user-plus"></i> Nuevo
                            Usuario</button>
                    </div>
                    <table class="usuarios-table">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Rol</th>
                                <th>Último acceso</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="usuariosBody">
                            <!-- JS llenará aquí -->
                        </tbody>
                    </table>
                </div>
                <!-- GESTIÓN DE ROLES -->
                <div id="tab-roles" class="tab-section">
                    <div class="usuarios-barra">
                        <input type="text" id="buscarRol" placeholder="Buscar por nombre o descripción...">
                        <button class="usuarios-barra-btn"><i class="fas fa-search"></i></button>
                        <button class="usuarios-barra-btn"><i class="fas fa-filter"></i></button>
                        <button class="usuarios-barra-btn"><i class="fas fa-file-export"></i></button>
                        <button class="nuevo-usuario-btn" id="nuevoRolBtn"><i class="fas fa-user-shield"></i> Nuevo
                            Rol</button>
                    </div>
                    <table class="usuarios-table">
                        <thead>
                            <tr>
                                <th>Rol</th>
                                <th>Descripción</th>
                                <th>Usuarios asignados</th>
                                <th>Permisos</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="rolesBody">
                            <!-- JS llenará aquí -->
                        </tbody>
                    </table>
                </div>
                <!-- CLIENTES -->
                <!--
                <div id="tab-clientes" class="tab-section">
                    <div class="usuarios-barra">
                        <input type="text" id="buscarCliente" placeholder="Buscar por nombre, email o teléfono...">
                        <button class="usuarios-barra-btn"><i class="fas fa-search"></i></button>
                        <button class="usuarios-barra-btn"><i class="fas fa-filter"></i></button>
                        <button class="usuarios-barra-btn"><i class="fas fa-file-export"></i></button>
                    </div>
                    <table class="usuarios-table">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Ventas Realizadas</th>
                                <th>Productos Comprados</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="clientesBody">
                            <!-- JS llenará aquí -->
                </tbody>
                </table>
            </div>
            -->
        </div>
    </div>
    </div>

    <!-- Modal Nuevo Usuario -->
    <div id="nuevoUsuarioModal" class="nuevo-usuario-modal" style="display:none;">
        <div class="nuevo-usuario-panel">
            <div class="nuevo-usuario-header">
                <h2><i class="fas fa-user-plus"></i> Nuevo Usuario</h2>
                <button class="cerrar-btn" id="closeNuevoUsuarioModal"><i class="fas fa-times"></i></button>
            </div>
            <form id="formNuevoUsuario" class="nuevo-usuario-form">
                <div class="form-group">
                    <label for="nuNombre">Nombre completo</label>
                    <input type="text" id="nuNombre" required placeholder="Nombre completo">
                </div>
                <div class="form-group">
                    <label for="nuEmail">Email</label>
                    <input type="email" id="nuEmail" required placeholder="Correo electrónico">
                </div>
                <div class="form-group">
                    <label for="nuRol">Rol</label>
                    <select id="nuRol" required>
                        <option value="Administrador">Administrador</option>
                        <option value="Farmacéutico">Farmacéutico</option>
                        <option value="Vendedor">Vendedor</option>
                        <option value="Inventario">Inventario</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="nuEstado">Estado</label>
                    <select id="nuEstado" required>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="nuPassword">Contraseña</label>
                    <input type="password" id="nuPassword" required placeholder="Contraseña temporal">
                </div>
                <div class="form-actions">
                    <button type="submit" class="guardar-btn"><i class="fas fa-save"></i> Guardar</button>
                    <button type="button" class="cancelar-btn" id="cancelarNuevoUsuarioBtn"><i class="fas fa-times"></i>
                        Cancelar</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Nuevo Rol -->
    <div id="nuevoRolModal" class="nuevo-usuario-modal" style="display:none;">
        <div class="nuevo-usuario-panel">
            <div class="nuevo-usuario-header">
                <h2><i class="fas fa-user-shield"></i> Nuevo Rol</h2>
                <button class="cerrar-btn" id="closeNuevoRolModal"><i class="fas fa-times"></i></button>
            </div>
            <form id="formNuevoRol" class="nuevo-usuario-form">
                <div class="form-group">
                    <label for="nrNombre">Nombre del rol</label>
                    <input type="text" id="nrNombre" required placeholder="Nombre del rol">
                </div>
                <div class="form-group">
                    <label for="nrDescripcion">Descripción</label>
                    <input type="text" id="nrDescripcion" required placeholder="Descripción del rol">
                </div>
                <div class="form-group">
                    <label>Permisos</label>
                    <div class="permisos-checkboxes">
                        <label><input type="checkbox" value="Ventas"> Ventas</label>
                        <label><input type="checkbox" value="Inventario"> Inventario</label>
                        <label><input type="checkbox" value="Usuarios"> Usuarios</label>
                        <label><input type="checkbox" value="Reportes"> Reportes</label>
                        <label><input type="checkbox" value="Proveedores"> Proveedores</label>
                        <label><input type="checkbox" value="Reportes básicos"> Reportes básicos</label>
                        <label><input type="checkbox" value="Reportes de inventario"> Reportes de inventario</label>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="guardar-btn"><i class="fas fa-save"></i> Guardar</button>
                    <button type="button" class="cancelar-btn" id="cancelarNuevoRolBtn"><i class="fas fa-times"></i>
                        Cancelar</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Panel de Facturas (oculto por defecto) -->
    <div id="facturasModal" class="facturas-modal" style="display: none;">
        <div class="facturas-panel">
            <div class="facturas-header">
                <h2><i class="fas fa-file-invoice"></i> Facturación</h2>
                <button class="cerrar-btn" id="closeFacturasModal"><i class="fas fa-times"></i></button>
            </div>
            <div class="facturas-barra">
                <button class="nueva-factura-btn" id="nuevaFacturaBtn">Nueva Factura</button>
                <input type="text" id="buscarFactura" placeholder="Buscar por número de factura">
                <select id="filtroCliente">
                    <option value="">Todos los clientes</option>
                </select>
            </div>
            <div class="facturas-table-container">
                <table class="facturas-table">
                    <thead>
                        <tr>
                            <th>No. Fac</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Monto total</th>
                            <th>Pagado</th>
                            <th>Debido</th>
                            <th>Vendido por</th>
                            <th>Pagos</th>
                            <th>Abonar</th>
                            <th>Imprimir</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody id="facturasBody">
                        <!-- JS llenará aquí -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal Crear Factura (oculto por defecto) -->
    <div id="crearFacturaModal" class="crear-factura-modal" style="display:none;">
        <div class="crear-factura-panel">
            <div class="crear-factura-header">
                <h2><i class="fas fa-file-invoice"></i> Crear factura</h2>
                <button class="cerrar-btn" id="closeCrearFacturaModal"><i class="fas fa-times"></i></button>
            </div>
            <form id="formCrearFactura" autocomplete="off">
                <div class="crear-factura-row">
                    <div class="form-group">
                        <label for="cfCliente"><i class="fas fa-user"></i> Seleccionar cliente</label>
                        <select id="cfCliente" required>
                            <option value="">Seleccionar cliente</option>
                            <option value="cliente1">Juan Pérez</option>
                            <option value="cliente2">Ana Martínez</option>
                            <option value="cliente3">Carlos López</option>
                            <option value="nuevo">+ Nuevo Cliente</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="cfFecha"><i class="fas fa-calendar"></i> Fecha de la factura</label>
                        <input type="date" id="cfFecha" required>
                    </div>
                </div>
                <div class="crear-factura-row">
                    <div class="form-group">
                        <label for="cfNumero">Número de factura</label>
                        <input type="text" id="cfNumero" class="styled-input" value="52">
                    </div>
                </div>
                <div class="crear-factura-tabla-container">
                    <table class="crear-factura-tabla">
                        <thead>
                            <tr>
                                <th></th>
                                <th>#</th>
                                <th>Categoría</th>
                                <th>Producto</th>
                                <th>Comprobante</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Descuento</th>
                                <th>Tipo de descuento</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody id="cfProductosBody">
                            <tr>
                                <td><button type="button" class="eliminar-fila-btn"><i
                                            class="fas fa-trash"></i></button></td>
                                <td>1</td>
                                <td><select class="styled-select">
                                        <option>Selecciona categoría</option>
                                    </select></td>
                                <td><select class="styled-select">
                                        <option>Seleccionar producto</option>
                                    </select></td>
                                <td><select class="styled-select">
                                        <option>Seleccionar C</option>
                                    </select></td>
                                <td><input type="number" min="0" value="0" class="styled-input" placeholder="Cantidad">
                                </td>
                                <td><input type="number" min="0" value="0" class="styled-input" placeholder="Precio">
                                </td>
                                <td><input type="number" min="0" value="0" class="styled-input" placeholder="Descuento">
                                </td>
                                <td><select class="styled-select" placeholder="Tipo de descuento">
                                        <option>Sin descuento</option>
                                        <option>Porcentaje</option>
                                        <option>Importe fijo</option>
                                        <option>2x1</option>
                                        <option>3x2</option>
                                        <option>Descuento especial</option>
                                    </select></td>
                                <td><input type="number" min="0" value="0" class="styled-input" placeholder="Total"
                                        readonly></td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" class="anadir-mas-btn" id="anadirMasBtn">+ Añadir más</button>
                </div>
                <!-- Bloque de totales debajo de la tabla -->
                <div class="factura-totales-resumen">
                    <div class="factura-totales-item"><span>Precio total:</span><span>$ <span
                                id="ftPrecioTotal">0</span></span></div>
                    <div class="factura-totales-item"><span>Descuento total:</span><span>$ <span
                                id="ftDescuentoTotal">0</span></span></div>
                    <div class="factura-totales-item"><span>Importe neto por pagar:</span><span>$ <span
                                id="ftImporteNeto">0</span></span></div>
                    <div class="factura-totales-item"><span>Pagar ahora:</span><span>$ <input type="number"
                                id="ftPagarAhora" class="styled-input" min="0" value="0"
                                style="width:100px;display:inline-block;"></span></div>
                    <div class="factura-totales-item"><span>Importe a deber:</span><span>$ <span
                                id="ftImporteDeber">0</span></span></div>
                </div>
                <div class="crear-factura-footer">
                    <button type="submit" class="guardar-btn">Guardar Factura</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Mini Modal Nuevo Cliente -->
    <div id="nuevoClienteMiniModal" class="nuevo-cliente-mini-modal" style="display:none;">
        <div class="nuevo-cliente-mini-panel">
            <div class="nuevo-cliente-mini-header">
                <h3><i class="fas fa-user-plus"></i> Nuevo Cliente</h3>
                <button class="cerrar-btn" id="closeNuevoClienteMiniModal"><i class="fas fa-times"></i></button>
            </div>
            <form id="formNuevoClienteMini" autocomplete="off">
                <div class="form-group">
                    <label for="ncId">ID</label>
                    <input type="text" id="ncId" required>
                </div>
                <div class="form-group">
                    <label for="ncNombre">Nombre</label>
                    <input type="text" id="ncNombre" required>
                </div>
                <div class="form-group">
                    <label for="ncCorreo">Correo</label>
                    <input type="email" id="ncCorreo" required>
                </div>
                <div class="form-group">
                    <label for="ncTelefono">Teléfono</label>
                    <input type="tel" id="ncTelefono" required>
                </div>
                <div class="form-group">
                    <label for="ncEdad">Edad</label>
                    <input type="number" id="ncEdad" min="0" required>
                </div>
                <div class="form-group">
                    <label for="ncSexo">Sexo</label>
                    <select id="ncSexo" required>
                        <option value="">Seleccionar</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="O">Otro</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="submit" class="guardar-btn">Guardar Cliente</button>
                    <button type="button" class="cancelar-btn" id="cancelarNuevoClienteMiniBtn">Cancelar</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Pagos de Factura -->
    <div id="pagosFacturaModal" class="pagos-factura-modal" style="display:none;">
        <div class="pagos-factura-panel">
            <div class="pagos-factura-header">
                <h3 id="pagosFacturaTitulo">Pagos de factura N° : </h3>
                <p id="pagosFacturaCliente"></p>
            </div>
            <table class="pagos-factura-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Importe</th>
                        <th>Pago con</th>
                        <th>Información</th>
                        <th>Recibido por</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody id="pagosFacturaBody">
                    <!-- JS llenará aquí -->
                </tbody>
            </table>
            <div class="pagos-factura-totales">
                <div><label>Total a pagar</label><input type="text" id="pagosFacturaTotal" readonly></div>
                <div><label>Total pagado</label><input type="text" id="pagosFacturaPagado" readonly></div>
                <div><label>Importe total a pagar</label><input type="text" id="pagosFacturaDeber" readonly></div>
            </div>
            <button id="cerrarPagosFacturaBtn" class="cerrar-pagos-factura-btn">Cerrar</button>
        </div>
    </div>

    <!-- Modal Abonar a Factura -->
    <div id="abonarFacturaModal" class="abonar-factura-modal" style="display:none;">
        <div class="abonar-factura-panel">
            <div class="abonar-factura-header">
                <h3 id="abonarFacturaTitulo">Pago de factura N° : </h3>
            </div>
            <form id="formAbonarFactura">
                <div class="form-group">
                    <label for="abonarFecha">Fecha</label>
                    <input type="date" id="abonarFecha" required>
                </div>
                <div class="form-group">
                    <label for="abonarImporte">Importe</label>
                    <input type="number" id="abonarImporte" min="0" value="0" required>
                </div>
                <div class="form-group">
                    <label for="abonarMetodo">Pagado en</label>
                    <select id="abonarMetodo" required>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta">Tarjeta</option>
                        <option value="Transferencia">Transferencia</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                <div class="abonar-factura-footer">
                    <button type="submit" class="guardar-btn">Guardar</button>
                    <button type="button" class="cancelar-btn" id="cerrarAbonarFacturaBtn">Cerrar</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Panel de Configuración -->
    <div id="configuracionModal" class="configuracion-modal" style="display: none;">
        <div class="configuracion-panel">
            <div class="configuracion-header">
                <h2><i class="fas fa-cog"></i> Configuración del Sistema</h2>
                <button class="cerrar-btn" id="closeConfiguracionBtn"><i class="fas fa-times"></i></button>
            </div>
            <div class="configuracion-content">
                <div class="configuracion-sidebar">
                    <button class="config-nav-btn active" data-section="general">
                        <i class="fas fa-sliders-h"></i> General
                    </button>
                    <button class="config-nav-btn" data-section="notificaciones">
                        <i class="fas fa-bell"></i> Notificaciones
                    </button>
                    <button class="config-nav-btn" data-section="apariencia">
                        <i class="fas fa-paint-brush"></i> Apariencia
                    </button>
                    <button class="config-nav-btn" data-section="base-datos">
                        <i class="fas fa-database"></i> Base de Datos
                    </button>
                    <button class="config-nav-btn" data-section="backup">
                        <i class="fas fa-cloud-upload-alt"></i> Backup
                    </button>
                    <button class="config-nav-btn" data-section="soporte">
                        <i class="fas fa-headset"></i> Soporte
                    </button>
                    <button class="config-nav-btn" data-section="ayuda">
                        <i class="fas fa-question-circle"></i> Ayuda
                    </button>
                </div>
                <div class="configuracion-main">
                    <!-- Sección General -->
                    <div class="config-section active" id="section-general">
                        <h3>Configuración General</h3>
                        <div class="config-form">
                            <div class="form-group">
                                <label>Nombre de la Farmacia</label>
                                <input type="text" id="nombreFarmacia" placeholder="Ingrese el nombre de la farmacia">
                            </div>
                            <div class="form-group">
                                <label>Dirección</label>
                                <input type="text" id="direccionFarmacia" placeholder="Ingrese la dirección">
                            </div>
                            <div class="form-group">
                                <label>Teléfono</label>
                                <input type="tel" id="telefonoFarmacia" placeholder="Ingrese el teléfono">
                            </div>
                            <div class="form-group">
                                <label>Correo Electrónico</label>
                                <input type="email" id="emailFarmacia" placeholder="Ingrese el correo electrónico">
                            </div>
                            <div class="form-group">
                                <label>Zona Horaria</label>
                                <select id="zonaHoraria">
                                    <option value="America/Guayaquil">Ecuador (GMT-5)</option>
                                    <option value="America/New_York">Nueva York (GMT-4)</option>
                                    <option value="America/Los_Angeles">Los Ángeles (GMT-7)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Sección Notificaciones -->
                    <div class="config-section" id="section-notificaciones">
                        <h3>Configuración de Notificaciones</h3>
                        <div class="config-form">
                            <div class="form-group">
                                <label class="switch-label">
                                    <span>Notificaciones de Stock Bajo</span>
                                    <label class="switch">
                                        <input type="checkbox" id="notifStock" checked>
                                        <span class="slider round"></span>
                                    </label>
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="switch-label">
                                    <span>Notificaciones de Productos por Vencer</span>
                                    <label class="switch">
                                        <input type="checkbox" id="notifVencimiento" checked>
                                        <span class="slider round"></span>
                                    </label>
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="switch-label">
                                    <span>Notificaciones de Ventas</span>
                                    <label class="switch">
                                        <input type="checkbox" id="notifVentas">
                                        <span class="slider round"></span>
                                    </label>
                                </label>
                            </div>
                            <div class="form-group">
                                <label>Días de anticipación para productos por vencer</label>
                                <input type="number" id="diasAnticipacion" min="1" max="90" value="30">
                            </div>
                        </div>
                    </div>

                    <!-- Sección Apariencia -->
                    <div class="config-section" id="section-apariencia">
                        <h3>Personalización de Apariencia</h3>
                        <div class="config-form">
                            <div class="form-group">
                                <label>Tema Principal</label>
                                <select id="temaPrincipal">
                                    <option value="light">Claro</option>
                                    <option value="dark">Oscuro</option>
                                    <option value="auto">Automático</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Color Principal</label>
                                <input type="color" id="colorPrincipal" value="#4ADE80">
                            </div>
                            <div class="form-group">
                                <label>Fuente Principal</label>
                                <select id="fuentePrincipal">
                                    <option value="Arial">Arial</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Open Sans">Open Sans</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Tamaño de Fuente</label>
                                <select id="tamanoFuente">
                                    <option value="small">Pequeño</option>
                                    <option value="medium" selected>Mediano</option>
                                    <option value="large">Grande</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Sección Base de Datos -->
                    <div class="config-section" id="section-base-datos">
                        <h3>Gestión de Base de Datos</h3>
                        <div class="config-form">
                            <div class="form-group">
                                <label>Estado de la Base de Datos</label>
                                <div class="db-status">
                                    <span class="status-indicator online"></span>
                                    <span>Conectado</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Última Optimización</label>
                                <div class="last-optimization">
                                    <span>Hace 2 días</span>
                                    <button class="optimize-btn">Optimizar Ahora</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Espacio Utilizado</label>
                                <div class="storage-bar">
                                    <div class="storage-progress" style="width: 65%"></div>
                                    <span>65% (650MB/1GB)</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <button class="danger-btn">Vaciar Base de Datos</button>
                            </div>
                        </div>
                    </div>

                    <!-- Sección Backup -->
                    <div class="config-section" id="section-backup">
                        <h3>Respaldo y Restauración</h3>
                        <div class="config-form">
                            <div class="form-group">
                                <label>Último Respaldo</label>
                                <div class="backup-info">
                                    <span>Hace 1 día</span>
                                    <button class="backup-btn">Crear Respaldo</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Respaldos Automáticos</label>
                                <select id="backupFrecuencia">
                                    <option value="daily">Diario</option>
                                    <option value="weekly">Semanal</option>
                                    <option value="monthly">Mensual</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Historial de Respaldos</label>
                                <div class="backup-history">
                                    <div class="backup-item">
                                        <span>Respaldo #1</span>
                                        <span>Hace 1 día</span>
                                        <button class="restore-btn">Restaurar</button>
                                    </div>
                                    <div class="backup-item">
                                        <span>Respaldo #2</span>
                                        <span>Hace 2 días</span>
                                        <button class="restore-btn">Restaurar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sección Soporte -->
                    <div class="config-section" id="section-soporte">
                        <h3>Soporte Técnico</h3>
                        <div class="config-form">
                            <div class="support-card">
                                <i class="fas fa-headset"></i>
                                <h4>Soporte 24/7</h4>
                                <p>Nuestro equipo está disponible para ayudarte en cualquier momento</p>
                                <button class="contact-btn">Contactar Soporte</button>
                            </div>
                            <div class="support-info">
                                <div class="support-item">
                                    <i class="fas fa-phone"></i>
                                    <div>
                                        <h4>Teléfono</h4>
                                        <p>+593 99 123 4567</p>
                                    </div>
                                </div>
                                <div class="support-item">
                                    <i class="fas fa-envelope"></i>
                                    <div>
                                        <h4>Email</h4>
                                        <p>soporte@farmacia.com</p>
                                    </div>
                                </div>
                                <div class="support-item">
                                    <i class="fas fa-clock"></i>
                                    <div>
                                        <h4>Horario</h4>
                                        <p>24/7</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sección Ayuda -->
                    <div class="config-section" id="section-ayuda">
                        <h3>Centro de Ayuda</h3>
                        <div class="config-form">
                            <div class="search-help">
                                <input type="text" placeholder="Buscar en la ayuda...">
                                <button><i class="fas fa-search"></i></button>
                            </div>
                            <div class="help-categories">
                                <div class="help-category">
                                    <i class="fas fa-book"></i>
                                    <h4>Guías de Usuario</h4>
                                    <p>Tutoriales paso a paso para usar el sistema</p>
                                </div>
                                <div class="help-category">
                                    <i class="fas fa-video"></i>
                                    <h4>Videos Tutoriales</h4>
                                    <p>Aprende viendo videos explicativos</p>
                                </div>
                                <div class="help-category">
                                    <i class="fas fa-question-circle"></i>
                                    <h4>Preguntas Frecuentes</h4>
                                    <p>Resuelve tus dudas más comunes</p>
                                </div>
                                <div class="help-category">
                                    <i class="fas fa-file-alt"></i>
                                    <h4>Documentación</h4>
                                    <p>Manuales y documentación técnica</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="configuracion-footer">
                <button class="guardar-btn" id="guardarConfiguracionBtn">
                    <i class="fas fa-save"></i> Guardar Cambios
                </button>
                <button class="cancelar-btn" id="cancelarConfiguracionBtn">
                    <i class="fas fa-times"></i> Cancelar
                </button>
            </div>
        </div>
    </div>

    <!-- Modal Editar Cliente -->
    <div id="editarClienteModal" class="nuevo-usuario-modal" style="display:none;">
        <div class="nuevo-usuario-panel">
            <div class="nuevo-usuario-header">
                <h2><i class="fas fa-user-edit"></i> Editar Cliente</h2>
                <button class="cerrar-btn" id="closeEditarClienteModal"><i class="fas fa-times"></i></button>
            </div>
            <form id="formEditarCliente" class="nuevo-usuario-form">
                <div class="form-group">
                    <label for="ecImagen">Imagen del Cliente</label>
                    <div class="imagen-preview-container">
                        <img id="ecImagenPreview" src="Images/LogoSoloOlivia.png" alt="Vista previa"
                            style="width: 90px; height: 90px; border-radius: 50%; object-fit: cover;">
                        <input type="file" id="ecImagen" accept="image/*" style="display: none;">
                        <button type="button" class="cambiar-imagen-btn"
                            onclick="document.getElementById('ecImagen').click()">
                            <i class="fas fa-camera"></i> Cambiar imagen
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="ecNombre">Nombre completo</label>
                    <input type="text" id="ecNombre" required placeholder="Nombre completo">
                </div>
                <div class="form-group">
                    <label for="ecEmail">Email</label>
                    <input type="email" id="ecEmail" required placeholder="Correo electrónico">
                </div>
                <div class="form-group">
                    <label for="ecTelefono">Teléfono</label>
                    <input type="tel" id="ecTelefono" required placeholder="Teléfono">
                </div>
                <div class="form-group">
                    <label for="ecVentas">Ventas Realizadas</label>
                    <input type="number" id="ecVentas" min="0" required placeholder="Cantidad de ventas">
                </div>
                <div class="form-group">
                    <label for="ecProductos">Productos Comprados</label>
                    <input type="text" id="ecProductos" required placeholder="Productos comprados (separados por coma)">
                </div>
                <div class="form-actions">
                    <button type="submit" class="guardar-btn"><i class="fas fa-save"></i> Guardar Cambios</button>
                    <button type="button" class="cancelar-btn" id="cancelarEditarClienteBtn"><i
                            class="fas fa-times"></i> Cancelar</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Nuevo Cliente -->
    <div id="nuevoClienteModal" class="nuevo-usuario-modal" style="display:none;">
        <div class="nuevo-usuario-panel">
            <div class="nuevo-usuario-header">
                <h2><i class="fas fa-user-plus"></i> Nuevo Cliente</h2>
                <button class="cerrar-btn" id="closeNuevoClienteModal"><i class="fas fa-times"></i></button>
            </div>
            <form id="formNuevoCliente" class="nuevo-usuario-form" autocomplete="off">
                <div class="form-group">
                    <label for="ncImagen">Imagen del Cliente</label>
                    <div class="imagen-preview-container">
                        <img id="ncImagenPreview" src="Images/LogoSoloOlivia.png" alt="Vista previa"
                            style="width: 90px; height: 90px; border-radius: 50%; object-fit: cover;">
                        <input type="file" id="ncImagen" accept="image/*" style="display: none;">
                        <button type="button" class="cambiar-imagen-btn"
                            onclick="document.getElementById('ncImagen').click()">
                            <i class="fas fa-camera"></i> Subir imagen
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="ncNombre">Nombre completo</label>
                    <input type="text" id="ncNombre" required placeholder="Nombre completo">
                </div>
                <div class="form-group">
                    <label for="ncEmail">Email</label>
                    <input type="email" id="ncEmail" required placeholder="Correo electrónico">
                </div>
                <div class="form-group">
                    <label for="ncTelefono">Teléfono</label>
                    <input type="tel" id="ncTelefono" required placeholder="Teléfono">
                </div>
                <div class="form-group">
                    <label for="ncVentas">Ventas Realizadas</label>
                    <input type="number" id="ncVentas" min="0" required placeholder="Cantidad de ventas">
                </div>
                <div class="form-group">
                    <label for="ncProductos">Productos Comprados</label>
                    <input type="text" id="ncProductos" required placeholder="Productos comprados (separados por coma)">
                </div>
                <div class="form-actions">
                    <button type="submit" class="guardar-btn"><i class="fas fa-save"></i> Guardar Cliente</button>
                    <button type="button" class="cancelar-btn" id="cancelarNuevoClienteBtn"><i class="fas fa-times"></i>
                        Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</body>

</html>
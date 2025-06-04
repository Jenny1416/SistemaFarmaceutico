// Datos de ejemplo para proveedores y pedidos
const proveedores = [
  {
    nombre: "Farmacéutica Nacional",
    direccion: "Av. Reforma 123, CDMX",
    contacto: { nombre: "María González", email: "contacto@farmaceuticanacional.com", tel: "+52 55 1234 5678" },
    productos: [
      { nombre: "Paracetamol 500mg", precio: 3.5, stock: 1200 },
      { nombre: "Aspirina 100mg", precio: 2.9, stock: 800 },
      { nombre: "Amoxicilina 250mg", precio: 8.3, stock: 450 }
    ]
  },
  {
    nombre: "MediPharma",
    direccion: "Calle Industria 456, Guadalajara",
    contacto: { nombre: "Carlos Rodríguez", email: "ventas@medipharma.com", tel: "+52 55 8765 4321" },
    productos: [
      { nombre: "Ibuprofeno 400mg", precio: 4.2, stock: 950 },
      { nombre: "Loratadina 10mg", precio: 5.1, stock: 720 },
      { nombre: "Cetirizina 10mg", precio: 6.4, stock: 580 }
    ]
  },
  {
    nombre: "FarmaGlobal",
    direccion: "Blvd. Principal 789, Monterrey",
    contacto: { nombre: "Ana López", email: "info@farmaglobal.com", tel: "+52 55 2468 1357" },
    productos: [
      { nombre: "Omeprazol 20mg", precio: 9.8, stock: 420 },
      { nombre: "Diclofenaco 50mg", precio: 3.8, stock: 680 },
      { nombre: "Ranitidina 150mg", precio: 7.2, stock: 320 }
    ]
  },
  {
    nombre: "BioMed Suministros",
    direccion: "Av. Universidad 321, Puebla",
    contacto: { nombre: "Roberto Sánchez", email: "ventas@biomed.com", tel: "+52 55 9753 1246" },
    productos: [
      { nombre: "Metformina 850mg", precio: 8.9, stock: 540 },
      { nombre: "Atorvastatina 20mg", precio: 12.3, stock: 380 },
      { nombre: "Losartán 50mg", precio: 9.5, stock: 420 }
    ]
  },
  {
    nombre: "Laboratorios Médicos",
    direccion: "Calle Salud 654, Queretaro",
    contacto: { nombre: "Laura Martínez", email: "contacto@labmed.com", tel: "+52 55 3698 1472" },
    productos: [
      { nombre: "Vitamina C 500mg", precio: 6.7, stock: 890 },
      { nombre: "Zinc 50mg", precio: 5.5, stock: 650 },
      { nombre: "Complejo B", precio: 8.2, stock: 480 }
    ]
  }
];

const pedidos = [
  { id: "#1001", proveedor: "Farmacéutica Nacional", fecha: "14/2/2025", productos: "Paracetamol 500mg\nAspirina 100mg", total: 4500, estado: "entregado" },
  { id: "#1002", proveedor: "Farmacéutica Nacional", fecha: "28/2/2025", productos: "Amoxicilina 250mg", total: 2490, estado: "camino" },
  { id: "#2001", proveedor: "MediPharma", fecha: "19/2/2025", productos: "Ibuprofeno 400mg\nLoratadina 10mg", total: 5600, estado: "entregado" },
  { id: "#2002", proveedor: "MediPharma", fecha: "4/3/2025", productos: "Cetirizina 10mg", total: 3200, estado: "demorado" },
  { id: "#3001", proveedor: "FarmaGlobal", fecha: "24/2/2025", productos: "Omeprazol 20mg", total: 3920, estado: "entregado" },
  { id: "#3002", proveedor: "FarmaGlobal", fecha: "9/3/2025", productos: "Diclofenaco 50mg\nRanitidina 150mg", total: 4400, estado: "rechazado" },
  { id: "#4001", proveedor: "BioMed Suministros", fecha: "27/2/2025", productos: "Metformina 850mg\nAtorvastatina 20mg", total: 7850, estado: "entregado" },
  { id: "#4002", proveedor: "BioMed Suministros", fecha: "14/3/2025", productos: "Losartán 50mg", total: 3800, estado: "camino" },
  { id: "#5001", proveedor: "Laboratorios Médicos", fecha: "1/3/2025", productos: "Vitamina C 500mg\nZinc 50mg", total: 6100, estado: "entregado" },
  { id: "#5002", proveedor: "Laboratorios Médicos", fecha: "17/3/2025", productos: "Complejo B", total: 2460, estado: "demorado" }
];

// Renderizar proveedores
function renderProveedores() {
  const tbody = document.getElementById("proveedoresBody");
  tbody.innerHTML = "";
  proveedores.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>
          <div class="proveedor-nombre">${p.nombre}</div>
          <div class="proveedor-direccion">${p.direccion}</div>
        </td>
        <td>
          <div class="proveedor-contacto"><i class="fas fa-user"></i> ${p.contacto.nombre}</div>
          <div class="proveedor-contacto"><i class="fas fa-envelope"></i> ${p.contacto.email}</div>
          <div class="proveedor-contacto"><i class="fas fa-phone"></i> ${p.contacto.tel}</div>
        </td>
        <td>
          <div class="proveedor-productos">
            ${p.productos.map(prod => `${prod.nombre} - $${prod.precio.toFixed(2)} (${prod.stock} disponibles)`).join("<br>")}
          </div>
        </td>
        <td class="proveedor-acciones">
          <button class="btn-mensaje"><i class="fas fa-comment-dots"></i> Mensaje</button>
          <button class="btn-ordenar"><i class="fas fa-shopping-cart"></i> Ordenar</button>
        </td>
      </tr>
    `;
  });
}

// Renderizar pedidos
function renderPedidos() {
  const tbody = document.getElementById("pedidosBody");
  tbody.innerHTML = "";
  pedidos.forEach(p => {
    let estadoClass = "";
    if (p.estado === "entregado") estadoClass = "estado-entregado";
    else if (p.estado === "camino") estadoClass = "estado-camino";
    else if (p.estado === "demorado") estadoClass = "estado-demorado";
    else if (p.estado === "rechazado") estadoClass = "estado-rechazado";
    tbody.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.proveedor}</td>
        <td>${p.fecha}</td>
        <td style="white-space:pre-line">${p.productos}</td>
        <td>$${p.total.toFixed(2)}</td>
        <td><span class="estado-pedido ${estadoClass}">${capitalizeEstado(p.estado)}</span></td>
        <td>Acciones</td>
      </tr>
    `;
  });
}
function capitalizeEstado(e) {
  if (e === "camino") return "En camino";
  if (e === "entregado") return "Entregado";
  if (e === "demorado") return "Demorado";
  if (e === "rechazado") return "Rechazado";
  return e.charAt(0).toUpperCase() + e.slice(1);
}

// Tabs
document.addEventListener("DOMContentLoaded", function() {
  // Mostrar modal (ahora sí activado)
  document.getElementById("btnProveedores").onclick = () => {
    document.getElementById("proveedoresModal").style.display = "flex";
    renderProveedores();
    renderPedidos();
  };

  // Cerrar modal
  document.getElementById("closeProveedoresBtn").onclick = () => {
    document.getElementById("proveedoresModal").style.display = "none";
  };

  // Tabs
  document.querySelectorAll(".proveedores-tabs .tab-btn").forEach(btn => {
    btn.onclick = function() {
      document.querySelectorAll(".proveedores-tabs .tab-btn").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      document.querySelectorAll(".tab-section").forEach(sec => sec.classList.remove("active"));
      document.getElementById("tab-" + this.dataset.tab).classList.add("active");
    };
  });

  // Render inicial
  renderProveedores();
  renderPedidos();
});

// Funcionalidad para el Modal de Nuevo Proveedor
document.addEventListener('DOMContentLoaded', function() {
    const nuevoProveedorBtn = document.getElementById('nuevoProveedorBtn');
    const nuevoProveedorModal = document.getElementById('nuevoProveedorModal');
    const closeNuevoProveedorBtn = document.getElementById('closeNuevoProveedorBtn');
    const cancelarNuevoProveedorBtn = document.getElementById('cancelarNuevoProveedorBtn');
    const formNuevoProveedor = document.getElementById('formNuevoProveedor');
    const npProducto = document.getElementById('npProducto');
    const agregarProductoBtn = document.getElementById('agregarProductoBtn');
    const productosLista = document.getElementById('productosLista');
    
    // Array para almacenar los productos
    let productos = [];

    // Función para abrir el modal
    function abrirModalNuevoProveedor() {
        nuevoProveedorModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Función para cerrar el modal
    function cerrarModalNuevoProveedor() {
        nuevoProveedorModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Limpiar el formulario
        formNuevoProveedor.reset();
        productos = [];
        productosLista.innerHTML = '';
    }

    // Event Listeners para abrir/cerrar el modal
    nuevoProveedorBtn.addEventListener('click', abrirModalNuevoProveedor);
    closeNuevoProveedorBtn.addEventListener('click', cerrarModalNuevoProveedor);
    cancelarNuevoProveedorBtn.addEventListener('click', cerrarModalNuevoProveedor);

    // Cerrar modal al hacer clic fuera
    nuevoProveedorModal.addEventListener('click', function(e) {
        if (e.target === nuevoProveedorModal) {
            cerrarModalNuevoProveedor();
        }
    });

    // Función para agregar un producto
    function agregarProducto() {
        const producto = npProducto.value.trim();
        if (producto && !productos.includes(producto)) {
            productos.push(producto);
            actualizarListaProductos();
            npProducto.value = '';
            npProducto.focus();
        }
    }

    // Función para eliminar un producto
    function eliminarProducto(index) {
        productos.splice(index, 1);
        actualizarListaProductos();
    }

    // Función para actualizar la lista visual de productos
    function actualizarListaProductos() {
        productosLista.innerHTML = '';
        productos.forEach((producto, index) => {
            const tag = document.createElement('div');
            tag.className = 'producto-tag';
            tag.innerHTML = `
                ${producto}
                <i class="fas fa-times eliminar-producto" data-index="${index}"></i>
            `;
            productosLista.appendChild(tag);
        });

        // Agregar event listeners a los botones de eliminar
        document.querySelectorAll('.eliminar-producto').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                eliminarProducto(index);
            });
        });
    }

    // Event Listeners para agregar productos
    agregarProductoBtn.addEventListener('click', agregarProducto);
    npProducto.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            agregarProducto();
        }
    });

    // Manejar el envío del formulario
    formNuevoProveedor.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí puedes agregar la lógica para guardar el proveedor
        const proveedor = {
            cedula: document.getElementById('npCedula').value,
            nombre: document.getElementById('npNombreProveedor').value,
            telefono: document.getElementById('npTelefono').value,
            email: document.getElementById('npEmail').value,
            empresa: document.getElementById('npEmpresa').value,
            direccion: document.getElementById('npDireccion').value,
            productos: productos
        };

        // Mostrar animación de proceso exitoso
        mostrarProcesoModal('exito', '¡Proveedor agregado exitosamente!');
        
        // Cerrar el modal
        cerrarModalNuevoProveedor();
    });
});

// --- PANEL DE PEDIDO A PROVEEDOR ---
document.addEventListener('DOMContentLoaded', function() {
    const pedidoProveedorModal = document.getElementById('pedidoProveedorModal');
    const closePedidoProveedorBtn = document.getElementById('closePedidoProveedorBtn');
    const pedidoProveedorNombre = document.getElementById('pedidoProveedorNombre');
    const pedidoProveedorEmpresa = document.getElementById('pedidoProveedorEmpresa');
    const pedidoProductosBody = document.getElementById('pedidoProductosBody');
    const pedidoLista = document.getElementById('pedidoLista');
    const pedidoAnotaciones = document.getElementById('pedidoAnotaciones');
    const enviarPedidoBtn = document.getElementById('enviarPedidoBtn');

    let productosPedido = [];
    let proveedorActual = null;

    // Abrir modal de pedido al hacer click en "Ordenar"
    document.body.addEventListener('click', function(e) {
        if (e.target.closest('.btn-ordenar')) {
            // Buscar el proveedor correspondiente
            const fila = e.target.closest('tr');
            const nombreProveedor = fila.querySelector('.proveedor-nombre').textContent;
            proveedorActual = proveedores.find(p => p.nombre === nombreProveedor);
            if (!proveedorActual) return;
            // Mostrar info
            pedidoProveedorNombre.textContent = proveedorActual.contacto.nombre;
            pedidoProveedorEmpresa.textContent = proveedorActual.nombre;
            // Renderizar productos
            renderPedidoProductos(proveedorActual.productos);
            // Limpiar lista y anotaciones
            productosPedido = [];
            renderPedidoLista();
            pedidoAnotaciones.value = '';
            // Mostrar modal
            pedidoProveedorModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });

    // Cerrar modal
    closePedidoProveedorBtn.addEventListener('click', cerrarPedidoModal);
    pedidoProveedorModal.addEventListener('click', function(e) {
        if (e.target === pedidoProveedorModal) cerrarPedidoModal();
    });
    function cerrarPedidoModal() {
        pedidoProveedorModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Renderizar tabla de productos del proveedor
    function renderPedidoProductos(productos) {
        pedidoProductosBody.innerHTML = '';
        productos.forEach((prod, idx) => {
            pedidoProductosBody.innerHTML += `
                <tr>
                    <td>${prod.nombre}</td>
                    <td>${prod.stock}</td>
                    <td>$${prod.precio.toFixed(2)}</td>
                    <td><input type="number" min="1" max="${prod.stock}" value="1" id="cantidadProd${idx}"></td>
                    <td><button class="pedido-agregar-btn" data-idx="${idx}"><i class="fas fa-plus"></i></button></td>
                </tr>
            `;
        });
    }

    // Agregar producto a la lista de pedido
    pedidoProductosBody.addEventListener('click', function(e) {
        if (e.target.closest('.pedido-agregar-btn')) {
            const idx = e.target.closest('.pedido-agregar-btn').getAttribute('data-idx');
            const prod = proveedorActual.productos[idx];
            const cantidad = parseInt(document.getElementById('cantidadProd'+idx).value);
            if (!cantidad || cantidad < 1) return;
            // Si ya está en la lista, sumar cantidad
            const existente = productosPedido.find(p => p.nombre === prod.nombre);
            if (existente) {
                existente.cantidad += cantidad;
            } else {
                productosPedido.push({ nombre: prod.nombre, cantidad, precio: prod.precio });
            }
            renderPedidoLista();
        }
    });

    // Renderizar lista de productos a pedir
    function renderPedidoLista() {
        pedidoLista.innerHTML = '';
        productosPedido.forEach((item, idx) => {
            const tag = document.createElement('div');
            tag.className = 'pedido-item-tag';
            tag.innerHTML = `
                ${item.nombre} <span style="color:#2563eb;font-weight:700;">x${item.cantidad}</span>
                <i class="fas fa-times eliminar-pedido-item" data-idx="${idx}"></i>
            `;
            pedidoLista.appendChild(tag);
        });
    }
    // Eliminar producto de la lista
    pedidoLista.addEventListener('click', function(e) {
        if (e.target.classList.contains('eliminar-pedido-item')) {
            const idx = e.target.getAttribute('data-idx');
            productosPedido.splice(idx, 1);
            renderPedidoLista();
        }
    });

    // Enviar pedido
    enviarPedidoBtn.addEventListener('click', function() {
        if (productosPedido.length === 0) {
            mostrarProcesoModal('error', 'Agrega al menos un producto al pedido.');
            return;
        }
        // Aquí podrías enviar el pedido a backend...
        cerrarPedidoModal();
        mostrarProcesoModal('exito', '¡Pedido enviado al proveedor!');
    });
});

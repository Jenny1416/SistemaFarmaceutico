// Datos de ejemplo (puedes reemplazar por datos reales)
const productos = [
    { nombre: "Paracetamol 500mg", unitario: 3.5, venta: 5.99, cantidad: 120, categoria: "Analgésicos", expiracion: "14/6/2025" },
    { nombre: "Ibuprofeno 400mg", unitario: 4.2, venta: 7.5, cantidad: 85, categoria: "Antiinflamatorios", expiracion: "21/8/2025" },
    { nombre: "Amoxicilina 250mg", unitario: 8.3, venta: 12.75, cantidad: 42, categoria: "Antibióticos", expiracion: "9/12/2024" },
    { nombre: "Loratadina 10mg", unitario: 5.1, venta: 8.25, cantidad: 63, categoria: "Antialérgicos", expiracion: "17/4/2025" },
    { nombre: "Omeprazol 20mg", unitario: 9.8, venta: 15.3, cantidad: 37, categoria: "Antiácidos", expiracion: "4/2/2025" },
    { nombre: "Aspirina 100mg", unitario: 2.9, venta: 4.99, cantidad: 150, categoria: "Analgésicos", expiracion: "29/9/2025" },
    { nombre: "Cetirizina 10mg", unitario: 6.4, venta: 9.75, cantidad: 55, categoria: "Antialérgicos", expiracion: "11/5/2025" },
    { nombre: "Diclofenaco 50mg", unitario: 3.8, venta: 6.5, cantidad: 78, categoria: "Antiinflamatorios", expiracion: "7/7/2025" },
    { nombre: "Ranitidina 150mg", unitario: 7.2, venta: 11.99, cantidad: 25, categoria: "Antiácidos", expiracion: "14/11/2024" },
    { nombre: "Metformina 850mg", unitario: 8.9, venta: 14.5, cantidad: 0, categoria: "Antidiabéticos", expiracion: "19/3/2025" },
    { nombre: "Atorvastatina 20mg", unitario: 12.3, venta: 18.75, cantidad: 5, categoria: "Hipolipemiantes", expiracion: "24/1/2025" },
    { nombre: "Losartán 50mg", unitario: 9.5, venta: 15.99, cantidad: 32, categoria: "Antihipertensivos", expiracion: "29/12/2024" },
];

// Lista de categorías iniciales
let categorias = [
    "Analgésicos", "Antiinflamatorios", "Antibióticos", "Antialérgicos",
    "Antiácidos", "Antidiabéticos", "Hipolipemiantes", "Antihipertensivos"
];

// Función para cargar las categorías en el select
function cargarCategorias() {
    const select = document.getElementById("npCategoria");
    if (!select) return;
    select.innerHTML = "";
    categorias.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });
}

// Determina el estado según la cantidad
function getEstado(cantidad) {
    if (cantidad > 20) return { texto: "Disponible", clase: "estado-disponible", row: "" };
    if (cantidad > 0) return { texto: "Bajo", clase: "estado-bajo", row: "row-bajo" };
    return { texto: "Agotado", clase: "estado-agotado", row: "row-agotado" };
}

// Renderiza la tabla de inventario
function renderInventario(filtro = "", tipoFiltro = "nombre") {
    const tbody = document.getElementById("inventarioBody");
    tbody.innerHTML = "";
    let filtrados = productos.filter(p => {
        if (tipoFiltro === "nombre") return p.nombre.toLowerCase().includes(filtro.toLowerCase());
        if (tipoFiltro === "categoria") return p.categoria.toLowerCase().includes(filtro.toLowerCase());
        if (tipoFiltro === "estado") {
            const estado = getEstado(p.cantidad).texto.toLowerCase();
            return estado.includes(filtro.toLowerCase());
        }
        if (tipoFiltro === "fecha") return p.expiracion.includes(filtro);
        return true;
    });
    filtrados.forEach((p, idx) => {
        const estado = getEstado(p.cantidad);
        tbody.innerHTML += `
            <tr class="${estado.row}">
                <td><img src="/Images/LogoSoloOlivia.png" alt="${p.nombre}" class="producto-imagen-circular"></td>
                <td>${p.nombre}</td>
                <td>$${p.unitario.toFixed(2)}</td>
                <td>$${p.venta.toFixed(2)}</td>
                <td>${p.cantidad}</td>
                <td><span class="estado-btn ${estado.clase}">${estado.texto}</span></td>
                <td>${p.categoria}</td>
                <td>${p.expiracion}</td>
                <td>
                    <button class="edit-btn" data-idx="${idx}"><i class="fas fa-pen"></i></button>
                    <button class="delete-btn" data-idx="${idx}"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
    document.getElementById("inventarioCount").textContent = `Mostrando ${filtrados.length} de ${productos.length} productos`;

    // Asignar eventos a los botones de editar y eliminar
    tbody.querySelectorAll('.edit-btn').forEach(btn => {
        btn.onclick = function() {
            const idx = this.getAttribute('data-idx');
            abrirPanelEditarProducto(filtrados[idx], idx);
        };
    });
    tbody.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = function() {
            const idx = this.getAttribute('data-idx');
            eliminarProducto(filtrados[idx], idx);
        };
    });
}

// Mostrar/ocultar panel y fondo modal
document.addEventListener("DOMContentLoaded", () => {
    // Mostrar panel al hacer click en "Inventario"
    document.querySelectorAll(".menu-item").forEach(item => {
        if (item.textContent.includes("Inventario")) {
            item.addEventListener("click", () => {
                document.getElementById("inventarioModalBg").style.display = "flex";
                renderInventario();
            });
        }
    });
    // Cerrar panel
    document.getElementById("closeInventarioBtn").onclick = () => {
        document.getElementById("inventarioModalBg").style.display = "none";
    };

    // Buscar productos
    let tipoFiltro = "nombre";
    document.getElementById("buscarProducto").addEventListener("input", e => {
        renderInventario(e.target.value, tipoFiltro);
    });

    // Dropdown de filtro
    const filterBtn = document.getElementById("filterBtn");
    const filtroDropdown = document.getElementById("filtroDropdown");
    const filtroOpciones = filtroDropdown.querySelectorAll(".filtro-opcion");
    let filtroSeleccionado = "nombre";

    filterBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        filtroDropdown.classList.toggle("show");
    });

    filtroOpciones.forEach(op => {
        op.addEventListener("click", function() {
            filtroOpciones.forEach(o => o.classList.remove("selected"));
            this.classList.add("selected");
            filtroSeleccionado = this.getAttribute("data-filtro");
            tipoFiltro = filtroSeleccionado;
            filterBtn.classList.add("active");
            filterBtn.querySelector(".filtro-texto").textContent = this.textContent;
            filtroDropdown.classList.remove("show");
            // Limpiar búsqueda y renderizar
            document.getElementById("buscarProducto").value = "";
            renderInventario("", tipoFiltro);
        });
    });

    // Cerrar dropdown si se hace click fuera
    document.addEventListener("click", (e) => {
        if (!filtroDropdown.contains(e.target) && !filterBtn.contains(e.target)) {
            filtroDropdown.classList.remove("show");
        }
    });

    // Animaciones para botones de acción
    document.addEventListener("mouseover", e => {
        if (e.target.classList.contains("edit-btn") || e.target.classList.contains("delete-btn")) {
            e.target.style.transform = "scale(1.15)";
        }
    });
    document.addEventListener("mouseout", e => {
        if (e.target.classList.contains("edit-btn") || e.target.classList.contains("delete-btn")) {
            e.target.style.transform = "scale(1)";
        }
    });

    // Botón "Nuevo Producto" abre el panel de nuevo producto
    const nuevoProductoBtn = document.getElementById("nuevoProductoBtn");
    if (nuevoProductoBtn) {
        nuevoProductoBtn.onclick = () => {
            document.getElementById("nuevoProductoModal").style.display = "flex";
            cargarCategorias();
        };
    }

    const closeNuevoProductoBtn = document.getElementById("closeNuevoProductoBtn");
    if (closeNuevoProductoBtn) {
        closeNuevoProductoBtn.onclick = () => {
            document.getElementById("nuevoProductoModal").style.display = "none";
        };
    }

    // Abrir mini panel de nueva categoría
    const addCategoriaBtn = document.getElementById("addCategoriaBtn");
    if (addCategoriaBtn) {
        addCategoriaBtn.onclick = () => {
            document.getElementById("nuevaCategoriaModal").style.display = "flex";
            document.getElementById("inputNuevaCategoria").value = "";
            setTimeout(() => document.getElementById("inputNuevaCategoria").focus(), 100);
        };
    }

    // Guardar nueva categoría
    const guardarCategoriaBtn = document.getElementById("guardarCategoriaBtn");
    if (guardarCategoriaBtn) {
        guardarCategoriaBtn.onclick = () => {
            const nuevaCat = document.getElementById("inputNuevaCategoria").value.trim();
            if (nuevaCat && !categorias.includes(nuevaCat)) {
                categorias.push(nuevaCat);
                cargarCategorias();
                document.getElementById("npCategoria").value = nuevaCat;
            }
            document.getElementById("nuevaCategoriaModal").style.display = "none";
        };
    }

    // Cancelar nueva categoría
    const cancelarCategoriaBtn = document.getElementById("cancelarCategoriaBtn");
    if (cancelarCategoriaBtn) {
        cancelarCategoriaBtn.onclick = () => {
            document.getElementById("nuevaCategoriaModal").style.display = "none";
        };
    }

    // Manejar el submit del formulario de nuevo producto
    const formNuevoProducto = document.getElementById("formNuevoProducto");
    if (formNuevoProducto) {
        formNuevoProducto.onsubmit = function(e) {
            e.preventDefault();

            // Obtener valores
            const nombre = document.getElementById("npNombre").value.trim();
            const cantidad = parseInt(document.getElementById("npCantidad").value);
            const stock = parseInt(document.getElementById("npStock").value);
            const unitario = parseFloat(document.getElementById("npUnitario").value);
            const venta = parseFloat(document.getElementById("npVenta").value);
            const expiracion = document.getElementById("npExpiracion").value;
            const categoria = document.getElementById("npCategoria").value;

            // Validación simple
            if (!nombre || isNaN(cantidad) || isNaN(stock) || isNaN(unitario) || isNaN(venta) || !expiracion || !categoria) {
                mostrarProcesoModal("error", "Por favor, completa todos los campos correctamente.");
                return;
            }

            // Obtener la imagen
            const newImg = document.getElementById('npImagenPreview').getAttribute('data-new-img');

            // Agregar producto al array
            productos.push({
                nombre,
                unitario,
                venta,
                cantidad,
                categoria,
                expiracion: expiracion.split("-").reverse().join("/"),
                imagen: newImg
            });

            // Actualizar tabla
            renderInventario();

            // Cerrar modal de nuevo producto
            document.getElementById("nuevoProductoModal").style.display = "none";

            // Mostrar notificación de éxito
            mostrarProcesoModal("exito", "¡Producto agregado exitosamente!");

            // Limpiar formulario
            formNuevoProducto.reset();

            // Limpiar imagen preview
            document.getElementById('npImagenPreview').src = '/Images/LogoSoloOlivia.png';
            document.getElementById('npImagenPreview').removeAttribute('data-new-img');
        };
    }

    // Vista previa de imagen en nuevo producto
    const npImagenInput = document.getElementById('npImagen');
    if (npImagenInput) {
        npImagenInput.onchange = function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('npImagenPreview').src = e.target.result;
                    document.getElementById('npImagenPreview').setAttribute('data-new-img', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        };
    }
});

// Colores de fila para bajo y agotado
document.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement('style');
    style.innerHTML = `
        .row-bajo { background: #fffde7 !important; }
        .row-agotado { background: #fff0f0 !important; }
    `;
    document.head.appendChild(style);
});

// Mostrar modal de proceso con animación
function mostrarProcesoModal(tipo = "exito", mensaje = "¡Proceso exitoso!") {
    const modal = document.getElementById("procesoModal");
    const panel = modal.querySelector(".proceso-panel");
    const animacion = document.getElementById("procesoAnimacion");
    const mensajeDiv = document.getElementById("procesoMensaje");

    // Limpia clases previas
    panel.classList.remove("exito", "error");
    animacion.innerHTML = "";

    if (tipo === "exito") {
        panel.classList.add("exito");
        // SVG animado: círculo + check
        animacion.innerHTML = `
        <svg width="80" height="80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#22c55e" stroke-width="6"
                stroke-dasharray="201" stroke-dashoffset="201">
                <animate attributeName="stroke-dashoffset" from="201" to="0" dur="0.5s" fill="freeze"/>
            </circle>
            <polyline points="25,43 37,55 57,33" fill="none" stroke="#22c55e" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"
                stroke-dasharray="40" stroke-dashoffset="40">
                <animate attributeName="stroke-dashoffset" from="40" to="0" begin="0.5s" dur="0.4s" fill="freeze"/>
            </polyline>
        </svg>
        `;
    } else {
        panel.classList.add("error");
        // SVG animado: círculo + X
        animacion.innerHTML = `
        <svg width="80" height="80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#e74c3c" stroke-width="6"
                stroke-dasharray="201" stroke-dashoffset="201">
                <animate attributeName="stroke-dashoffset" from="201" to="0" dur="0.5s" fill="freeze"/>
            </circle>
            <line x1="28" y1="28" x2="52" y2="52" stroke="#e74c3c" stroke-width="6" stroke-linecap="round"
                stroke-dasharray="34" stroke-dashoffset="34">
                <animate attributeName="stroke-dashoffset" from="34" to="0" begin="0.5s" dur="0.3s" fill="freeze"/>
            </line>
            <line x1="52" y1="28" x2="28" y2="52" stroke="#e74c3c" stroke-width="6" stroke-linecap="round"
                stroke-dasharray="34" stroke-dashoffset="34">
                <animate attributeName="stroke-dashoffset" from="34" to="0" begin="0.8s" dur="0.3s" fill="freeze"/>
            </line>
        </svg>
        `;
    }
    mensajeDiv.textContent = mensaje;
    modal.style.display = "flex";
    // Ocultar automáticamente después de 1.8s
    setTimeout(() => {
        modal.style.display = "none";
    }, 1800);
}

function abrirPanelEditarProducto(producto, idx) {
    document.getElementById('editarProductoModal').style.display = 'flex';
    document.getElementById('epNombre').value = producto.nombre;
    document.getElementById('epCantidad').value = producto.cantidad;
    document.getElementById('epStock').value = producto.stock || '';
    document.getElementById('epUnitario').value = producto.unitario;
    document.getElementById('epVenta').value = producto.venta;
    document.getElementById('epExpiracion').value = formatearFechaInput(producto.expiracion);
    cargarCategoriasEditar(producto.categoria);
    document.getElementById('epImagenPreview').src = producto.imagen || '/Images/LogoSoloOlivia.png';
    document.getElementById('epImagen').value = '';
    document.getElementById('editarProductoModal').setAttribute('data-edit-idx', idx);
}

function formatearFechaInput(fecha) {
    if (!fecha) return '';
    const partes = fecha.split('/');
    if (partes.length === 3) {
        return `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
    }
    return fecha;
}

function cargarCategoriasEditar(actual) {
    const select = document.getElementById('epCategoria');
    if (!select) return;
    select.innerHTML = '';
    categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        if (cat === actual) option.selected = true;
        select.appendChild(option);
    });
}

function eliminarProducto(producto, idx) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
        productos.splice(productos.indexOf(producto), 1);
        renderInventario();
        mostrarProcesoModal('exito', 'Producto eliminado correctamente');
    }
}

// const btnNuevoCliente = document.getElementById('btnNuevoCliente');
// const customerForm = document.getElementById('customerForm');
// const btnGuardarCliente = document.getElementById('btnGuardarCliente');

// if (btnNuevoCliente && customerForm && btnGuardarCliente) {
//     btnNuevoCliente.addEventListener('click', function() {
//         customerForm.style.display = 'flex';
//         btnGuardarCliente.style.display = 'block';
//     });
// }

document.addEventListener('DOMContentLoaded', function() {
    // Cerrar con la X
    const closeEditarProductoBtn = document.getElementById('closeEditarProductoBtn');
    if (closeEditarProductoBtn) {
        closeEditarProductoBtn.onclick = function() {
            document.getElementById('editarProductoModal').style.display = 'none';
        };
    }

    // Cerrar con el botón Cancelar
    const cancelarEditarProductoBtn = document.getElementById('cancelarEditarProductoBtn');
    if (cancelarEditarProductoBtn) {
        cancelarEditarProductoBtn.onclick = function() {
            document.getElementById('editarProductoModal').style.display = 'none';
        };
    }

    // Guardar cambios
    const formEditarProducto = document.getElementById('formEditarProducto');
    if (formEditarProducto) {
        formEditarProducto.onsubmit = function(e) {
            e.preventDefault();
            const idx = document.getElementById('editarProductoModal').getAttribute('data-edit-idx');
            if (idx === null) return;
            const producto = productos[idx];
            if (!producto) return;
            producto.nombre = document.getElementById('epNombre').value;
            producto.cantidad = parseInt(document.getElementById('epCantidad').value);
            producto.stock = parseInt(document.getElementById('epStock').value);
            producto.unitario = parseFloat(document.getElementById('epUnitario').value);
            producto.venta = parseFloat(document.getElementById('epVenta').value);
            producto.expiracion = document.getElementById('epExpiracion').value.split('-').reverse().join('/');
            producto.categoria = document.getElementById('epCategoria').value;
            // Si hay una nueva imagen, actualizarla
            const newImg = document.getElementById('epImagenPreview').getAttribute('data-new-img');
            if (newImg) {
                producto.imagen = newImg;
                document.getElementById('epImagenPreview').removeAttribute('data-new-img');
            }
            document.getElementById('editarProductoModal').style.display = 'none';
            renderInventario();
            mostrarProcesoModal('exito', '¡Producto actualizado exitosamente!');
        };
    }

    // Botón agregar categoría en edición
    const addCategoriaBtnEdit = document.getElementById('addCategoriaBtnEdit');
    if (addCategoriaBtnEdit) {
        addCategoriaBtnEdit.onclick = () => {
            document.getElementById("nuevaCategoriaModal").style.display = "flex";
            document.getElementById("inputNuevaCategoria").value = "";
            setTimeout(() => document.getElementById("inputNuevaCategoria").focus(), 100);
            document.getElementById("nuevaCategoriaModal").setAttribute('data-contexto', 'edicion');
        };
    }

    // Guardar nueva categoría desde el mini panel
    const guardarCategoriaBtn = document.getElementById("guardarCategoriaBtn");
    if (guardarCategoriaBtn) {
        guardarCategoriaBtn.onclick = () => {
            const nuevaCat = document.getElementById("inputNuevaCategoria").value.trim();
            if (nuevaCat && !categorias.includes(nuevaCat)) {
                categorias.push(nuevaCat);
                cargarCategorias();
                cargarCategoriasEditar(nuevaCat);
                if (document.getElementById("nuevaCategoriaModal").getAttribute('data-contexto') === 'edicion') {
                    document.getElementById("epCategoria").value = nuevaCat;
                } else {
                    document.getElementById("npCategoria").value = nuevaCat;
                }
            }
            document.getElementById("nuevaCategoriaModal").style.display = "none";
            document.getElementById("nuevaCategoriaModal").removeAttribute('data-contexto');
        };
    }
});

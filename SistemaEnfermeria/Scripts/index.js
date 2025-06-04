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

// Función para manejar el tema
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const logoImg = document.querySelector('.logo img'); // Seleccionar la imagen del logo
    
    // Función para actualizar el logo según el tema
    function updateLogo(theme) {
        if (theme === 'dark') {
            logoImg.src = '/Images/LogoOliviaNocturno.png';
        } else {
            logoImg.src = '/Images/LogoOlivia.png';
        }
    }
    
    // Verificar si hay un tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateLogo(savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateLogo('dark');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateLogo(newTheme);
    });
}

const ctx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Ventas Mensuales',
            data: [1500, 4000, 3200, 3800, 4200, 4800, 8500],
            backgroundColor: '#4ADE80',
            borderRadius: 6,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return '$' + value;
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

// Agregar las últimas ventas
const salesList = document.querySelector('.sales-list');
const recentSales = [
    { initials: 'JM', name: 'Juan Martinez', products: 'Paracetamol, Ibuprofeno', amount: 43000 },
    { initials: 'MR', name: 'Maria Rodriguez', products: 'Amoxicilina', amount: 60500 },
    { initials: 'CP', name: 'Carlos Pérez', products: 'Vitamina C, Zinc', amount: 230000 },
    { initials: 'AL', name: 'Ana López', products: 'Omeprazol', amount: 45000 },
    { initials: 'RG', name: 'Roberto García', products: 'Aspirina, Loratadina', amount: 15000 }
];

recentSales.forEach(sale => {
    const saleItem = `
        <div class="sale-item">
            <div class="sale-info">
                <div class="sale-avatar">${sale.initials}</div>
                <div class="sale-details">
                    <h4>${sale.name}</h4>
                    <p>${sale.products}</p>
                </div>
            </div>
            <div class="sale-amount">+$${sale.amount.toFixed(2)}</div>
        </div>
    `;
    salesList.innerHTML += saleItem;
});

// Manejar la activación de los elementos del menú
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // Remover la clase active de todos los items
        menuItems.forEach(i => i.classList.remove('active'));
        // Agregar la clase active al item clickeado
        e.currentTarget.classList.add('active');
    });
});

// Mostrar panel al hacer click en "Inventario"
document.querySelectorAll(".menu-item").forEach(item => {
    if (item.textContent.includes("Inventario")) {
        item.addEventListener("click", () => {
            document.getElementById("inventarioModalBg").style.display = "flex";
            renderInventario();
        });
    }
    // Mostrar panel de estadísticas al hacer click en "Estadísticas"
    if (item.textContent.includes("Estadísticas")) {
        item.addEventListener("click", () => {
            document.getElementById("estadisticasModal").style.display = "flex";
            if (typeof cargarResumen === 'function') cargarResumen();
        });
    }
});

// Funcionalidad del modal de venta y métodos de pago
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remover la clase active de todos los items
            menuItems.forEach(i => i.classList.remove('active'));
            // Agregar la clase active al item clickeado
            e.currentTarget.classList.add('active');
        });
    });

    // Manejo de métodos de pago
    const paymentButtons = document.querySelectorAll('.payment-btn');
    const paymentDetails = document.getElementById('paymentDetails');

    const paymentForms = {
        efectivo: `
            <div class="row">
                <div class="col">
                    <label>Monto recibido</label>
                    <input type="number" placeholder="Ingrese el monto">
                </div>
                <div class="col">
                    <label>Cambio a devolver</label>
                    <input type="number" readonly placeholder="0.00">
                </div>
            </div>
        `,
        tarjeta: `
            <div class="row">
                <div class="col">
                    <label>Tipo de tarjeta</label>
                    <select>
                        <option value="debito">Débito</option>
                        <option value="credito">Crédito</option>
                    </select>
                </div>
                <div class="col">
                    <label>Número de tarjeta</label>
                    <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label>Fecha de vencimiento</label>
                    <input type="text" placeholder="MM/YY">
                </div>
                <div class="col">
                    <label>CVV</label>
                    <input type="text" placeholder="123">
                </div>
            </div>
        `,
        transferencia: `
            <div class="row">
                <div class="col">
                    <label>Seleccione el banco</label>
                    <select>
                        <option value="">Seleccione un banco</option>
                        <option value="bancolombia">Bancolombia</option>
                        <option value="davivienda">Davivienda</option>
                        <option value="bbva">BBVA</option>
                        <option value="nequi">Nequi</option>
                        <option value="daviplata">Daviplata</option>
                    </select>
                </div>
                <div class="col">
                    <label>Número de referencia</label>
                    <input type="text" placeholder="Ingrese el número de referencia">
                </div>
            </div>
        `,
        otro: `
            <div class="row">
                <div class="col">
                    <label>Especifique el método de pago</label>
                    <input type="text" placeholder="Describa el método de pago">
                </div>
            </div>
        `
    };

    paymentButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover la clase selected de todos los botones
            paymentButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Agregar la clase selected al botón clickeado
            button.classList.add('selected');
            
            // Mostrar los campos correspondientes al método de pago
            const paymentMethod = button.getAttribute('data-method');
            paymentDetails.innerHTML = paymentForms[paymentMethod] || '';
        });
    });

    // -------------------- CLIENTES --------------------
    const btnBuscarAfiliado = document.getElementById('btnBuscarAfiliado');
    const btnNuevoCliente = document.getElementById('btnNuevoCliente');
    const customerForm = document.getElementById('customerForm');
    const btnGuardarCliente = document.getElementById('btnGuardarCliente');
    const clientesModal = document.getElementById('clientesModal');
    const closeClientesModal = document.getElementById('closeClientesModal');
    const searchCliente = document.getElementById('searchCliente');

    // Mostrar/ocultar formulario de nuevo cliente
    if (btnNuevoCliente && customerForm && btnGuardarCliente) {
        btnNuevoCliente.addEventListener('click', function() {
            customerForm.style.display = 'flex';
            btnGuardarCliente.style.display = 'block';
        });
    }

    // Mostrar modal de clientes afiliados directamente
    if (btnBuscarAfiliado && clientesModal && customerForm && btnGuardarCliente) {
        btnBuscarAfiliado.addEventListener('click', function() {
            clientesModal.style.display = 'block';
            customerForm.style.display = 'none';
            btnGuardarCliente.style.display = 'none';
        });
    }

    // Cerrar modal de clientes
    if (closeClientesModal && clientesModal) {
        closeClientesModal.addEventListener('click', function() {
            clientesModal.style.display = 'none';
        });
    }

    // Cerrar modal al hacer clic fuera
    if (clientesModal) {
        window.addEventListener('click', function(e) {
            if (e.target === clientesModal) {
                clientesModal.style.display = 'none';
            }
        });
    }

    // Búsqueda de clientes
    if (searchCliente) {
        searchCliente.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const clienteItems = document.querySelectorAll('.cliente-item');

            clienteItems.forEach(item => {
                const clienteInfo = item.textContent.toLowerCase();
                if (clienteInfo.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Seleccionar cliente
    document.addEventListener('click', function(e) {
        if (e.target.closest && e.target.closest('.btn-select-cliente')) {
            const btn = e.target.closest('.btn-select-cliente');
            const clienteData = JSON.parse(btn.dataset.cliente);

            // Llenar los campos del formulario
            if (customerForm) {
                const inputs = customerForm.querySelectorAll('input');
                if (inputs.length >= 5) {
                    inputs[0].value = clienteData.nombre;
                    inputs[1].value = clienteData.telefono;
                    inputs[2].value = clienteData.email;
                    inputs[3].value = clienteData.direccion;
                    inputs[4].value = clienteData.documento;
                }
                customerForm.style.display = 'flex';
            }
            if (clientesModal) {
                clientesModal.style.display = 'none';
            }
        }
    });

    // -------------------- PRODUCTOS --------------------
    const btnProductos = document.getElementById('btnProductos');
    const productosModal = document.getElementById('productosModal');
    const closeProductosModal = document.getElementById('closeProductosModal');
    const searchProducto = document.getElementById('searchProducto');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    let cart = [];

    if (btnProductos && productosModal) {
        btnProductos.addEventListener('click', function() {
            productosModal.style.display = 'block';
        });
    }

    if (closeProductosModal && productosModal) {
        closeProductosModal.addEventListener('click', function() {
            productosModal.style.display = 'none';
        });
    }

    if (searchProducto) {
        searchProducto.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const productoItems = document.querySelectorAll('.producto-item');

            productoItems.forEach(item => {
                const productoInfo = item.textContent.toLowerCase();
                if (productoInfo.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Agregar producto al carrito
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-select-producto')) {
            const btn = e.target.closest('.btn-select-producto');
            const productoData = JSON.parse(btn.dataset.producto);
            const cantidad = btn.parentElement.querySelector('.cantidad-producto').value;
            
            addToCart(productoData, parseInt(cantidad));
            productosModal.style.display = 'none';
        }
    });

    function addToCart(producto, cantidad) {
        const existingItem = cart.find(item => item.id === producto.id);
        
        if (existingItem) {
            existingItem.cantidad += cantidad;
        } else {
            cart.push({...producto, cantidad});
        }
        
        updateCartUI();
    }

    function removeFromCart(productoId) {
        cart = cart.filter(item => item.id !== productoId);
        updateCartUI();
    }

    function updateCartUI() {
        cartCount.textContent = cart.length;
        
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>No hay productos en el carrito</p>
                    <span>Busca y agrega productos para comenzar</span>
                </div>
            `;
            return;
        }

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.nombre}</h4>
                    <p>Cantidad: ${item.cantidad} - Precio: $${(item.precio * item.cantidad).toLocaleString()}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="btn-remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Agregar event listeners para los botones de eliminar
        document.querySelectorAll('.btn-remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                removeFromCart(this.dataset.id);
            });
        });
    }

    // Controles de cantidad
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-cantidad')) {
            const btn = e.target.closest('.btn-cantidad');
            const action = btn.dataset.action;
            const input = btn.parentElement.querySelector('.cantidad-producto');
            let value = parseInt(input.value);

            if (action === 'increase') {
                if (value < parseInt(input.max)) {
                    input.value = value + 1;
                }
            } else if (action === 'decrease') {
                if (value > parseInt(input.min)) {
                    input.value = value - 1;
                }
            }
        }
    });

    // Animación al agregar al carrito
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-select-producto')) {
            const btn = e.target.closest('.btn-select-producto');
            btn.classList.add('added-to-cart');
            
            setTimeout(() => {
                btn.classList.remove('added-to-cart');
            }, 500);
        }
    });

    // Funcionalidad de cerrar sesión
    const logoutButton = document.querySelector('.logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Mostrar modal de confirmación
            if (confirm('¿Está seguro que desea cerrar sesión?')) {
                // Limpiar datos de sesión
                localStorage.removeItem('userSession');
                sessionStorage.clear();
                
                // Redirigir al login
                window.location.href = 'Views/Login.php';
            }
        });
    }
});


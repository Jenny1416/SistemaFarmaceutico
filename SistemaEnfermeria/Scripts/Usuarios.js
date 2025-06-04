// Datos demo para usuarios y roles
const usuariosDemo = [
  { nombre: 'Carlos Méndez', email: 'carlos@farmacia.com', rol: 'Administrador', ultimo: '2025-04-28 09:15', estado: 'activo' },
  { nombre: 'Ana Rodríguez', email: 'ana@farmacia.com', rol: 'Farmacéutico', ultimo: '2025-04-28 08:30', estado: 'activo' },
  { nombre: 'Miguel Torres', email: 'miguel@farmacia.com', rol: 'Vendedor', ultimo: '2025-04-27 17:45', estado: 'activo' },
  { nombre: 'Laura Sánchez', email: 'laura@farmacia.com', rol: 'Inventario', ultimo: '2025-04-26 14:20', estado: 'inactivo' },
  { nombre: 'Roberto Gómez', email: 'roberto@farmacia.com', rol: 'Vendedor', ultimo: '2025-04-28 10:05', estado: 'activo' }
];
const rolesDemo = [
  { rol: 'Administrador', desc: 'Acceso completo al sistema', usuarios: 2, permisos: ['Ventas','Inventario','Usuarios','+3'] },
  { rol: 'Farmacéutico', desc: 'Gestión de medicamentos y asesoría', usuarios: 3, permisos: ['Ventas','Inventario','Reportes'] },
  { rol: 'Vendedor', desc: 'Atención al cliente y ventas', usuarios: 5, permisos: ['Ventas','Reportes básicos'] },
  { rol: 'Inventario', desc: 'Gestión de stock y productos', usuarios: 2, permisos: ['Inventario','Reportes de inventario','Proveedores'] }
];

// Datos demo para clientes
const clientesDemo = [
  { nombre: 'Juan Pérez', email: 'juanperez@email.com', telefono: '0991234567', ventas: 5, productos: 'Paracetamol, Ibuprofeno', id: 1 },
  { nombre: 'Ana Martínez', email: 'ana.martinez@email.com', telefono: '0987654321', ventas: 2, productos: 'Amoxicilina', id: 2 },
  { nombre: 'Carlos López', email: 'carlos.lopez@email.com', telefono: '0976543210', ventas: 8, productos: 'Vitamina C, Zinc', id: 3 },
  { nombre: 'Lucía Torres', email: 'lucia.torres@email.com', telefono: '0965432109', ventas: 1, productos: 'Omeprazol', id: 4 },
  { nombre: 'Roberto García', email: 'roberto.garcia@email.com', telefono: '0954321098', ventas: 3, productos: 'Aspirina, Loratadina', id: 5 }
];

// Tabs animadas
function activarTabsUsuarios() {
  const tabBtns = document.querySelectorAll('.usuarios-tabs .tab-btn');
  const tabSections = document.querySelectorAll('.usuarios-content .tab-section');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      tabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      tabSections.forEach(sec => sec.classList.remove('active'));
      document.getElementById('tab-' + this.dataset.tab).classList.add('active');
      // Renderizar la tabla correspondiente al cambiar de tab
      if(this.dataset.tab === 'usuarios') renderUsuariosTabla();
      if(this.dataset.tab === 'roles') renderRolesTabla();
      if(this.dataset.tab === 'clientes') {
        renderClientesTabla();
        accionesClientes();
      }
    });
  });
}

// Renderizar usuarios demo
function renderUsuariosTabla() {
  const tbody = document.getElementById('usuariosBody');
  tbody.innerHTML = '';
  usuariosDemo.forEach(u => {
    const iniciales = u.nombre.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
    tbody.innerHTML += `
      <tr>
        <td><span class="usuario-avatar">${iniciales}</span><div><b>${u.nombre}</b><br><span style='color:#888;font-size:0.98em;'>${u.email}</span></div></td>
        <td>${u.rol}</td>
        <td>${u.ultimo}</td>
        <td><span class="estado-tag estado-${u.estado}">${u.estado.charAt(0).toUpperCase() + u.estado.slice(1)}</span></td>
        <td>
          <button class="acciones-btn" title="Editar"><i class="fas fa-pen"></i></button>
          <button class="acciones-btn" title="Eliminar"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
}
// Renderizar roles demo
function renderRolesTabla() {
  const tbody = document.getElementById('rolesBody');
  tbody.innerHTML = '';
  rolesDemo.forEach(r => {
    tbody.innerHTML += `
      <tr>
        <td><b>${r.rol}</b></td>
        <td>${r.desc}</td>
        <td>${r.usuarios}</td>
        <td>${r.permisos.map(p => `<span class='permiso-tag'>${p}</span>`).join('')}</td>
        <td>
          <button class="acciones-btn" title="Editar"><i class="fas fa-pen"></i></button>
          <button class="acciones-btn" title="Eliminar"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
}

// Renderizar clientes demo
function renderClientesTabla() {
  const tbody = document.getElementById('clientesBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  clientesDemo.forEach(c => {
    const iniciales = c.nombre.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
    tbody.innerHTML += `
      <tr data-id="${c.id}">
        <td style="text-align:center;">
          <img src="${c.imagen ? c.imagen : '/Images/LogoSoloOlivia.png'}" alt="${c.nombre}" class="cliente-img">
        </td>
        <td><b>${c.nombre}</b></td>
        <td>${c.email}</td>
        <td>${c.telefono}</td>
        <td style="text-align:center;">${c.ventas}</td>
        <td>${c.productos}</td>
        <td style="text-align:center;">
          <button class="acciones-btn editar-cliente" title="Editar"><i class="fas fa-pen"></i></button>
          <button class="acciones-btn eliminar-cliente" title="Eliminar"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
}

// Búsqueda en tablas
function filtrarTablaUsuarios() {
  const val = document.getElementById('buscarUsuario').value.toLowerCase();
  const tbody = document.getElementById('usuariosBody');
  Array.from(tbody.children).forEach(tr => {
    tr.style.display = tr.textContent.toLowerCase().includes(val) ? '' : 'none';
  });
}
function filtrarTablaRoles() {
  const val = document.getElementById('buscarRol').value.toLowerCase();
  const tbody = document.getElementById('rolesBody');
  Array.from(tbody.children).forEach(tr => {
    tr.style.display = tr.textContent.toLowerCase().includes(val) ? '' : 'none';
  });
}

// Búsqueda en clientes
function filtrarTablaClientes() {
  const val = document.getElementById('buscarCliente').value.toLowerCase();
  const tbody = document.getElementById('clientesBody');
  Array.from(tbody.children).forEach(tr => {
    tr.style.display = tr.textContent.toLowerCase().includes(val) ? '' : 'none';
  });
}

// Acciones editar/eliminar cliente
function accionesClientes() {
  document.getElementById('clientesBody').onclick = function(e) {
    const tr = e.target.closest('tr');
    const id = tr ? tr.getAttribute('data-id') : null;
    if (e.target.closest('.editar-cliente')) {
      const cliente = clientesDemo.find(c => c.id == id);
      if (cliente) {
        document.getElementById('ecNombre').value = cliente.nombre;
        document.getElementById('ecEmail').value = cliente.email;
        document.getElementById('ecTelefono').value = cliente.telefono;
        document.getElementById('ecVentas').value = cliente.ventas;
        document.getElementById('ecProductos').value = cliente.productos;
        document.getElementById('editarClienteModal').style.display = 'flex';
        document.getElementById('editarClienteModal').setAttribute('data-id', id);
        // Imagen
        const ecImagenPreview = document.getElementById('ecImagenPreview');
        ecImagenPreview.src = cliente.imagen ? cliente.imagen : '/Images/LogoSoloOlivia.png';
        ecImagenPreview.removeAttribute('data-new-img');
      }
    }
    if (e.target.closest('.eliminar-cliente')) {
      if (confirm('¿Seguro que deseas eliminar este cliente?')) {
        const idx = clientesDemo.findIndex(c => c.id == id);
        if (idx !== -1) {
          clientesDemo.splice(idx, 1);
          renderClientesTabla();
          accionesClientes();
          mostrarProcesoModal('exito', 'Cliente eliminado exitosamente');
        }
      }
    }
  };
}

// Funcionalidad del modal de edición de cliente
document.addEventListener('DOMContentLoaded', function() {
  const editarClienteModal = document.getElementById('editarClienteModal');
  const closeEditarClienteModal = document.getElementById('closeEditarClienteModal');
  const cancelarEditarClienteBtn = document.getElementById('cancelarEditarClienteBtn');
  const formEditarCliente = document.getElementById('formEditarCliente');

  function cerrarEditarCliente() {
    editarClienteModal.style.display = 'none';
    formEditarCliente.reset();
  }

  if (closeEditarClienteModal) closeEditarClienteModal.onclick = cerrarEditarCliente;
  if (cancelarEditarClienteBtn) cancelarEditarClienteBtn.onclick = cerrarEditarCliente;
  if (editarClienteModal) editarClienteModal.onclick = e => { if (e.target === editarClienteModal) cerrarEditarCliente(); };

  if (formEditarCliente) {
    formEditarCliente.onsubmit = function(e) {
      e.preventDefault();
      const id = editarClienteModal.getAttribute('data-id');
      const idx = clientesDemo.findIndex(c => c.id == id);
      if (idx !== -1) {
        clientesDemo[idx].nombre = document.getElementById('ecNombre').value;
        clientesDemo[idx].email = document.getElementById('ecEmail').value;
        clientesDemo[idx].telefono = document.getElementById('ecTelefono').value;
        clientesDemo[idx].ventas = parseInt(document.getElementById('ecVentas').value);
        clientesDemo[idx].productos = document.getElementById('ecProductos').value;
        // Imagen
        const nuevaImg = ecImagenPreview.getAttribute('data-new-img');
        if (nuevaImg) {
          clientesDemo[idx].imagen = nuevaImg;
          ecImagenPreview.removeAttribute('data-new-img');
        }
        renderClientesTabla();
        accionesClientes();
        mostrarProcesoModal('exito', '¡Cliente editado exitosamente!');
        cerrarEditarCliente();
      }
    };
  }

  // MODAL EDITAR CLIENTE - IMAGEN
  const ecImagenInput = document.getElementById('ecImagen');
  const ecImagenPreview = document.getElementById('ecImagenPreview');
  if (ecImagenInput) {
    ecImagenInput.onchange = function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          ecImagenPreview.src = e.target.result;
          ecImagenPreview.setAttribute('data-new-img', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
  }
});

// Inicialización principal
function initUsuariosPanel() {
  activarTabsUsuarios();
  renderUsuariosTabla();
  renderRolesTabla();
  renderClientesTabla();
  accionesClientes();
  document.getElementById('buscarUsuario').addEventListener('input', filtrarTablaUsuarios);
  document.getElementById('buscarRol').addEventListener('input', filtrarTablaRoles);
  document.getElementById('buscarCliente').addEventListener('input', filtrarTablaClientes);
}

document.addEventListener('DOMContentLoaded', function() {
  // Abrir modal desde el menú lateral
  const btnUsuarios = document.getElementById('btnUsuarios');
  if (btnUsuarios) btnUsuarios.onclick = function(e) {
    e.preventDefault();
    document.getElementById('usuariosModal').style.display = 'flex';
    initUsuariosPanel();
  };
  // Cerrar modal
  const closeBtn = document.getElementById('closeUsuariosModal');
  if (closeBtn) closeBtn.onclick = () => {
    document.getElementById('usuariosModal').style.display = 'none';
  };
  // Inicializar si el modal ya está visible
  if (document.getElementById('usuariosModal').style.display !== 'none') {
    initUsuariosPanel();
  }
  // Si quieres que se inicialice siempre:
  initUsuariosPanel();

  // --- MODALES NUEVO USUARIO/ROL ---
  // Botones de abrir
  const nuevoUsuarioBtn = document.getElementById('nuevoUsuarioBtn');
  const nuevoRolBtn = document.getElementById('nuevoRolBtn');
  // Modales
  const nuevoUsuarioModal = document.getElementById('nuevoUsuarioModal');
  const nuevoRolModal = document.getElementById('nuevoRolModal');
  // Botones de cerrar/cancelar
  const closeNuevoUsuarioModal = document.getElementById('closeNuevoUsuarioModal');
  const cancelarNuevoUsuarioBtn = document.getElementById('cancelarNuevoUsuarioBtn');
  const closeNuevoRolModal = document.getElementById('closeNuevoRolModal');
  const cancelarNuevoRolBtn = document.getElementById('cancelarNuevoRolBtn');

  // Abrir modales
  if (nuevoUsuarioBtn) nuevoUsuarioBtn.onclick = () => { nuevoUsuarioModal.style.display = 'flex'; };
  if (nuevoRolBtn) nuevoRolBtn.onclick = () => { nuevoRolModal.style.display = 'flex'; };
  // Cerrar modales
  if (closeNuevoUsuarioModal) closeNuevoUsuarioModal.onclick = cerrarNuevoUsuario;
  if (cancelarNuevoUsuarioBtn) cancelarNuevoUsuarioBtn.onclick = cerrarNuevoUsuario;
  if (closeNuevoRolModal) closeNuevoRolModal.onclick = cerrarNuevoRol;
  if (cancelarNuevoRolBtn) cancelarNuevoRolBtn.onclick = cerrarNuevoRol;
  // Cerrar al hacer click fuera
  if (nuevoUsuarioModal) nuevoUsuarioModal.onclick = e => { if (e.target === nuevoUsuarioModal) cerrarNuevoUsuario(); };
  if (nuevoRolModal) nuevoRolModal.onclick = e => { if (e.target === nuevoRolModal) cerrarNuevoRol(); };
  function cerrarNuevoUsuario() { nuevoUsuarioModal.style.display = 'none'; document.getElementById('formNuevoUsuario').reset(); }
  function cerrarNuevoRol() { nuevoRolModal.style.display = 'none'; document.getElementById('formNuevoRol').reset(); }

  // Guardar Usuario
  document.getElementById('formNuevoUsuario').onsubmit = function(e) {
    e.preventDefault();
    // Aquí puedes agregar validaciones extra si quieres
    cerrarNuevoUsuario();
    mostrarProcesoModal('exito', '¡Usuario creado exitosamente!');
  };
  // Guardar Rol
  document.getElementById('formNuevoRol').onsubmit = function(e) {
    e.preventDefault();
    cerrarNuevoRol();
    mostrarProcesoModal('exito', '¡Rol creado exitosamente!');
  };
});

// --- CLIENTES PANEL EXCLUSIVO ---
function renderClientesTabla() {
  const tbody = document.getElementById('clientesBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  clientesDemo.forEach(c => {
    const iniciales = c.nombre.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
    tbody.innerHTML += `
      <tr data-id="${c.id}">
        <td style="text-align:center;">
          <img src="${c.imagen ? c.imagen : '/Images/LogoSoloOlivia.png'}" alt="${c.nombre}" class="cliente-img">
        </td>
        <td><b>${c.nombre}</b></td>
        <td>${c.email}</td>
        <td>${c.telefono}</td>
        <td style="text-align:center;">${c.ventas}</td>
        <td>${c.productos}</td>
        <td style="text-align:center;">
          <button class="acciones-btn editar-cliente" title="Editar"><i class="fas fa-pen"></i></button>
          <button class="acciones-btn eliminar-cliente" title="Eliminar"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
}
function filtrarTablaClientes() {
  const val = document.getElementById('buscarCliente').value.toLowerCase();
  const tbody = document.getElementById('clientesBody');
  Array.from(tbody.children).forEach(tr => {
    tr.style.display = tr.textContent.toLowerCase().includes(val) ? '' : 'none';
  });
}
function accionesClientes() {
  document.getElementById('clientesBody').onclick = function(e) {
    const tr = e.target.closest('tr');
    const id = tr ? tr.getAttribute('data-id') : null;
    if (e.target.closest('.editar-cliente')) {
      const cliente = clientesDemo.find(c => c.id == id);
      if (cliente) {
        document.getElementById('ecNombre').value = cliente.nombre;
        document.getElementById('ecEmail').value = cliente.email;
        document.getElementById('ecTelefono').value = cliente.telefono;
        document.getElementById('ecVentas').value = cliente.ventas;
        document.getElementById('ecProductos').value = cliente.productos;
        document.getElementById('editarClienteModal').style.display = 'flex';
        document.getElementById('editarClienteModal').setAttribute('data-id', id);
        // Imagen
        const ecImagenPreview = document.getElementById('ecImagenPreview');
        ecImagenPreview.src = cliente.imagen ? cliente.imagen : '/Images/LogoSoloOlivia.png';
        ecImagenPreview.removeAttribute('data-new-img');
      }
    }
    if (e.target.closest('.eliminar-cliente')) {
      if (confirm('¿Seguro que deseas eliminar este cliente?')) {
        const idx = clientesDemo.findIndex(c => c.id == id);
        if (idx !== -1) {
          clientesDemo.splice(idx, 1);
          renderClientesTabla();
          accionesClientes();
          mostrarProcesoModal('exito', 'Cliente eliminado exitosamente');
        }
      }
    }
  };
}

// Inicialización del panel de clientes
function initClientesPanel() {
  renderClientesTabla();
  accionesClientes();
  document.getElementById('buscarCliente').addEventListener('input', filtrarTablaClientes);
}

document.addEventListener('DOMContentLoaded', function() {
  // Botón y panel de clientes
  const btnClientes = document.getElementById('btnClientes');
  const clientesModal = document.getElementById('clientesModal');
  const closeClientesModal = document.getElementById('closeClientesModal');
  if (btnClientes && clientesModal) {
    btnClientes.onclick = function(e) {
      e.preventDefault();
      clientesModal.style.display = 'flex';
      initClientesPanel();
    };
  }
  if (closeClientesModal && clientesModal) {
    closeClientesModal.onclick = function() {
      clientesModal.style.display = 'none';
    };
  }
  if (clientesModal) {
    window.addEventListener('click', function(e) {
      if (e.target === clientesModal) {
        clientesModal.style.display = 'none';
      }
    });
  }

  // --- MODAL NUEVO CLIENTE ---
  const nuevoClienteBtn = document.getElementById('nuevoClienteBtn');
  const nuevoClienteModal = document.getElementById('nuevoClienteModal');
  const closeNuevoClienteModal = document.getElementById('closeNuevoClienteModal');
  const cancelarNuevoClienteBtn = document.getElementById('cancelarNuevoClienteBtn');
  const formNuevoCliente = document.getElementById('formNuevoCliente');
  const ncImagenInput = document.getElementById('ncImagen');
  const ncImagenPreview = document.getElementById('ncImagenPreview');

  if (nuevoClienteBtn && nuevoClienteModal) {
    nuevoClienteBtn.onclick = function() {
      nuevoClienteModal.style.display = 'flex';
      formNuevoCliente.reset();
      ncImagenPreview.src = '/Images/LogoSoloOlivia.png';
      ncImagenPreview.removeAttribute('data-new-img');
    };
  }
  if (closeNuevoClienteModal) closeNuevoClienteModal.onclick = cerrarNuevoCliente;
  if (cancelarNuevoClienteBtn) cancelarNuevoClienteBtn.onclick = cerrarNuevoCliente;
  if (nuevoClienteModal) {
    nuevoClienteModal.onclick = function(e) {
      if (e.target === nuevoClienteModal) cerrarNuevoCliente();
    };
  }
  function cerrarNuevoCliente() {
    nuevoClienteModal.style.display = 'none';
    formNuevoCliente.reset();
    ncImagenPreview.src = '/Images/LogoSoloOlivia.png';
    ncImagenPreview.removeAttribute('data-new-img');
  }
  if (ncImagenInput) {
    ncImagenInput.onchange = function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          ncImagenPreview.src = e.target.result;
          ncImagenPreview.setAttribute('data-new-img', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
  }
  if (formNuevoCliente) {
    formNuevoCliente.onsubmit = function(e) {
      e.preventDefault();
      const nombre = document.getElementById('ncNombre').value.trim();
      const email = document.getElementById('ncEmail').value.trim();
      const telefono = document.getElementById('ncTelefono').value.trim();
      const ventas = parseInt(document.getElementById('ncVentas').value);
      const productos = document.getElementById('ncProductos').value.trim();
      const imagen = ncImagenPreview.getAttribute('data-new-img') || '/Images/LogoSoloOlivia.png';
      if (!nombre || !email || !telefono || isNaN(ventas) || !productos) {
        mostrarProcesoModal('error', 'Por favor, completa todos los campos correctamente.');
        return;
      }
      clientesDemo.push({
        id: Date.now(),
        nombre,
        email,
        telefono,
        ventas,
        productos,
        imagen
      });
      renderClientesTabla();
      accionesClientes();
      mostrarProcesoModal('exito', '¡Cliente agregado exitosamente!');
      cerrarNuevoCliente();
    };
  }
});

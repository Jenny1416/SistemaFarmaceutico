// Demo de facturas
const facturasDemo = [
  {
    id: 52,
    fecha: '2023-05-13',
    cliente: 'Fernanda González',
    monto: 992.02,
    pagado: 500,
    debido: 492.02,
    vendedor: 'Diego Carmona Bernal',
    productos: [
      {
        categoria: 'Analgésicos',
        producto: 'Paracetamol 500mg',
        comprobante: 'Factura',
        cantidad: 10,
        precio: 100,
        descuento: 7.98,
        tipoDescuento: 'Porcentaje',
        total: 992.02
      }
    ]
  },
  {
    id: 51,
    fecha: '2023-04-17',
    cliente: 'Ana Hernández',
    monto: 412.5,
    pagado: 412.5,
    debido: 0,
    vendedor: 'Diego Carmona Bernal',
    productos: [
      {
        categoria: 'Antibióticos',
        producto: 'Amoxicilina 250mg',
        comprobante: 'Factura',
        cantidad: 5,
        precio: 82.5,
        descuento: 0,
        tipoDescuento: 'Sin descuento',
        total: 412.5
      }
    ]
  }
];

// --- PAGOS DE FACTURA ---
// Demo de pagos por factura (puedes reemplazar por persistencia real)
const pagosPorFactura = {
  52: [
    { fecha: 'May 13, 2023', importe: 500, metodo: 'cash', info: '', recibido: 'Diego Carmona Bernal' }
  ],
  51: []
};

function renderFacturasTabla(filtrar = "", clienteFiltro = "") {
  const tbody = document.getElementById('facturasBody');
  tbody.innerHTML = '';
  let data = facturasDemo.filter(f =>
    (f.id.toString().includes(filtrar) || f.cliente.toLowerCase().includes(filtrar.toLowerCase())) &&
    (clienteFiltro === '' || f.cliente === clienteFiltro)
  );
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="12" style="text-align:center;color:#888;padding:32px 0;">No hay facturas encontradas.</td></tr>`;
    return;
  }
  data.forEach(f => {
    tbody.innerHTML += `
      <tr>
        <td>${f.id}</td>
        <td>${f.fecha}</td>
        <td>${f.cliente}</td>
        <td>${f.monto}</td>
        <td>${f.pagado}</td>
        <td class="${f.debido > 0 ? 'debido' : ''}">${f.debido}</td>
        <td>${f.vendedor}</td>
        <td><button class="factura-action-btn pagos" title="Pagos"><i class="fas fa-eye"></i></button></td>
        <td><button class="factura-action-btn abonar" title="Abonar"><i class="fas fa-dollar-sign"></i></button></td>
        <td><button class="factura-action-btn imprimir" title="Imprimir"><i class="fas fa-print"></i></button></td>
        <td><button class="factura-action-btn editar" title="Editar"><i class="fas fa-pen"></i></button></td>
        <td><button class="factura-action-btn eliminar" title="Eliminar"><i class="fas fa-trash"></i></button></td>
      </tr>
    `;
  });
}

function llenarFiltroClientes() {
  const select = document.getElementById('filtroCliente');
  const clientes = [...new Set(facturasDemo.map(f => f.cliente))];
  select.innerHTML = '<option value="">Todos los clientes</option>' + clientes.map(c => `<option value="${c}">${c}</option>`).join('');
}

// --- NUEVO BLOQUE DE LÓGICA PARA TOTALES Y GUARDADO ---
function actualizarTotalesFactura() {
  const rows = document.querySelectorAll('#cfProductosBody tr');
  let precioTotal = 0, descuentoTotal = 0;
  // Detectar si el cliente es trabajador (usuario del sistema)
  const cfCliente = document.getElementById('cfCliente');
  const clienteEsTrabajador = cfCliente && cfCliente.value && (cfCliente.value.toLowerCase().includes('admin') || cfCliente.value.toLowerCase().includes('usuario') || cfCliente.value.toLowerCase().includes('trabajador') || cfCliente.value.toLowerCase().includes('empleado'));
  rows.forEach(row => {
    const cantidad = parseFloat(row.querySelector('input[placeholder="Cantidad"]').value) || 0;
    const precio = parseFloat(row.querySelector('input[placeholder="Precio"]').value) || 0;
    const descuento = parseFloat(row.querySelector('input[placeholder="Descuento"]').value) || 0;
    // Buscar el select de tipo de descuento correctamente (el 5to select de la fila)
    let tipoDescuento = 'Sin descuento';
    const selects = row.querySelectorAll('select');
    if (selects.length > 4) {
      tipoDescuento = selects[4].value;
    } else if (selects.length > 0) {
      tipoDescuento = selects[selects.length-1].value;
    }
    let descuentoCalculado = 0;
    if (tipoDescuento === 'Porcentaje') {
      descuentoCalculado = (cantidad * precio) * (descuento / 100);
    } else if (tipoDescuento === 'Importe fijo') {
      descuentoCalculado = descuento;
    } else if (tipoDescuento === '2x1') {
      descuentoCalculado = Math.floor(cantidad / 2) * precio;
    } else if (tipoDescuento === '3x2') {
      descuentoCalculado = Math.floor(cantidad / 3) * precio;
    } else if (tipoDescuento === 'Descuento especial' && clienteEsTrabajador) {
      descuentoCalculado = (cantidad * precio) * 0.3; // 30% de descuento automático
    } else {
      descuentoCalculado = 0;
    }
    const total = (cantidad * precio) - descuentoCalculado;
    precioTotal += cantidad * precio;
    descuentoTotal += descuentoCalculado;
    // Actualizar el total de la fila
    const totalInput = row.querySelector('input[placeholder="Total"]');
    if (totalInput) totalInput.value = total >= 0 ? total : 0;
  });
  const importeNeto = precioTotal - descuentoTotal;
  document.getElementById('ftPrecioTotal').textContent = precioTotal.toFixed(2);
  document.getElementById('ftDescuentoTotal').textContent = descuentoTotal.toFixed(2);
  document.getElementById('ftImporteNeto').textContent = importeNeto.toFixed(2);
  // Importe a deber = importe neto - pagar ahora
  const pagarAhora = parseFloat(document.getElementById('ftPagarAhora').value) || 0;
  const importeDeber = importeNeto - pagarAhora;
  document.getElementById('ftImporteDeber').textContent = importeDeber.toFixed(2);
}

function addTotalesListeners() {
  const cfProductosBody = document.getElementById('cfProductosBody');
  cfProductosBody.addEventListener('input', function(e) {
    if (e.target.matches('input[placeholder="Cantidad"], input[placeholder="Precio"], input[placeholder="Descuento"]')) {
      actualizarTotalesFactura();
    }
  });
  document.getElementById('ftPagarAhora').addEventListener('input', actualizarTotalesFactura);

  // Evento para selects de tipo de descuento
  function addSelectListeners() {
    cfProductosBody.querySelectorAll('select').forEach(select => {
      // Solo para el select de tipo de descuento (el último de la fila)
      if (select.parentElement.cellIndex === 8) {
        select.removeEventListener('change', actualizarTotalesFactura); // Evitar duplicados
        select.addEventListener('change', function() {
          actualizarTotalesFactura();
          // Desactivar input descuento si es descuento especial y trabajador
          const row = select.closest('tr');
          const cfCliente = document.getElementById('cfCliente');
          const clienteEsTrabajador = cfCliente && cfCliente.value && (cfCliente.value.toLowerCase().includes('admin') || cfCliente.value.toLowerCase().includes('usuario') || cfCliente.value.toLowerCase().includes('trabajador') || cfCliente.value.toLowerCase().includes('empleado'));
          const inputDescuento = row.querySelector('input[placeholder="Descuento"]');
          if (select.value === 'Descuento especial' && clienteEsTrabajador) {
            inputDescuento.value = '';
            inputDescuento.disabled = true;
          } else {
            inputDescuento.disabled = false;
          }
        });
      }
    });
  }
  addSelectListeners();
  // También al añadir filas nuevas
  const observer = new MutationObserver(addSelectListeners);
  observer.observe(cfProductosBody, { childList: true });
}

function mostrarPagosFactura(idFactura, cliente, totalFactura, pagado, debido) {
  const modal = document.getElementById('pagosFacturaModal');
  document.getElementById('pagosFacturaTitulo').textContent = `Pagos de factura N° : ${idFactura}`;
  document.getElementById('pagosFacturaCliente').textContent = `Cliente : ${cliente}`;
  // Llenar tabla de pagos
  const pagos = pagosPorFactura[idFactura] || [];
  const tbody = document.getElementById('pagosFacturaBody');
  tbody.innerHTML = '';
  pagos.forEach((p, idx) => {
    tbody.innerHTML += `<tr>
      <td>${p.fecha}</td>
      <td>${p.importe}</td>
      <td>${p.metodo}</td>
      <td>${p.info || ''}</td>
      <td>${p.recibido || ''}</td>
      <td><button class="eliminar-fila-btn" data-factura="${idFactura}" data-idx="${idx}"><i class="fas fa-trash"></i></button></td>
    </tr>`;
  });
  // Totales
  document.getElementById('pagosFacturaTotal').value = totalFactura;
  document.getElementById('pagosFacturaPagado').value = pagado;
  document.getElementById('pagosFacturaDeber').value = debido;
  modal.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', function() {
  // Abrir panel de facturas
  const btnFacturas = document.getElementById('btnFacturas');
  const facturasModal = document.getElementById('facturasModal');
  const closeFacturasModal = document.getElementById('closeFacturasModal');
  if (btnFacturas && facturasModal) {
    btnFacturas.onclick = function(e) {
      e.preventDefault();
      facturasModal.style.display = 'flex';
      renderFacturasTabla();
      llenarFiltroClientes();
    };
  }
  if (closeFacturasModal && facturasModal) {
    closeFacturasModal.onclick = function() {
      facturasModal.style.display = 'none';
    };
  }
  // Cerrar al hacer click fuera
  if (facturasModal) {
    window.addEventListener('click', function(e) {
      if (e.target === facturasModal) {
        facturasModal.style.display = 'none';
      }
    });
  }
  // Buscar y filtrar
  const buscarFactura = document.getElementById('buscarFactura');
  const filtroCliente = document.getElementById('filtroCliente');
  if (buscarFactura) {
    buscarFactura.addEventListener('input', function() {
      renderFacturasTabla(buscarFactura.value, filtroCliente.value);
    });
  }
  if (filtroCliente) {
    filtroCliente.addEventListener('change', function() {
      renderFacturasTabla(buscarFactura.value, filtroCliente.value);
    });
  }
  // Animación de botones de acción
  document.addEventListener('click', function(e) {
    if (e.target.closest('.factura-action-btn')) {
      const btn = e.target.closest('.factura-action-btn');
      btn.classList.add('clicked');
      setTimeout(() => btn.classList.remove('clicked'), 300);
    }
  });

  // Abrir modal Crear Factura
  const nuevaFacturaBtn = document.getElementById('nuevaFacturaBtn');
  const crearFacturaModal = document.getElementById('crearFacturaModal');
  const closeCrearFacturaModal = document.getElementById('closeCrearFacturaModal');
  if (nuevaFacturaBtn && crearFacturaModal) {
    nuevaFacturaBtn.onclick = function() {
      crearFacturaModal.style.display = 'flex';
    };
  }
  if (closeCrearFacturaModal && crearFacturaModal) {
    closeCrearFacturaModal.onclick = function() {
      crearFacturaModal.style.display = 'none';
    };
  }
  // Cerrar al hacer click fuera
  if (crearFacturaModal) {
    window.addEventListener('click', function(e) {
      if (e.target === crearFacturaModal) {
        crearFacturaModal.style.display = 'none';
      }
    });
  }

  // Mini modal Nuevo Cliente
  const cfCliente = document.getElementById('cfCliente');
  const nuevoClienteMiniModal = document.getElementById('nuevoClienteMiniModal');
  const closeNuevoClienteMiniModal = document.getElementById('closeNuevoClienteMiniModal');
  const cancelarNuevoClienteMiniBtn = document.getElementById('cancelarNuevoClienteMiniBtn');
  if (cfCliente) {
    cfCliente.addEventListener('change', function() {
      if (cfCliente.value === 'nuevo') {
        nuevoClienteMiniModal.style.display = 'flex';
      }
    });
  }
  if (closeNuevoClienteMiniModal) closeNuevoClienteMiniModal.onclick = function() { nuevoClienteMiniModal.style.display = 'none'; cfCliente.value = ''; };
  if (cancelarNuevoClienteMiniBtn) cancelarNuevoClienteMiniBtn.onclick = function() { nuevoClienteMiniModal.style.display = 'none'; cfCliente.value = ''; };
  if (nuevoClienteMiniModal) {
    window.addEventListener('click', function(e) {
      if (e.target === nuevoClienteMiniModal) {
        nuevoClienteMiniModal.style.display = 'none';
        cfCliente.value = '';
      }
    });
  }
  // Guardar nuevo cliente y agregarlo al selector
  const formNuevoClienteMini = document.getElementById('formNuevoClienteMini');
  if (formNuevoClienteMini) {
    formNuevoClienteMini.onsubmit = function(e) {
      e.preventDefault();
      const id = document.getElementById('ncId').value;
      const nombre = document.getElementById('ncNombre').value;
      // Agregar al selector
      const option = document.createElement('option');
      option.value = id;
      option.textContent = nombre;
      cfCliente.insertBefore(option, cfCliente.querySelector('option[value="nuevo"]'));
      cfCliente.value = id;
      nuevoClienteMiniModal.style.display = 'none';
      formNuevoClienteMini.reset();
    };
  }

  // Añadir/eliminar filas en la tabla de productos
  const anadirMasBtn = document.getElementById('anadirMasBtn');
  const cfProductosBody = document.getElementById('cfProductosBody');
  if (anadirMasBtn && cfProductosBody) {
    anadirMasBtn.onclick = function() {
      const rowCount = cfProductosBody.children.length + 1;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><button type="button" class="eliminar-fila-btn"><i class="fas fa-trash"></i></button></td>
        <td>${rowCount}</td>
        <td><select class="styled-select"><option>Selecciona categoría</option></select></td>
        <td><select class="styled-select"><option>Seleccionar producto</option></select></td>
        <td><select class="styled-select"><option>Seleccionar C</option></select></td>
        <td><input type="number" min="0" value="0" class="styled-input" placeholder="Cantidad"></td>
        <td><input type="number" min="0" value="0" class="styled-input" placeholder="Precio"></td>
        <td><input type="number" min="0" value="0" class="styled-input" placeholder="Descuento"></td>
        <td><select class="styled-select" placeholder="Tipo de descuento">
          <option>Sin descuento</option>
          <option>Porcentaje</option>
          <option>Importe fijo</option>
          <option>2x1</option>
          <option>3x2</option>
          <option>Descuento especial</option>
        </select></td>
        <td><input type="number" min="0" value="0" class="styled-input" placeholder="Total" readonly></td>
      `;
      cfProductosBody.appendChild(tr);
    };
    // Eliminar fila
    cfProductosBody.addEventListener('click', function(e) {
      if (e.target.closest('.eliminar-fila-btn')) {
        const tr = e.target.closest('tr');
        tr.remove();
        // Recalcular numeración
        Array.from(cfProductosBody.children).forEach((row, i) => {
          row.children[1].textContent = i + 1;
        });
      }
    });
  }

  // Añadir listeners para totales
  addTotalesListeners();
  // Inicializar totales al abrir modal
  if (nuevaFacturaBtn) {
    nuevaFacturaBtn.addEventListener('click', function() {
      setTimeout(actualizarTotalesFactura, 100);
    });
  }
  // Guardar Factura
  const formCrearFactura = document.getElementById('formCrearFactura');
  if (formCrearFactura) {
    formCrearFactura.onsubmit = function(e) {
      e.preventDefault();
      const clienteSel = document.getElementById('cfCliente');
      const cliente = clienteSel.options[clienteSel.selectedIndex].text;
      const fecha = document.getElementById('cfFecha').value;
      const numero = document.getElementById('cfNumero').value;
      const monto = parseFloat(document.getElementById('ftImporteNeto').textContent) || 0;
      const pagado = parseFloat(document.getElementById('ftPagarAhora').value) || 0;
      const debido = parseFloat(document.getElementById('ftImporteDeber').textContent) || 0;
      const vendedor = 'Diego Carmona Bernal';
      // Guardar productos
      const productos = [];
      document.querySelectorAll('#cfProductosBody tr').forEach(row => {
        productos.push({
          categoria: row.children[2].querySelector('select').value,
          producto: row.children[3].querySelector('select').value,
          comprobante: row.children[4].querySelector('select').value,
          cantidad: parseFloat(row.children[5].querySelector('input').value) || 0,
          precio: parseFloat(row.children[6].querySelector('input').value) || 0,
          descuento: parseFloat(row.children[7].querySelector('input').value) || 0,
          tipoDescuento: row.children[8].querySelector('select').value,
          total: parseFloat(row.children[9].querySelector('input').value) || 0
        });
      });
      // Si es edición, actualizar, si no, agregar
      const idx = facturasDemo.findIndex(f => f.id.toString() === numero);
      if (idx !== -1) {
        facturasDemo[idx] = { id: numero, fecha, cliente, monto, pagado, debido, vendedor, productos };
      } else {
        facturasDemo.unshift({ id: numero, fecha, cliente, monto, pagado, debido, vendedor, productos });
      }
      renderFacturasTabla();
      llenarFiltroClientes();
      if (typeof mostrarProcesoModal === 'function') {
        mostrarProcesoModal('exito', 'Guardado exitoso');
      }
      document.getElementById('crearFacturaModal').style.display = 'none';
      formCrearFactura.reset();
      document.getElementById('cfProductosBody').innerHTML = '';
      document.getElementById('ftPrecioTotal').textContent = '0';
      document.getElementById('ftDescuentoTotal').textContent = '0';
      document.getElementById('ftImporteNeto').textContent = '0';
      document.getElementById('ftPagarAhora').value = '0';
      document.getElementById('ftImporteDeber').textContent = '0';
    };
  }

  // Botón cerrar pagos
  const cerrarPagosFacturaBtn = document.getElementById('cerrarPagosFacturaBtn');
  if (cerrarPagosFacturaBtn) {
    cerrarPagosFacturaBtn.onclick = function() {
      document.getElementById('pagosFacturaModal').style.display = 'none';
    };
  }
  // Eliminar pago demo
  document.getElementById('pagosFacturaBody').addEventListener('click', function(e) {
    if (e.target.closest('.eliminar-fila-btn')) {
      const btn = e.target.closest('.eliminar-fila-btn');
      const idFactura = btn.getAttribute('data-factura');
      const idx = btn.getAttribute('data-idx');
      if (pagosPorFactura[idFactura]) {
        pagosPorFactura[idFactura].splice(idx, 1);
        document.getElementById('pagosFacturaModal').style.display = 'none';
      }
    }
  });
  // Botón de pagos en la tabla de facturas
  document.getElementById('facturasBody').addEventListener('click', function(e) {
    if (e.target.closest('.factura-action-btn.pagos')) {
      const tr = e.target.closest('tr');
      const id = tr.children[0].textContent;
      const cliente = tr.children[2].textContent;
      const total = tr.children[3].textContent;
      const pagado = tr.children[4].textContent;
      const debido = tr.children[5].textContent;
      mostrarPagosFactura(id, cliente, total, pagado, debido);
    }
  });

  // Botón de abonar en la tabla de facturas
  document.getElementById('facturasBody').addEventListener('click', function(e) {
    if (e.target.closest('.factura-action-btn.abonar')) {
      const tr = e.target.closest('tr');
      const id = tr.children[0].textContent;
      document.getElementById('abonarFacturaTitulo').textContent = `Pago de factura N° : ${id}`;
      document.getElementById('formAbonarFactura').setAttribute('data-factura', id);
      document.getElementById('abonarFecha').value = '';
      document.getElementById('abonarImporte').value = '0';
      document.getElementById('abonarMetodo').value = 'Efectivo';
      document.getElementById('abonarFacturaModal').style.display = 'flex';
    }
  });
  // Botón cerrar abonar
  document.getElementById('cerrarAbonarFacturaBtn').onclick = function() {
    document.getElementById('abonarFacturaModal').style.display = 'none';
  };
  // Guardar abono
  document.getElementById('formAbonarFactura').onsubmit = function(e) {
    e.preventDefault();
    const idFactura = this.getAttribute('data-factura');
    const fecha = document.getElementById('abonarFecha').value;
    const importe = parseFloat(document.getElementById('abonarImporte').value) || 0;
    const metodo = document.getElementById('abonarMetodo').value;
    if (!pagosPorFactura[idFactura]) pagosPorFactura[idFactura] = [];
    pagosPorFactura[idFactura].push({ fecha, importe, metodo, info: '', recibido: 'Usuario' });
    document.getElementById('abonarFacturaModal').style.display = 'none';
    // Actualizar pagos si el modal de pagos está abierto
    const tr = Array.from(document.getElementById('facturasBody').children).find(row => row.children[0].textContent === idFactura);
    if (tr && document.getElementById('pagosFacturaModal').style.display === 'flex') {
      const cliente = tr.children[2].textContent;
      const total = tr.children[3].textContent;
      const pagado = tr.children[4].textContent;
      const debido = tr.children[5].textContent;
      mostrarPagosFactura(idFactura, cliente, total, pagado, debido);
    }
  };

  // Botón imprimir en la tabla de facturas
  document.getElementById('facturasBody').addEventListener('click', function(e) {
    if (e.target.closest('.factura-action-btn.imprimir')) {
      const tr = e.target.closest('tr');
      const id = tr.children[0].textContent;
      const fecha = tr.children[1].textContent;
      const cliente = tr.children[2].textContent;
      const total = tr.children[3].textContent;
      const pagado = tr.children[4].textContent;
      const debido = tr.children[5].textContent;
      // Productos demo (puedes mejorar esto para mostrar los productos reales de la factura)
      const productos = [
        { nombre: 'Producto demo', cantidad: 1, precio: total, subtotal: total }
      ];
      // Pagos
      const pagos = pagosPorFactura[id] || [];
      // Generar PDF
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      let y = 15;
      doc.setFontSize(16);
      doc.text(`Factura N°: ${id}`, 15, y);
      y += 8;
      doc.setFontSize(12);
      doc.text(`Fecha: ${fecha}`, 15, y);
      y += 8;
      doc.setFontSize(13);
      doc.text('Productos:', 15, y);
      y += 7;
      doc.setFontSize(11);
      productos.forEach(p => {
        doc.text(`${p.nombre}  Cant: ${p.cantidad}  Precio: $${p.precio}  Subtotal: $${p.subtotal}`, 15, y);
        y += 6;
      });
      y += 4;
      doc.setFontSize(13);
      doc.text('Totales:', 15, y);
      y += 7;
      doc.setFontSize(11);
      doc.text(`Total: $${total}`, 15, y);
      y += 6;
      doc.text(`Pagado: $${pagado}`, 15, y);
      y += 6;
      doc.text(`Debido: $${debido}`, 15, y);
      y += 10;
      if (pagos.length > 0) {
        doc.setFontSize(13);
        doc.text('Pagos:', 15, y);
        y += 7;
        doc.setFontSize(11);
        pagos.forEach(p => {
          doc.text(`${p.fecha} - $${p.importe} - ${p.metodo}`, 15, y);
          y += 6;
        });
      }
      doc.save(`Factura_${id}.pdf`);
    }
  });

  // Botón editar en la tabla de facturas
  document.getElementById('facturasBody').addEventListener('click', function(e) {
    if (e.target.closest('.factura-action-btn.editar')) {
      const tr = e.target.closest('tr');
      const id = tr.children[0].textContent;
      const factura = facturasDemo.find(f => f.id.toString() === id);
      if (factura) {
        document.getElementById('crearFacturaModal').style.display = 'flex';
        document.getElementById('cfNumero').value = factura.id;
        document.getElementById('cfFecha').value = factura.fecha || '';
        const cfCliente = document.getElementById('cfCliente');
        for (let i = 0; i < cfCliente.options.length; i++) {
          if (cfCliente.options[i].text === factura.cliente) {
            cfCliente.selectedIndex = i;
            break;
          }
        }
        // Cargar productos
        const tbody = document.getElementById('cfProductosBody');
        tbody.innerHTML = '';
        factura.productos.forEach((prod, idx) => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><button type="button" class="eliminar-fila-btn"><i class="fas fa-trash"></i></button></td>
            <td>${idx + 1}</td>
            <td><select class="styled-select"><option>${prod.categoria}</option></select></td>
            <td><select class="styled-select"><option>${prod.producto}</option></select></td>
            <td><select class="styled-select"><option>${prod.comprobante}</option></select></td>
            <td><input type="number" min="0" value="${prod.cantidad}" class="styled-input" placeholder="Cantidad"></td>
            <td><input type="number" min="0" value="${prod.precio}" class="styled-input" placeholder="Precio"></td>
            <td><input type="number" min="0" value="${prod.descuento}" class="styled-input" placeholder="Descuento"></td>
            <td><select class="styled-select" placeholder="Tipo de descuento">
              <option${prod.tipoDescuento === 'Sin descuento' ? ' selected' : ''}>Sin descuento</option>
              <option${prod.tipoDescuento === 'Porcentaje' ? ' selected' : ''}>Porcentaje</option>
              <option${prod.tipoDescuento === 'Importe fijo' ? ' selected' : ''}>Importe fijo</option>
              <option${prod.tipoDescuento === '2x1' ? ' selected' : ''}>2x1</option>
              <option${prod.tipoDescuento === '3x2' ? ' selected' : ''}>3x2</option>
              <option${prod.tipoDescuento === 'Descuento especial' ? ' selected' : ''}>Descuento especial</option>
            </select></td>
            <td><input type="number" min="0" value="${prod.total}" class="styled-input" placeholder="Total" readonly></td>
          `;
          tbody.appendChild(tr);
        });
        document.getElementById('ftPrecioTotal').textContent = factura.monto;
        document.getElementById('ftDescuentoTotal').textContent = '0';
        document.getElementById('ftImporteNeto').textContent = factura.monto;
        document.getElementById('ftPagarAhora').value = factura.pagado;
        document.getElementById('ftImporteDeber').textContent = factura.debido;
      }
    }
    // Botón eliminar en la tabla de facturas
    if (e.target.closest('.factura-action-btn.eliminar')) {
      const tr = e.target.closest('tr');
      const id = tr.children[0].textContent;
      if (confirm('¿Seguro que deseas eliminar esta factura?')) {
        const idx = facturasDemo.findIndex(f => f.id.toString() === id);
        if (idx !== -1) {
          facturasDemo.splice(idx, 1);
          renderFacturasTabla();
          llenarFiltroClientes();
        }
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {

    // Mensaje de bienvenida
    console.log("EasyAccounting - Frontend cargado correctamente");

    // Confirmación para botones de eliminar
    const botonesEliminar = document.querySelectorAll(
        ".btn-eliminar, .eliminar, [data-action='eliminar']"
    );

    botonesEliminar.forEach(function (boton) {
        boton.addEventListener("click", function (event) {
            const confirmar = confirm(
                "¿Está seguro de que desea eliminar este registro?"
            );

            if (!confirmar) {
                event.preventDefault();
            }
        });
    });

    // Validación de formularios
    const formularios = document.querySelectorAll("form");

    formularios.forEach(function (formulario) {
        formulario.addEventListener("submit", function (event) {
            const camposRequeridos =
                formulario.querySelectorAll("[required]");

            let formularioValido = true;

            camposRequeridos.forEach(function (campo) {
                if (campo.value.trim() === "") {
                    formularioValido = false;
                }
            });

            if (!formularioValido) {
                event.preventDefault();
                alert("Por favor, complete todos los campos obligatorios.");
            }
        });
    });

    // Búsqueda en tablas
    const buscadores = document.querySelectorAll(
        "input[type='search'], .search-input"
    );

    buscadores.forEach(function (buscador) {
        buscador.addEventListener("input", function () {
            const texto = buscador.value.toLowerCase();
            const filas = document.querySelectorAll("tbody tr");

            filas.forEach(function (fila) {
                const contenido = fila.textContent.toLowerCase();

                fila.style.display =
                    contenido.includes(texto) ? "" : "none";
            });
        });
    });

});

// Guardar nuevo movimiento
const formMovimiento = document.getElementById("formMovimiento");

if (formMovimiento) {
    formMovimiento.addEventListener("submit", function (event) {
        event.preventDefault();

        const movimiento = {
            tipo: document.getElementById("tipo").value,
            concepto: document.getElementById("concepto").value.trim(),
            categoria: document.getElementById("categoria").value,
            valor: Number(document.getElementById("valor").value),
            fecha: document.getElementById("fecha").value,
            descripcion: document.getElementById("descripcion").value.trim()
        };

const movimientos = JSON.parse(
    localStorage.getItem("easyAccountingMovimientos") || "[]"
);

movimientos.push(movimiento);

localStorage.setItem(
    "easyAccountingMovimientos",
    JSON.stringify(movimientos)
);

alert("Movimiento guardado correctamente.");

formMovimiento.reset();
mostrarMovimientos();
    });
}



// Generar reporte
const generarReporte = document.getElementById("generarReporte");

if (generarReporte) {
    generarReporte.addEventListener("click", function (event) {
        event.preventDefault();

        alert("Reporte generado correctamente.");
    });
}

// Descargar reporte en PDF
const descargarPDF = document.getElementById("descargarPDF");

if (descargarPDF) {
    descargarPDF.addEventListener("click", function () {
        window.print();
    });
}

// Exportar reporte a Excel
const exportarExcel = document.getElementById("exportarExcel");

if (exportarExcel) {
    exportarExcel.addEventListener("click", function () {
        const tabla = document.querySelector("table");

        if (!tabla) {
            alert("No hay datos disponibles para exportar.");
            return;
        }

        let contenido = "";

        tabla.querySelectorAll("tr").forEach(function (fila) {
            const datos = [];

            fila.querySelectorAll("th, td").forEach(function (celda) {
                datos.push(celda.innerText);
            });

            contenido += datos.join(";") + "\n";
        });

        const archivo = new Blob([contenido], {
            type: "text/csv;charset=utf-8;"
        });

        const enlace = document.createElement("a");
        enlace.href = URL.createObjectURL(archivo);
        enlace.download = "reporte_EasyAccounting.csv";
        enlace.click();

        URL.revokeObjectURL(enlace.href);
    });
}

// Imprimir reporte
const imprimirReporte = document.getElementById("imprimirReporte");

if (imprimirReporte) {
    imprimirReporte.addEventListener("click", function () {
        window.print();
    });
}

// Nueva factura
const nuevaFactura = document.getElementById("nuevaFactura");

if (nuevaFactura) {
    nuevaFactura.addEventListener("click", function (event) {
        event.preventDefault();

        const cliente = prompt("Nombre del cliente:");
if (cliente === null) return;
if (cliente.trim() === "") {
    alert("Debes escribir el nombre del cliente.");
    return;
}
const numeroFactura = prompt("Número de la factura:");
if (numeroFactura === null) return;
if (numeroFactura.trim() === "") {
    alert("Debes escribir el número de la factura.");
    return;
}
const valorFactura = prompt("Valor total de la factura:");
if (valorFactura === null) return;
if (valorFactura.trim() === "") {
    alert("Debes escribir el valor de la factura.");
    return;
}
const fechaFactura = prompt("Fecha de la factura (AAAA-MM-DD):");
if (fechaFactura === null) return;
if (fechaFactura.trim() === "") {
    alert("Debes escribir la fecha de la factura.");
    return;
}
const fechaVencimiento = prompt("Fecha de vencimiento (AAAA-MM-DD):");
if (fechaVencimiento === null) return;
if (fechaVencimiento.trim() === "") {
    alert("Debes escribir la fecha de vencimiento.");
    return;
}
const estadoFactura = prompt("Estado de la factura (Pendiente, Pagada o Vencida):");
if (estadoFactura === null) return;
if (estadoFactura.trim() === "") {
    alert("Debes escribir el estado de la factura.");
    return;
}
if (!cliente || !numeroFactura || !valorFactura || !fechaFactura || !fechaVencimiento || !estadoFactura) {
    alert("Debes completar todos los datos de la factura.");
    return;
}
const tablaFacturas = document.getElementById("tablaFacturas");
const nuevaFila = document.createElement("tr");
const celdaNumero = document.createElement("td");
celdaNumero.textContent = numeroFactura;
nuevaFila.appendChild(celdaNumero);
const celdaCliente = document.createElement("td");
celdaCliente.textContent = cliente;
nuevaFila.appendChild(celdaCliente);
const celdaFecha = document.createElement("td");
celdaFecha.textContent = fechaFactura;
nuevaFila.appendChild(celdaFecha);
const celdaVencimiento = document.createElement("td");
celdaVencimiento.textContent = fechaVencimiento;
nuevaFila.appendChild(celdaVencimiento);
const celdaValor = document.createElement("td");
celdaValor.textContent = "$" + Number(valorFactura).toLocaleString("es-CO");
nuevaFila.appendChild(celdaValor);
const celdaEstado = document.createElement("td");
celdaEstado.textContent = estadoFactura;
nuevaFila.appendChild(celdaEstado);
const celdaAcciones = document.createElement("td");
celdaAcciones.textContent = "Registrada";
nuevaFila.appendChild(celdaAcciones);
tablaFacturas.appendChild(nuevaFila);
const factura = {
    numero: numeroFactura,
    cliente: cliente,
    valor: valorFactura,
    fecha: fechaFactura,
    vencimiento: fechaVencimiento,
    estado: estadoFactura
};

const facturasGuardadas = JSON.parse(localStorage.getItem("facturasEasyAccounting") || "[]");

facturasGuardadas.push(factura);

localStorage.setItem("facturasEasyAccounting", JSON.stringify(facturasGuardadas));
    });
}

// Ver detalle de factura
const botonesVerFactura = document.querySelectorAll(".boton-accion.editar");

botonesVerFactura.forEach(function (boton) {
    boton.addEventListener("click", function () {
        const fila = boton.closest("tr");
        const numeroFactura = fila.querySelector("td").innerText;

        alert("Mostrando detalles de la factura " + numeroFactura);
    });
});

// Filtrar facturas por estado
const filtroFacturas = document.getElementById("filtroFacturas");

if (filtroFacturas) {
    filtroFacturas.addEventListener("change", function () {
        const estadoSeleccionado = filtroFacturas.value.toLowerCase();
        const filasFacturas = document.querySelectorAll(".tabla-dashboard tbody tr");

        filasFacturas.forEach(function (fila) {
            const estado = fila.querySelector(".estado-factura");

            if (!estado) return;

            const textoEstado = estado.innerText.trim().toLowerCase();

            if (
                estadoSeleccionado === "todos los estados" ||
                textoEstado.includes(estadoSeleccionado.replace("s", ""))
            ) {
                fila.style.display = "";
            } else {
                fila.style.display = "none";
            }
        });
    });
}

function mostrarMovimientos() {
    const tabla = document.getElementById("tablaMovimientos");

    if (!tabla) return;

    const movimientos = JSON.parse(
        localStorage.getItem("easyAccountingMovimientos") || "[]"
    );

    tabla.innerHTML = "";

    movimientos.forEach(function (movimiento) {
        const fila = document.createElement("tr");

        const datos = [
            movimiento.fecha,
            movimiento.concepto,
            movimiento.categoria,
            movimiento.tipo,
            Number(movimiento.valor).toLocaleString("es-CO"),
            "Completado"
        ];

        datos.forEach(function (dato) {
            const celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        tabla.appendChild(fila);

    });
}

mostrarMovimientos();
function mostrarFacturasGuardadas() {
    const tabla = document.getElementById("tablaFacturas");
    if (!tabla) return;

    const facturas = JSON.parse(
        localStorage.getItem("facturasEasyAccounting") || "[]"
    );

    facturas.forEach(function (factura) {
        const fila = document.createElement("tr");

        const datos = [
            factura.numero,
            factura.cliente,
            factura.fecha,
            factura.vencimiento,
            "$" + Number(factura.valor).toLocaleString("es-CO"),
            factura.estado,
            "Registrada"
        ];

        datos.forEach(function (dato) {
            const celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        tabla.appendChild(fila);
    });
}

mostrarFacturasGuardadas();
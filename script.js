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
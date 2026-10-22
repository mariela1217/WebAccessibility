const formulario = document.getElementById("form-reserva");

const nombre = document.getElementById("nombre");
const servicio = document.getElementById("servicio");
const fecha = document.getElementById("fecha");
const hora = document.getElementById("hora");

const mensajeReserva = document.getElementById("mensaje-reserva");

const enlacesReserva = document.querySelectorAll(".reservar-link");


/* =========================
   FECHA MÍNIMA
========================= */

const hoy = new Date();

const anio = hoy.getFullYear();
const mes = String(hoy.getMonth() + 1).padStart(2, "0");
const dia = String(hoy.getDate()).padStart(2, "0");

fecha.min = `${anio}-${mes}-${dia}`;


/* =========================
   ENLACES DE LAS CARDS
========================= */

enlacesReserva.forEach(function (enlace) {

    enlace.addEventListener("click", function () {

        const servicioSeleccionado =
            enlace.dataset.servicio;

        servicio.value = servicioSeleccionado;

    });

});


/* =========================
   ENVÍO DEL FORMULARIO
========================= */

formulario.addEventListener("submit", function (event) {

    event.preventDefault();


    const nombreUsuario = nombre.value.trim();
    const servicioSeleccionado = servicio.value;
    const fechaSeleccionada = fecha.value;
    const horaSeleccionada = hora.value;


    if (
        nombreUsuario === "" ||
        servicioSeleccionado === "" ||
        fechaSeleccionada === "" ||
        horaSeleccionada === ""
    ) {

        mostrarError(
            "Completa todos los campos antes de realizar la reserva."
        );

        return;
    }


    const fechaElegida =
        new Date(fechaSeleccionada + "T00:00:00");

    const fechaActual =
        new Date();

    fechaActual.setHours(0, 0, 0, 0);


    if (fechaElegida < fechaActual) {

        mostrarError(
            "Selecciona una fecha de hoy o posterior."
        );

        fecha.focus();

        return;
    }


    const fechaFormateada =
        formatearFecha(fechaSeleccionada);


    mensajeReserva.replaceChildren();


    const contenedorMensaje =
        document.createElement("div");

    contenedorMensaje.className =
        "mensaje-exito";


    const titulo =
        document.createElement("h3");

    titulo.textContent =
        "Reserva registrada correctamente";

    titulo.setAttribute("tabindex", "-1");


    const textoReserva =
        document.createElement("p");

    textoReserva.append(
        `${nombreUsuario}, tu reserva para `
    );


    const servicioDestacado =
        document.createElement("strong");

    servicioDestacado.textContent =
        servicioSeleccionado;


    textoReserva.append(
        servicioDestacado,
        " fue registrada."
    );


    const textoFecha =
        document.createElement("p");

    const etiquetaFecha =
        document.createElement("strong");

    etiquetaFecha.textContent =
        "Fecha: ";

    textoFecha.append(
        etiquetaFecha,
        fechaFormateada
    );


    const textoHora =
        document.createElement("p");

    const etiquetaHora =
        document.createElement("strong");

    etiquetaHora.textContent =
        "Hora: ";

    textoHora.append(
        etiquetaHora,
        horaSeleccionada
    );


    contenedorMensaje.append(
        titulo,
        textoReserva,
        textoFecha,
        textoHora
    );


    mensajeReserva.appendChild(
        contenedorMensaje
    );


    formulario.reset();


    requestAnimationFrame(function () {

        titulo.focus();

        titulo.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});


/* =========================
   ERROR
========================= */

function mostrarError(texto) {

    mensajeReserva.replaceChildren();


    const contenedorError =
        document.createElement("div");

    contenedorError.className =
        "mensaje-error";

    contenedorError.setAttribute(
        "tabindex",
        "-1"
    );


    const parrafo =
        document.createElement("p");

    parrafo.textContent = texto;


    contenedorError.appendChild(
        parrafo
    );


    mensajeReserva.appendChild(
        contenedorError
    );


    requestAnimationFrame(function () {

        contenedorError.focus();

        contenedorError.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

}


/* =========================
   FORMATEAR FECHA
========================= */

function formatearFecha(fechaOriginal) {

    const partes =
        fechaOriginal.split("-");

    const anio = partes[0];
    const mes = partes[1];
    const dia = partes[2];

    return `${dia}/${mes}/${anio}`;

}
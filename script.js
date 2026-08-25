// Obtener los estudiantes guardados.
// Si no existen, se utiliza un arreglo vacío.

let estudiantes =
    JSON.parse(
        localStorage.getItem("estudiantes")
    ) || [];


// Variable para saber si se está editando
// algún estudiante.

let estudianteEditando = null;



// REGISTRAR ESTUDIANTE

function registrarEstudiante() {

    const nombre =
        document
            .getElementById("nombre")
            .value
            .trim();


    const grado =
        document
            .getElementById("grado")
            .value
            .trim();


    const seccion =
        document
            .getElementById("seccion")
            .value
            .trim();



    // VALIDAR CAMPOS

    if (
        nombre === "" ||
        grado === "" ||
        seccion === ""
    ) {

        alert(
            "Por favor, completa todos los campos."
        );

        return;
    }



    // EDITAR ESTUDIANTE

    if (estudianteEditando !== null) {

        const estudiante =
            estudiantes.find(
                e => e.id === estudianteEditando
            );


        estudiante.nombre = nombre;

        estudiante.grado = grado;

        estudiante.seccion = seccion;


        estudianteEditando = null;


        document
            .querySelector(".btn-registrar")
            .textContent =
                "Registrar estudiante";

    } else {


        // CREAR NUEVO ESTUDIANTE

        const nuevoEstudiante = {

            id: Date.now(),

            nombre: nombre,

            grado: grado,

            seccion: seccion

        };


        estudiantes.push(nuevoEstudiante);

    }



    // GUARDAR DATOS

    guardarEstudiantes();


    // LIMPIAR FORMULARIO

    limpiarFormulario();


    // ACTUALIZAR LA LISTA

    mostrarEstudiantes();

}



// MOSTRAR ESTUDIANTES

function mostrarEstudiantes() {

    const tabla =
        document.getElementById(
            "tablaEstudiantes"
        );


    const contador =
        document.getElementById(
            "contador"
        );



    // ACTUALIZAR CONTADOR

    contador.textContent =
        estudiantes.length +
        (
            estudiantes.length === 1
                ? " estudiante registrado"
                : " estudiantes registrados"
        );



    // SI NO HAY ESTUDIANTES

    if (estudiantes.length === 0) {

        tabla.innerHTML = `

            <div class="vacio">

                <h3>
                    No hay estudiantes registrados 📚
                </h3>

                <p>
                    Registra un estudiante para comenzar.
                </p>

            </div>

        `;

        return;
    }



    // CREAR TABLA

    let contenido = `

        <table>

            <thead>

                <tr>

                    <th>Nombre</th>

                    <th>Grado</th>

                    <th>Sección</th>

                    <th>Acciones</th>

                </tr>

            </thead>

            <tbody>

    `;



    // MOSTRAR CADA ESTUDIANTE

    estudiantes.forEach(estudiante => {

        contenido += `

            <tr>

                <td>
                    ${estudiante.nombre}
                </td>

                <td>
                    ${estudiante.grado}
                </td>

                <td>
                    ${estudiante.seccion}
                </td>

                <td>

                    <button
                        class="editar"

                        onclick="
                            editarEstudiante(
                                ${estudiante.id}
                            )
                        "
                    >

                        Editar

                    </button>


                    <button
                        class="eliminar"

                        onclick="
                            eliminarEstudiante(
                                ${estudiante.id}
                            )
                        "
                    >

                        Eliminar

                    </button>

                </td>

            </tr>

        `;

    });



    contenido += `

            </tbody>

        </table>

    `;


    tabla.innerHTML = contenido;

}



// EDITAR ESTUDIANTE

function editarEstudiante(id) {

    const estudiante =
        estudiantes.find(
            e => e.id === id
        );


    // Colocar los datos del estudiante
    // dentro de los campos.

    document
        .getElementById("nombre")
        .value =
            estudiante.nombre;


    document
        .getElementById("grado")
        .value =
            estudiante.grado;


    document
        .getElementById("seccion")
        .value =
            estudiante.seccion;



    // Guardar el ID que se está editando.

    estudianteEditando = id;


    // Cambiar texto del botón.

    document
        .querySelector(".btn-registrar")
        .textContent =
            "Guardar cambios";


    // Llevar al usuario hacia arriba
    // para editar los datos.

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



// ELIMINAR ESTUDIANTE

function eliminarEstudiante(id) {

    const confirmar =
        confirm(
            "¿Seguro que deseas eliminar este estudiante?"
        );


    if (!confirmar) {

        return;

    }



    // Eliminar estudiante seleccionado.

    estudiantes =
        estudiantes.filter(
            e => e.id !== id
        );


    guardarEstudiantes();


    mostrarEstudiantes();

}



// GUARDAR EN LOCALSTORAGE

function guardarEstudiantes() {

    localStorage.setItem(
        "estudiantes",
        JSON.stringify(estudiantes)
    );

}



// LIMPIAR FORMULARIO

function limpiarFormulario() {

    document
        .getElementById("nombre")
        .value = "";


    document
        .getElementById("grado")
        .value = "";


    document
        .getElementById("seccion")
        .value = "";

}



// MOSTRAR LOS ESTUDIANTES
// AL ABRIR LA PÁGINA

mostrarEstudiantes();

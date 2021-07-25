const tituloInput = document.getElementById('tituloInput');
const contTextArea = document.getElementById('contTextArea');
const contenidoTabla = document.getElementById('contenidoTabla');
const categoriaSelect = document.getElementById('categoriaSelect');
const detalleNotaBody = document.getElementById('detalleNotaBody');
//Agrega las Notas en LocalStorage
let notas = JSON.parse(localStorage.getItem('notas')) || [];

function ID() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

function actualizarLocalStorage() {
    const notaJson = JSON.stringify(notas); //Transforma el Dato a JSON
    localStorage.setItem('notas', notaJson);
}

function agregarNota(event) {
    event.preventDefault();
    const titulo = tituloInput.value;
    const contenido = contTextArea.value;
    const categoria = categoriaSelect.value;
    const nuevaTarea = {
        id: ID(),
        titulo: titulo,
        contenido: contenido,
        categoria: categoria,
        registro: Date.now()
    };
    notas.push(nuevaTarea);
    actualizarLocalStorage();
    event.target.reset();
    listarNotas();
}

function listarNotas() {
    function crearFilas(nota) {
        const fila = `
        <tr>
            <td>
                <h4 class="text-warning">${nota.titulo}</h4>
                ${nota.categoria}
            </td>
            <td class="text-end">               
                <button onclick="detalleNota('${nota.id}')" type="button" class="btn btn-primary p-2" data-bs-toggle="modal" data-bs-target="#detalleModal" data-bs-whatever="@mdo">Ver Detalle</button>
                <button class="btn btn-warning">Editar</button>
                <button onclick="eliminarNota('${nota.id}')" class="btn btn-danger">Eliminar</button>
            </td>
        </tr>
        `;
        return fila;
    }
    const contenido = notas.map(crearFilas);
    contenidoTabla.innerHTML = contenido.join('');
}

function eliminarNota(id) {
    function notasFilter(nota) {
        return nota.id !== id;
    };
    const notasFiltradas = notas.filter(notasFilter);
    notas = notasFiltradas;
    actualizarLocalStorage();
    listarNotas();
}

function detalleNota(id) {
    function notasFind(nota) {
        return nota.id === id;
    };
    const notaEncontrada = notas.find(notasFind);
    const fecha = new Date(notaEncontrada.registro);
    const contenido = `
            <p>Fecha de registro: ${fecha.toLocaleString()}</p>
            <p>Titulo: ${notaEncontrada.titulo} </p>
            <p>Contenido: ${notaEncontrada.contenido}</p>
            <p>Categoria:${notaEncontrada.categoria} </p>
        `;
    detalleNotaBody.innerHTML = contenido;
}
listarNotas();
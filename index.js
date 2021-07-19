const tituloInput = document.getElementById('tituloInput');
const contTextArea = document.getElementById('contTextArea');
const contenidoTabla = document.getElementById('contenidoTabla');
const categoriaSelect = document.getElementById('categoriaSelect');
//Agrega las Notas en LocalStorage
let notas = JSON.parse(localStorage.getItem('notas')) || [];

function ID() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

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
    const notaJson = JSON.stringify(notas); //Transforma el Dato a JSON
    localStorage.setItem('notas', notaJson);
    event.target.reset();
    console.log(notas);
    listarNotas();
}

function listarNotas() {
    // const fecha = new Date(nota.registro);
    // console.log(fecha.toLocaleString());
    function crearFilas(nota) {
        const fila = `
        <tr>
            <td>
                <h4 class="text-warning">${nota.titulo}</h4>
                ${nota.categoria}
            </td>
            <td class="text-end">
                <button class="btn btn-primary">Ver Detalle</button>
                <button class="btn btn-warning">Editar</button>
                <button class="btn btn-danger">Eliminar</button>
            </td>
        </tr>
        `;
        return fila;
    }
    const contenido = notas.map(crearFilas);
    contenidoTabla.innerHTML = contenido.join('');
}
listarNotas();
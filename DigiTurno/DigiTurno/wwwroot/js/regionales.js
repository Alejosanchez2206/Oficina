let allData = [];
const itemsPerPage = 10; // Número de items por página
let currentPage = 1;

let isEditMode = false;
let editingCode = null;

const apiUrl = 'http://localhost:5000/api/regionales';

// Función para cargar los datos
async function loadData() {
    try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        allData = result.data;
        updateTable();
        updatePaginationControls();
    } catch (error) {
        console.error('Error al realizar la solicitud a la API:', error);
    }
}

// Función para actualizar la tabla con los datos de la página actual
function updateTable() {
    const table = document.querySelector('tbody');
    table.innerHTML = ''; // Limpiar tabla

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = allData.slice(startIndex, endIndex);

    pageData.forEach(modulos => {
        agregarTurnoATabla(modulos);
    });
}

// Función para actualizar los controles de paginación
function updatePaginationControls() {
    const totalPages = Math.ceil(allData.length / itemsPerPage);
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('totalPages').textContent = totalPages;

    // Habilitar/deshabilitar botones según corresponda
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

// Event listeners para los botones de paginación
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updateTable();
        updatePaginationControls();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    const totalPages = Math.ceil(allData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        updateTable();
        updatePaginationControls();
    }
});

// Función para agregar un módulo a la tabla
function agregarTurnoATabla(modulo) {
    const table = document.querySelector('tbody');
    const tr = document.createElement('tr');

    // Crear el contenido de la fila
    tr.innerHTML = `
        <td>${modulo.Codigo}</td>
        <td>${modulo.Nombre}</td>
        <td>${modulo.Descripcion}</td>
        <td>${modulo.Activo ? "Activo" : "Inactivo"}</td>
        <td>
            <button class="btn-Editar">Editar</button>
            <button class="btn-Eliminar">Eliminar</button>
        </td>
    `;

    // Agregar event listeners a los botones
    const btnEditar = tr.querySelector('.btn-Editar');
    const btnEliminar = tr.querySelector('.btn-Eliminar');

    btnEditar.addEventListener('click', () => {
        editarModulo(modulo);
    });

    btnEliminar.addEventListener('click', () => {
        eliminarModulo(modulo.Codigo);
    });

    // Agregar la fila a la tabla
    table.appendChild(tr);
}


const modal = document.getElementById('moduloModal');
const btnAgregar = document.getElementById('btnAgregar');
const span = document.getElementsByClassName('close')[0];
const form = document.getElementById('moduloForm');

// Abrir modal para nuevo registro
btnAgregar.onclick = function () {
    document.getElementById('modalTitle').textContent = 'Nueva Regional';
    form.reset();
    modal.style.display = 'block';
}

// Función para abrir el modal en modo creación
function openCreateModal() {
    isEditMode = false;
    editingCode = null;
    document.getElementById('modalTitle').textContent = 'Nueva Regional';
    document.getElementById('codigo').disabled = false; // Habilitar el código en modo creación
    form.reset();
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    form.reset();
    isEditMode = false;
    editingCode = null;
    document.getElementById('codigo').disabled = false;
}

// Actualizar el event listener del botón de agregar
document.getElementById('btnAgregar').onclick = openCreateModal;

// Cerrar modal con X
span.onclick = function () {
    closeModal();
}

// Cerrar modal si se hace clic fuera
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}

function closeModal() {
    modal.style.display = 'none';
    form.reset();
}

// Manejador del formulario para crear/actualizar
form.onsubmit = async function (e) {
    e.preventDefault();
    const formData = {
        Codigo: document.getElementById('codigo').value,
        Nombre: document.getElementById('nombre').value,
        Descripcion: document.getElementById('descripcion').value,
        Activo: document.getElementById('estado').value === 'true'
    };

    try {
        let url = apiUrl;
        let method = 'POST';
        let successMessage = 'Regional creado exitosamente';

        if (isEditMode) {
            url = `${apiUrl}/${editingCode}`;
            method = 'PUT';
            successMessage = 'Regional actualizado exitosamente';
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Esperamos a que se complete la operación
            const result = await response.json();

            // Mostramos el mensaje de éxito
            alert(successMessage);

            // Cerramos el modal
            closeModal();

            // Forzamos la recarga de datos
            await loadData();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la operación');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Error al procesar la solicitud');
    }
};


// Función para editar
function editarModulo(modulo) {
    isEditMode = true;
    editingCode = modulo.Codigo;
    document.getElementById('modalTitle').textContent = 'Editar Regionales';
    document.getElementById('codigo').value = modulo.Codigo;
    document.getElementById('codigo').disabled = true; // Deshabilitar el código en modo edición
    document.getElementById('nombre').value = modulo.Nombre;
    document.getElementById('descripcion').value = modulo.Descripcion;
    document.getElementById('estado').value = modulo.Activo.toString();
    modal.style.display = 'block';
}

async function eliminarModulo(codigo) {
    if (confirm('¿Está seguro de eliminar este Regional?')) {
        try {
            const response = await fetch(`${apiUrl}/${codigo}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await loadData();
                alert('Regional eliminado exitosamente');
            } else {
                throw new Error('Error al eliminar el Regional');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar el módulo');
        }
    }
}

// Cargar datos iniciales
loadData();
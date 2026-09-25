const inputTarea = document.querySelector('#tarea-input');
const btnAgregar = document.querySelector('#agregar-btn');
const listaTareas = document.querySelector('#lista-tareas');

const modalAlerta = document.querySelector('#modal-alerta');
const btnModalManana = document.querySelector('#btn-modal-manana');
const btnModalEliminar = document.querySelector('#btn-modal-eliminar');
const btnModalCancelar = document.querySelector('#btn-modal-cancelar');

let tareaSeleccionada = null;

function abrirModal(elementoLi) {
  tareaSeleccionada = elementoLi;
  modalAlerta.style.display = 'flex';
}

function cerrarModal() {
  modalAlerta.style.display = 'none';
  tareaSeleccionada = null;
}

function agregarTarea() {
  const texto = inputTarea.value.trim();

  if (texto === '') {
    alert('Por favor escribe una tarea.');
    return;
  }

  const nuevaTarea = document.createElement('li');
  const itemTarea = document.createElement('div');
  itemTarea.classList.add('item-tarea');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('chk-completada');

  const spanTexto = document.createElement('span');
  spanTexto.textContent = texto;
  spanTexto.classList.add('texto-tarea');

  itemTarea.appendChild(checkbox);
  itemTarea.appendChild(spanTexto);
  nuevaTarea.appendChild(itemTarea);

  const seleccionarTarea = () => {
    checkbox.checked = true;
    spanTexto.classList.add('completada');
    abrirModal(nuevaTarea);
  };

  checkbox.addEventListener('change', function(e) {
    e.stopPropagation();
    if (this.checked) {
      seleccionarTarea();
    } else {
      spanTexto.classList.remove('completada');
    }
  });

  spanTexto.addEventListener('click', seleccionarTarea);

  listaTareas.appendChild(nuevaTarea);
  inputTarea.value = '';
}

btnModalManana.addEventListener('click', function() {
  if (tareaSeleccionada) {
    const span = tareaSeleccionada.querySelector('.texto-tarea');
    const checkbox = tareaSeleccionada.querySelector('.chk-completada');
    
    span.classList.remove('completada');
    span.classList.add('pospuesta');
    checkbox.checked = false;
    
    if (!span.textContent.includes('(para mañana)')) {
      span.textContent += ' (para mañana)';
    }
  }
  cerrarModal();
});

btnModalEliminar.addEventListener('click', function() {
  if (tareaSeleccionada) {
    tareaSeleccionada.remove();
  }
  cerrarModal();
});

btnModalCancelar.addEventListener('click', cerrarModal);

btnAgregar.addEventListener('click', agregarTarea);

inputTarea.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    agregarTarea();
  }
});
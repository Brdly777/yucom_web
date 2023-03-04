const apiURL = ('https://localhost:7292/api/presentador/Paginación');
const api_URL = ('https://localhost:7292/api/presentador');

//Metodo GET
window.addEventListener('DOMContentLoaded', () => {
  getPresenters();
})

const getPresenters = () => {
  fetch(apiURL)
  .then((response) => response.json())
  .catch(error => {
    alertManager('error', 'ERROR: No se puede cargar los presentadores');
  })
  .then((presenters) => {
    console.log(presenters)
    renderResult(presenters);
  })
}


const presentersList = document.querySelector('#presentersList');
const renderResult = (presenters) => {
  let listHTML = "";
  presenters.forEach(presenter => {
    listHTML += `
    <div class="card">
      <div>
      <center><img src="${presenter.fotografia}" alt="Avatar" style="width:50%"></center>
      </div>
      <div>Nombre: ${presenter.nombre}</div>
      <div>Descripcion: ${presenter.descripcion}</div>
      <center><div>
      <button type="button" id="btnEdit" onclick="editPresenter(${presenter.id})">Editar</button>
      <button type="button" id="btnDelete" onclick="deletePresenter(${presenter.id})">Eliminar</button>
      </center></div>
    </div>
    `
  })
  presentersList.innerHTML = listHTML;
}


//Metodo POST
const createPresenter = () => {
  const formData = new FormData(document.querySelector('#formAdd'));

  if(!formData.get('rfc').length || !formData.get('fotografia').length || !formData.get('nombre') || !formData.get('descripcion')) {
    document.querySelector('#msgFormAdd').innerHTML = '* Llena todos los campos';
    return;
  }
  
  const presenter = {
    id: formData.get('id'),
    rfc: formData.get('rfc'),
    fotografia: formData.get('fotografia'),
    nombre: formData.get('nombre'),
    descripcion: formData.get('descripcion')
  }
  console.log(presenter)

  fetch(api_URL, {
    method: 'POST',
    body: JSON.stringify(presenter),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(error => {
    alertManager(error);
    document.querySelector('#formAdd').reset();
  })
}


//Metodo PUT
const editPresenter = (id) => {
  fetch(`${api_URL}/${id}`)
  .then(res => res.json())
  .then(presenter => {
  document.querySelector('#formEdit #id').value = presenter.id;
  document.querySelector('#formEdit #rfc').value = presenter.rfc;
  document.querySelector('#formEdit #fotografia').value = presenter.fotografia;
  document.querySelector('#formEdit #nombre').value = presenter.nombre;
  document.querySelector('#formEdit #descripcion').value = presenter.descripcion;
  console.log(presenter)
  openModalEdit();
  })
}

const updatePresenter = () => {
  const formEdit = new FormData(document.querySelector('#formEdit'));

  if(!formEdit.get('fotografia').length || !formEdit.get('rfc') || !formEdit.get('nombre') || !formEdit.get('descripcion')) {
    document.querySelector('#msgFormEdit').innerHTML = '* Llena todos los campos';
    return;
  }
  
  const presenter = {
    id: formEdit.get('id'),
    rfc: formEdit.get('rfc'),
    fotografia: formEdit.get('fotografia'),
    nombre: formEdit.get('nombre'),
    descripcion: formEdit.get('descripcion')
  }

  fetch(api_URL + '/' + '1', {
    method: 'PUT',
    body: JSON.stringify(presenter),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(error => {
    alertManager(error);
    document.querySelector('#formEdit').reset();
    console.log(presenter)
  })
}


//Metodo Delete
const deletePresenter = (id) => {
  fetch(`${api_URL}/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())

  .then(response => {
    alertManager('success', response.mensaje);
    closeModalConfirm();
    getPresenters();
    deleteId = null;
  })
}

const confirmDelete = (res) => {
  if(res){
    deletePresenter(deleteId);
  } else {
    closeModalConfirm();
  }
}

// MODAL ADD MANAGER
/** --------------------------------------------------------------- */
const btnAdd = document.querySelector('#btnAdd');
const modalAdd = document.querySelector('#modalAdd');

btnAdd.onclick = () => openModalAdd();

window.onclick = function(event) {
  if (event.target == modalAdd) {
    //modalAdd.style.display = "none";
  }
}

const closeModalAdd = () => {
  modalAdd.style.display = 'none';
}

const openModalAdd = () => {
  modalAdd.style.display = 'block';
}

// MODAL ADIT MANAGER
/** --------------------------------------------------------------- */
const modalEdit = document.querySelector('#modalEdit');

const openModalEdit = () => {
  modalEdit.style.display = 'block';
}

const closeModalEdit = () => {
  modalEdit.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modalEdit) {
    //modalEdit.style.display = "none";
  }
}

// MODAL CONFIRM MANAGER
/** --------------------------------------------------------------- */
const modalConfirm = document.getElementById('#modalConfirm');

window.onclick = function(event) {
  if (event.target == modalConfirm) {
    modalConfirm.style.display = "none";
  }
}

const closeModalConfirm = () => {
  modalConfirm.style.display = 'none';
}

const openModalConfirm = (id) => {
  deleteId = id;
  modalConfirm.style.display = 'block';
}


/** ALERT */
const alertManager = (typeMsg, message) => {
  const alert = document.querySelector('#alert');

  alert.innerHTML = message || 'Se produjo cambios';
  alert.classList.add(typeMsg);
  alert.style.display = 'block';

  setTimeout(() => {
    alert.style.display = 'none';
    alert.classList.remove(typeMsg);
  }, 3500);

}
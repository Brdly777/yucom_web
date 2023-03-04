const apiURL = ('https://localhost:7292/api/Establecimiento/Paginación');
const api_URL = ('https://localhost:7292/api/Establecimiento');
const api_ID = ('https://localhost:7292/api/Establecimiento/id');

//Metodo GET
window.addEventListener('DOMContentLoaded', () => {
  getEstablecimientos();
})

const getEstablecimientos = () => {
  fetch(apiURL)
  .then((response) => response.json())
  .catch(error => {
    alertManager('error', 'ERROR: No se puede cargar los presentadores');
  })
  .then((establecimientos) => {
    console.log(establecimientos)
    renderResult(establecimientos);
  })
}


const establecimientosList = document.querySelector('#establecimientosList');
const renderResult = (establecimientos) => {
  let listHTML = "";
  establecimientos.forEach(establecimiento => {
    listHTML += `
    <div class="card">
      <div>
      <center><img src="${establecimiento.fotografia}" alt="Avatar" style="width:50%"></center>
      </div>
      <div>Nombre: ${establecimiento.nombre}</div>
      <div>Descripcion: ${establecimiento.descripcion}</div>
      <center><div>
      <button type="button" id="btnEdit" onclick="editEstablecimiento(${establecimiento.id})">Editar</button>
      <button type="button" id="btnDelete" onclick="deleteEstablecimiento(${establecimiento.id})">Eliminar</button>
      </center></div>
    </div>
    `
  })
  establecimientosList.innerHTML = listHTML;
}


//Metodo POST
const createEstablecimiento = () => {
  const formData = new FormData(document.querySelector('#formAdd'));

  if(!formData.get('rfc').length || !formData.get('fotografia').length || !formData.get('nombre') || !formData.get('descripcion')) {
    document.querySelector('#msgFormAdd').innerHTML = '* Llena todos los campos';
    return;
  }
  
  const establecimiento = {
    id: formData.get('id'),
    rfc: formData.get('rfc'),
    fotografia: formData.get('fotografia'),
    nombre: formData.get('nombre'),
    descripcion: formData.get('descripcion')
  }
  console.log(establecimiento)

  fetch(api_URL, {
    method: 'POST',
    body: JSON.stringify(establecimiento),
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
const editEstablecimiento = (id) => {
  fetch(`${api_ID}/${id}`)
  .then(res => res.json())
  .then(establecimiento => {
  document.querySelector('#formEdit #id').value = establecimiento.id;
  document.querySelector('#formEdit #rfc').value = establecimiento.rfc;
  document.querySelector('#formEdit #fotografia').value = establecimiento.fotografia;
  document.querySelector('#formEdit #nombre').value = establecimiento.nombre;
  document.querySelector('#formEdit #descripcion').value = establecimiento.descripcion;
  console.log(establecimiento)
  openModalEdit();
  })
}

const updateEstablecimiento = () => {
  const formEdit = new FormData(document.querySelector('#formEdit'));

  if(!formEdit.get('rfc') || !formEdit.get('fotografia').length || !formEdit.get('nombre') || !formEdit.get('descripcion')) {
    document.querySelector('#msgFormEdit').innerHTML = '* Llena todos los campos';
    return;
  }
  
  const establecimiento = {
    id: formEdit.get('id'),
    rfc: formEdit.get('rfc'),
    fotografia: formEdit.get('fotografia'),
    nombre: formEdit.get('nombre'),
    descripcion: formEdit.get('descripcion')
  }

  fetch(api_URL + '/' + '1', {
    method: 'PUT',
    body: JSON.stringify(establecimiento),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(error => {
    alertManager(error);
    document.querySelector('#formEdit').reset();
    console.log(establecimiento)
  })
}


//Metodo Delete
const deleteEstablecimiento = (id) => {
  fetch(`${api_URL}/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())

  .then(response => {
    alertManager('success', response.mensaje);
    closeModalConfirm();
    getEstablecimientos();
    deleteId = null;
  })
}

const confirmDelete = (res) => {
  if(res){
    deleteEstablecimiento(deleteId);
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
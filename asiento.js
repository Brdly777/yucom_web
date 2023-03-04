const apiURL = ('https://localhost:7292/api/establecimiento');
const api_URL = ('https://localhost:7292/api/Asiento');

//Metodo GET
window.addEventListener('DOMContentLoaded', () => {
    getAsientos();
  })
  
  const getAsientos = (establecimientoId) => {
    fetch(`${apiURL}/${establecimientoId}/asientos`)
    .then((response) => response.json())
    .catch(error => {
      alertManager('error', 'ERROR: No se puede cargar los presentadores');
    })
    .then((asientos) => {
      console.log(asientos)
      renderResult(asientos);
    })
  }
  
  
  const asientosList = document.querySelector('#asientosList');
  const renderResult = (asientos) => {
    let listHTML = "";
    asientos.forEach(asiento => {
      listHTML += `
      <div class="cardAsiento">
        <div>Numero: ${asiento.numero}</div>
        <div>Descripcion: ${asiento.descripcion}</div>
        <center><div>
        <button type="submit" id="btnEdit" onclick="editAsiento(${asiento.id})">Editar</button>
        <button type="submit" id="btnDelete" onclick="deleteAsiento(${asiento.id})">Eliminar</button>
        </center></div>
      </div>
      `
    })
    asientosList.innerHTML = listHTML;
  }
  
  
  //Metodo POST
  const createAsiento = () => {
    const formData = new FormData(document.querySelector('#formAdd'));
  
    if(!formData.get('numero') || !formData.get('descripcion')) {
      document.querySelector('#msgFormAdd').innerHTML = '* Llena todos los campos';
      return;
    }
    
    const asiento = {
      id: formData.get('id'),
      Numero: formData.get('numero'),
      descripcion: formData.get('descripcion')
    }
    console.log(asiento)
  
    fetch(api_URL, {
      method: 'POST',
      body: JSON.stringify(asiento),
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
  const editAsiento = (id) => {
    fetch(`${api_URL}/${id}`)
    .then(res => res.json())
    .then(asiento => {
    document.querySelector('#formEdit #id').value = asiento.id;
    document.querySelector('#formEdit #numero').value = asiento.numero;
    document.querySelector('#formEdit #descripcion').value = asiento.descripcion;
    console.log(asiento)
    openModalEdit();
    })
  }

  const updateAsiento = () => {
    const formEdit = new FormData(document.querySelector('#formEdit'));
  
    if(!formEdit.get('numero') || !formEdit.get('descripcion')) {
      document.querySelector('#msgFormEdit').innerHTML = '* Llena todos los campos';
      return;
    }
    
    const asiento = {
      id: formEdit.get('id'),
      numero: formEdit.get('numero'),
      descripcion: formEdit.get('descripcion')
    }
  
    fetch(api_URL + '/' + '1', {
      method: 'PUT',
      body: JSON.stringify(asiento),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .catch(error => {
      alertManager(error);
      document.querySelector('#formEdit').reset();
      console.log(asiento)
    })
  }
  
  
  //Metodo Delete
  const deleteAsiento = (id) => {
    fetch(`${api_URL}/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
  
    .then(response => {
      alertManager('success', response.mensaje);
      closeModalConfirm();
      getAsientos();
      deleteId = null;
    })
  }
  
  const confirmDelete = (res) => {
    if(res){
      deleteAsiento(deleteId);
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
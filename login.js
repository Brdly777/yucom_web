const apiURL= ('https://localhost:7292/api/Cuentas/Login');
const loginForm = document.querySelector('#loginForm');
let token = ' '
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aWFuQGV4YW1wbGUuY29tIiwiZXhwIjoxNjc3MDgzNzQ1fQ.zRj9uaNfnEP_IieW-_F7oXq1Hx_mgyEbMEXvs95YSeE


loginForm.addEventListener('submit', (event) => {

    event.preventDefault(token);
    const cuenta = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    }
    console.log(cuenta)
    fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cuenta)
    }).then(data =>
        data.json()
    ).then(a => {
        localStorage.setItem('token', a.token);
        if (localStorage.getItem("token") != null) {
            setTimeout(function () { window.location.href = "./home.html"; }, 2000);
        } else {
            localStorage.removeItem('token');
            window.alert('el login no es correcto');
        }
    }).catch((error) => {
        console.log('ERROR: El token es incorrecto')
    })
}
)
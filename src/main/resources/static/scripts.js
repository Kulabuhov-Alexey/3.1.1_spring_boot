var btnAdd = document.getElementById('btnAdd')
btnAdd.addEventListener('click', function (event) {
    var setUserTablePage = document.getElementById('users-tab')

    var firstNameAdd = document.querySelector('#firstNameAdd')
    var lastNameAdd = document.querySelector('#lastNameAdd')
    var ageAdd = document.querySelector('#ageAdd')
    var emailAdd = document.querySelector('#emailAdd')
    var passwordAdd = document.querySelector('#passwordAdd')
    var rolesAdd = document.querySelector('#rolesAdd')
    var roles = []
    Array.from(rolesAdd.options).map(option => {
        if (option.selected) {
            var obj = new Object;
            obj.id = option.value;
            obj.role = 'ROLE_' + option.text;
            roles.push(obj)
        }
    })

    const data = {
        "password": passwordAdd.value,
        "roles": roles,
        "firstName": firstNameAdd.value,
        "lastName": lastNameAdd.value,
        "age": ageAdd.value,
        "email": emailAdd.value
    };

    new Promise(function (resolve, reject) {
        resolve(fetch('/admin/users', {
            method: 'POST', body: JSON.stringify(data), headers: {
                'Content-Type': 'application/json'
            }
        }).then(setUserTablePage.click()))
    }).then(result => setTable())
})
var editModal = document.getElementById('editModal')
editModal.addEventListener('show.bs.modal', function (event) {

    var button = event.relatedTarget
    var getUserRestUrl = 'admin/users/'

    var url = getUserRestUrl + button.getAttribute('name')
    var idEdit = editModal.querySelector('#idEdit')
    var firstNameEdit = editModal.querySelector('#firstNameEdit')
    var lastNameEdit = editModal.querySelector('#lastNameEdit')
    var ageEdit = editModal.querySelector('#ageEdit')
    var emailEdit = editModal.querySelector('#emailEdit')
    var passwordEdit = editModal.querySelector('#passwordEdit')
    var rolesEdit = editModal.querySelector('#rolesEdit')
    fetch(url)
        .then(response => response.json())
        .then(result => {
            idEdit.value = result.id
            firstNameEdit.value = result.firstName
            lastNameEdit.value = result.lastName
            ageEdit.value = result.age
            emailEdit.value = result.email
            passwordEdit.value = result.password
            Array.from(rolesEdit.options).map(option => option.selected = !!(result.roles.find(el => el.id == option.value)))
        })
})
var btnEdit = document.getElementById('btnEdit')
btnEdit.addEventListener('click', function (event) {
    var btnCloseEditModal = document.getElementById('btnCloseEditModal')

    var idEdit = document.querySelector('#idEdit')
    var firstNameEdit = document.querySelector('#firstNameEdit')
    var lastNameEdit = document.querySelector('#lastNameEdit')
    var ageEdit = document.querySelector('#ageEdit')
    var emailEdit = document.querySelector('#emailEdit')
    var passwordEdit = document.querySelector('#passwordEdit')
    var rolesEdit = document.querySelector('#rolesEdit')
    var roles = []
    Array.from(rolesEdit.options).map(option => {
        if (option.selected) {
            var obj = new Object;
            obj.id = option.value;
            obj.role = 'ROLE_' + option.text;
            roles.push(obj)
        }
    })

    const data = {
        "id": idEdit.value,
        "password": passwordEdit.value,
        "roles": roles,
        "firstName": firstNameEdit.value,
        "lastName": lastNameEdit.value,
        "age": ageEdit.value,
        "email": emailEdit.value
    };

    new Promise(function (resolve, reject) {
        resolve(fetch('/admin/users', {
            method: 'PUT', body: JSON.stringify(data), headers: {
                'Content-Type': 'application/json'
            }
        }).then(btnCloseEditModal.click()))
    }).then(result => setTable())
})

var deleteModal = document.getElementById('deleteModal')
deleteModal.addEventListener('show.bs.modal', function (event) {

    var button = event.relatedTarget

    var urlDel = 'admin/users/' + button.getAttribute('name')
    var idDelete = deleteModal.querySelector('#idDelete')
    var firstNameDelete = deleteModal.querySelector('#firstNameDelete')
    var lastNameDelete = deleteModal.querySelector('#lastNameDelete')
    var ageDelete = deleteModal.querySelector('#ageDelete')
    var emailDelete = deleteModal.querySelector('#emailDelete')
    var rolesDelete = deleteModal.querySelector('#rolesDelete')
    var btnDelete = deleteModal.querySelector('#btnDelete')
    fetch(urlDel)
        .then(response => response.json())
        .then(result => {
            idDelete.value = result.id
            firstNameDelete.value = result.firstName
            lastNameDelete.value = result.lastName
            ageDelete.value = result.age
            emailDelete.value = result.email
            Array.from(rolesDelete.options).map(option => option.selected = !!(result.roles.find(el => el.id == option.value)))
        })
})
var btnDelete = document.getElementById('btnDelete')
btnDelete.addEventListener('click', function (event) {
    var btnCloseDeleteModal = document.getElementById('btnCloseDeleteModal')

    var idDelete = document.querySelector('#idDelete')

    new Promise(function (resolve, reject) {
        resolve(fetch('/admin/users/' + idDelete.value, {
            method: 'DELETE'
        }).then(btnCloseDeleteModal.click()))
    }).then(result => setTable())
})

var wrap = function (value) {
    return "<td>" + value + "</td>";
}

function setTable() {
    var mainTable = document.querySelector('#mainTable tbody')
    let html = ""
    var promise = new Promise(function (resolve, reject) {
        fetch('/admin/users', {method: 'GET'})
            .then(response => response.json())
            .then(result => {
                result.forEach(user =>
                    html += "<tr>"
                        + wrap(user.id)
                        + wrap(user.firstName)
                        + wrap(user.lastName)
                        + wrap(user.age)
                        + wrap(user.email)
                        + wrap(user.rolesToStr)
                        + wrap("<button type='button' class='btn btn-info' data-bs-toggle='modal' data-bs-target='#editModal' name='" + user.id + "'>Edit</button>")
                        + wrap("<button type='button' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#deleteModal' name='" + user.id + "'>Delete</button>")
                        + "</tr>");
                resolve(html)
            })
    })
    promise.then(result => mainTable.innerHTML = result)
}

setTable()

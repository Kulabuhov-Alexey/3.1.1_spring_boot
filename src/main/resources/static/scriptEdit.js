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
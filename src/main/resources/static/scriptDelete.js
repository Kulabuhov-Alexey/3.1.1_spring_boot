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

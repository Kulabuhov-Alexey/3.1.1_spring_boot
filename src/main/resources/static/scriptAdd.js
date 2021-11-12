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
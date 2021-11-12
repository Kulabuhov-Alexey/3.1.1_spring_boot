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

// fetch("http://127.0.0.1:8000/employee")
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// Display Employee data in table

fetch("http://127.0.0.1:8000/employee")
    .then((response) => response.json())
    .then((data) => {
        const tableBody = document.querySelector("#employee-table tbody");
        data.forEach((employee) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.age}</td>               
                <td><button type="submit" value="Edit" class="btn btn-success edit-btn"  data-bs-toggle="modal" data-bs-target="#edit-modal" onclick="editEmployee(${employee.id})" data-id="${employee.id}" data-name="${employee.name}" data-age="${employee.age}">Edit  </button></td>
                <td><input type="submit" class="btn btn-danger delete-btn" value="Delete" name="delete-btn" onclick="deleteEmployee(${employee.id})"/>  </td>
              `;
            tableBody.appendChild(row);
        });
    })
    .catch((error) => console.error(error));

// Add
const form = document.querySelector("#employee-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const employee = {
        name: formData.get("name"),
        age: formData.get("age"),
    };
    fetch("http://127.0.0.1:8000/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    })
        .then((response) => response.json())
        .then((data) => {
            alert("Employee added:", data);
            form.reset();
            location.reload();
        })
        .catch((error) => console.error(error));
});
// Delete
function deleteEmployee(pk, row) {
    fetch(`http://127.0.0.1:8000/delete/${pk}`, {
        method: "DELETE",
    })
        .then((response) => {
            if (response.ok) {
                alert("Employee deleted");
                location.reload();
                row.remove();
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

// Update
// Open modal and fill with employee data
function editEmployee(pk) {
    fetch(`http://127.0.0.1:8000/update/${pk}`)
        .then((response) => response.json())
        .then((data) => {
            const modal = document.querySelector("#edit-modal");
            const nameInput = modal.querySelector("#name");
            const ageInput = modal.querySelector("#age");
            const saveBtn = modal.querySelector("#save-btn");

            nameInput.value = data.name;
            ageInput.value = data.age;
            saveBtn.addEventListener("click", () => {
                updateEmployee(pk, nameInput.value, ageInput.value);
            });

            modal.setAttribute("open", "");
        })
        .catch((error) => console.error(error));
}

// Update employee data and close modal
function updateEmployee(pk, name, age) {
    const employee = {
        name: name,
        age: age,
    };
    fetch(`http://127.0.0.1:8000/update/${pk}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    })
        .then((response) => response.json())
        .then((data) => {
            alert("Employee updated:");
            location.reload();
        })
        .catch((error) => console.error(error));
}

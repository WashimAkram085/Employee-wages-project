// Populate days
const daySelect = document.getElementById('inputDay');
for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
}

// Populate months
const monthSelect = document.getElementById('inputMonth');
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
monthNames.forEach((month, index) => {
    const option = document.createElement('option');
    option.value = index + 1;
    option.textContent = month;
    monthSelect.appendChild(option);
});

// Populate years
const yearSelect = document.getElementById('inputYear');
const currentYear = new Date().getFullYear();
for (let i = currentYear; i >= 1900; i--) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
}


// form data submit
function submitbtn() {

    //photo
    let confirmed = confirm("Do you want to submit the form?");
    if (confirmed == 1) {
        let profileimg = document.querySelector('input[name="profile-image"]:checked').value;

        //name
        let fname = document.querySelector("#inputName").value;
        // console.log(fname);

        //Gender
        let gender = document.querySelector('input[name="gender"]:checked').value;
        // console.log(gender);

        //Department
        let dept = document.querySelector('input[name="dept"]:checked').value;
        // console.log(dept);

        //Salary
        let salary = document.querySelector('#inputState').value;
        // console.log(salary);

        //Start Date
        let date = $('#inputDay').val() + '/' + $('#inputMonth').val() + '/' + $('#inputYear').val();
        // console.log(date);
        //user
        const user = {
            url: profileimg,
            name: fname,
            gender: gender,
            department: dept,
            salary: salary,
            startDate: date

        }
        if (localStorage.getItem('editUser') !== null) {
            const user1 = JSON.parse(localStorage.getItem('editUser'));
            id = user1.id;
            $.ajax({
                url: 'http://localhost:3000/Employee/' + id,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(user),
                success: function (res) {
                    console.log(res);
                    alert('Data updated successfully');
                    window.opener.location.reload();
                    window.location.replace("index.html");
                },
                error: function (err) {
                    console.log(err);
                }
            });
            localStorage.removeItem('editUser');
        } else {

            $.ajax({
                url: 'http://localhost:3000/Employee',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(user),
                success: function (data) {
                    console.log('User added:', data);
                    window.opener.location.reload();
                },
                error: function (error) {
                    console.error('Error:', error);
                }
            });
        }
        window.location.replace("index.html");
    };
}

//Cancel Button
function cancelbtn() {
    window.location.replace("index.html");
}

//reset button
function resetbtn() {
    window.location.replace("adduser.html");
}
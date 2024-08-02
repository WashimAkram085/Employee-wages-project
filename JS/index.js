$(function (e) {
    // alert("hi")
    getEmployeeDetails();
});

function getEmployeeDetails() {
    // alert("hello");
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/Employee",
        success: function (res) {
            // let data = "";
            console.log(res);
            for (var i = 0; i < res.length; i++) {
                let data = `
            <tr>
                <td class="table_val_name"><img src="../Assets/${res[i].url}" height="32px" width="30px" style="border-radius :15px"></td>
                <td><span class="span_name">${res[i].name}</span></td>
                <td class="table_val">${res[i].gender}</td>
                <td class="table_val"><span style="background-color: #E9FEA5;">${res[i].department}</span></td>
                <td class="table_val">${res[i].salary}</td>
                <td class="table_val">${res[i].startDate}</td>
                <td class="table_val"><button style="background-color: white; border:none" id="delete" onclick="deleterow('${res[i].id}')"><img style="background-color: white" src="../Assets/delete-black-18dp.svg"></button>&nbsp;&nbsp;&nbsp;&nbsp;<button style="background-color: white; border:none" id="edit" onclick="edit('${res[i].id}')"><img style="background-color: white" src="../Assets/create-black-18dp.svg"></button></td>
            </tr>
                `;
                $("#tbl-details").append(data);
            }
        },
        error: function (err) {

        }
    })
}

function SearchBar() {
    var search = document.getElementById("searchInput").value;
    search = search.toLowerCase();

    var table, tr, td, txtvalue, index;

    tr = document.getElementsByTagName("tr");
    // it takes all tr including heading... heading in tr[0]. so we started the loop from 1

    for (var i = 1; i < tr.length; i++) {
        td = tr[i].children;
        let tr_has = false;
        for (var j = 0; j < td.length; j++) {
            var newtd = td[j];
            if (newtd) {
                txtvalue = newtd.innerText;
                if (txtvalue.toLowerCase().includes(search)) {
                    tr_has = true;
                }
            }
            tr[i].style.display = (tr_has) ? "" : "none";
        }
    }
};

//delete row data
function deleterow(id) {
    let dltconfirm = confirm("Are you sure you want to delete this record?");
    if (dltconfirm == 1) {
        $.ajax({
            url: `http://localhost:3000/Employee/` + id,
            type: 'DELETE',
            success: function (data) {
                console.log(data.message);
                location.reload(); // Reload the table data
            },
            error: function () {
            }
        });
    }
    
}

//edit
//uploading to local storage 
function edit(id){
    console.log("at edit functon");
    $.ajax({
        url:'http://localhost:3000/Employee/'+id,
        type:'GET',
        success:function(res){
            localStorage.setItem('editUser',JSON.stringify(res));
            console.log(res);
            window.location.replace("adduser.html");
             
        },
        error:function(err){
            console.log(err);
        }
 
    })  
   
}
//local storage data fetching to form
if(localStorage.getItem('editUser')!==null){
    let user=JSON.parse(localStorage.getItem('editUser'));
    console.log(user);
    $('#inputName').val(user.name);
    $(`input[name="profile-image"][value="${user.url}"]`).prop('checked', true);
    $(`input[name="gridRadio"][value="${user.gender}"]`).prop('checked', true);
    $(`input[name="dept"][value="${user.gender}"]`).prop('checked', true);
    $('#inputState').val(user.salary);
    const [startDay, startMonth, startYear] = user.startDate.split('/');
    $('#inputDay').val(startDay);
    $('#inputMonth').val(startMonth);
    $('#inputYear').val(startYear);
    $('#inputNotes').val(user.notes);
}

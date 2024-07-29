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
                <td class="table_val_name"><img src="../Assets/${res[i].url}" height="30px" width="30px" style="border-radius :15px"><span class="span_name">${res[i].name}</span></td>
                <td class="table_val">${res[i].gender}</td>
                <td class="table_val"><span style="background-color: #E9FEA5;">${res[i].department}</span></td>
                <td class="table_val">${res[i].salary}</td>
                <td class="table_val">${res[i].startDate}</td>
                <td class="table_val"><button style="background-color: white; border:none" id="delete"><img style="background-color: white" src="../Assets/delete-black-18dp.svg"></button>&nbsp;&nbsp;&nbsp;&nbsp;<button style="background-color: white; border:none" id="edit"><img style="background-color: white" src="../Assets/create-black-18dp.svg"></button></td>
            </tr>
                `;
                $("#tbl-details").append(data);
            }
        },
        error: function (err) {
 
        }
    })
}
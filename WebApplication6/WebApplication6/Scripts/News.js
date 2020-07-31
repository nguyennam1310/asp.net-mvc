
$(document).ready(function () {
    loadData(1);
    loadCategory();
    loadPagination();
});
$("#Id").hide();
$("#Active option[value='true']").prop('selected', true);

function loadData(p) {
    $.ajax({
        url: "/News/GetNews/"+p,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Avatar + "<img class='image'  src='../Img/" + item.Avatar + "'></td>";
                html += '<td>' + item.Title + '</td>';
                html += '<td>' + item.Sapo + '</td>';
                html += '<td>' + item.Description + '</td>';
                html += '<td>' + item.CategoryId + '</td>';
                html += '<td>' + item.CreateDate + '</td>';
                html += '<td>' + item.ModifyDate + '</td>';
                html += '<td>' + item.Active + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.Id + ')">Edit</a> | <a href="#" onclick="Delele(' + item.Id + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
          
           
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function loadCategory() {
    $.ajax({
        url: "/Category/GetCategory",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            html += "<option value>Chọn loại</option>"
            $.each(result, function (key, item) {
               
                html += "<option  value='"+item.Id+"'>" + item.Name + '</option>';
              
                
            });
            $("#CategoryId option[value='']").prop('selected', 'selected');
            $('#CategoryId').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    else {

        if ($('#Avatar').val() == "") {
            var formData = new FormData();
            formData.append("Title", $('#Title').val());
            formData.append("Sapo", $('#Sapo').val());
            formData.append("Description", $('#Description').val());

            formData.append("CategoryId", $('#CategoryId').val());
            formData.append("CreateDate", new Date().toISOString());
            formData.append("ModifyDate", new Date().toISOString());
            formData.append("Active", $('#Active').val());
            $.ajax({
                url: "/News/Create1",
                data: formData,
                type: "POST",
                processData: false,
                contentType: false,
                success: function (result) {
                    loadData(1);
                    loadPagination();
                    $('#myModal').modal('hide');
                    alert("you are done");
                    $('#Avatar').val("");
                },
                error: function (response) {
                    alert("Failed");
                }
            });
        }
        else {
            var formData = new FormData();
            formData.append("Title", $('#Title').val());
            formData.append("Sapo", $('#Sapo').val());
            formData.append("Description", $('#Description').val());

            formData.append("CategoryId", $('#CategoryId').val());
            formData.append("CreateDate", new Date().toISOString());
            formData.append("ModifyDate", new Date().toISOString());
            formData.append("Active", $('#Active').val());
            formData.append(" Avatar", $('#Avatar')[0].files[0]['name']);
            formData.append("file", $('#Avatar')[0].files[0]);
            $.ajax({
                url: "/News/Create",
                data: formData,
                type: "POST",
                processData: false,
                contentType: false,
                success: function (result) {
                    $('#Avatar').val("");
                    loadData(1);
                    loadPagination();
                    $('#myModal').modal('hide');
                    $('#Avatar').val("");
                    alert("you are done");
                },
                error: function (response) {
                    alert("Failed");
                }
            });
        }
    }

    




}

function getbyID(Id) {

    $("#Id").prop("readonly", true);
    $('#Title').css('border-color', 'lightgrey');
    $('#Sapo').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    $('#CategoryId').css('border-color', 'lightgrey');
    $('#Active').css('border-color', 'lightgrey');
    $.ajax({
        url: "/News/GetById/" + Id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, item) {
                $('#Id').val(Id);
                
                $('#Title').val(item.Title);
                $('#Sapo').val(item.Sapo);
                $('#Description').val(item.Description);
                $('#CategoryId').val(item.CategoryId);


                if (item.Active == true) {
                    $("#Active option[value='true']").prop('selected', 'selected');
                }
                else {
                    $("#Active option[value='false']").prop('selected', 'selected');
                }



            });

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
   
    


    if ($("#Avatar").val() == "") {
        var Id = $('#Id').val();
        var formData = new FormData();
        formData.append("Id", $('#Id').val());
        formData.append("Title", $('#Title').val());
        formData.append("Sapo", $('#Sapo').val());
        formData.append("Description", $('#Description').val());

        formData.append("CategoryId", $('#CategoryId').val());

        formData.append("ModifyDate", new Date().toISOString());
        formData.append("Active", $('#Active').val());

        $.ajax({
            url: "/News/Update1",
            data: formData,
            type: "POST",
            processData: false,
            contentType: false,
            success: function (result) {
                loadData(currentPage);
                
                $('#myModal').modal('hide');
                $('#Id').val("");
                $('#Avatar').val("");
                $('#Title').val("");
                $('#Sapo').val("");
                $('#Description').val("");
                $('#CategoryId').val("");
                $('#Active').val("");

                $('#ModifyDate').val("");
                $("#Id").hide();

            },
            error: function (errormessage) {
                alert(errormessage.responseText);


            }
        });
    }
    else {
        var Id = $('#Id').val();
        var formData = new FormData();
        formData.append("Id", $('#Id').val());
        formData.append("Title", $('#Title').val());
        formData.append("Sapo", $('#Sapo').val());
        formData.append("Description", $('#Description').val());

        formData.append("CategoryId", $('#CategoryId').val());

        formData.append("ModifyDate", new Date().toISOString());
        formData.append("Active", $('#Active').val());
        formData.append(" Avatar", $('#Avatar')[0].files[0]['name']);
        formData.append("file", $('#Avatar')[0].files[0]);

        $.ajax({
            url: "/News/Update",
            data: formData,
            type: "POST",
            processData: false,
            contentType: false,
            success: function (result) {
                loadData(currentPage);
                $('#myModal').modal('hide');
                $('#Id').val("");
                $('#Avatar').val("");
                $('#Title').val("");
                $('#Sapo').val("");
                $('#Description').val("");
                $('#CategoryId').val("");
                $('#Active').val("");

                $('#ModifyDate').val("");
                $("#Id").hide();

            },
            error: function (errormessage) {
                alert(errormessage.responseText);


            }
        });
    }

  
}
function Delele(ID) {
    
    var ans = confirm("Bạn có chắc xóa không?");
    if (ans) {
        $.ajax({
            url: "/News/Delete/" + ID,
            type: "POST",

            success: function (result) {
                loadData(currentPage);
                loadPagination();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
function clearTextBox() {
    $('#Title').css('border-color', 'lightgrey');
    $('#Sapo').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    $('#CategoryId').css('border-color', 'lightgrey');
    $('#Active').css('border-color', 'lightgrey');
    $('#Id').val("");
    $('#Avatar').val("");
    $('#Title').val("");
    $('#Sapo').val("");
    $('#Description').val("");
    $('#CategoryId').val("");
    $('#Active').val("");
    $('#CreateDate').val("");
    $('#ModifyDate').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    if ($('#Avatar').val() != "") {
        $("#upload").trigger('click');

    }
}

var currentPage = 1;
function page(a) {
    currentPage = a;
    loadPagination();
  

}
function loadPagination() {
    $.ajax({
        url: "/News/GetCount",
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            var html = '';
            html += '<nav aria-label="Page navigation example" ><ul class="pagination">';

            if (currentPage > 1) {
                html += ' <li class="page-item"><a onclick="loadData(1);page(1);" class="page-link" href = "#" aria - label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">first</span></a></li>';
                html += ' <li class="page-item"><a onclick="loadData(' + (currentPage - 1) + ');page(' + (currentPage - 1) + ');" class="page-link" href = "#" aria - label="Previous"><span aria-hidden="true">‹</span><span class="sr-only">Previous</span></a></li>';
            }
            
            
            if ((Math.floorresult / 3) < 5 || (Math.floor(result / 3) > 5 && currentPage < 4)) {
                for (i = 1; i < 6; i++) {
                    html += '<li class="page-item"><a class="page-link" href="#" id="page-' + i + '" onclick="loadData(' + i + ');page(' + i + ');">' + i + '</a></li>';
                }

            }
          
            if ((Math.floor(result / 3) >= 6) && currentPage >= 4 && currentPage < Math.floor(result / 3)) {
                for (i = currentPage - 2; i < currentPage + 3; i++) {
                    html += '<li class="page-item"><a class="page-link" href="#" id="page-' + i + '" onclick="loadData(' + i + ');page(' + i + ');">' + i + '</a></li>';
                }
            }
            if ((Math.floor(result / 3) >= 6) && currentPage == Math.floor(result / 3) ) {
                for (i = currentPage - 3; i < currentPage + 2; i++) {
                    html += '<li class="page-item"><a class="page-link" href="#" id="page-' + i + '" onclick="loadData(' + i + ');page(' + i + ');">' + i + '</a></li>';
                }
            }
            if ((Math.floor(result / 3) >= 6) && currentPage == Math.floor(result / 3)+1) {
                for (i = currentPage - 4; i < currentPage + 1; i++) {
                    html += '<li class="page-item"><a class="page-link" href="#" id="page-' + i + '" onclick="loadData(' + i + ');page(' + i + ');">' + i + '</a></li>';
                }
            }
            var last = Math.floor(result / 3) + 1;
            if (currentPage > 0) {
                html += '<li class="page-item"><a onclick="loadData(' + (currentPage + 1) + ');page(' + (currentPage + 1) +');" class="page-link" href = "#" aria - label="Next" ><span aria-hidden="true">›</span><span class="sr-only">Next</span></a></li>';
                html += '<li class="page-item"><a onclick="loadData(' + last + ');page(' + last + ');" class="page-link" href = "#" aria - label="Next" ><span aria-hidden="true">&raquo;</span><span class="sr-only">Last</span></a></li>';
            }
            html += ' </ul></nav>';

            $('.next').html(html);
            $('#page-' + currentPage + '').css('background-color', '#d59829');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}
function validate() {
    var isValid = true;
    if ($('#Title').val().trim() == "") {
        $('#Title').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Title').css('border-color', 'lightgrey');
    }
    if ($('#Sapo').val().trim() == "") {
        $('#Sapo').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Sapo').css('border-color', 'lightgrey');
    }
    if ($('#Description').val().trim() == "") {
        $('#Description').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Description').css('border-color', 'lightgrey');
    }
    if ($('#CategoryId').val().trim() == "") {
        $('#CategoryId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CategoryId').css('border-color', 'lightgrey');
    }
    if ($('#Active').val().trim() == "") {
        $('#Active').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Active').css('border-color', 'lightgrey');
    }
    
    return isValid;
}
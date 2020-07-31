$(document).ready(function () {
    loadData();
    
});

function to_slug(str) {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
}
function loadData() {
    $("#Id").hide();
   
    $.ajax({
        url: "/Category/GetCategory",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Slug + '</td>';
                html += '<td>' + item.ParentId + '</td>';
                html += '<td>' + item.CreateDate + '</td>';
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

function Add() {
   
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        Name: $('#Name').val(),
        Slug: to_slug($('#Name').val()),
        ParentId: $('#ParentId').val(),
        CreateDate: new Date().toISOString(),
        Active: $('#Active').val()
    };
    $.ajax({
        url: "/Category/Create",
        data: empObj,
        type: "POST",
        
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            alert("you are done");
        },
        error: function (response) {
            alert("Failed");
        }
    });
}
function getbyID(Id) {
   
    $("#Id").prop("readonly", true);
    $('#Name').css('border-color', 'lightgrey');
   
    $('#ParentId').css('border-color', 'lightgrey');
    $('#Active').css('border-color', 'lightgrey');
 
    $.ajax({
        url: "/Category/GetById/" + Id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, item) {
                $('#Id').val(Id);
                $('#Name').val(item.Name);
                $('#ParentId').val(item.ParentId);
                

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
    var empObj = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        Slug: to_slug($('#Name').val()),
        ParentId: $('#ParentId').val(),
        
        Active: $('#Active').val()
    };
    $.ajax({
        url: "/Category/Update",
        data: empObj,
        type: "POST",
        
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#Id').val("");
            $('#Name').val("");
            $('#Slug').val("");
            $('#ParentId').val("");
            $('#Active').val("");
            $('#CreateDate').val("");
            $("#Id").hide();
           
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
            loadData();
            $('#myModal').modal('hide');
            $('#Id').val("");
            $('#Name').val("");
            $('#Slug').val("");
            $('#ParentId').val("");
            $('#Active').val("");
            $('#CreateDate').val("");
            $("#Id").hide();
           
        }
    });
}
function Delele(ID) {
    var ans = confirm("Bạn có chắc xóa không?");
    if (ans) {
        $.ajax({
            url: "/Category/Delete/" + ID,
            type: "POST",
            
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
function clearTextBox() {
    $('#Name').css('border-color', 'lightgrey');

    $('#ParentId').css('border-color', 'lightgrey');
    $('#Active').css('border-color', 'lightgrey');
    $('#Id').val("");
    $('#Name').val("");
    $('#Slug').val("");
    $('#ParentId').val("");
    $('#Active').val("");
    $('#CreateDate').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
  
}
function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }
    if ($('#ParentId').val().trim() == "") {
        $('#ParentId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ParentId').css('border-color', 'lightgrey');
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
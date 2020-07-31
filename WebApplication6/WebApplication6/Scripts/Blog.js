$(document).ready(function () {
    loadData1(1);
    loadData2(1);
    loadData3(1);
    loadMenu();
    loadPagination();
});


function loadData1(Id) {
    $.ajax({
        url: "/Home/LoadData1/" + Id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
      
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += "<div class='img-one'>";
                html += "<a href='#'> <img class='image'  src ='../Img/" + item.Avatar + "'></a>";
                html +=     "</div >";
                html += " <div class='content-new'>";
                html += " <div class='date'>" + item.CreateDate + "</div > ";
                html += " <div class='tieu-de-1'>" + item.Title + "</div> ";
                html += "<div class='noi-dung'>" + item.Sapo + "</div > ";
       
            });
            $('#item-1').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function loadData2(Id) {
    $.ajax({
        url: "/Home/LoadData2/" + Id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
    
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<div class="col-md-4 col-sm-6">';
                html += '    <div class="item-2">';
                html += '  <div class="img-2">';
                html += '   <a href="#"><img src="../Img/' + item.Avatar + '"></a>';
                html += '  </div>';
                html += '  <div class="tieu-de-2">' + item.Title + '<div class="date1">' + item.CreateDate + '</div></div > ';
                html += '   <div class="noi-dung-2">' + item.Sapo +'</div>';
                html += '        </div>';
                html += '       </div>';
     
            });
            $('#item-2').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function loadData3(Id) {
    $.ajax({
        url: "/Home/LoadData3/" + Id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
       
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += ' <div class="item-3">';
                html += '<div class="img-3">';
                html += '   <a href="#"><img src="../Img/' + item.Avatar + '"></a>';
                html +=  '    </div>';
                html += ' <div class="content-new1">';
                html += '<div class="date">' + item.CreateDate + '</div>'
                html += '  <div class="tieu-de-1">' + item.Title + '</div>';
                html += '<div class="noi-dung-1">' + item.Sapo + '</div></div></div>';
              
               
                    

                   
                            
                    
            });
            $('#item-3').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function loadMenu() {

    $.ajax({
        url: "/Category/GetCategory",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            html += '<li class="nav-item">';
            html += '<a class="nav-link home" href="#"><i class="fas fa-home"></i></a></li>'
            $.each(result, function (key, item) {
                html += ' <li class="nav-item">';
                html += ' <a class="nav-link text-uppercase border-1" href="#">'+item.Name+'</a></li>';
               
            });
            $('#nav').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
var currentPage = 1;
function page(a) {
    currentPage = a;

   
}
function loadPagination() {
    $.ajax({
        url: "/Home/GetCount",
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {

            var html = '';
            html += '<nav aria-label="Page navigation example" ><ul class="pagination">';
            if ((result / 15) < 5 || currentPage < 4) {
                for (i = 1; i < (result / 15) + 1; i++) {
                    html += '<li class="page-item"><a class="page-link" href="#" id="page-' + i + '" onclick="loadData1(' + i + ');loadData2(' + i + ');loadData3(' + i + ');page(' + i + ');">' + i + '</a></li>';
                }

            }
            if (((result / 15)  == 6) && currentPage >= 4 && currentPage <= 6) {
                for (i = 2; i < 7; i++) {
                    html += '<li class="page-item"><a class="page-link" href="#" id="page-' + i + '" onclick="loadData1(' + i + ');loadData2(' + i + ');loadData3(' + i + ');page(' + i + ');">' + i + '</a></li>';
                }
            }
            if (((result / 15) > 6) && currentPage >= 4 && currentPage < (result / 15)-1) {
                for (i = currentPage - 2; i < currentPage +3; i++) {
                    html += '<li class="page-item"><a class="page-link" href="#" id="page-' + i + '" onclick="loadData1(' + i + ');loadData2(' + i + ');loadData3(' + i + ');page(' + i + ');">' + i + '</a></li>';
                }
            }
            if (((result / 15) > 6) && currentPage == (result / 15) - 1) {
                for (i = currentPage - 3; i < currentPage + 2; i++) {
                    html += '<li class="page-item"><a class="page-link" href="#" id="page-' + i + '" onclick="loadData1(' + i + ');loadData2(' + i + ');loadData3(' + i + ');page(' + i + ');">' + i + '</a></li>';
                }
            }
            if (((result / 15) > 6)  && currentPage == (result / 15) ) {
                for (i = currentPage - 4; i < currentPage + 1; i++) {
                    html += '<li class="page-item"><a class="page-link" href="#" id="page-' + i + '" onclick="loadData1(' + i + ');loadData2(' + i + ');loadData3(' + i + ');page(' + i + ');">' + i + '</a></li>';
                }
            }
    html += ' </ul></nav>';

    $('.next').html(html);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

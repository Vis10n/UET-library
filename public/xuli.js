$(document).ready(function () {
       
    $.ajax({
        type: "GET",
        url: "https://library-uet.herokuapp.com/books",
        data: "data",
        dataType: "json",
        success: function (response) {
            var n = response.books.length;
            //console.log(n)
            var htmlcode;
            for (var i=0; i<n; i++) {
                //console.log("#book-"+response.books[i]["id"]);
                htmlcode += '<tr onclick="getDetail('+response.books[i]["id"]+')" data-toggle="modal" data-target="#myModal" id="book-'+response.books[i]["id"]+'">'
                + '<td id="ma-so-sach">' + response.books[i]["id"] + '</td>'
                + '<td src="#" id="ten-sach">' + response.books[i]["name"] + '</td>'
                + '<td id="so-luong-'+response.books[i]["id"]+'">' + response.books[i]["quantity"] + ' </td>'
                //+ '<td>'
                //+ '<button onclick="getDetail('+response.books[i]["id"]+')" type="button" class="btn-xac-nhan">Đặt mượn</button>'
                //+ '</td>'
                + '</tr>';
                //console.log(htmlcode)
            }
            $("#main-content").html(htmlcode);
            $('#example').DataTable();
        }
    });
});

function getDetail(id) {
    var URL = "https://library-uet.herokuapp.com/books/" + id;
    console.log(URL);
    //alert(URL);
    $.get(URL,function(data){
        //console.log(data.book["id"]) 
        $("#ma-so-sach").html(data.book["id"]);
        $("#ten-sach").html(data.book["name"]);
        $("#mo-ta").html(data.book["description"]);
        if (data.book["quantity"] < 2) {
            $("#borrow").hide();
        }else{
            $("#borrow").show();
            $("#borrow").on("click",function(){
                $.ajax({
                    type: "PUT",
                    url: "https://library-uet.herokuapp.com/books/" + $("#ma-so-sach").text(),
                    data: {"borrow": true},
                    dataType: "json",
                    success: function (response) {
                        //TODO Something awesome :D   
                        if (response.status) {
                            console.log(response.status);
                            $("#so-luong-"+data.book["id"]).html(data.book["quantity"]-1);
                            $("#example").DataTable();
                        }
                    }
                });
            });
        };
    });
};

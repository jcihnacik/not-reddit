$(document).ready(function(){

    var nameInput = $("#user-name");
    var userList = $("tbody");
    var userContainer = $(".user-container");

    $(document).on("submit", "#user-form", handleUserFormSubmit);
    $(document).on("click", ".delete-user", handleDeleteButtonPress);

    getUsers();

    // Functions required to make page work

    function handleUserFormSubmit(event){
        event.preventDefault();

        if (!nameInput.val().trim().trim()){
            return;
        }
        upsertUser({
            name: nameInput
                .val()
                .trim()
        });
    }

    function upsertUser(userData){
        $.post("/api/users", userData)
            .then(getUsers);
    }

    function createUserRow(userData) {
        var newTr = $("<tr>");
        newTr.data("user", userData);
        newTr.append("<td>" + userData.name + "</td>");
        if (userData.Posts){
            newTr.append("<td> " + userData.Posts.length + "</td>");
        } else {
            newTr.append("<td>0</td>");
        }
        newTr.append("<td><a href='/blog?user_id=" + userData.id + "'Go to Posts</a></td>");
        newTr.append("<td><a href='/cnb?user_id=" + userData.id + "'Create a Post</a></td>");
        newTr.append("<td><a style='curser:pointer;color:red' class ='delete-user'>Delete User</a></td>");
        return newTr;
    }

    function getUsers(){
        $.get("/api/users", function(data){
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++){
                rowsToAdd.push(createUserRow(data[i]));
            }
            renderUserList(rowsToAdd);
            nameInput.val("");
        });
    }

    function renderUserList(rows){
        userList.children().not(":last").remove();
        userContainer.children(".alert").remove();
        if (rows.length){
            console.log(rows);
            userList.prepend(rows);
        }
        else {
            renderEmpty();
        }
    }

    function renderEmpty(){
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("You must create a user before making a post.");
        userContainer.append(alertDiv);
    }

    function handleDeleteButtonPress(){
        var listItemData = $(this).parent("td").parent("tr").data("user");
        var id = listItemData.id;
        $.ajax({
            method: "DELETE",
            url: "/api/users" + id
        })
        .then(getUsers);
    }
});
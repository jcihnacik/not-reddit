$(document).ready(function () {

    var bodyInput = $("#body");
    var titleInput = $("#title");
    var cnbForm = $("#cnb");
    var userSelect = $("#user");

    // event listener for submitting a form
    $(cnbForm).on("submit", handleFormSubmit);
    // gets part of the url that comes after ?
    var url = window.location.search;
    var postId;
    var userId;
    var updating = false;

    if (url.indexOf("?post_id=") !== -1) {
        postId = url.split("=")[1];
        getPostData(postId, "post");
    }
    // Otherwise if we have an author_id in our url, preset the author select box to be our Author
    else if (url.indexOf("?author_id=") !== -1) {
        userId = url.split("=")[1];
    }

    getUsers();

    function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the post if we are missing a body, title, or author
        if (!titleInput.val().trim() || !bodyInput.val().trim() || !userSelect.val()) {
            return;
        }
        // Constructing a newPost object to hand to the database
        var newPost = {
            title: titleInput
                .val()
                .trim(),
            body: bodyInput
                .val()
                .trim(),
            UserId: userSelect.val()
        };

        // If we're updating a post run updatePost to update a post
        // Otherwise run submitPost to create a whole new post
        if (updating) {
            newPost.id = postId;
            updatePost(newPost);
        }
        else {
            submitPost(newPost);
        }
    }

    function submitPost(post) {
        $.post("/api/posts", post, function () {
            window.location.href = "/blog";
        });
    }

    function getPostData(id, type) {
        var queryUrl;
        switch (type) {
        case "post":
            queryUrl = "/api/posts/" + id;
            break;
        case "user":
            queryUrl = "api/users/" + id;
            break;
        default:
            return;
        }
    }
        $.get(queryUrl, function(data){
        if (data) {
            console.log(data.UserId || data.id);

            titleInput.val(data.title);
            bodyInput.val(data.body);
            userId = data.UserId || data.id;
            updating = true;
        
        }
    });
    
    function getUsers(){
        $.get("/api/users", renderUserList);
    }
    
    function renderUserList(data){
        if(!data.length){
            window.location.href = "/users";
        }
        $(".hidden").removeClass("hidden");
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++){
            rowsToAdd.push(createUserRow(data[i]));
        }
        userSelect.empty();
        console.log(rowsToAdd);
        console.log(userSelect);
        userSelect.append(rowsToAdd);
        userSelect.val(userId);
    }

    function createUserRow(user) {
        var listOption = $("<option>");
        listOption.attr("value", user.id);
        listOption.text(user.name);
        return listOption;
    }

    function updatePost(post){
        $.ajax({
            method: "PUT",
            url: "/api/posts",
            data: post
        })
            .then(function(){
                window.location.href = "/blog"
            })
    }
    
});
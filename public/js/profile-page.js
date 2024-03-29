$(document).ready(function() {
    var squeekContainer = $(".squeek-table-section");

    var squeeks;

    var url = window.location.search;
    var userId;
    if (url.indexOf("?user_id=") !== -1) {
        userId = url.split("=")[1];
        getSqueeks(userId);
    } else {
        getSqueeks();
    }

    function getSqueeks(user){
        userId = user || "";
        if (userId) {
            userId = "/?user_id" + userId;
        }
        $.get("/api/squeeks" + userId, function(data) {
            console.log("Squeeks", data);
            squeeks = data;
            if (!squeeks || !squeeks.length) {
                displayEmpty(user);
            } else {
                initializeSqueekRows();
            }
        }).then(getPosts);
    }

    function initializeSqueekRows() {
        squeekContainer.empty();
        var squeeksToAdd = [];
        for (var i = 0; i <squeeks.length; i++) {
            squeeksToAdd.push(createNewSqueekRow(squeeks[i]));
        }
        squeekContainer.append(squeeksToAdd);
    }

    function createNewSqueekRow(squeek) {
        var formattedDate = new Date(squeek.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newSqueekCard = $("<div>");
        newSqueekCard.addClass("card");
        var newSqueekCardHeading = $("<div>");
        newSqueekCardHeading.addClass("card-header");
        var newSqueekDate = $("<small>");
        var newSqueekCardBody = $("<div>");
        newSqueekCardBody.addClass("card-body");
        var newSqueekBody = $("<p>");
        newSqueekBody.text(squeek.body);
        newSqueekDate.text(formattedDate);
        newSqueekBody.append(newSqueekDate);
        newSqueekCardHeading.append(newSqueekBody);
        newSqueekCardBody.append(newSqueekBody);
        newSqueekCard.append(newSqueekCardHeading);
        newSqueekCard.append(newSqueekCardBody);
        newSqueekCard.data("squeek", squeek);
        return newSqueekCard;
    };

    function getPosts(user){
        userId = user || "";
        if (userId) {
            userId = "/?user_id" + userId;
        }
        $.get("/api/posts" + userId, function(data) {
            console.log("Posts", data);
            posts = data;
            if (!posts || !posts.length) {
                displayEmpty(user);
            } else {
                initializePostRows();
            }
        });
    };

    function initializePostRows() {
        postContainer.empty();
        var postsToAdd = [];
        for (var i = 0; i <posts.length; i++) {
            postssToAdd.push(createNewPostRow(posts[i]));
        }
        postContainer.append(postsToAdd);
    };

    function createNewPostRow(post) {
        var formattedDate = new Date(post.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newPostCard = $("<div>");
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
    
        var newPostTitle = $("<h2>");
        var newPostDate = $("<small>");
        var  newPostUser= $("<h5>");
        newPostUser.text("Written by: " + post.User.name);
        newPostUser.css({
          float: "right",
          color: "blue",
          "margin-top":
          "-10px"
        });
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        newPostTitle.text(post.title + " ");
        newPostBody.text(post.body);
        newPostDate.text(formattedDate);
        newPostTitle.append(newPostDate);
        
        newPostCardHeading.append(newPostTitle);
        newPostCardHeading.append(newPostUser);
        newPostCardBody.append(newPostBody);
        newPostCard.append(newPostCardHeading);
        newPostCard.append(newPostCardBody);
        newPostCard.data("post", post);
        return newPostCard;
      };
    

    



})
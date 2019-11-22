import { getHeapCodeStatistics } from "v8";

$(document).ready(function(){

    // blogContainer will contain all of our post
    var blogContainer = $(".blog-container");
    // blogSqueek will contain all of the squeeks
    var blogSqueek = $(".blog-squeeks");
    var postCategorySelect = $("#category");

    // click events for the delete and edit functions
    $(document).on("click", "button.delete", handlePostDelete);
    $(document).on("click", "button.edit", handlePostEdit);

    // variable to hold all the post
    var posts;
    // variable to hold all the squeeks
    var squeeks;

    var url = window.location.search;
    var userId;

    // case where we wantto get a blog posts for a single author
    if(url.indexOf("user_id=") !== -1){
        userId = url.split("=")[1];
        getPosts(userId);
    }

    else{
        getPosts();
    }

    function getPosts(author) {
        userId = user || "";
        if(userId){
            userId = "/?user_id=" + userId;
        }
        $.get("/api/posts") + userId, function(data){
            console.log("Posts", data);
            posts = data;
            if (!posts || !posts.length) {
                displayEmpty(user);
            }
            else {
                initializeRows();
            }
        }
    }


})
"use strict";

$(function() {

    // Request user
    $("#fetch").click(function () {

        // Get users
        $.ajax({

            // Uncomment the following to use the url
            //"url" : "http://jsonplaceholder.typicode.com/users",
            "url": "users.json",
            "type": "GET",
            "success": renderPage,
            "error": ajaxFailure
        });
    });

    function renderPage(data) {
        let userId = 0;
        if($("#userID").val() !== ""){
            userId = parseInt($("#userID").val());
            if(userInfo(userId,data) === true){

                $.ajax({
                    // Uncomment the following to use the url
                    // "url" : "http://jsonplaceholder.typicode.com/posts?userId=1",
                    "url": "posts.json",
                    "type": "GET",
                    "success": function(data){
                        postSection(data,userId)},
                    "error": ajaxFailure
                });
            }
        }else{
            window.alert("Enter a valid user ID!!!");
        }
    }

    function userInfo(userid,data){
        // Object literal
        let getUser = {};

        // Go through all data
        let found = false;
        for(let i=0;i<data.length;i++){
            if(data[i].id === userid){
                getUser = data[i];
                found = true;
                break;
            }
        }

        // Fill the respective fields
        if(found){
            $("#id").html(userid);
            $("#name").html(getUser.name);
            $("#username").html(getUser.username);
            $("#email").html(getUser.email);
            $("#phone").html(getUser.phone);
            $("#website").html(getUser.website);
            return true;
        }else{
            window.alert("User not found");
            return false;
        }
    }

    function postSection(data,userid){
        let getPost = [];
        let i=0;
        for(i=0;i<data.length;i++){
            if(data[i].userId === userid){
                getPost.push(data[i]);
            }
        }
        // If there are posts of that user
        if(getPost.length>0){
            displayPost(getPost);
        }else{
            window.alert("Requested user has not posted yet");
        }
    }

    //  Render html to display post
    function displayPost(posts){
        let postHTML = "";
        //Clear
        $("#postContainer").html("");
        for(let i=0;i<posts.length;i++){
            postHTML = '<div id="post'+posts[i].id +'">' +'<dl><dt>'+posts[i].title+'</dt>'
                +'<dd>'+ posts[i].body+'</dd></dl>'+'<button type="submit" id="'+ posts[i].id + '">'+'Comments</button>'+'</div>' + '<hr />';
            $("#postContainer").append(postHTML);
        }
    }

    // Event handler for comments
    $("#post div").on("click","button",findComment);
    function findComment(event){
        $.ajax({

            // Uncomment the following to use the url
            // "url" : "http://jsonplaceholder.typicode.com/comments?postId=1",
            "url" :"comments.json",
            "type":"GET",
            "success": function(data){
                displayComment(data,event.target.id)},
            "error" : ajaxFailure
        });
    }

    // Render html to display comments
    function displayComment(data,post_Id){
        let getComments = [];

        for(let i=0;i<data.length;i++){
            if(data[i].postId == post_Id){
                getComments.push(data[i]);
            }
        }

        $("#commentContainer").html("");
        if(getComments.length>0){
            let postComments = "";
            for(let j=0;j<getComments.length;j++){
                postComments = '<h3>'+ getComments[j].name + '</h3>' +
                                '<em>'+ getComments[j].email + '</em>' +
                                '<p>' + getComments[j].body + '</p>' +
                                '<hr />';
                $("#commentContainer").append(postComments);
            }

        }else{
            window.alert("No comment for this post");
        }
    }

    function ajaxFailure() {
        window.alert("Something went wrong!");
    }
});
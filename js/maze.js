"use strict";
$(document).ready(function () {

    // Boolean to track whether the game has started or not
    // Initially the game has not started
    let gameStarted = false;

    //Event handler for clicking start button which is letter 'S'
    $("#start").click(function () {
        $("body").css({"background-image":'url("../images/cheer.png")',
            "background-size":"10%",
            "background-repeat":"repeat",
            "color":"black"});
        $(".boundary").removeClass("youlose");
        $("#status").text("Move the mouse without touching boundary");
        gameStarted = true;
    });

    // Player lose the game if the mouse pointer goes outside of the maze
    $("#maze").mouseleave(function () {
        if (gameStarted === true) {
            $("#status").text("Nice try!!! But you can't do that!");
            $("body").css({"background-image":'url("../images/suitGuy.jpg")',"background-size":"cover"});
            $(".boundary").addClass("youlose");
            gameStarted = false;
        }
    });

    // If the mouse touches the boundary, the game is lost
    $(".boundary").mouseover(function () {
        if (gameStarted === true) {
            $("#status").text("Try Again!!! I know it's not that easy.");
            $("body").css({"background-image":'url("../images/workOutFace.png")',
                "background-size":"10%",
                "background-repeat":"repeat"});
            $(".boundary").addClass("youlose");
            gameStarted = false;
        }
    });

    // Condition to win the game is to reach the end, which is letter 'E'
    $("#end").mouseover(function () {
        if (gameStarted === true) {
            $("#status").text("Congratulations!!! YOU WON");
            $("#luck").text("(^.^)");
            $("#objective").text("IT'S PARTY TIME!!!");
            $("body").css({"background-image":'url("../images/champaign.jpg")',
                            "background-size":"cover",
                            "color":"#006911"});
            gameStarted = false;
        }
    });


});
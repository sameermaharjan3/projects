"use strict";

$(function(){

    let reset = true;
    let speed = 250;
    let timer = null;
    let setWidth = 0;
    let setGrowth = 10;

    // Function that increases the size of the circle based on growth amount
    function increaseSize(setGrowth) {
        $("#circleContainer>div").width(parseInt($("#circleContainer>div").width()) + setGrowth + "px").height(parseInt($("#circleContainer>div").height()) + setGrowth + "px");
    }

    // Set interval for initial default values
    if(reset) {
        timer = setInterval(increaseSize, speed,10);
    }

    // Event handler for start button
$("#start").click(function(){

    clearInterval(timer);
    $("#circleContainer").empty();
    reset = false;
    $("#circleContainer>div").css("visibility","visible");
    createCircles();

    // Set the width of the circle
    setWidth = $("#width option:selected").text() +"px";
    $("#circleContainer>div").css({"width":setWidth,"height":setWidth});

    // Set growth rate
    speed = $("#growthRate option:selected").text();

    // Set growth amount
    setGrowth = $("#growthAmount option:selected").text();
    console.log(setGrowth);

    timer = setInterval(increaseSize,speed,parseInt(setGrowth));
});

// Attached a delegated event handler that handles dynamically added div
$("#circleContainer").on("click","div",function(){
    $(this).css("display","none");
    reset = false;
});

// create circles on random location as selected
function createCircles() {
    let getCircleNum = ($("#circleNum option:selected").text());
    console.log(getCircleNum);
    // set x and y axis position
    let posX = 0;
    let posY = 0;

    // Variables for RGB values
    let colorR = 0;
    let colorG = 0;
    let colorB = 0;
    $(this).css("background-color", "rgb(" + colorR + "," + colorG + "," + colorB + ")");

    // Loop to generate selected number of circles
    for (let i = 0; i < getCircleNum; i++) {

        // Set range of the position for circles within the window
        posX = (Math.floor((Math.random()*(window.screen.width-50) + 5)));

        // Repeat the process for Y vertex
        posY = (Math.floor((Math.random()*(window.screen.height-50) + 50)/2) + 110);

        // Randomize all R,G,B values
        colorR = Math.floor((Math.random() * 256));
        colorG = Math.floor((Math.random() * 256));
        colorB = Math.floor((Math.random() * 256));

        // $("#circleContainer>div").css({"position":"absolute","top":posX+"px","right":posY+"px","background-color":bgolor});
        console.log(posX + " " + posY);
        $("<div></div>").appendTo("#circleContainer").css({
            "background-color":"rgb(" + colorR + "," + colorG + "," + colorB + ")",
            left: posX,
            top: posY
        });
    }
}

// Extra Credit

    // Fade out on mouse hover
    $("#circleContainer").on("mouseenter","div",function(){
        $("#circleContainer>div").fadeOut(3000);
    });

    // set the opacity back to 100%
    $("#circleContainer").on("mouseleave","div",function(){
        $("#circleContainer>div").stop().animate({opacity:'100'});
    });
});
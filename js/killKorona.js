"use strict";

$(function(){

    let gameStarted = false;
    let virusKilledCount = 0;
    let speed = 250;
    let timer = null;
    let setWidth = 0;
    let setGrowth = 10;

    // Function that increases the size of the circle based on growth amount
    function increaseSize(setGrowth) {
        $("#coronaContainer>div").width(parseInt($("#coronaContainer>div").width()) + setGrowth + "px").height(parseInt($("#coronaContainer>div").height()) + 3.28*setGrowth + "px");
    }

    // Set interval for initial default values
    /*if(gameStarted) {
        timer = setInterval(increaseSize, speed,2);
    }*/

    // Event handler for start button
$("#start").click(function(){

    clearInterval(timer);
    virusKilledCount = 0;
    $("#coronaContainer").empty();
    gameStarted = true;
    $("#coronaContainer>div").css("visibility","visible");
    createVirus();
    // Set the width of the circle
    setWidth = parseInt($("#width option:selected").text());
    $("#coronaContainer>div").css({"width":setWidth+"px","height":3.28*setWidth+"px","cursor":"pointer"});

    // Set growth rate
    speed = $("#growthRate option:selected").text();

    // Set growth amount
    setGrowth = $("#growthAmount option:selected").text();

    timer = setInterval(increaseSize,speed,parseInt(setGrowth));
});

// Attached a delegated event handler that handles dynamically added div
$("#coronaContainer").on("click","div",function(){
    $(this).css("display","none");
    virusKilledCount++;
    if(virusKilledCount === parseInt($("#circleNum option:selected").text())){
       window.alert("CONGRATULATIONS!!! All viruses have been eliminated!")
    }
});

// create circles on random location as selected
function createVirus() {
    let getCircleNum = ($("#circleNum option:selected").text());
    // set x and y axis position
    let posX = 0;
    let posY = 0;

    // Loop to generate selected number of circles
    for (let i = 0; i < getCircleNum; i++) {

        // Set range of the position for circles within the window
        posX = (Math.floor((Math.random()*(window.screen.width-220) + 100)));

        // Repeat the process for Y vertex
        posY = (Math.floor(Math.random()*(window.screen.height-250)) + 110);


        $("<div></div>").appendTo("#coronaContainer").css({
            "background-image":"url('../images/corona.png')",
            "background-size":"contain",
            "background-repeat": "no-repeat",
            "background-color":"transparent",
            left: posX,
            top: posY
        });
    }
}

});

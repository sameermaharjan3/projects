window.onload = function() {
    "use strict";

    let speed = 250;
    let timer = null;

    /* assign event handler as respect to their id */
    let startButton = document.getElementById("start");
    startButton.onclick = setAnimation;

    let stopButton = document.getElementById("stop");
    stopButton.onclick = resetViewer;

    let selectFontSize = document.getElementById("fontsize");
    selectFontSize.onchange = setFontSize;

    let getTextArea = document.getElementById("text-area");
    let selectAnimation = document.getElementById("animation");

    let isChecked = document.getElementById("turbo");
    isChecked.onchange = turboOnChecked;

    /* change the font size in the text area */
    function setFontSize(){

        /*Avoiding if else code to make it simpler*/
        let size = selectFontSize.value;
        if(size === null){size="12pt";}
        getTextArea.style.fontSize = parseInt(size) + 'pt';
    }

    /*this function set the animation in the viewer as selected in the drop down */
    function setAnimation(){

        /*disable start button and enable stop button on starting animation*/
        startButton.disabled = true;
        stopButton.disabled = false;

        doThisAnimation(ANIMATIONS[selectAnimation.value]);
    }

    /*convert the animation string into array to display each frame repeatedly*/
    function doThisAnimation(animationType){
        const splitFrames = animationType.split("=====\n");
        let index = 0;
        timer = setInterval(function(){
            repeatAnimation(splitFrames[index++%splitFrames.length]);
        },speed);
    }

    /*display a frame in text area*/
    function repeatAnimation(frame){
        getTextArea.innerHTML = frame;
    }

    /*this function clear the text box and reset timer*/
    function resetViewer(){
        getTextArea.innerHTML = "";
        window.clearTimeout(timer);
        startButton.disabled = false;
        stopButton.disabled = true;
    }

    /*this function speed up animation*/
    function turboOnChecked(){
        if(isChecked.checked === true){
            speed = 50;
        }else{
            speed  = 250;
        }
        clearInterval(timer);
        setAnimation();
    }
};
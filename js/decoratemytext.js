/*jshint esversion: 6 */

window.onload = function() {
    "use strict";

    /*Q.no.1*/
    /* runs test to see if expected argument is === to value returned by function2test argument */
    function myFunctionTest(expected, found) {
        if (expected === found) {
            return "TEST SUCCEEDED";
        } else {
            return "TEST FAILED.  Expected " + expected + " found " + found;
        }
    }

    /*Alternate implementation of sum using reduce*/
    function sum2(arr){
        return arr.reduce(function (acc, cur) {
            return acc + cur;
        }, 0);
    }

    /*Alternate implementation of reverse using map*/
    function reverse2(str){
        let strArray = str.split('');
        let s = str.length-1;
        let reverseStr = strArray.map(c => str.charAt(s--));
        return reverseStr.join("");
    }

    /*Alternate implementation of filterLongWords using arrow function*/
    function filterLongWords2(arr,i){
        return arr.filter(s=>s.length > i);
    }

    const arr = [1,2,3,4,5];
    const words = ['find','the','longest','word'];
    /*printing the output on console*/
    console.log("Expected output of sum([1,2,3,4,5]) is 15  " + myFunctionTest(15, sum2(arr)));
    console.log("Expected output of reverse(java script) is tpircs avaj  " + myFunctionTest('tpircs avaj', reverse2('java script')));
    console.log("Expected output of filterLongWords(['find','the','longest','word'],3) is [find, longest, word] : Found = ["
        + filterLongWords2(words,3) +"]");

    /*Q.no.2*/
    let decorationBtn = document.getElementById("decoration");
    /*Comment out the third line and
    Uncomment first line to see the hello world alert
    or uncomment second line to set the font size to 24pt*/

    /*decorationBtn.onclick = decorationBtnClick;*/
    /*decorationBtn.onclick = changeFontSize;*/
    decorationBtn.onclick = increaseFontWithTime;

    let checkBox = document.getElementById("checkBox");
    checkBox.onclick = boldOnChecked;

    let malkovitch = document.getElementById("malkovitch");
    malkovitch.onclick = setMalkovitch;

    /*Pop hello world on your web page*/
    function decorationBtnClick(){
        alert("Hello, world!");
    }

    /*function to change font size to 24pt*/
    function changeFontSize(){
        let getText = document.getElementById("someText");
        getText.style.fontSize = "24pt";
    }

    /*function to change font decoration,color and weight
    if the checkbox is checked. If not, reset the font*/
    function boldOnChecked(){

        /*get the checkbox and text from the textarea*/
        let isChecked = document.getElementById("checkBox");
        let getTextArea = document.getElementById("someText");
        if(isChecked.checked === true){
            getTextArea.style.fontWeight = "bold";
            getTextArea.style.color = "green";
            getTextArea.style.textDecoration = "underline";
            document.body.style.backgroundImage = "url(http://www.cs.washington.edu/education/courses/190m/CurrentQtr/labs/6/hundred-dollar-bill.jpg)";
        }else{
            getTextArea.style.fontWeight = "normal";
            getTextArea.style.color = "black";
            getTextArea.style.textDecoration = "none";
            document.body.style.backgroundImage = "none";
        }
    }

    /*function to increase the font size by 2 */
    function increaseFontByTwo(){
        let getText = document.getElementById("someText");
        let getStyle = window.getComputedStyle(getText,null).getPropertyValue('font-size');
        getText.style.fontSize = parseInt(getStyle) + 2 + "pt";
    }

    /*increase font size by 2 every 500ms time interval*/
    function increaseFontWithTime(){
        /*    timer = null;*/
        let timer = null;
        timer = setInterval(increaseFontByTwo,500);
    }

    /*function that sets words that have more than 5 letters to 'malkovich'*/
    function setMalkovitch(){
        let getAllText = document.getElementById("someText");
        let txtArray = getAllText.value.split(" ");

        for(let i=0;i<txtArray.length;i++){
            if(txtArray[i].length >= 5){
                txtArray[i] = "Malkovich";
            }
        }
        getAllText.value = txtArray.join(" ");
    }
};

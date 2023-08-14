window.onload = function(){
    "use strict";
    /*this function reverses array*/
    function reverseArray(arr){
        let rev = [];
        for(let i=0;i<arr.length;i++){
            rev[i] = arr[arr.length-i-1];
        }
        return rev;
    }

    /*In-place array reversal without creating an extra array*/
    function reverseArrayInPlace(arr){
        let temp;
        for(let i=0;i<arr.length/2;i++){

            /*swap front and rear values*/
            temp = arr[i];
            arr[i] = arr[arr.length - i - 1];
            arr[arr.length - i - 1] = temp;
        }
        return arr;
    }

    /*this function takes an array and creates a list*/
    function arrayToList (array) {
        /*create an empty list*/
        const list = {};

        /*assign first value if array has only one value
        set rest to null*/
        if (array.length === 1) {
            list.value = array[array.length - 1];
            list.rest = null;
            return list;

        /*set first value of array to list's value and pass the remaining
         array to this function - recursive call and then return list*/
        } else {
            list.value = array[0];
            array.splice(0,1);
            list.rest = arrayToList(array);
            return list;
        }
    }

    /*this function takes a list and convert it to array*/
    function listToArray(list) {
        const array = [];

        /*while the list is not empty, go through the list
        and get the value*/
        while (list !== null) {

            /*push the values to the list*/
            array.push(list.value);
            list = list.rest;
        }
        return array;
    }

    /*find nth element from the list*/
    function nth (list, pos) {
        return listToArray(list)[pos];
    }

    /*This function takes two objects/values to check if they are equal
    It returns true only if they are the same value or are objects with
    same properties, where the values of the properties are equal*/
    function deepEqual(obj1, obj2) {
        if (obj1 === obj2) {
            return true;
        }

        /*If both of them are objects and are not null
        check their key value pair for a deep search*/
        else if (typeof obj1 === 'object' && typeof obj2 === 'object' && obj1 !== null && obj2 !== null) {

            /*Collect all the keys of both objects*/
            let keys = Object.keys(obj1).concat(Object.keys(obj2));

            // filter out duplicate keys
            keys = keys.filter(
                function (value, index, self) {
                    return self.indexOf(value) === index;
                }
            );

            let i;
            for (i of keys) {
                /*deep check to see if all values of the keys of both objects
                are equal or not and return boolean values accordingly*/
                return deepEqual(obj1[i],obj2[i]);
            }
            return true;
        } else {
            return false;
        }
    }


    let num = [5,4,3,2,1];
    console.log("Expected output of reverseArray([5,4,3,2,1]) is [1,2,3,4,5] : Found = ["
        + reverseArray(num) +"]");

    /*Reverse Array in place change the actual array*/
    reverseArrayInPlace(num);
    console.log("Expected output of reverseArrayInPlace([5,4,3,2,1]) is [1,2,3,4,5] : Found = ["
        + num +"]");
    console.log(arrayToList([10,20]));
    console.log(listToArray(arrayToList([10,20,30])));
    console.log(nth(arrayToList([10,20,30]),1));
    let obj={here:{is:"an"},object:2};
    console.log(deepEqual(obj,obj));
    console.log(deepEqual(obj,{here:1,object:2}));
    console.log(deepEqual(obj,{here:{is: "an"},object:2}));
};

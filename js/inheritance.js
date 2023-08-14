/*jshint esversion: 6  */

(function() {
    "use strict";

    /**
     * W2D6 - Inheritance
     */

    /**
     * PART ONE
     */

    // SLIDE 17
    /*----------------ALL THE ANSWERS IN THE COMMENT SECTION----------------------------*/
    /*let animal = {
        jumps: null
    };
    let rabbit = {
        __proto__: animal,
        jumps: true
    };

    alert( rabbit.jumps ); // TRUE (1)
    delete rabbit.jumps;
    alert( rabbit.jumps ); // NULL (2)
    delete animal.jumps;
    alert( rabbit.jumps ); // UNDEFINED (3)*/

    /*--------------------------------NEXT QUESTION---------------------------------------*/
    /*let head = {
        glasses: 1
    };

    let table = {
        pen: 3,
        __proto__: head
    };

    let bed = {
        sheet: 1,
        pillow: 2,
        __proto__: table
    };

    let pockets = {
        money: 2000,
        __proto__: bed
    };

    alert( pockets.pen ); // 3
    alert( bed.glasses ); // 1*/

    /*There is not much difference as per the speed. When the property is taken
    from an object or its prototype, it keeps track of that property.*/

    /*--------------------------------NEXT QUESTION---------------------------------------*/
    /*Where does it writes*/
    /*The object that receives the full property is the rabbit as this refers
    to object before the dot(rabbit.eat())*/

    /*--------------------------------NEXT QUESTION---------------------------------------*/
    /*Why two hamsters are full*/
    /*Stomach is found in prototype for both lazy and speedy as it follows
    the prototype chain. */

    /*--------------------------------NEXT QUESTION---------------------------------------*/
    /*Changing prototype*/
    /*True
    False
    True
    Undefined*/

    /*--------------------------------NEXT QUESTION---------------------------------------*/
    /*Create an object with the same constructor (exercise involving preserving the .constructor link in the [[Prototype]] object)*/
    /*function User(name) {
        this.name = name;
    }
    let user = new User('John');
    let user2 = new user.constructor('Pete');*/

    /*--------------------------------NEXT QUESTION---------------------------------------*/
    /*Add method f.defer(ms) to functions
    Function.prototype.defer = function(ms) {
        setTimeout(this, ms);
    };

    function f() {
        alert("Hello!");
    }*/

    /*--------------------------------NEXT QUESTION---------------------------------------*/
    /*Add the decorating “defer()” to functions*/
    /*Function.prototype.defer = function(ms) {
        let f = this;
        return function(...args) {
            setTimeout(() => f.apply(this, args), ms);
        };
    };
    function f(a, b) {
        alert( a + b );
    }*/

    /*--------------------------------NEXT QUESTION---------------------------------------*/
    /*The difference between calls*/
    /*The calls defined don't do the same thing.
    rabbit.sayHi();                        // Rabbit
    Rabbit.prototype.sayHi();              // undefined
    Object.getPrototypeOf(rabbit).sayHi(); // undefined
    rabbit.__proto__.sayHi();              // undefined*/

    /**
     * PART TWO
     */
    String.prototype.filter = function(array){
            let new_arr = [];

            // Split the string to put all words inside an array
            const arr = this.split(" ");
            let check = true;

            // Go through both arrays
            for (let i = 0; i < arr.length; i++) {
                check = true;

                // Check first word of the sentence with banned words
                // in the array
                for (let j = 0; j < array.length; j++) {

                    // If it is present in the array, do nothing
                    if (arr[i] === array[j]) {
                        check = false;
                    }
                }

                // If it is not present, then push it into new array
                if (check) {
                    new_arr.push(arr[i]);
                }
            }

            // Join all strings in the array and return them as a single sentence
            return new_arr.join(" ");
        };

    /**
     * BubbleSort sorts an array in ascending order
     */
    Array.prototype.bubbleSort = function(){
        let temp = 0;

        // Go through the array
        for(let i = 0;i<this.length;i++){
            for(let j=0;j<this.length;j++){

                // Compare all the elements, and bring the smallest to the front
                if(this[i] < this[j]){
                    temp = this[i];
                    this[i] = this[j];
                    this[j] = temp;
                }
            }
        }
        return this;
    };

    function Person(name, age)
    {
        this.name = name;
        this.age = age;
    }

    Person.prototype.describe = function()
    {
        return this.name + ", " + this.age + " years old.";
    };

    const Student = function () {};
    //Inherit from person
    Student.prototype = new Person();
    Student.prototype.learn = function(subject)
    {
        console.log(this.name + " just learned " + subject);
    };

    const Teacher = function(){};
    //Inherit from person
    Teacher.prototype = new Person();

    //Add teach property in teacher
    Teacher.prototype.teach = function(subject){
      console.log(this.name + " is now teaching " + subject);
    };


    // Unit testing
    let a = ["not","This"];
    let sen = "This house is not nice!";
    console.log("This house is not nice!".filter(a));
    let b = [1,8,3,0,4];
    console.log(b.bubbleSort());

    // Creating instances of student and teacher for testing
    const s1 = new Student();
    s1.name = "John";
    // Following line should print John just learned Biology on console
    s1.learn("Biology");

    const t1 = new Teacher();
    t1.name = "Javed";
    // Following line should print Javed is now teaching Networking on console
    t1.teach("Networking");

    // MOCHA TESTING
    describe("INHERITANCE", function() {

        context("Three functions included", function() {

            it("Expected : house is nice!", function() {
                assert.equal(sen.filter(a), "house is nice!");
            });

            it("Sorting of [1,8,3,0,4] is [0,1,3,4,8]",function(){
                let outcome = b.bubbleSort();
                let expected = [0,1,3,4,8];
                assert.deepEqual(outcome,expected);
            });

            it("John is a student", function() {
                assert.deepEqual(s1 instanceof Student, true);
            });

            it("Javed is a teacher", function() {
                assert.deepEqual(t1 instanceof Teacher, true);
            })
        });

    });


}());
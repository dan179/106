
function Dog(name,age) { // constructor
    this.name = name;
    this.age = age;
}

class Cat { // classes
    // auto called when creating objects
    constructor(name, age, color) {
        this.name = name;
        this.age = age;
        this.color = color;

    }
}

function objects() { // object literal
   
    let d1 = {
        name: "Fido",
        age: 3
        // use object literal if you only want 1 object 
        // not reusable
    };
    let d2 = { 
        Name: "Lola",
        age: 4
    }

    console.log(d1);
    console.log(d2);

    // object constructor
    let d3 = new Dog("cookie",1);
    let d4 = new Dog("cooper",3);
    console.log( d3, d4);

    // classes
    let c1 = new Cat("Dr. Meowsalot", 3, "White");
    let c2 = new Cat("Whiskers", 6, "black");
    console.log(c1, c2);


}

function testRequest() {
    // https://restclass.azurewebsites.net/api/test
    $.ajax({
        type:"GET",
        url: "https://restclass.azurewebsites.net/api/test",
        success: function(response){
            console.log("Server says: ", response);
        },
        error: function(error){
            console.log("Req failed", error);

        }
    });
}


// exec the fn

objects();

//testRequest();
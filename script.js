var nonImportantClass = "far fa-star";
var importantClass = "fas fa-star";
var isImportant = false;
var isFormVisible = true;


function toggleImportant() {
    console.log("icon clicked!");
    
    if(isImportant) {
        // non imnportant
        isImportant = false;
        $("#iImportant").removeClass(importantClass);
        $("#iImportant").addClass(nonImportantClass);
    }
    else {

        // important
        $("#iImportant").removeClass(nonImportantClass);
        $("#iImportant").addClass(importantClass);
        isImportant = true;
    }
}

function toggleForm() {
    if(isFormVisible) {
        // hide
        isFormVisible = false;
        $("#form").hide();
    }
    else { 
        // show 
        isFormVisible = true;
        $("#form").show();
    }
}

function saveTask() {
    console.log("Saving task...");

    let title = $("#txtTitle").val();
    let  date = $("#selDate").val();
    let  contact = $("#txtContact").val();
    let location = $("#txtLocation").val();
    let  desc = $("#txtDescription").val();
    let color = $("#selColor").val();
    console.log(title, date, contact, location, desc, color);
    // validate
    if(title.length < 5 ){
        // show an error
        alert("Title should be at least 5 chars long");
        return;
    }

    if(!date) {
        // show an error
        alert("DueDate is required");
        return;
    }

    if(!contact) {
        // show an error
        alert("Contact number is required");
        return;
    }

    if(!location) {
        // show an error
        alert("location is required");
        return;
    }



    let task = new Task(isImportant, title, date, contact, location, desc, color);
    let dataStr = JSON.stringify(task);
    console.log(task);
    console.log(dataStr);

    // save the task
    $.ajax({
        type: "POST",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: dataStr,
        contentType: "application/json",
        success: function(data) {
            console.log("Save res", data);
            let savedTask = JSON.parse(data);
            // display
            displayTask(savedTask);
        },
        error: function(error){
            console.log("Save failed", error)
        }
    });

    // clear the form (create a function fn)
    clearForm();
    // delete.val("")

}

function clearForm() {
    $("#txtTitle").val("");
    $("#txtTitle").val("");
    $("#selDate").val("f");
    $("#txtContact").val("");
    $("#txtLocation").val("");
    $("#txtDescription").val("");
    $("#selColor").val("#000000");
}




function displayTask(task) {
    // create syntax 
    
    let syntax =    `<div id="${task._id}" class="task">
        <div class="info">
            <h5>${task.title}</h5>
            <p>${task.desc}<p>
        </div>

        <label class="date">${task.dueDate}</label>

        <div class="extra"
            <label class="">${task.contact}</label>
            <label class="">${task.location}</label>
            <label class="">${task.color}</label>
        </div>

        <button onclick="deleteTask('${task._id}')" class="btn btn-sm btn-danger">Remove</button>

    </div>`;


    // append the syntax to an element on the screen
    $("#task-list").append(syntax);

}
function deleteTask(id) {
    console.log("deleting task", id);
    $("#" + id).remove();
    // htttp DELETE request with the id 
}

function clearData() {
    $.ajax({
        type: "DELETE",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/danielt48",
        success: () => {
            console.log("Data cleared");
            $("#task-list").html("");

        },
        error: (details) => {
            console.log("Clear failed", details);
        }
    });
}    

function retrieveTasks(){
    //https://fsdiapi.azurewebsites.net/
    //get
    $.ajax({
        type: "GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        success: (data) => {
            let list = JSON.parse(data); //from string to objext/array
            // for loop and print every task
            for(let i=0; i< list.length; i++) {
                let task = list[i];
                if(task.name === "danielt48"){
                    displayTask(task);
                }
            }
        },
        error: (error) => {
            console.error("Retrieve failed", error);
        }
    });
}

function init() {
    console.log("Task manager");

    // events
    $("#iImportant").click(toggleImportant);
    $("#btnToggleForm").click(toggleForm);
    $("#btnSave").click(saveTask);
    $("#deleteTask").click(clearData);

    
    // load data
    retrieveTasks();
}

window.onload = init;

// $("#form").hide() || $("#form").show()



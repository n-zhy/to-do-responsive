const inputTask = document.getElementById("inputTask");
const taskContainer = document.getElementById("taskContainer");

function add(){
    if(inputTask.value === ""){
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.style.display = "block";
        setTimeout(() => {
            errorMessage.style.display = "none";
        }, 1500);
    } 
    else{
        const newTask = document.createElement("li");

        const checkBox = document.createElement("img");
        checkBox.src = "circle.png";

        const cross = document.createElement("span");
        cross.textContent = "\u00d7";
        cross.classList.add("cross");

        newTask.appendChild(checkBox);
        newTask.appendChild(document.createTextNode(inputTask.value));
        newTask.appendChild(cross);

        taskContainer.prepend(newTask);

        saveData();
    }
    inputTask.value = "";
}

taskContainer.addEventListener('click', (event) => {
    if(event.target.tagName === "LI"){
        event.target.classList.toggle("checked");
        const img = event.target.querySelector("img");
        if(img){
            img.src = event.target.classList.contains("checked") ? "checked-circle.png" : "circle.png";
            event.target.style.textDecoration = event.target.classList.contains("checked") ? "line-through" : "none";
        }
        saveData();
    } 
    else if(event.target.tagName === "IMG"){
        const listItem = event.target.parentElement;
        listItem.classList.toggle("checked");
        event.target.src = listItem.classList.contains("checked") ? "checked-circle.png" : "circle.png";
        listItem.style.textDecoration = listItem.classList.contains("checked") ? "line-through" : "none";
        saveData();
    } 
    else if(event.target.tagName === "SPAN"){
        event.target.parentElement.remove();
        saveData();
    }
});

function saveData(){
    const tasks = [];
    const items = taskContainer.getElementsByTagName("li");
    for(let item of items){
        const text = item.childNodes[1].textContent;
        tasks.push({
            text: text, 
            checked: item.classList.contains("checked")
        });
    }
    localStorage.setItem("data", JSON.stringify(tasks));
}

function showTask(){
    const tasks = JSON.parse(localStorage.getItem("data"));
    if(tasks){
        tasks.forEach(task => {
            const newListItem = document.createElement("li");

            const checkBox = document.createElement("img");
            checkBox.src = task.checked ? "checked-circle.png" : "circle.png";

            const span = document.createElement("span");
            span.innerHTML = "\u00d7";
            span.classList.add("cross");

            newListItem.appendChild(checkBox);
            newListItem.appendChild(document.createTextNode(task.text));
            newListItem.appendChild(span);

            if(task.checked){
                newListItem.classList.add("checked");
                newListItem.style.textDecoration = "line-through";
            } 
            else{
                newListItem.style.textDecoration = "none";
            }

            taskContainer.appendChild(newListItem);
        });
    }
}

document.addEventListener("DOMContentLoaded", showTask);
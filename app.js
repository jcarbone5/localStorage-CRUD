//variables
const form = document.querySelector('#taskForm');
const list = document.querySelector('#taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editing = false;
let idTask = null;

//listeners
form.addEventListener('submit', e => {
    e.preventDefault();

    if(form.elements.title.value != "") {
        if(!editing) {
            const id = Math.floor(Math.random() * 1000);

            const newTask = {
                id,
                title: form.elements.title.value
            }

            addTask(newTask);
        } else {
            const taskUpdate = {
                id: idTask,
                title: form.elements.title.value
            }

            updateTask(taskUpdate);
        }  

        form.reset();
    }
});

window.addEventListener('click', e => {
    if(e.target.classList.contains('delBtn')) {
        deleteTask(e.target.id);
    } 

    if(e.target.classList.contains('updBtn')) {
        editing = true;
        idTask = e.target.id;
        form.elements.title.value = e.target.parentNode.previousElementSibling.innerText;
    } 
});

//functions
const addTask = task => {
    tasks.push(task);
    
    getTasks();
    storage();
}

const getTasks = () => {
    list.innerHTML = '';
   
    tasks.forEach(task => {
        list.innerHTML += `
            <div class="card">
                <div class="card-body d-flex justify-content-between">
                    <h5 class="text-muted">${ task.title }</h5>

                    <div>
                        <button id="${ task.id }" class="btn btn-secondary updBtn">Update</button>
                        <button id="${ task.id }" class="btn btn-danger delBtn">Delete</button>
                    </div>
                </div>
            </div>    
        `;
    }); 
}

const deleteTask = id => {
    tasks = tasks.filter(task => task.id != id);
    
    getTasks();
    storage();
}

const updateTask = taskUpdate => {
    tasks = tasks.map(task => task.id == taskUpdate.id ? taskUpdate : task );
    editing = false;
    idTask = null;

    getTasks();
    storage();
}

const storage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

getTasks();
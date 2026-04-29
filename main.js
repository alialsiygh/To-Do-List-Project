// Waite For Dwonload
document.addEventListener("DOMContentLoaded", function () {
  // Import every class & id name
  const inputTask = document.getElementById("input-task"),
    addBtn = document.getElementById("btn-add"),
    allContainer = document.getElementById("all-tasks"),
    CompletedContainer = document.getElementById("tasks-completed"),
    unCompletedContainer = document.getElementById("tasks-uncompleted");
  // creaat The Array of Tasks
  let Tasks = [];
  // Creat The Function Save & Load Local Storage
  function saveToLocalStorage() {
    localStorage.setItem("Tasks", JSON.stringify(Tasks));
  }
  function loadFromLocalStorage() {
    const stored = localStorage.getItem("Tasks");
    if (stored) {
      Tasks = JSON.parse(stored);
    } else {
      Tasks = [];
    }

    render();
  }

  function creatTask(task) {
    const div = document.createElement("div");
    div.className = "task-item";

    //creat The Input checkbox
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("custom-checkbox");
    checkBox.checked = task.completed;
    checkBox.addEventListener("change", () => {
      toggleComplete(task.id);
    });

    // task Text
    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;

    // Add Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });
    /*
    checkBox.addEventListener("change", () => {
      toggleComplete(task.id);
    });*/

    div.appendChild(checkBox);
    div.appendChild(textSpan);
    div.appendChild(deleteBtn);

    return div;
  }

  // creat The render
  function render() {
    // delete The Container
    allContainer.innerHTML = "";
    CompletedContainer.innerHTML = "";
    unCompletedContainer.innerHTML = "";
    // Add All Tasks
    Tasks.forEach((task) => {
      allContainer.appendChild(creatTask(task));
    });
    // Filter Of Completed Tasks
    Tasks.filter((task) => task.completed).forEach((task) => {
      CompletedContainer.appendChild(creatTask(task));
    });
    // Filter Of UnCompleted Tasks
    Tasks.filter((task) => !task.completed).forEach((task) => {
      unCompletedContainer.appendChild(creatTask(task));
    });
  }

  //Add Tasks
  function addTask() {
    const taskText = inputTask.value.trim();
    if (taskText === "") return;

    // Creat The Object Task
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    Tasks.push(newTask);
    inputTask.value = "";
    saveToLocalStorage();
    render();
  }
  // Add The Function Delete
  function deleteTask(id) {
    Tasks = Tasks.filter((task) => task.id !== id);
    saveToLocalStorage();
    render();
  }

  // Creat Toggle Complet For Delete
  function toggleComplete(id) {
    const task = Tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
      saveToLocalStorage();
      render();
    }
  }

  // addBTN & downloas StartUP
  addBtn.addEventListener("click", addTask);
  loadFromLocalStorage();
  // ADD PRESS ENTER
  inputTask.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
});

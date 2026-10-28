// Get the elements we need from the page
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");
const counter = document.getElementById("counter");

// Add a task when the button is clicked
addBtn.addEventListener("click", addTask);

// Also add a task when Enter is pressed in the input box
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();

  // Do not allow empty tasks
  if (taskText === "") {
    message.textContent = "Please enter a task.";
    return;
  }
  message.textContent = "";

  // Create the list item
  const li = document.createElement("li");

  // Checkbox to mark the task as completed
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateCounter();
  });

  // The task text
  const span = document.createElement("span");
  span.textContent = taskText;

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", function () {
    li.remove();
    updateCounter();
  });

  // Put everything together and add it to the list
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  // Clear the input and focus it again
  taskInput.value = "";
  taskInput.focus();
  updateCounter();
}

// Show how many tasks are left
function updateCounter() {
  const total = taskList.children.length;
  const done = taskList.querySelectorAll("li.completed").length;

  if (total === 0) {
    counter.textContent = "No tasks yet";
  } else {
    counter.textContent = done + " of " + total + " tasks completed";
  }
}

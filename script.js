// Getting the elements from the HTML page
var taskInput = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");
var countText = document.getElementById("countText");

// Function to show the total number of tasks
function updateCount() {
 var total = taskList.children.length;
 countText.textContent = "Total tasks: " + total;
}

// Function to add a new task
function addTask(initialText, isCompleted) {
 var taskText = (typeof initialText === "string") ? initialText : taskInput.value.trim();

 // Check if the input box is empty
 if (taskText === "") {
  alert("Please enter a task!");
  return;
 }

 // Create a new list item
 var li = document.createElement("li");

 // Checkbox to mark the task as completed
 var checkbox = document.createElement("input");
 checkbox.type = "checkbox";

 // Text of the task
 var span = document.createElement("span");
 span.textContent = taskText;

 if (isCompleted) {
  checkbox.checked = true;
  span.classList.add("completed");
 }

 // Delete button
 var deleteBtn = document.createElement("button");
 deleteBtn.textContent = "Delete";
 deleteBtn.className = "delete-btn";

 // When the checkbox is clicked, add or remove the "completed" class
 checkbox.addEventListener("change", function () {
  span.classList.toggle("completed");
 });

 // When the delete button is clicked, remove the task
 deleteBtn.addEventListener("click", function () {
  taskList.removeChild(li);
  updateCount();
 });

 // Add everything inside the list item, and then into the list
 li.appendChild(checkbox);
 li.appendChild(span);
 li.appendChild(deleteBtn);
 taskList.appendChild(li);

 // Clear the input box
 if (typeof initialText !== "string") {
  taskInput.value = "";
 }
 updateCount();
}

// Initial tasks from lab manual demo
addTask("Drink water", true);
addTask("Eat healthy", false);
addTask("Eat momos", true);

// Add task when the Add button is clicked
addBtn.addEventListener("click", addTask);

// Add task when the Enter key is pressed
taskInput.addEventListener("keypress", function (event) {
 if (event.key === "Enter") {
  addTask();
 }
});

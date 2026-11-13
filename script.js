var taskInput = document.getElementById("taskInput");
var prioritySelect = document.getElementById("prioritySelect");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");
var countText = document.getElementById("countText");

function updateCount() {
 var total = taskList.children.length;
 countText.textContent = "(" + total + " task" + (total !== 1 ? "s" : "") + ")";
}

function addTask(text, priority, done) {
 var taskText = typeof text === "string" ? text : taskInput.value.trim();
 var taskPriority = priority || prioritySelect.value;

 if (taskText === "") {
  alert("Please type a task first.");
  return;
 }

 var li = document.createElement("li");
 if (taskPriority === "Important") {
  li.className = "important";
 }

 var taskLeft = document.createElement("div");
 taskLeft.className = "task-left";

 var checkbox = document.createElement("input");
 checkbox.type = "checkbox";
 checkbox.checked = !!done;

 var span = document.createElement("span");
 span.textContent = taskText;
 if (done) span.classList.add("completed");

 var label = document.createElement("span");
 label.className = "priority-label";
 label.textContent = taskPriority;

 checkbox.addEventListener("change", function () {
  span.classList.toggle("completed", checkbox.checked);
 });

 var deleteBtn = document.createElement("button");
 deleteBtn.textContent = "Delete";
 deleteBtn.className = "delete-btn";
 deleteBtn.addEventListener("click", function () {
  taskList.removeChild(li);
  updateCount();
 });

 taskLeft.appendChild(checkbox);
 taskLeft.appendChild(span);
 taskLeft.appendChild(label);

 li.appendChild(taskLeft);
 li.appendChild(deleteBtn);
 taskList.appendChild(li);

 if (typeof text !== "string") {
  taskInput.value = "";
 }

 updateCount();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
 if (e.key === "Enter") addTask();
});

// Pre-loaded sample tasks
addTask("Drink water", "Normal", true);
addTask("Submit Web Tech lab file", "Important", false);
addTask("Eat momos", "Normal", true);

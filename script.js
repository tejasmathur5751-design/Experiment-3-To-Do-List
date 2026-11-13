// DOM Elements
var taskInput = document.getElementById("taskInput");
var prioritySelect = document.getElementById("prioritySelect");
var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskList");
var totalCount = document.getElementById("totalCount");
var completedCount = document.getElementById("completedCount");
var pendingCount = document.getElementById("pendingCount");
var progressBar = document.getElementById("progressBar");
var progressText = document.getElementById("progressText");
var filterButtons = document.querySelectorAll(".filter-btn");

var currentFilter = "all";

// Calculate and update stats & progress bar
function updateStats() {
  var allItems = taskList.querySelectorAll(".task-item");
  var total = allItems.length;
  var completed = 0;

  allItems.forEach(function (item) {
    if (item.classList.contains("completed")) {
      completed++;
    }
  });

  var pending = total - completed;
  var percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  totalCount.textContent = total;
  completedCount.textContent = completed;
  pendingCount.textContent = pending;
  progressBar.style.width = percent + "%";
  progressText.textContent = percent + "% Completed (" + completed + " of " + total + ")";

  applyFilter();
}

// Filter tasks based on selected tab
function applyFilter() {
  var allItems = taskList.querySelectorAll(".task-item");

  allItems.forEach(function (item) {
    var isDone = item.classList.contains("completed");
    if (currentFilter === "all") {
      item.style.display = "flex";
    } else if (currentFilter === "completed") {
      item.style.display = isDone ? "flex" : "none";
    } else if (currentFilter === "pending") {
      item.style.display = !isDone ? "flex" : "none";
    }
  });
}

// Function to add a new task item
function addTask(text, priority, isCompleted) {
  var taskText = typeof text === "string" ? text : taskInput.value.trim();
  var taskPriority = priority || prioritySelect.value;

  if (taskText === "") {
    alert("Please enter a task description!");
    return;
  }

  // Create task item container
  var li = document.createElement("li");
  li.className = "task-item priority-" + taskPriority;
  if (isCompleted) {
    li.classList.add("completed");
  }

  // Checkbox
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!isCompleted;

  // Task content wrapper
  var contentDiv = document.createElement("div");
  contentDiv.className = "task-content";

  var spanText = document.createElement("span");
  spanText.className = "task-text";
  spanText.textContent = taskText;

  var badge = document.createElement("span");
  badge.className = "priority-badge " + taskPriority;
  badge.textContent = taskPriority;

  contentDiv.appendChild(spanText);
  contentDiv.appendChild(badge);

  // Delete button
  var deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";

  // Event Listeners
  checkbox.addEventListener("change", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateStats();
  });

  deleteBtn.addEventListener("click", function () {
    taskList.removeChild(li);
    updateStats();
  });

  // Assemble and append
  li.appendChild(checkbox);
  li.appendChild(contentDiv);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  // Clear input
  if (typeof text !== "string") {
    taskInput.value = "";
  }

  updateStats();
}

// Event Listeners
addBtn.addEventListener("click", function () {
  addTask();
});

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

filterButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterButtons.forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
    currentFilter = btn.getAttribute("data-filter");
    applyFilter();
  });
});

// Seed realistic college student tasks
addTask("Drink water & stay hydrated", "Normal", true);
addTask("Review HTML semantic tags for Lab Viva", "Medium", true);
addTask("Complete Web Tech Experiment 3 Lab Report", "High", false);
addTask("Prepare dataset for Data Science project", "High", false);
addTask("Return library books before Friday", "Medium", false);

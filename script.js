// ============================================================
// TaskFlow — Interactive Task Tracker
// Plain JavaScript. Tasks live in memory and are saved to
// localStorage, so the list survives a page reload.
// ============================================================

const STORAGE_KEY = "taskflow-tasks";

// --- State: the list of tasks, and which filter is active ---
let tasks = loadTasks();
let currentFilter = "all";

// --- Grab the elements we need from the page ---
const addForm = document.getElementById("addForm");
const taskInput = document.getElementById("taskInput");
const formError = document.getElementById("formError");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const countsEl = document.getElementById("counts");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

// --- Persistence: read/write localStorage ---
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return []; // corrupted storage: start fresh rather than crash
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// --- Render: rebuild the visible list + counts from state ---
function render() {
  // 1. Work out which tasks the active filter shows
  const visible = tasks.filter((task) => {
    if (currentFilter === "active") return !task.done;
    if (currentFilter === "completed") return task.done;
    return true; // "all"
  });

  // 2. Live counts
  const doneCount = tasks.filter((t) => t.done).length;
  const activeCount = tasks.length - doneCount;
  countsEl.textContent =
    `${tasks.length} total · ${activeCount} active · ${doneCount} completed`;

  // 3. Empty state (different message when a filter hides everything)
  emptyState.hidden = visible.length > 0;
  emptyState.textContent =
    tasks.length === 0
      ? "No tasks here yet. Add your first one above ☝️"
      : "Nothing matches this filter.";

  // 4. Rebuild the list
  taskList.innerHTML = "";
  visible.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.done ? " is-done" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "Mark task complete");
    // Toggle complete/incomplete, then re-render
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      render();
    });

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✕";
    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      render();
    });

    li.append(checkbox, text, deleteBtn);
    taskList.appendChild(li);
  });
}

// --- Add task ---
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) {
    formError.hidden = false;
    taskInput.focus();
    return;
  }
  formError.hidden = true;
  tasks.push({ id: Date.now(), text, done: false });
  saveTasks();
  taskInput.value = "";
  taskInput.focus();
  render();
});

// --- Filter buttons ---
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterButtons.forEach((b) =>
      b.classList.toggle("is-active", b === btn)
    );
    render();
  });
});

// --- Clear completed ---
clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter((t) => !t.done);
  saveTasks();
  render();
});

// --- First paint ---
render();

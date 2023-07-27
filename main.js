let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-btn');
let tabs = document.querySelectorAll('.task-tabs div');
let underLine = document.getElementById('under-line');
let taskList = [];
let filterList = [];
let mode = 'all';
taskInput.addEventListener('keydown', function (event) {
  if (event.keyCode == 13) {
    addTask(event);
  }
});
addButton.addEventListener('click', addTask);
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function (event) {
    filter(event);
  });
}
function addTask() {
  let task = {
    id: randomIDGenerator(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = '';
  render();
}

function render() {
  let resultHTML = '';
  let list = [];
  if (mode == 'all') {
    list = taskList;
  } else {
    list = filterList;
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">check</button>
            <button onclick="deleteTask('${list[i].id}')">delete</button>
        </div>
        </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">check</button>
            <button onclick="deleteTask('${list[i].id}')">delete</button>
        </div>
        </div>`;
    }
  }
  document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log(id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

function filter(event) {
  filterList = [];
  if (event) {
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth - 4 + 'px';
    underLine.style.left = event.target.offsetLeft + 'px';
    underLine.style.top =
      event.target.offsetTop + (event.target.offsetHeight - 12) + 'px';
  }
  if (mode == 'all') {
    render();
  } else if (mode == 'ongoing') {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode == 'done') {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}
function randomIDGenerator() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

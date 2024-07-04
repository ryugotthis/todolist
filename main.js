// 유저는 할 일을 추가할 수 있다.
// 각 할 일에 삭제와 체크버튼이 있다.
// 삭제버튼을 클릭하면 할 일이 리스트에서 삭제된다.
// 체크버튼을 누르면 할 일이 끝난 것으로 간주하고 밑줄이 간다.
// 끝난 할 일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다.

let addBtn = document.getElementById('addBtn');
let taskInput = document.getElementById('taskInput');
let taskTaps = document.querySelectorAll('.task-taps div'); // 배열로생성
let taskList = [];
let filterList = [];
let mode = 'all';
let underline = document.getElementById('underline');
let taps = document.querySelectorAll('.task-taps .btn');
console.log(taps);
taps.forEach((menu) => menu.addEventListener('click', (e) => selectMenu(e)));
addBtn.addEventListener('click', add);
taskInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById('addBtn').click();
    taskInput.value = '';
  }
});
for (let i = 1; i < taskTaps.length; i++) {
  taskTaps[i].addEventListener('click', function (event) {
    filter(event);
  });
}
taskInput.addEventListener('focus', function () {
  taskInput.value = '';
});

function add() {
  // 할일 목록에 추가하기
  console.log('clicked');
  if (taskInput.value === '') {
    return alert('입력해주세요');
  }
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };

  // console.log(task);
  taskList.push(task);
  render();
}
function render() {
  // 할 일 그려주기
  let resultHTML = '';
  let list = [];

  if (mode === 'all') {
    list = taskList;
  } else if (mode === 'notDone' || mode === 'done') {
    list = filterList;
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task color-change">
      <span class="task-done plan">${list[i].taskContent}</span>
      <div>
        <button class="btn" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left fa-2x" style="color: white;"></i></button>
        <button class="btn" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash fa-2x" style="color: gray;"></i></button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
            <span class="plan">${list[i].taskContent}</span>
            <div>
              <button class="btn" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check fa-2x" style="color: pink;"></i></button>
              <button class="btn" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash fa-2x" style="color: gray;"></i></button>
            </div>
          </div>`;
    }
  }

  document.getElementById('taskBoard').innerHTML = resultHTML;
}
function toggleComplete(id) {
  console.log('id:', id);
  for (let i = 0; i < taskList.length; i++) {
    if (id == taskList[i].id) {
      taskList[i].isComplete = !taskList[i].isComplete;

      break;
    }
  }

  filter();
}
function deleteTask(id) {
  //할 일 목록에서 삭제
  console.log('삭제하자');
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      console.log('삭제');
      taskList.splice(i, 1);
      console.log(taskList);

      break;
    }
  }

  render();
}
function filter(event) {
  let tapClick = false;
  if (event) {
    mode = event.target.id;
    underline.style.left = event.currentTarget.offsetLeft + 'px';
    underline.style.width = event.currentTarget.offsetWidth + 'px';
    underline.style.top =
      event.currentTarget.offsetTop +
      event.currentTarget.offsetHeight -
      1 +
      'px';
    // tapClick = !tapClick;
    // if (mode === 'all') {
    //   console.log('pink');
    //   event.currentTarget.style.backgroundColor = 'antiquewhite';
    // } else {
    //   event.currentTarget.style.backgroundColor = 'none';
    // }
  }
  filterList = [];
  // console.log(event.target.id); //event.target;
  // mode = event.target.id;
  if (mode === 'all') {
    render();
  } else if (mode === 'notDone') {
    console.log(mode);

    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    console.log(filterList);
    render();
  } else if (mode === 'done') {
    console.log(mode);

    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    console.log(filterList);
    render();
  }
}
// function Indicator(e) {
//   return (e.currentTarget.style.backgroundColor = 'antiquewhite');
// }
function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
// render();
function selectMenu(e) {
  // console.log(e);
  for (let i = 0; i < taps.length; i++) {
    taps[i].classList.remove('selected');
  }
  if (e) {
    console.log(e.currentTarget.classList);
    e.currentTarget.classList.add('selected');
  }
}

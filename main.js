// 유저는 할 일을 추가할 수 있다.
// 각 할 일에 삭제와 체크버튼이 있다.
// 삭제버튼을 클릭하면 할 일이 리스트에서 삭제된다.
// 체크버튼을 누르면 할 일이 끝난 것으로 간주하고 밑줄이 간다.
// 끝난 할 일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다.

let addBtn = document.getElementById('addBtn');
let taskInput = document.getElementById('taskInput');
let checkBtn = document.getElementById('checkBtn');
let deleteBtn = document.getElementById('deleteBtn');
let taskList = [];

addBtn.addEventListener('click', add);
checkBtn.addEventListener('click', check);
deleteBtn.addEventListener('click', deleteList);

function add() {
  // 할일 목록에 추가하기
  taskContent = taskInput.value;
  taskList.push(taskContent);
  render();
}
function render() {
  // 할 일 그려주기
  let resultHTML = '';
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `<div class="task">
            <div>${taskList[i]}</div>
            <div>
              <button id="checkBtn">Check</button>
              <button id="deleteBtn">Delete</button>
            </div>
          </div>`;
  }

  document.getElementById('taskBoard').innerHTML = resultHTML;
}
function check() {
  // 밑줄 긋기
}
function deleteList() {
  //할 일 목록에서 삭제
}

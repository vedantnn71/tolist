const addButton = document.querySelector(".add__button");
const ul = document.querySelector(".list__container");

addButton.addEventListener("click", addTodoList);
window.onload = getTodoList;

function addTodoList() {
  const todo = prompt("Let's add your todo!");
  let todos = JSON.parse(localStorage.getItem("todo"));

  if (todos) {
    localStorage.setItem("todo", JSON.stringify([...todos, {
      name: todo,
      isDone: false,
    }]));

    showTodos(JSON.parse(localStorage.getItem("todo")));
  } else {
    localStorage.setItem("todo", JSON.stringify([{
      name: todo,
      isDone: false,
    }]));

    showTodos(JSON.parse(localStorage.getItem("todo")));
  }

};

function getTodoList() {
  const todos = JSON.parse(localStorage.getItem("todo"));

  if (todos) {
    showTodos(todos);
  }
}

function showTodos(todos) {
  ul.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    if (todo.isDone === true) {
      li.classList.add("list__container");
    }

    if (todos[todos.length - 1].name === todo.name) {
      li.classList.add("animate");
    }

    li.classList.add("list__row");
    li.innerHTML = `<div class="list__left"> <i class="checkbox material-icons" onclick="toggleDone('${todo.name}')">${todo.isDone ? "radio_button_checked" : "radio_button_unchecked"}</i> <h3 class="list__heading ${todo.isDone && "strike__heading"}">${todo.name}</h3> </div> <i class="material-icons delete__button" onclick="deleteTodoList('${todo.name}')">delete</i>`;

    ul.appendChild(li);
  });
}

function toggleDone(name) {
  const todos = JSON.parse(localStorage.getItem("todo"));

  for (let index = 0; index < todos.length; index++) {
    const todo = todos[index];

    if (todo.name.search(name) === 0) {
      todos[index].isDone = !todo.isDone;
      localStorage.setItem("todo", JSON.stringify(todos));

      showTodos(todos);
      break;
    }
  }
}

function deleteTodoList(name) {
  const todos = JSON.parse(localStorage.getItem("todo"));

  for (let index = 0; index < todos.length; index++) {
    const todo = todos[index];

    if (todo.name.search(name) === 0) {
      todos.pop(index);
      localStorage.setItem("todo", JSON.stringify(todos));
      showTodos(todos);
      break;
    }
  }
}

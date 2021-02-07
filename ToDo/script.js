//Selecting the elements

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Variables

let LIST, id;

//Classes

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LineThrough = "lineThrough";

//Get item from localStorage

data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//Clear local Storage

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//Today's Date

const option = { weekday: "long", month: "short", day: "numeric" };
today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", option);

//Adding ToDo

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LineThrough : "text";

  const item = `<li class="list">
                <i class="far ${DONE}" job="complete" id="${id}"></i>
                <p class="${LINE}">${toDo}</p>
                <i class="far fa-trash-alt" job="delete" id="${id}"></i>
            </li>`;

  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

//Adds ToDo after pressing Enter

document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    input.value = "";
  }
});

//Complete ToDo

function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LineThrough);

  LIST[element.id].done = LIST[element.id] ? true : false;
}

//Remove ToDo

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

//Target the items

list.addEventListener("click", function (event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  localStorage.setItem("TODO", JSON.stringify(LIST));
});

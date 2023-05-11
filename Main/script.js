const Store = require("electron-store");
const store = new Store();
var numClick = 0;
var LocArr = [];
var testA = store.get("StoID");
if (testA) {
  LocArr = testA;
}
var color = "light-green";
var testER = store.get("color");
if (testER) {
  color = testER;
}

const days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];
var d = new Date();
var dayName = days[d.getDay()];
var dayTitle = document.getElementById("day");
dayTitle.textContent = dayName;
var test = store.get("StoID");
body.classList.add(`${color}`);
var currentDate = new Date();
var cDay = currentDate.getDate();
var cMonth = currentDate.getMonth() + 1;
var cYear = currentDate.getFullYear();
var day = cYear + "/" + cMonth + "/" + cDay;
if (!store.get("new")) {
  store.set("date", day);
  store.set("new", "false");
}

if (test) {
  test.forEach((element) => {
    // Implement intext system.
    var intext = store.get(`${element}`);
    var array = JSON.stringify(intext);
    if (array.includes('"checked":"false"')) {
      var halfEr = array.replace('{"task":"', "");
      var title = halfEr.replace(/(","checked":"false"}$)/, "");
      var insertTask = `<div class="noteText" id="${element}" spellcheck="false"><input class="checkbox" type="checkbox" onclick="fontChange(event)"><label onkeyup="reset(event); if(this.key == 'Enter'){this.preventDefault();}" onkeydown="eraseTask(event)" class="labelClass" contenteditable>${title}</label></div>`;
      document
        .getElementById("resizer")
        .insertAdjacentHTML("beforebegin", insertTask);
    } else {
      var halfEr = array.replace('{"task":"', "");
      var title = halfEr.replace(/(","checked":"true"}$)/, "");
      var insertTask = `<div class="noteText" id="${element}" spellcheck="false"><input class="checkbox" type="checkbox" onclick="fontChange(event)" checked><label onkeydown="eraseTask(event)" onkeyup="reset(event); if(this.key == 'Enter'){this.preventDefault();}" class="labelClass completed" contenteditable>${title}</label></div>`;
      document
        .getElementById("resizer")
        .insertAdjacentHTML("beforebegin", insertTask);
    }
  });
}

if (document.getElementsByClassName("noteText").length === 0) {
  var insertTask = `<div class="noteText" id="1"><input class="checkbox" type="checkbox" onclick="fontChange(event)"><label onkeydown="eraseTask(event)" onkeyup="reset(event); if(this.key == 'Enter'){this.preventDefault();}" class="labelClass" contenteditable></label></div>`;
  document
    .getElementById("resizer")
    .insertAdjacentHTML("beforebegin", insertTask);
  LocArr.push(`1`);
  store.set(`StoID`, LocArr);
}

function reset(e) {
  var checkif = e.target.previousSibling.checked;
  var title = e.target.textContent;
  store.set(`${e.target.parentNode.id}`, {
    task: `${title}`,
    checked: `${checkif}`,
  });
}

function eraseTask(e) {
  if (e.key == "Enter") {
    e.preventDefault();
    newTask(e);
  }
  if (e.target.textContent == "") {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      document.getElementsByClassName("noteText").length !== 1
    ) {
      if (
        e.key == "Backspace" &&
        e.target.parentNode.previousSibling.hasChildNodes()
      ) {
        e.target.parentNode.previousSibling.children[1].focus();
        document.execCommand("selectAll", false, null);
        document.getSelection().collapseToEnd();
        e.preventDefault();
      } else if (
        e.key == "Delete" &&
        e.target.parentNode.nextSibling.hasChildNodes()
      ) {
        e.target.parentNode.nextSibling.children[1].focus();
        e.preventDefault();
      }
      var nums = LocArr.indexOf(e.target.parentNode.id);
      LocArr.splice(nums, 1);
      store.set("StoID", LocArr);
      e.target.parentNode.remove();
    }
  }
}

// Creates a new task.
function newTask(e) {
  numClick = numClick + 1;
  if (document.getElementById(`${numClick}`)) {
    numClick = numClick + 1;
    newTask(e);
  } else {
    // Store data into electron-store to be retrieved later by the html file.
    store.set(`${numClick}`, { task: ``, checked: `false` });
    // Store value to electron-store array data to be used for relaunch.
    LocArr.push(`${numClick}`);
    store.set(`StoID`, LocArr);
    // What to put in the task space.
    var insertTask = `<div class="noteText" id="${numClick}"><input class="checkbox" type="checkbox" onclick="fontChange(event)"><label onkeydown="eraseTask(event)" onkeyup="reset(event); if(this.key == 'Enter'){this.preventDefault();}" class="labelClass" contenteditable></label></div>`;
    // Insert task into html.
    document
      .getElementById(`${e.target.parentNode.id}`)
      .insertAdjacentHTML("afterend", insertTask);
    e.target.parentNode.nextSibling.children[1].focus();
  }
}

function resize() {
  const { ipcRenderer } = require("electron");
  if (window.outerHeight == 300 && window.outerWidth == 245) {
    let width = window.outerWidth;
    ipcRenderer.send("resize-window", width, document.documentElement.scrollHeight);
  } else {
    ipcRenderer.send("resize-window", 245, 300, true);
  }
}

function fontChange(e) {
  var title = e.target.nextSibling;
  var text = e.target.nextSibling.textContent;
  if (title.classList.contains("completed") == true) {
    title.classList.remove("completed");
    store.set(`${e.target.parentNode.id}`, {
      task: `${text}`,
      checked: `false`,
    });
    var audio = new Audio("./sound/dong.mp3");
    audio.play();
  } else {
    title.classList.add("completed");
    store.set(`${e.target.parentNode.id}`, {
      task: `${text}`,
      checked: `true`,
    });
    var audio = new Audio("./sound/ding.mp3");
    audio.play();
  }
}

const changeColor = () => {
  var colorbtn = document.getElementById("color-btn");
  var body = document.getElementById("body");
  var header = document.getElementById("header");
  var resizer = document.getElementById("resizer");
  if (body.classList.contains("light-green")) {
    body.classList.remove("light-green");
    body.classList.add("purple");
    store.set("color", "purple");
  } else if (body.classList.contains("purple")) {
    body.classList.remove("purple");
    body.classList.add("orange");
    store.set("color", "orange");
  } else if (body.classList.contains("orange")) {
    body.classList.remove("orange");
    body.classList.add("light-blue");
    store.set("color", "light-blue");
  } else if (body.classList.contains("light-blue")) {
    body.classList.remove("light-blue");
    body.classList.add("pink");
    store.set("color", "pink");
  } else if (body.classList.contains("pink")) {
    body.classList.remove("pink");
    body.classList.add("light-green");
    store.set("color", "light-green");
  }
};

function quitApp() {
  window.close();
}

function dateChange() {
  var currentDate = new Date();
  var cDay = currentDate.getDate();
  var cMonth = currentDate.getMonth() + 1;
  var cYear = currentDate.getFullYear();
  var day = cYear + "/" + cMonth + "/" + cDay;
  if (store.get("date") !== day) {
    if (test) {
      test.forEach((element) => {
        var taskName = document.getElementById(`${element}`).children[1]
          .textContent;
        store.set(`${element}`, { task: `${taskName}`, checked: `false` });
        document.getElementById(`${element}`).children[0].checked = false;
        document
          .getElementById(`${element}`)
          .children[1].classList.remove("completed");
        store.set("date", day);
      });
    }
    var d = new Date();
    var dayName = days[d.getDay()];
    var dayTitle = document.getElementById("day");
    dayTitle.textContent = dayName;
  }
  store.set("winW", window.outerWidth);
  store.set("winH", window.outerHeight);
  store.set("posX", window.screenX);
  store.set("posY", window.screenY);
}

setInterval(dateChange, 1000);

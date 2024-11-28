let doneMark = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`;
let a;
document.querySelectorAll(".pri").forEach((e) => {
  e.addEventListener("click", (e) => {
    document.querySelectorAll(".options input").forEach((e) => {
      e.removeAttribute("checked");
    });
    e.target
      .closest(".options")
      .querySelector("input")
      .setAttribute("checked", "");
  });
});

let mark = (task) => {
  task.addEventListener("click", (j) => {
    let input = task.querySelector("input");
    input.toggleAttribute("checked");
    total_Done()
    if (task.querySelector("input").hasAttribute("checked")) {
      task.querySelector(
        "label"
      ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff44" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
      task.querySelector("h4").classList.add("line");
      task.querySelector(".deadline-line p").classList.add("line");
      task.querySelector(".remaintime").classList.add("line");
    } else {
      task.querySelector(
        "label"
      ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle"><circle cx="12" cy="12" r="10"/></svg>`;
      timer();
      task.querySelector("h4").classList.remove("line");
      task.querySelector(".deadline-line p").classList.remove("line");
      task.querySelector(".remaintime").classList.remove("line");
    }
  });
};

let closer = (e) => {
  let close = document.querySelectorAll(".mark");
  close.forEach((e) => {
    e.addEventListener("click", (e) => {
      let tar = e.target.closest(".task");
      tar.remove();
      total_tasks();
    });
  });
};
closer();

let insertertask = () => {
  let text = document.querySelector(".inputTask").value;
  let deadline = document.querySelector(".deadline").value;
  if (text.trim() == "") {
    alert("Enter text");
  } else {
    let ram = Math.random() * 2323;
    let div = document.createElement("div");
    div.classList.add("task");
    div.classList.add("f");
    div.classList.add("jcsb");
    let priority = document.querySelector('[type="radio"]:checked');
    let html = `
        <div class="f33 text f gap">
        <input type="checkbox" class="dn done" id="${ram}" />
        <label for="${ram}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle"><circle cx="12" cy="12" r="10"/></svg>
        </label>
        <h4>${text}</h4>
        </div>
      <div class="f33 f aic jcc fdc timer">
      <div class="cw deadline-line">
      <p>${deadline}</p>
      </div>
      <div class="cw remaintime">
      <p></p>
      </div>
      </div>
      <div class="f33 close f gap aic jce">
      <div class="priority ${priority.value}">
      <p class="cw">${priority.value}</p>
      </div>
      <div class="mark">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-x"
                  >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                  </svg>
                  </div>
                  </div>
                  `;
    div.innerHTML = html;
    document.querySelector(".control").appendChild(div);
    timer();
    document.querySelector(".inputTask").value = "";
    mark(div);
    play();
  }
};

document.querySelector(".add").addEventListener("click", (e) => {
  insertertask();
});
document.querySelector(".inputTask").addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    insertertask();
  }
});
let play = (e) => {
  closer();
  total_tasks();
  save();
};
let task_save;
let save = (e) => {
  let text = document.querySelector(".control").innerHTML;
  localStorage.setItem("text_saved", text);
  document.querySelector('.save').innerHTML = doneMark;
  setTimeout(() => {
    document.querySelector('.save').innerHTML = 'Save';
  }, 1400);
};
let jjjj = (e) => {
  document.querySelectorAll(".task").forEach((e) => {
    mark(e);
  });
};
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key == "s") {
    e.preventDefault();
    save();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key == "r") {
    e.preventDefault();
    location.reload();
  }
});
window.addEventListener("load", (e) => {
  let data = localStorage.getItem("text_saved");
  document.querySelector(".control").innerHTML = data;
  closer();
  jjjj();
  timer();
  total_Done()
  total_tasks();
});

let timer = () => {
  let times = document.querySelectorAll(".deadline-line p");
  times.forEach((e) => {
    remain(e);
  });
};

let remain = (e) => {
  let user_time = new Date(e.innerHTML);
  a = setInterval(() => {
    let Current_date = new Date();
    let seconds = (user_time - Current_date) / 1000;
    let remainer = {
      days: Math.floor(seconds / (3600 * 24)),
      hours: Math.floor((seconds % (3600 * 24)) / 3600),
      min: Math.floor((seconds % 3600) / 60),
      sec: Math.floor(seconds % 60),
    };
    if (!isNaN(user_time)) {
      e
        .closest(".task")
        .querySelector(
          ".remaintime"
        ).innerHTML = `${remainer.days}d : ${remainer.hours}h : ${remainer.min}m`;
    } else {
      e.closest(".task").querySelector(".remaintime").innerHTML =
        "No time entered ";
        clearInterval(a)
    }
    if (seconds <= 0) {
      clearInterval(a);
      e
        .closest(".task")
        .querySelector(".remaintime").innerHTML = `Time has Expired`;
      e.closest(".task").querySelector("h4").classList.add("line");
      e
        .closest(".task")
        .querySelector(
          "label"
        ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff44" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
      e.closest(".task").querySelector(".timer").classList.add("line2");
    }
  }, 1000);
};
let total_tasks = (e) => {
  let tasks = document.querySelectorAll(".task");
  document.querySelector(".total-task p").innerHTML = `Tasks : ${tasks.length}`;
};
let currentTime = () => {
  let C_time = new Date();
  let time = `${C_time.getHours()}: ${C_time.getMinutes()} : ${C_time.getSeconds()}`;
  document.querySelector(".current-time p").innerHTML = time;
};
setInterval(() => {
  currentTime();
}, 1000);
let total_Done = (e)=>{
    let done = document.querySelectorAll(".task input:checked");
    document.querySelector('.total-task span.cw').innerHTML = `| Done : ${done.length}`    
}
document.querySelector('.save').addEventListener('click',(e)=>{
  save()
})
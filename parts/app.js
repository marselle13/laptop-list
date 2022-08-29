"use strict";
//variables
const back = document.querySelector(".back");
const url_team = "https://pcfy.redberryinternship.ge/api/teams";
const url_position = "https://pcfy.redberryinternship.ge/api/positions";
const url_brand = "https://pcfy.redberryinternship.ge/api/brands";
const url_cpu = "https://pcfy.redberryinternship.ge/api/cpus";
const option_team = document.getElementById("grid-state");
const option_position = document.getElementById("grid-position");
const option_brand = document.getElementById("grid-brand");
const option_cpu = document.getElementById("grid-cpu");
const person = document.querySelector(".person");
const next = document.querySelector(".next");
const des = document.querySelector(".des");
const info = document.getElementById("info");
const laptop = document.getElementById("laptop");
const line = document.querySelector(".line");
const back2 = document.querySelector(".back2");
const mobile = document.querySelector(".mobile");
const mobile2 = document.querySelector(".mobile2");

//go on add page from landing page
back.addEventListener("click", function () {
  location.href = "/index.html";
});

//disable position
let job = [];
document.getElementById("grid-position").disabled = true;

//function for get data for team
function getData(url1, option, id) {
  fetch(url1)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let output = `<option class="text-xs" selected>${option}</option>`;
      for (var job in data);
      {
        for (let i = 0; i < data[job].length; i++) {
          output += `<option class="text-xs" >${data[job][i].name}</option>`;
        }
      }
      id.innerHTML = output;
    });
}

getData(url_team, "თიმი", option_team);

//function to get data for position
function getDataPos(id) {
  fetch(url_position)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let output = `<option class="text-xs" >პოზიცია</option>`;
      for (var job in data);
      {
        for (let i = 0; i < data[job].length; i++) {
          switch (data[job][i].team_id) {
            case id:
              output += `<option class="text-xs" >${data[job][i].name}</option>`;
              break;
          }
        }
      }
      option_position.innerHTML = output;
    });
}

//get special data

$(document).ready(function () {
  $("#grid-state").change(function () {
    let val = $(this).val();

    switch (val) {
      case "დეველოპერი":
        option_position.disabled = false;
        getDataPos(1);
        break;
      case "HR":
        option_position.disabled = false;
        getDataPos(2);
        break;
      case "გაყიდვები":
        option_position.disabled = false;
        getDataPos(3);
        break;
      case "დიზაინი":
        option_position.disabled = false;
        getDataPos(4);
        break;
      case "მარკეტინგი":
        option_position.disabled = false;
        getDataPos(5);
        break;
      default:
        option_position.disabled = true;
        option_position.value = "პოზიცია";
        break;
    }
  });
});

next.addEventListener("click", function () {
  info.classList.add("hidden");
  des.classList.add("text-gray-400");
  des.classList.remove("text-gray-700");
  person.classList.add("text-gray-700");
  person.classList.remove("text-gray-400");
  line.classList.add("translate-x-[292px]");
  line.classList.remove("mx-[8px]");
  laptop.classList.remove("hidden");
  laptop.classList.add("flex");
  mobile.classList.add("mb:hidden");
  mobile2.classList.remove("mb:hidden");
});

back2.addEventListener("click", function () {
  info.classList.remove("hidden");
  person.classList.remove("text-gray-700");
  person.classList.add("text-gray-400");
  des.classList.remove("text-gray-400");
  line.classList.remove("translate-x-[292px]");
  line.classList.add("mx-[8px]");
  laptop.classList.add("hidden");
  laptop.classList.remove("flex");
  mobile.classList.remove("mb:hidden");
  mobile2.classList.add("mb:hidden");
});

getData(url_brand, "ლეპტოპის ბრენდი", option_brand);
getData(url_cpu, "CPU", option_cpu);

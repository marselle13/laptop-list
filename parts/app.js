"use strict";
//variables
const back = document.querySelector(".back");
const url_team = "https://pcfy.redberryinternship.ge/api/teams";
const url_position = "https://pcfy.redberryinternship.ge/api/positions";
const url_brand = "https://pcfy.redberryinternship.ge/api/brands";
const url_cpu = "https://pcfy.redberryinternship.ge/api/cpus";
//first Name variables
const firstNameText = document.querySelector(".first-name-text");
const firstName = document.getElementById("first-name");
const firstNameError = document.querySelector(".first-name-error");
//last Name variables
const lastNameText = document.querySelector(".last-name-text");
const lastName = document.getElementById("last-name");
const lastNameError = document.querySelector(".last-name-error");
//option variables
const option_team = document.getElementById("grid-state");
const option_position = document.getElementById("grid-position");
const option_brand = document.getElementById("grid-brand");
const option_cpu = document.getElementById("grid-cpu");
//email variables
const emailText = document.querySelector(".email-text");
const email = document.getElementById("email");
const emailError = document.querySelector(".email-error");
//phone variables
const phoneText = document.querySelector(".phone-text");
const phone = document.getElementById("phone");
const phoneError = document.querySelector(".phone-error");
const person = document.querySelector(".person");
const next = document.querySelector(".next");
const des = document.querySelector(".des");
//info,leptop and line vairables
const info = document.getElementById("info");
const laptop = document.getElementById("laptop");
const line = document.querySelector(".line");
//upload variables
const upload = document.getElementById("upload");
const uploadName = document.querySelector(".upload-text");
const problem = document.querySelector(".problem");
//laptop Name variables
const laptopNameText = document.querySelector(".laptop-name-text");
const laptopName = document.getElementById("laptop-name");
const laptopNameError = document.querySelector(".laptop-name-error");
//laptop cores
const coresName = document.querySelector(".cores-name");
const cores = document.getElementById("cores");
const coresError = document.querySelector(".cores-error");
//laptop threads
const threadsName = document.querySelector(".threads-name");
const threads = document.getElementById("threads");
const threadsError = document.querySelector(".threads-error");
//laptop ram
const ramName = document.querySelector(".ram-text");
const ram = document.getElementById("ram");
const ramError = document.querySelector(".ram-error");
const back2 = document.querySelector(".back2");
const mobile = document.querySelector(".mobile");
const mobile2 = document.querySelector(".mobile2");
const done = document.querySelector(".done");
const donePage = document.querySelector(".done-page");
const popup = document.querySelector(".popup");
const postman = document.querySelector(".postman");
const home = document.querySelector(".home");
const formInfo = document.querySelector("#form-info");

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

let regexGeorgian = /^[\u10A0-\u10FF]+$/;
let regexEmail = /^([A-Za-z0-9_\-\.])+\@([redberry])+\.(ge)$/;
let regexleptopName = /^[a-zA-Z0-9!@#$%^&*()_+=]*$/;
let regexNumbers = /^\d+$/;
let regexMobile = /^(\+995)(79\d{7}|5\d{8})$/;

next.addEventListener("click", function () {
  //first Name validation
  nameVal(firstNameError, firstName, firstNameText, firstName.value);
  //last Name validation
  nameVal(lastNameError, lastName, lastNameText, lastName.value);
  //team validation
  dropDownValidation(option_team, option_team.value, "თიმი");
  //position validation
  dropDownValidation(option_position, option_position.value, "პოზიცია");
  //email validation
  emailVal(emailError, email, emailText, email.value);
  mobileVal(phoneError, phone, phoneText, phone.value);

  if (
    $("#first-name").hasClass("border-blue-300") &&
    $("#last-name").hasClass("border-blue-300") &&
    $("#email").hasClass("border-blue-300") &&
    $("#grid-state").hasClass("border-gray-200") &&
    $("#grid-position").hasClass("border-gray-200")
  ) {
    info.classList.add("hidden");
    laptop.classList.remove("hidden");
    laptop.classList.add("flex");
  }
});

function error(key1, key2, key3) {
  key1.classList.remove("text-gray-500");
  key1.classList.add("text-red-500");
  key2.classList.remove("border-blue-300");
  key2.classList.add("border-red-500");
  key3.classList.remove("text-black");
  key3.classList.add("text-red-500");
}

function correct(key1, key2, key3) {
  key1.classList.remove("text-red-500");
  key1.classList.add("text-gray-500");
  key2.classList.remove("border-red-500");
  key2.classList.add("border-blue-300");
  key3.classList.remove("border-red-500");
  key3.classList.remove("text-red-500");
  key3.classList.add("text-black");
}

//first Name and Last name validation function
function nameVal(key1, key2, key3, value) {
  if (value === "") {
    key1.textContent = "სავალდებულოა";
    error(key1, key2, key3);
  } else if (!regexGeorgian.test(value) && value.length < 2) {
    key1.textContent = "მინიმუმ 2 სიმბოლო,ქართული ასოებით";
    error(key1, key2, key3);
  } else if (value.length < 2) {
    key1.textContent = "მინიმუმ 2 სიმბოლო";
    error(key1, key2, key3);
  } else if (!regexGeorgian.test(value)) {
    key1.textContent = "ქართული ასოები";
    error(key1, key2, key3);
  } else {
    key1.textContent = "მინიმუმ 2 სიმბოლო,ქართული ასოებით";
    correct(key1, key2, key3);
  }
}

//dropdown validation function
function dropDownValidation(key1, name, value) {
  if (value === name) {
    key1.classList.remove("border-gray-200");
    key1.classList.add("border-red-500");
  } else {
    key1.classList.add("border-gray-200");
    key1.classList.remove("border-red-500");
  }
}

//email validation fucntion
function emailVal(key1, key2, key3, value) {
  if (value === "") {
    key1.textContent = "სავალდებულოა";
    error(key1, key2, key3);
  } else if (!regexEmail.test(value)) {
    key1.textContent = "უნდა მთავრდებოდს @redberry.ge-ით";
    error(key1, key2, key3);
  } else {
    key1.textContent = "უნდა მთავრდებოდს @redberry.ge-ით";
    correct(key1, key2, key3);
  }
}

function mobileVal(key1, key2, key3, value) {
  if (value === "") {
    key1.textContent = "სავალდებულოა";
    error(key1, key2, key3, value);
  } else if (!regexMobile.test(value)) {
    key1.textContent = "უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს";
    error(key1, key2, key3);
  } else {
    key1.textContent = "უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს";
    correct(key1, key2, key3);
  }
}

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

function useRegex(input) {
  console.log(regexMobile.test(input));
}

done.addEventListener("click", function () {
  laptopNameVal(laptopNameError, laptopName, laptopNameText, laptopName.value);
  dropDownValidation(option_brand, option_brand.value, "ლეპტოპის ბრენდი");
  dropDownValidation(option_cpu, option_cpu.value, "CPU");
  numberValidation(coresError, cores, coresName, cores.value);
  numberValidation(threadsError, threads, threadsName, threads.value);
  numberValidation(threadsError, threads, threadsName, threads.value);
  numberValidation(ramError, ram, ramName, ram.value);
  uploadVal(upload.value);

  // donePage.classList.add("hidden");
  // postman.classList.add("hidden");
  // popup.classList.add("flex");
  // popup.classList.remove("hidden");
});

function uploadVal(value) {
  const allowedFormats = ["jpeg", "jpg", "png"];

  for (var index in allowedFormats) {
    if (console.log(value === allowedFormats[index])) {
      console.log("not allowed");
    }
  }
}

function laptopNameVal(key1, key2, key3, value) {
  if (value === "") {
    key1.textContent = "სავალდებულოა";
    error(key1, key2, key3);
  } else if (!regexleptopName.test(value)) {
    key1.textContent = "ლათინური ასოები,ციფრები,!@#$%^&*()_+=";
    error(key1, key2, key3);
  } else {
    key1.textContent = "ლათინური ასოები,ციფრები,!@#$%^&*()_+=";
    correct(key1, key2, key3);
  }
}

function numberValidation(key1, key2, key3, value) {
  if (!value) {
    key1.textContent = "სავალდებულოა";
    error(key1, key2, key3);
  } else if (!regexNumbers.test(value)) {
    key1.textContent = "მხოლოდ ციფრები";
    error(key1, key2, key3);
  } else {
    key1.textContent = "მხოლოდ ციფრები";
    correct(key1, key2, key3);
  }
}

home.addEventListener("click", function () {
  location.href = "/index.html";
});

getData(url_brand, "ლეპტოპის ბრენდი", option_brand);
getData(url_cpu, "CPU", option_cpu);

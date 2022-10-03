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
const phoneErrorMobile = document.querySelector(".phone-error-mobile");
const person = document.querySelector(".person");
const next = document.querySelector(".next");
const des = document.querySelector(".des");
const date = document.getElementById("grid-laptop-date");
//info,leptop and line vairables
const info = document.getElementById("info");
const laptop = document.getElementById("laptop");
const line = document.querySelector(".line");
//upload variables
const upload = document.getElementById("upload");
const uploadText = document.querySelector(".upload-text");
const uploadProblem = document.querySelector(".upload-problem");
const uploadAgain = document.querySelector(".upload-again");
const uploadInfo = document.querySelector(".upload-info");
const uploadError = document.querySelector(".upload-error");

const uploaded = document.querySelector(".uploaded");
const problem = document.querySelector(".problem");
//laptop Name variables
const laptopNameText = document.querySelector(".laptop-name-text");
const laptopName = document.getElementById("laptop-name");
const laptopNameError = document.querySelector(".laptop-name-error");
//laptop cores variables
const coresName = document.querySelector(".cores-name");
const cores = document.getElementById("cores");
const coresError = document.querySelector(".cores-error");
//laptop threads variables
const threadsName = document.querySelector(".threads-name");
const threads = document.getElementById("threads");
const threadsError = document.querySelector(".threads-error");
//laptop ram variables
const ramName = document.querySelector(".ram-text");
const ram = document.getElementById("ram");
const ramError = document.querySelector(".ram-error");
//storage type variables
const storageName = document.querySelector(".memory-text");
const storage = document.getElementsByName("memoryStorage");
const storageError = document.querySelector(".memory-problem");
//price variables
const priceName = document.querySelector(".price-text");
const price = document.getElementById("price");
const priceError = document.querySelector(".price-error");

//state variables
const stateName = document.querySelector(".state-text");
const stateError = document.querySelector(".state-error");

const back2 = document.querySelector(".back2");
const mobile = document.querySelector(".mobile");
const mobile2 = document.querySelector(".mobile2");
const done = document.querySelector(".done");
const donePage = document.querySelector(".done-page");
const popup = document.querySelector(".popup");
const postman = document.querySelector(".postman");
const home = document.querySelector(".home");
const formInfo = document.querySelector("#form-info");
const token = "a3200dd88c7653b2824d783573fe66b5";
const table = document.querySelector(".table");

const formData = new FormData();
//go from form page to landing page
back.addEventListener("click", function () {
  location.href = "../index.html";
});

//content load
document.addEventListener("DOMContentLoaded", () => {
  if (form !== null) {
    loadContent(form.name, firstName);
    loadContent(form.surname, lastName);
    loadContent(form.phone_number, phone);
    loadContent(form.email, email);
    loadContent(form.laptop_name, laptopName);
    loadContent(form.laptop_ram, ram);
    loadContent(form.laptop_price, price);
    loadContent(form.laptop_cpu_threads, threads);
    loadContent(form.laptop_cpu_cores, cores);
    loadContent(form.date, date);
  }

  function loadContent(key, value) {
    if (key) {
      value.value = key;
    }
  }

  const radio1 = localStorage.getItem("memoryStorage");
  const radio2 = localStorage.getItem("stateStorage");

  if (radio1 === "SSD") {
    document.getElementById("memorytype1").checked = true;
  } else if (radio1 === "HDD") {
    document.getElementById("memorytype2").checked = true;
  }

  if (radio2 === "new") {
    document.getElementById("stateType1").checked = true;
  } else if (radio2 === "used") {
    document.getElementById("stateType2").checked = true;
  }
});

//local storage
$("form").on("change", function () {
  //select local storage
  $("select").each(function () {
    let id = $(this).attr("name");
    let value = $(this).val();
    localStorage.setItem(id, value);
  });
  //radio local storage
  $('input[type="radio"]:checked').each(function () {
    let name = $(this).attr("name");
    let value = $(this).val();
    localStorage.setItem(name, value);
  });

  const myForm = {
    name: firstName.value,
    surname: lastName.value,
    team_id: option_team.options[option_team.selectedIndex].getAttribute("id"),
    position_id:
      option_position.options[option_position.selectedIndex].getAttribute("id"),
    phone_number: phone.value,
    email: email.value,
    token: token,
    laptop_name: laptopName.value,
    laptop_brand_id:
      option_brand.options[option_brand.selectedIndex].getAttribute("id"),
    laptop_cpu: option_cpu.value,
    laptop_cpu_cores: cores.value,
    laptop_cpu_threads: threads.value,
    laptop_ram: ram.value,
    laptop_hard_drive_type: localStorage.getItem("memoryStorage"),
    laptop_state: localStorage.getItem("stateStorage"),
    date: date.value,
    laptop_price: price.value,
  };

  localStorage.setItem("myForm", JSON.stringify(myForm));

  const dataSend = JSON.parse(localStorage.getItem("myForm"));

  console.log(dataSend);

  for (const name in dataSend) {
    formData.append(name, dataSend[name]);
  }
});

const form = JSON.parse(localStorage.getItem("myForm"));

//api array data
document.getElementById("grid-position").disabled = true;
let brandArray = [];
let teamArray = [];
let cpuArray = [];
let positionArray = [];

//function for data get
function getData(url1, option, id, key, arrayItem, localInfo) {
  fetch(url1)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let output = `<option id="" class="text-xs">${option}</option>`;
      for (var job in data);
      {
        for (let i = 0; i < data[job].length; i++) {
          arrayItem.push(data[job][i]);
          localStorage.setItem(key, JSON.stringify(arrayItem));
        }
      }
      let obj = JSON.parse(localStorage.getItem(key));
      for (var items in obj) {
        output += `<option class="text-xs" id=${obj[items].id}>${obj[items].name}</option>`;
      }
      const value = localStorage.getItem(`${localInfo}`);

      id.innerHTML = output;
      if (value) {
        id.value = value;
      }
    });
}
//team data
getData(url_team, "თიმი", option_team, "teamArray", teamArray, "team");

//onload event
window.onload = function () {
  function getDataPos(id) {
    fetch(url_position)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let output = `<option id="" class="text-xs" selected>პოზიცია</option>`;
        for (var job in data);
        {
          for (let i = 0; i < data[job].length; i++) {
            positionArray.push(data[job][i]);
            localStorage.setItem(
              "positionArray",
              JSON.stringify(positionArray)
            );
            switch (data[job][i].team_id) {
              case id:
                output += `<option class="text-xs" id=${data[job][i].id}>${data[job][i].name}</option>`;
                break;
            }
          }
        }
        option_position.innerHTML = output;

        let position = localStorage.getItem("position");
        if (position) {
          option_position.value = position;
        }
      });
  }

  const val = localStorage.getItem("team");
  if (val !== "თიმი") {
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
  }
};

//filter team positon
function getDataPos(id) {
  fetch(url_position)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let output = `<option id="" class="text-xs" selected>პოზიცია</option>`;
      for (var job in data);
      {
        for (let i = 0; i < data[job].length; i++) {
          positionArray.push(data[job][i]);
          localStorage.setItem("positionArray", JSON.stringify(positionArray));
          switch (data[job][i].team_id) {
            case id:
              output += `<option class="text-xs" id=${data[job][i].id}>${data[job][i].name}</option>`;
              break;
          }
        }
      }
      option_position.innerHTML = output;
    });
}
//change
$(document).ready(function () {
  $("#grid-state").change(function () {
    let change = option_team.value;
    switch (change) {
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
let file;
//data upload

let photo = localStorage.getItem("recent");

//regex
let regexGeorgian = /^[\u10A0-\u10FF]+$/;
let regexEmail = /^([A-Za-z0-9_\-\.])+\@([redberry])+\.(ge)$/;
let regexleptopName = /^[a-zA-Z0-9!@#$%^&*()_+=]*$/;
let regexNumbers = /^\d+$/;
let regexMobile = /^(\+995)(79\d{7}|5\d{8})$/;

const dropArea = document.querySelector(".drag-area");

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  console.log("file is over");
});

dropArea.addEventListener("dragleave", () => {
  console.log("file is outside from dragarea");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  file = e.dataTransfer.files[0];
  let fileType = file.type;
  console.log(file);
  let validExtension = ["image/jpeg", "image/jpg", "image/png"];

  if (validExtension.includes(fileType)) {
    formData.append("laptop_image", e.dataTransfer.files[0]);
    let reader = new FileReader();
    reader.onload = () => {
      uploaded.classList.remove("hidden");
      uploadAgain.classList.add("flex");
      uploadAgain.classList.remove("hidden");
      uploadProblem.classList.add("hidden");
      let fileURL = reader.result;
      document.querySelector(".image").setAttribute("src", fileURL);
    };
    let count = file.size / 1048576;
    count = count.toFixed(2);
    $(".upload-info")
      .html(`<img src="image/done.png" alt="done" class="check"><h4 class="img-name">${file.name},</h4> <p class="mb">${count} mb</p>
        `);
    reader.readAsDataURL(file);
  }
});

$(function () {
  $("#upload").change(function (e) {
    var x = URL.createObjectURL(e.target.files[0]);
    $(".image").attr("src", x);
    uploaded.classList.remove("hidden");
    uploadAgain.classList.add("flex");
    uploadAgain.classList.remove("hidden");
    uploadProblem.classList.add("hidden");

    formData.append("laptop_image", e.target.files[0]);
    let count = e.target.files[0].size / 1048576;
    count = count.toFixed(2);
    $(
      ".upload-info"
    ).html(`<img src="image/done.png" alt="done" class="check"><h4 class="img-name">${e.target.files[0].name},</h4> <p class="mb">${count} mb</p>
        `);
  });
});

var retrieveObject = localStorage.getItem("recent");
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
    $("#grid-position").hasClass("border-gray-200") &&
    $("#phone").hasClass("border-blue-300")
  ) {
    info.classList.add("hidden");
    laptop.classList.remove("hidden");
    laptop.classList.add("flex");
    mobile.classList.add("mb:hidden");
    mobile2.classList.remove("mb:hidden");
    person.classList.remove("text-gray-400");
    person.classList.add("text-gray-700");
    des.classList.remove("text-gray-700");
    des.classList.add("text-gray-400");
    line.classList.add("translate-x-[260px]");
    line.classList.remove("mx-[8px]");
    line.classList.add("-mr-[12px]");
  }
});

getData(
  url_brand,
  "ლეპტოპის ბრენდი",
  option_brand,
  "brandArray",
  brandArray,
  "name"
);
getData(url_cpu, "CPU", option_cpu, "cpuArray", cpuArray, "cpu");

//style error
function error(key1, key2, key3) {
  key1.classList.remove("text-gray-500");
  key1.classList.add("text-red-500");
  key2.classList.remove("border-blue-300");
  key2.classList.add("border-red-500");
  key3.classList.remove("text-black");
  key3.classList.add("text-red-500");
}
//style correct
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
//mobile validaiton
function mobileVal(key1, key2, key3, value) {
  if (value === "") {
    key1.textContent = "სავალდებულოა";
    error(key1, key2, key3, value);
    phoneErrorMobile.textContent = "სავალდებულოა";
    phoneErrorMobile.classList.remove("text-gray-500");
    phoneErrorMobile.classList.add("text-red-500");
  } else if (!regexMobile.test(value)) {
    key1.textContent = "უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს";
    error(key1, key2, key3);
    phoneErrorMobile.textContent = "ქართული მობ-ნომრის ფორმატი";
    phoneErrorMobile.classList.remove("text-gray-500");
    phoneErrorMobile.classList.add("text-red-500");
  } else {
    key1.textContent = "უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს";
    correct(key1, key2, key3);
    phoneErrorMobile.textContent = "ქართული მობ-ნომრის ფორმატი";
    phoneErrorMobile.classList.remove("text-red-500");
    phoneErrorMobile.classList.add("text-gray-500");
  }
}
//back to info page
back2.addEventListener("click", function () {
  info.classList.remove("hidden");
  person.classList.remove("text-gray-700");
  person.classList.add("text-gray-400");
  des.classList.remove("text-gray-400");
  line.classList.remove("translate-x-[260px]");
  line.classList.add("mx-[8px]");
  laptop.classList.add("hidden");
  line.classList.remove("-mr-[12px]");
  laptop.classList.remove("flex");
  mobile.classList.remove("mb:hidden");
  mobile2.classList.add("mb:hidden");
});

done.addEventListener("click", function () {
  //name validation
  laptopNameVal(laptopNameError, laptopName, laptopNameText, laptopName.value);
  //laptop brand validation
  dropDownValidation(option_brand, option_brand.value, "ლეპტოპის ბრენდი");
  //laptop cpu validation
  dropDownValidation(option_cpu, option_cpu.value, "CPU");
  //cores validation
  numberValidation(coresError, cores, coresName, cores.value);
  //threads validaiton
  numberValidation(threadsError, threads, threadsName, threads.value);
  //ram validation
  numberValidation(ramError, ram, ramName, ram.value);
  //storage type validation
  radioValidation(storageName, storageError, "memoryStorage");
  //state type validation
  radioValidation(stateName, stateError, "stateStorage");
  photoValidation();
  //price validation
  numberValidation(priceError, price, priceName, price.value);
  //check all filed
  if (
    $("#laptop-name").hasClass("border-blue-300") &&
    $("#cores").hasClass("border-blue-300") &&
    $("#threads").hasClass("border-blue-300") &&
    $("#grid-cpu").hasClass("border-gray-200") &&
    $("#grid-brand").hasClass("border-gray-200") &&
    $("#ram").hasClass("border-blue-300") &&
    $(".upload-problem").hasClass("border-[#4386A9]") &&
    $(".memory-text").hasClass("text-black") &&
    $(".state-text").hasClass("text-black") &&
    $("#price").hasClass("border-blue-300")
  ) {
    donePage.classList.add("hidden");
    postman.classList.add("hidden");
    popup.classList.add("flex");
    popup.classList.remove("hidden");
    localStorage.clear();
    //post data
    const url = "https://pcfy.redberryinternship.ge/api/laptop/create";

    fetch(url, {
      method: "POST",
      header: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        console.log(text);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
});
//lapotp name validation
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
//photo validation
function photoValidation() {
  if (upload.value === "") {
    uploadError.classList.remove("hidden");
    uploadError.classList.add("mb:relative", "top-48");
    uploadProblem.classList.remove("border-[#4386A9]", "bg-[#F6F6F6]");
    uploadProblem.classList.add("border-[#E52F2F]", "bg-[#FFEDED]");
    uploadText.classList.remove("text-[#4386A9]");
    uploadText.classList.add("text-[#E52F2F]");
  } else if (upload.value !== "") {
    uploadProblem.classList.remove("border-[#E52F2F]", "bg-[#FFEDED]");
    uploadProblem.classList.add("border-[#4386A9]", "bg-[#F6F6F6]");
  }
}
//only number input validation
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
//radio validaiton
function radioValidation(key1, key2, name) {
  if ($(`:input[name=${name}]`).is(":checked") == false) {
    key1.classList.remove("text-black");
    key1.classList.add("text-red-500");
    key2.classList.remove("hidden");
  } else {
    key1.classList.remove("text-red-500");
    key1.classList.add("text-black");
    key2.classList.add("hidden");
  }
}
//home page
home.addEventListener("click", function () {
  location.href = "../index.html";
  localStorage.clear();
});
//list page
table.addEventListener("click", function () {
  location.href = "./list.html";
  localStorage.clear();
});

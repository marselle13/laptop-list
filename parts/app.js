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

//go on add page from landing pageeName
back.addEventListener("click", function () {
  location.href = "../index.html";
});

$(document).on("change", function () {
  saveData("text");
  saveData("date");
  saveData("file");

  $('input[type="radio"]:checked').each(function () {
    let name = $(this).attr("name");
    let value = $(this).val();
    localStorage.setItem(name, value);
  });

  $("select").each(function () {
    let id = $(this).attr("name");
    let value = $(this).val();
    localStorage.setItem(id, value);
  });

  $("#grid-state").each(function () {
    let id = $(this).attr("id");
    let value =
      option_team.options[option_team.selectedIndex].getAttribute("id");
    localStorage.setItem(id, value);
  });

  $("#grid-position").each(function () {
    let id = $(this).attr("id");
    let value =
      option_position.options[option_position.selectedIndex].getAttribute("id");
    localStorage.setItem(id, value);
  });

  $("#grid-brand").each(function () {
    let id = $(this).attr("id");
    let value =
      option_brand.options[option_brand.selectedIndex].getAttribute("id");
    localStorage.setItem(id, value);
    console.log(value);
  });

  function saveData(key) {
    $(`input[type=${key}]`).each(function () {
      let id = $(this).attr("id");
      let value = $(this).val();
      localStorage.setItem(id, value);
    });
  }
});

document.getElementById("grid-position").disabled = true;
const brand = [];

//function for data get
function getData(url1, option, id) {
  fetch(url1)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let output = `<option id="" class="text-xs">${option}</option>`;
      for (var job in data);
      {
        for (let i = 0; i < data[job].length; i++) {
          output += `<option class="text-xs" id=${data[job][i].id}>${data[job][i].name}</option>`;
        }
      }
      id.innerHTML = output;
    });
}

//data for team
getData(url_team, "თიმი", option_team);
let position = [];

//function to get data for position
function getDataPos(id) {
  fetch(url_position)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let output = `<option id="" class="text-xs" >პოზიცია</option>`;
      for (var job in data);
      {
        for (let i = 0; i < data[job].length; i++) {
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

//regex
let regexGeorgian = /^[\u10A0-\u10FF]+$/;
let regexEmail = /^([A-Za-z0-9_\-\.])+\@([redberry])+\.(ge)$/;
let regexleptopName = /^[a-zA-Z0-9!@#$%^&*()_+=]*$/;
let regexNumbers = /^\d+$/;
let regexMobile = /^(\+995)(79\d{7}|5\d{8})$/;

document
  .querySelector('input[type="file"]')
  .addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      localStorage.setItem("upload", reader.result);
    });
    reader.readAsDataURL(this.files[0]);
    const recentImageDataUrl = localStorage.getItem("upload");
    document.querySelector(".image").setAttribute("src", recentImageDataUrl);
    uploaded.classList.remove("hidden");
    uploadAgain.classList.add("flex");
    uploadAgain.classList.remove("hidden");
    uploadProblem.classList.add("hidden");
    localStorage.setItem("fileName", this.files[0].name);
    localStorage.setItem("size", this.files[0].size);
    const fileName = localStorage.getItem("fileName");
    const size = localStorage.getItem("size");
    let count = size / 1048576;
    count = count.toFixed(2);
    $(
      ".upload-info"
    ).html(`<img src="image/done.png" alt="done" class="check"><h4 class="img-name">${fileName},</h4> <p class="mb">${count} mb</p>
        `);
  });

// document.addEventListener("DOMContentLoaded", () => {
//   const recentImageDataUrl = localStorage.getItem("upload");
//   if (recentImageDataUrl) {
//     document.querySelector(".image").setAttribute("src", recentImageDataUrl);
//     uploaded.classList.remove("hidden");
//     uploadAgain.classList.add("flex");
//     uploadAgain.classList.remove("hidden");
//     uploadProblem.classList.add("hidden");
//     const fileName = localStorage.getItem("fileName");
//     const size = localStorage.getItem("size");
//     let count = size / 1048576;
//     count = count.toFixed(2);
//     $(".upload-info")
//       .html(`<img src="image/done.png" alt="done" class="check"><h4 class="img-name">${fileName},</h4> <p class="mb">${count} mb</p>
//       `);
//   }
// });

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
  }
});

getData(url_brand, "ლეპტოპის ბრენდი", option_brand);
getData(url_cpu, "CPU", option_cpu);

document.addEventListener("DOMContentLoaded", () => {
  onLoad("first-name", firstName);
  onLoad("last-name", lastName);
  onLoad("email", email);
  onLoad("phone", phone);
  onLoad("laptop-name", laptopName);
  onLoad("cores", cores);
  onLoad("threads", threads);
  onLoad("ram", ram);
  onLoad("grid-laptop-date", date);
  onLoad("price", price);

  function onLoad(key, value) {
    const Item = localStorage.getItem(`${key}`);
    if (Item) {
      value.value = Item;
    }
  }
  const radio1 = localStorage.getItem("memoryStorage");
  const radio2 = localStorage.getItem("stateStorage");
  const brand = localStorage.getItem("name");

  if (brand === "HP") {
    document.querySelector("#grid-brand").options[2].selected = true;
  }
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

console.log(JSON.parse(localStorage.getItem("name")));

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

  // donePage.classList.add("hidden");
  // postman.classList.add("hidden");
  // popup.classList.add("flex");
  // popup.classList.remove("hidden");
});

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

function photoValidation() {
  if (upload.value === "") {
    uploadError.classList.remove("hidden");
    uploadError.classList.add("mb:relative", "top-48");
    uploadProblem.classList.remove("border-[#4386A9]", "bg-[#F6F6F6]");
    uploadProblem.classList.add("border-[#E52F2F]", "bg-[#FFEDED]");
    uploadText.classList.remove("text-[#4386A9]");
    uploadText.classList.add("text-[#E52F2F]");
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

function radioValidation(key1, key2, name) {
  if ($(`:input[name=${name}]`).is(":checked") == false && $) {
    key1.classList.remove("text-black");
    key1.classList.add("text-red-500");
    key2.classList.remove("hidden");
  } else {
    key1.classList.remove("text-red-500");
    key1.classList.add("text-black");
    key2.classList.add("hidden");
  }
}

home.addEventListener("click", function () {
  location.href = "/index.html";
});

const token = "698a69cb866e5fe9c1c7005ca98e60f2";

fetch("https://pcfy.redberryinternship.ge/api/laptop/create", {
  method: "POST",
  body: JSON.stringify({
    name: localStorage.getItem("first-name"),
    surname: localStorage.getItem("last-name"),
    team_id: localStorage.getItem("grid-state"),
    position_id: localStorage.getItem("grid-position"),
    email: localStorage.getItem("email"),
    phone_number: localStorage.getItem("phone"),
    token: token,
    laptop_name: localStorage.getItem("laptop-name"),
    laptop_image: localStorage.getItem("upload"),
    laptop_brand_id: localStorage.getItem("grid-brand"),
    laptop_cpu: localStorage.getItem("cpu"),
    laptop_cpu_cores: localStorage.getItem("cores"),
    laptop_cpu_threads: localStorage.getItem("threads"),
    laptop_ram: localStorage.getItem("ram"),
    laptop_hard_drive_type: localStorage.getItem("memoryStorage"),
    laptop_state: localStorage.getItem("stateStorage"),
    laptop_price: localStorage.getItem("price"),
  }),
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    console.log(text);
  })
  .catch(function (error) {});

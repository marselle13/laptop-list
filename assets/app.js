"use strict";

const add = document.querySelector(".add");
const list = document.querySelector(".list");

add.addEventListener("click", function () {
  location.href = "./parts/info.html";
});

list.addEventListener("click", function () {
  location.href = "./parts/list.html";
});

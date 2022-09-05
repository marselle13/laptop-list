"use strict";

const more = document.querySelector(".more");
const card = document.querySelector(".card");
const head = document.querySelector(".head");
const back = document.querySelector(".back");

more.addEventListener("click", function () {
  card.classList.add("hidden");
  head.textContent = "ლეპტოპის ინფო";
});

back.addEventListener("click", function () {
  location.href = "../index.html";
});

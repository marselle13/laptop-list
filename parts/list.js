"use strict";

const card = document.querySelector(".card");
const head = document.querySelector(".head");
const back = document.querySelector(".back");
const image = document.querySelector(".image");
const a = document.querySelector(".a");
const b = document.querySelector(".b");
const c = document.querySelector(".c");
const d = document.querySelector(".d");
const e = document.querySelector(".e");

back.addEventListener("click", function () {
  location.href = "../index.html";
});

const laptop =
  "https://pcfy.redberryinternship.ge/api/laptops?token=80bfeec723ba59bb29f47932cad6f79d";

fetch(laptop)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    for (var laptop in data) {
      $(".image").attr(
        "src",
        `https://pcfy.redberryinternship.ge${data[laptop][0].laptop.image}`
      );
      $(".name").text(
        `${data[laptop][0].user.name} ${data[laptop][0].user.surname}`
      );
      $(".name").text(
        `${data[laptop][0].user.name} ${data[laptop][0].user.surname}`
      );
      $(".laptop").text(`${data[laptop][0].laptop.name}`);
    }
  });

const more = document.querySelector(".more");
const listInfo = document.getElementById("list");
const listInfo2 = document.getElementById("info");
more.addEventListener("click", function () {
  listInfo.classList.add("hidden");
  listInfo2.classList.add("flex");
  listInfo2.classList.remove("hidden");
  head.textContent = "ლეპტოპის ინფო";
  const info =
    "https://pcfy.redberryinternship.ge/api/laptop/3211?token=80bfeec723ba59bb29f47932cad6f79d";
  fetch(info)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let output = "";
      for (var info in data) {
        $(".saxeli").text(`${data[info].user.name} ${data[info].user.surname}`);
        $(".nomeri").text(`${data[info].user.phone_number}`);
        $(".emaili").text(`${data[info].user.email}`);
        $(".leptopi").text(`${data[info].laptop.name}`);
        $(".brendi").text(``);
        $(".operatiuli").text(`${data[info].laptop.ram}`);
        $(".mexsiereba").text(`${data[info].laptop.hard_drive_type}`);
        $(".procesori").text(`${data[info].laptop.cpu.name}`);
        $(".birtvi").text(`${data[info].laptop.cpu.cores}`);
        $(".nakadi").text(`${data[info].laptop.cpu.threads}`);
        $(".surati").attr(
          "src",
          `https://pcfy.redberryinternship.ge${data[info].laptop.image}`
        );
        if (data[info].laptop.state === "new") {
          $(".mdgomareoba").text(`ახალი`);
        } else {
          $(".mdgomareoba").text(`მეორადი`);
        }
        $(".pasi").text(`${data[info].laptop.price}₾`);
        if (data[info].laptop.purchase_date === null) {
          $(".shedzena").addClass("hidden");
        } else {
          $(".ricxvi").text(data[info].laptop.purchase_date);
        }
      }
    });
});

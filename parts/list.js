"use strict";

const cardChild = document.querySelector(".card");
const head = document.querySelector(".head");
const back = document.querySelector(".back");
const listInfo = document.getElementById("list");
const listInfo2 = document.getElementById("info");
const listInfo3 = document.getElementById("list-info");

back.addEventListener("click", function () {
  location.href = "../index.html";
});

const laptop =
  "https://pcfy.redberryinternship.ge/api/laptops?token=a3200dd88c7653b2824d783573fe66b5";
let laptopInfo = [];

fetch(laptop)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (var laptop in data) {
      if (data[laptop].length !== 0) {
        listInfo.classList.remove("hidden");
        listInfo.classList.add("flex");
        for (let i = 0; i < data[laptop].length; i++) {
          let card = document.createElement("div");
          card.setAttribute("class", "info");

          let image = document.createElement("img");
          image.setAttribute(
            "src",
            `https://pcfy.redberryinternship.ge${data[laptop][i].laptop.image}`
          );
          image.setAttribute("class", "info-image");
          let nameInfo = document.createElement("div");
          nameInfo.setAttribute("class", "info-div");
          let name = document.createElement("h5");
          name.setAttribute("class", "info-name");

          name.textContent = `${data[laptop][i].user.name} ${data[laptop][i].user.surname}`;
          let infoLaptop = document.createElement("p");
          infoLaptop.setAttribute("class", "info-laptop");
          infoLaptop.textContent = `${data[laptop][i].laptop.name}`;
          let more1 = document.createElement("div");
          more1.setAttribute("class", "more");
          more1.textContent = "მეტის ნახვა";

          card.appendChild(image);
          card.appendChild(nameInfo);
          nameInfo.appendChild(name);
          nameInfo.appendChild(infoLaptop);
          nameInfo.appendChild(more1);

          localStorage.setItem([i], data[laptop][i].laptop.id);

          cardChild.appendChild(card);

          const brands = [
            "",
            "HP",
            "Dell",
            "Microsoft",
            "Apple",
            "Lenovo",
            "Acer",
          ];

          const teams = [
            "",
            "დეველოპერი",
            "HR",
            "გაყიდვები",
            "დიზაინი",
            "მარკეტინგი",
          ];

          const positions = [
            "",
            "ინტერნი",
            "ჯუნიორ დეველოპერი",
            "მიდლ დეველოპერი",
            "სენიორ დეველოპერი",
            "ლიდ დეველოპერი",
            "HR სპეციალისტი",
            "HR პროექტ მენეჯერი",
            "HR ბიზნეს პარტნიორი",
            "ჯუნიორ ბიზნეს დეველოპერი",
            "ბიზნეს დეველოპერი",
            "სენიორ ბიზნეს დეველოპერი",
            "ჯუნიორ UI/UX დიზაინერი",
            "UI/UX დიზაინერი",
            "სენიორ UI/UX დიზაინერი",
            "ბლოგერი",
            "growth მარკეტინგის სპეციალისტი",
            "მარკეტინგის თიმ ლიდი",
          ];

          more1.addEventListener("click", () => {
            listInfo3.classList.add("hidden");
            listInfo2.classList.add("flex");
            listInfo2.classList.remove("hidden");
            head.textContent = "ლეპტოპის ინფო";
            let item = localStorage.getItem([i]);
            const info = `
    https://pcfy.redberryinternship.ge/api/laptop/${item}?token=a3200dd88c7653b2824d783573fe66b5`;
            fetch(info)
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                let output = "";
                for (var info in data) {
                  console.log(data[info].user.team_id);
                  for (let i = 0; i < teams.length; i++) {
                    if (data[info].user.team_id == i) {
                      $(".timi").text(teams[i]);
                    }
                  }
                  console.log(data[info].laptop.purchase_date);

                  for (let i = 0; i < positions.length; i++) {
                    if (data[info].user.position_id == i) {
                      $(".pozicia").text(positions[i]);
                    }
                  }
                  console.log();

                  for (let i = 0; i < brands.length; i++) {
                    if (data[info].laptop.brand_id == i) {
                      $(".brendi").text(brands[i]);
                    }
                  }

                  $(".saxeli").text(
                    `${data[info].user.name} ${data[info].user.surname}`
                  );
                  $(".nomeri").text(`${data[info].user.phone_number}`);
                  $(".emaili").text(`${data[info].user.email}`);
                  $(".leptopi").text(`${data[info].laptop.name}`);
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
        }
      }
    }
  });

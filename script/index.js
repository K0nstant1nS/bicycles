// Извиняюсь за столь ужасный скрипт, но, к сожалению, не успел нормально поправить.
// Месяц выдался трудный
/* P.S. Понимаю, что значительно проще реализовать слайдер при помощи библиотеки,
но на первый раз хочется попробовать написать своими клешнями =)  */

import bicycles from "./bicycle-data.js";
import traces from "./traces-data.js";

const bicycleTypeButtons = document.querySelectorAll(
  ".variable-bicycle__list-elem"
);
const bicycleTypeSelect = document.querySelector(".variable-bicycle__select");
const themeCheckboxes = document.querySelectorAll(
  ".theme-changer__theme-input"
);
const mobileMenu = document.querySelector(".menu__mobile-menu");
const mobileMenuCloseButton = document.querySelector(".menu__close");
const controlButtons = document.querySelectorAll(".variable-track__control");
const variableBicycleElem = document.querySelector(".variable-bicycle");
const bicycleImagesSet = document.querySelector(
  ".variable-bicycle__images-set"
);
const bicycleImageBlocks = document.querySelectorAll(".bicycle-image-block");
const bicyclesLinksBlocks = document.querySelectorAll(
  ".bicycle-image-block__image-container"
);
const slideStatus = document.querySelectorAll(".variable-bicycle__scroll-elem");
const emailFormElement = document.querySelector(".email-form");
const emailInputElement = emailFormElement.querySelector(".email-form__email");
const buttonSubmit = document.querySelector(".email-form__submit-button");
let currentTrace = 0;
let currentBike = 0;

function onDown(e) {
  let initPos = e.clientX;
  let dest = e.clientX;
  function blockOnMove(e) {
    e.target.style.pointerEvents = "none";
  }
  bicyclesLinksBlocks.forEach(function (item) {
    item.addEventListener("pointermove", blockOnMove);
  });
  function onUp(evt) {
    dest = evt.clientX - initPos;
    if (dest < 50 && dest > -50) {
      bicyclesLinksBlocks.forEach(function (item) {
        item.removeEventListener("pointermove", blockOnMove);
        item.style.pointerEvents = "auto";
      });
      variableBicycleElem.removeEventListener("pointerup", onUp);
    } else if (dest <= -50) {
      if (currentBike == 2) {
        variableBicycleElem.removeEventListener("pointerup", onUp);
        return;
      }
      bicycleImagesSet.removeEventListener("pointerdown", onDown);
      let removingBike = bicycleImageBlocks[currentBike];
      currentBike++;
      let newBike = bicycleImageBlocks[currentBike];
      let removingBikeCords = removingBike.getBoundingClientRect();

      newBike.style.opacity = "0";
      newBike.style.display = "flex";
      removingBike.style.top = "0";
      removingBike.style.left = removingBikeCords.left + "px";
      removingBike.style.width = removingBikeCords.width + "px";
      removingBike.style.height = removingBikeCords.height + "px";

      removingBike.style.position = "absolute";

      setTimeout(function () {
        removingBike.style.left = -window.innerWidth + "px";
      }, 1);

      setTimeout(function () {
        newBike.style.opacity = "1";
        document
          .querySelector(".variable-bicycle__scroll-elem_active")
          .classList.remove("variable-bicycle__scroll-elem_active");
        slideStatus[currentBike].classList.add(
          "variable-bicycle__scroll-elem_active"
        );
        bicyclesLinksBlocks.forEach(function (item) {
          item.removeEventListener("pointermove", blockOnMove);
          item.style.pointerEvents = "auto";
        });
      }, 300);

      setTimeout(function () {
        removingBike.style = " ";
        removingBike.style.display = "none";
        bicycleImagesSet.addEventListener("pointerdown", onDown);
      }, 800);

      variableBicycleElem.removeEventListener("pointerup", onUp);
    } else {
      if (currentBike == 0) {
        variableBicycleElem.removeEventListener("pointerup", onUp);
        return;
      }
      bicycleImagesSet.removeEventListener("pointerdown", onDown);
      let removingBike = bicycleImageBlocks[currentBike];
      currentBike--;
      let newBike = bicycleImageBlocks[currentBike];
      let removingBikeCords = removingBike.getBoundingClientRect();

      newBike.style.opacity = "0";
      newBike.style.display = "flex";
      removingBike.style.top = "0";
      removingBike.style.left = removingBikeCords.left + "px";
      removingBike.style.width = removingBikeCords.width + "px";
      removingBike.style.height = removingBikeCords.height + "px";

      removingBike.style.position = "absolute";

      setTimeout(function () {
        removingBike.style.left = window.innerWidth + "px";
      }, 1);

      setTimeout(function () {
        newBike.style.opacity = "1";
        document
          .querySelector(".variable-bicycle__scroll-elem_active")
          .classList.remove("variable-bicycle__scroll-elem_active");
        slideStatus[currentBike].classList.add(
          "variable-bicycle__scroll-elem_active"
        );
        bicyclesLinksBlocks.forEach(function (item) {
          item.removeEventListener("pointermove", blockOnMove);
          item.style.pointerEvents = "auto";
        });
      }, 300);

      setTimeout(function () {
        removingBike.style = " ";
        removingBike.style.display = "none";
        bicycleImagesSet.addEventListener("pointerdown", onDown);
      }, 800);

      variableBicycleElem.removeEventListener("pointerup", onUp);
    }
  }
  variableBicycleElem.addEventListener("pointerup", onUp);
  setTimeout(() => {
    variableBicycleElem.removeEventListener("pointerup", onUp);
    bicyclesLinksBlocks.forEach(function (item) {
      item.removeEventListener("pointermove", blockOnMove);
      item.style.pointerEvents = "auto";
    });
  }, 250);
}

function changeTrack(item) {
  item.addEventListener("click", function () {
    let direction = item.dataset.direction;
    currentTrace = currentTrace + +direction;
    if (currentTrace >= traces.length) {
      currentTrace = 0;
    }
    if (currentTrace < 0) {
      currentTrace = 2;
    }
    let newtraceObj = traces[currentTrace];

    let traceElement = document
      .querySelector(".variable-track")
      .cloneNode(true);
    traceElement.style.opacity = "0";

    const trackTitleElem = traceElement.querySelector(".variable-track__title");
    const trackImageElements = traceElement.querySelectorAll(
      ".variable-track__images-set > img"
    );
    const trackAboutElem = traceElement.querySelector(".variable-track__about");
    const trackControlButtons = traceElement.querySelectorAll(
      ".variable-track__control"
    );

    trackTitleElem.textContent = newtraceObj.name;
    trackAboutElem.textContent = newtraceObj.about;
    let elemCords = document
      .querySelector(".variable-track")
      .getBoundingClientRect();

    for (let i = 0; i < trackImageElements.length; i++) {
      trackImageElements[i].src = newtraceObj.traceIages[i];
      trackImageElements[i].alt = newtraceObj.alts[i];
    }

    document.querySelector(".variable-track").style.top =
      pageYOffset + elemCords.top + "px";
    document.querySelector(".variable-track").style.left =
      elemCords.left + "px";

    document.querySelector(".variable-track").style.position = "absolute";
    document.querySelector(".variable-track").after(traceElement);
    if (direction == 1) {
      setTimeout(function () {
        document.querySelector(".variable-track").style.left =
          -elemCords.width * 1.2 + "px";
      }, 1);
    }

    if (direction == -1) {
      setTimeout(function () {
        document.querySelector(".variable-track").style.left =
          elemCords.width * 1.3 + "px";
      }, 1);
    }

    setTimeout(function () {
      traceElement.style.opacity = "1";
    }, 300);

    setTimeout(function () {
      document
        .querySelector(".main")
        .removeChild(document.querySelector("#track"));
      trackControlButtons.forEach(changeTrack);
    }, 800);
  });
}

themeCheckboxes.forEach(function (item) {
  item.addEventListener("change", function () {
    const darkThemed = document.querySelectorAll("[data-theme]");
    darkThemed.forEach(function (item) {
      item.classList.toggle(item.dataset.theme);
    });
    document
      .querySelectorAll(".variable-track__control-img")
      .forEach(function (item) {
        let current = item.src;
        item.src = item.dataset.darkpath;
        item.dataset.darkpath = current;
      });
  });
});

mobileMenu.addEventListener("click", function () {
  document
    .querySelector(".menu__mobile-popup")
    .classList.add("menu__mobile-popup_opened");
});

mobileMenuCloseButton.addEventListener("click", function () {
  document
    .querySelector(".menu__mobile-popup")
    .classList.remove("menu__mobile-popup_opened");
});

bicycleTypeButtons.forEach(function (item) {
  item.addEventListener("click", function () {
    const currentObj = bicycles.bicycles[item.dataset.btarget];
    const imgBlocks = document.querySelectorAll(".bicycle-image-block");
    const imgs = document.querySelectorAll(".bicycle-image-block__image");
    let i = 0;
    document
      .querySelector(".variable-bicycle__list-elem_active")
      .classList.remove("variable-bicycle__list-elem_active");
    item.classList.add("variable-bicycle__list-elem_active");
    for (let key in currentObj.bike) {
      imgBlocks[i].querySelector(".bicycle-image-block__image").src =
        currentObj.bike[key];
      imgBlocks[i].querySelector(
        ".bicycle-image-block__image-caption"
      ).textContent = key;
      i++;
    }

    for (let i = 0; i < imgs.length; i++) {
      imgs[i].alt = currentObj.alts[i];
    }

    for (let i = 0; i < bicyclesLinksBlocks.length; i++) {
      bicyclesLinksBlocks[i].href = currentObj.hrefs[i];
    }
  });
});

bicycleTypeSelect.addEventListener("change", function () {
  const name = this.value;
  const currentObj = bicycles.bicycles[name];
  const imgBlocks = document.querySelectorAll(".bicycle-image-block");
  const imgs = document.querySelectorAll(".bicycle-image-block__image");
  let i = 0;
  document
    .querySelector(".variable-bicycle__list-elem_active")
    .classList.remove("variable-bicycle__list-elem_active");
  document
    .querySelector(`[data-btarget="${name}"]`)
    .classList.add("variable-bicycle__list-elem_active");
  for (let key in currentObj.bike) {
    imgBlocks[i].querySelector(".bicycle-image-block__image").src =
      currentObj.bike[key];
    imgBlocks[i].querySelector(
      ".bicycle-image-block__image-caption"
    ).textContent = key;
    i++;
  }
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].alt = currentObj.alts[i];
  }
  for (let i = 0; i < bicyclesLinksBlocks.length; i++) {
    bicyclesLinksBlocks[i].href = currentObj.hrefs[i];
  }
});

controlButtons.forEach(changeTrack);

bicycleImagesSet.addEventListener("pointerdown", function (e) {
  e.preventDefault();
});

bicycleImagesSet.addEventListener("pointerdown", onDown);

window.addEventListener("resize", function () {
  if (this.window.innerWidth > 640) {
    bicycleImageBlocks.forEach(function (item) {
      item.style = " ";
    });

    bicycleImagesSet.removeEventListener("pointerdown", onDown);
  }
  if (this.window.innerWidth <= 640) {
    bicycleImagesSet.addEventListener("pointerdown", onDown);
  }
});

emailInputElement.addEventListener("focus", function () {
  buttonSubmit.style.display = "block";
  emailFormElement.addEventListener("submit", function (e) {
    e.preventDefault();
    emailInputElement.value = "Круто!";
    buttonSubmit.style.display = "none";
  });
});

document.addEventListener("click", function (e) {
  if (e.target !== emailInputElement) {
    buttonSubmit.style.display = "none";
  }
});

document
  .querySelectorAll(".variable-bicycle__scroll-elem")
  .forEach(function (item) {
    item.addEventListener("click", function (e) {
      currentBike = item.dataset.scollnumber;
      const currentBikeNumber = document.querySelector(
        ".variable-bicycle__scroll-elem_active"
      ).dataset.scollnumber;
      document
        .querySelector(".variable-bicycle__scroll-elem_active")
        .classList.remove("variable-bicycle__scroll-elem_active");
      item.classList.add("variable-bicycle__scroll-elem_active");
      bicycleImageBlocks[currentBikeNumber].style.display = "none";
      bicycleImageBlocks[currentBike].style.display = "flex";
    });
  });

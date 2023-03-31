let countDOMElement = document.getElementById("count");
let count = parseInt(countDOMElement.innerText);

function Show(domButtonElement) {
  const button = document.getElementById(domButtonElement);
  const buttonId = button.id;

  const repaint = () => {
    countDOMElement.innerText = count.toString();
  };

  const increase = () => {
    count++;
    console.log(count);
    repaint();
  };
  const decrease = () => {
    count--;
    console.log(count);
    repaint();
  };

  // this.increase = function () {
  //   count++;
  //   console.log(count);
  //   this.repaint();
  // };

  // this.decrease = function () {
  //   count--;
  //   console.log(count);
  //   this.repaint();
  // };
  switch (buttonId) {
    case "increase":
      button.addEventListener("click", increase);
      // button.addEventListener("click", () => this.increase());
      break;
    case "decrease":
      button.addEventListener("click", decrease);
      // button.addEventListener("click", () => this.decrease());
      break;
  }
}

// Show.prototype.repaint = function () {
//   countDOMElement.innerText = count.toString();
// };

const increaseBtn = new Show("increase");
const decreaseBtn = new Show("decrease");

//
//
//
//

const boxesContainerCoords = document
  .querySelector(".boxesContainer")
  .getBoundingClientRect();

let box1Coords = document.querySelector(".box1").getBoundingClientRect();
let box2Coords = document.querySelector(".box2").getBoundingClientRect();
let box3Coords = document.querySelector(".box3").getBoundingClientRect();
let box4Coords = document.querySelector(".box4").getBoundingClientRect();

const topDistanceSpan = document.querySelector(".topDistance");

const leftDistanceSpan = document.querySelector(".leftDistance");

const element = document.querySelector(".dragableDivContainer");

function updateDraggableDivPosition(x, y) {
  element.style.left = x;
  element.style.top = y;
  leftDistanceSpan.textContent = x;
  topDistanceSpan.textContent = y;
  element.style.width = box1Coords.width + "px";
}

updateDraggableDivPosition(
  box1Coords.left + "px",
  box1Coords.top - boxesContainerCoords.top + "px"
);

function updateBoxesOpacity() {
  document.querySelectorAll(".box").forEach((box) => (box.style.opacity = "1"));
}

function MoveDiv(DOMElement) {
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let newX;
  let newY;

  DOMElement.addEventListener("mousedown", handleMouseDown);
  DOMElement.addEventListener("mousemove", handleMouseMove);
  DOMElement.addEventListener("mouseup", handleMouseUp);

  let dragableDivContainerCoords;

  function handleMouseDown(event) {
    dragableDivContainerCoords = DOMElement.getBoundingClientRect();
    isDragging = true;

    dragOffsetX = event.clientX - dragableDivContainerCoords.left;

    dragOffsetY =
      event.clientY - dragableDivContainerCoords.top + boxesContainerCoords.top;
  }

  function handleMouseMove(event) {
    if (isDragging) {
      newX = event.clientX - dragOffsetX;
      newY = event.clientY - dragOffsetY;
      element.style.opacity = "0.5";

      updateBoxesOpacity();

      if (newX <= box1Coords.left + dragableDivContainerCoords.width / 2) {
        if (newY <= 100) {
          document.querySelector(".box1").style.opacity = "0.5";
          leftDistanceSpan.style.color = "black";
          topDistanceSpan.style.color = "black";
        } else {
          document.querySelector(".box3").style.opacity = "0.5";
          topDistanceSpan.style.color = "white";
          leftDistanceSpan.style.color = "black";
        }
      } else {
        if (newY <= 100) {
          document.querySelector(".box2").style.opacity = "0.5";
          topDistanceSpan.style.color = "black";
          leftDistanceSpan.style.color = "white";
        } else {
          document.querySelector(".box4").style.opacity = "0.5";
          topDistanceSpan.style.color = "white";
          leftDistanceSpan.style.color = "white";
        }
      }

      if (newX + dragableDivContainerCoords.width < box1Coords.left) {
        handleMouseUp();
        return;
      }
      if (newX > box2Coords.left + dragableDivContainerCoords.width) {
        handleMouseUp();
        return;
      }
      if (newY < -200 || newY > 400) {
        handleMouseUp();
        return;
      }

      DOMElement.style.left = newX + "px";
      DOMElement.style.top = newY + "px";
      leftDistanceSpan.textContent = newX;
      topDistanceSpan.textContent = newY;
    }
  }

  function handleMouseUp(event) {
    if (newX <= box1Coords.left + dragableDivContainerCoords.width / 2) {
      if (newY <= 100) {
        updateDraggableDivPosition(
          box1Coords.left + "px",
          box1Coords.top - boxesContainerCoords.top + "px"
        );
      } else {
        updateDraggableDivPosition(
          box3Coords.left + "px",
          box3Coords.top - boxesContainerCoords.top + "px"
        );
      }
    } else {
      if (newY <= 100) {
        updateDraggableDivPosition(
          box2Coords.left + "px",
          box2Coords.top - boxesContainerCoords.top + "px"
        );
      } else {
        updateDraggableDivPosition(
          box4Coords.left + "px",
          box4Coords.top - boxesContainerCoords.top + "px"
        );
      }
    }

    element.style.opacity = "1";
    isDragging = false;
  }
}

const dragableDivContainer = new MoveDiv(element);

window.addEventListener("resize", function (event) {
  box1Coords = document.querySelector(".box1").getBoundingClientRect();
  box2Coords = document.querySelector(".box2").getBoundingClientRect();
  box3Coords = document.querySelector(".box3").getBoundingClientRect();
  box4Coords = document.querySelector(".box4").getBoundingClientRect();
  updateDraggableDivPosition(
    box1Coords.left + "px",
    box1Coords.top - boxesContainerCoords.top + "px"
  );
});

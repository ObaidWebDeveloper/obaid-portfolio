// Buttons aur scrolling container ko select karna
const box = document.querySelector(".images");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
let btns = false;
let start;

if (box) {
  const scrollAmount = box.querySelector("img").offsetWidth;
  
  rightBtn.addEventListener("click", () => {
    box.scrollBy({ left: scrollAmount, behavior: "smooth" });
    btns = true;
    stAutoScroll();
  });

  leftBtn.addEventListener("click", () => {
    box.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    btns = true;
    stAutoScroll();
  });

  box.onmouseover = () => {
    btns = true;
  }

  box.onmouseout = () => {
    stAutoScroll();
  }

  box.addEventListener("scroll", function () {
    const h = box.scrollWidth;
    const x = box.scrollLeft;

    if (x > 0) {
      leftBtn.classList.remove("hidden");
    } else {
      leftBtn.classList.add("hidden");
    }

    if (x >= h - 200) {
      rightBtn.classList.add("hidden");
    } else {
      rightBtn.classList.remove("hidden");
    }
  });

  function autoScroll() {
    const auto = setInterval(() => {
      console.clear();

      const h = box.scrollWidth - 400;
      const x = box.scrollLeft;

      console.log(h, x, { stop: btns });

      if (btns) {
        clearInterval(auto);
      } else {
        if (x <= h) {
          box.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }

        if (x == h) {
          box.scrollBy({ left: -(h), behavior: "smooth" });
        }
      }
    }, 1000);
  }
  autoScroll();

  function stAutoScroll() {
    clearTimeout(start); // Clear previous timeout
    start = setTimeout(() => {
      btns = false;
      autoScroll();
    }, 1000);
  }
}
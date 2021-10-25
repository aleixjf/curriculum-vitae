/* Customizable setting */
const partiallyVisibleThreshold = 0.25; //0..1 %on which a section will be considered "visible"/"focused"
const visibleThreshold = 1; //0.75; //0..1 %on which a section will be considered "visible"/"focused"
const intersectionOptions = {
  /* Thresholds:
    -0: enters/leave the visible area
    -0.X: the % is visible/hidden
    -1: The content is fully visible
    When any of the thresholds occurs, the callback function will be invoked.
  */
  threshold: [
    0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65,
    0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1,
  ],
  //threshold: [0, 0.25, 0.5, 0.75, 1],
  //threshold: [0, 1],
  rootMargin: "0px 0px 0px 0px",
};

/* Select the HTML elements */
let sections = document.querySelectorAll(".cv-section");
let links = document.querySelectorAll("#menu a");

/* Intersector */
function activateNavByIndex(index) {
  if (sections[index].classList.contains("active")) return;

  const currentActive = document.querySelectorAll("#menu .active");
  for (let i = currentActive.length - 1; i >= 0; i--) {
    currentActive[i].classList.remove("active");
  }
  links[index]?.classList.add("active");
}

const intersectionCallback = (entries, observer) => {
  //Class states
  entries.forEach((entry) => {
    // Each entry describes an intersection change for one observed
    // target element:
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting //same as intersectionRatio  > 0 --> "is on screen"
    //   entry.rootBounds
    //   entry.target
    //   entry.time

    //On screen
    if (entry.isIntersecting) {
      //Fully visible
      if (entry.intersectionRatio >= visibleThreshold) {
        links[Array.from(sections).indexOf(entry.target)]?.classList.add(
          "fully-visible"
        );
        links[Array.from(sections).indexOf(entry.target)]?.classList.remove(
          "partially-visible"
        );
      }
      //Partially visible (visible enough)
      else if (entry.intersectionRatio > partiallyVisibleThreshold) {
        links[Array.from(sections).indexOf(entry.target)]?.classList.remove(
          "fully-visible"
        );
        links[Array.from(sections).indexOf(entry.target)]?.classList.add(
          "partially-visible"
        );
      }
      //Partially visible (NOT visible enough)
      else {
        links[Array.from(sections).indexOf(entry.target)]?.classList.remove(
          "partially-visible",
          "fully-visible"
        );
      }
    }
    //Hidden
    else {
      links[Array.from(sections).indexOf(entry.target)]?.classList.remove(
        "partially-visible",
        "fully-visible"
      );
    }
  });

  menu.querySelector(".active")?.classList.remove("active");
  let partialCount = document.querySelectorAll(".partially-visible")?.length;
  let fullyCount = document.querySelectorAll(".fully-visible")?.length;

  // Simple approach --> item on top of the screen is active
  if (fullyCount == 0) {
    document.querySelectorAll(".partially-visible")[0]?.classList.add("active");
  } else if (partialCount == 0) {
    document.querySelectorAll(".fully-visible")[0]?.classList.add("active");
  } else if (
    document.querySelectorAll(".partially-visible")[0].offsetTop <
    document.querySelectorAll(".fully-visible")[0].offsetTop
  ) {
    document.querySelectorAll(".partially-visible")[0]?.classList.add("active");
  } else {
    document.querySelectorAll(".fully-visible")[0]?.classList.add("active");
  }

  /*
  // Complex approach

  //Top direction
  if (scrollDirection == "top") {
    if (partialCount > 1) {
      if (fullyCount > 0) {
        document.querySelectorAll(".fully-visible")[0]?.classList.add("active");
      } else {
        document
          .querySelectorAll(".partially-visible")[0]
          ?.classList.add("active");
      }
    } else if (partialCount == 1) {
      if (fullyCount > 0) {
        //check if partial is on top of fully or otherwise
        if (
          document.querySelectorAll(".partially-visible")[0].offsetTop >
          document.querySelectorAll(".fully-visible")[fullyCount - 1].offsetTop
        ) {
          document
            .querySelectorAll(".partially-visible")[0]
            ?.classList.add("active");
        } else {
          document
            .querySelectorAll(".fully-visible")[0]
            ?.classList.add("active");
        }
      } else {
        document
          .querySelectorAll(".partially-visible")[0]
          ?.classList.add("active");
      }
    } else if (fullyCount > 0)
      document.querySelectorAll(".fully-visible")[0]?.classList.add("active");
  }
  //Bottom direction
  else {
    if (partialCount > 1) {
      if (fullyCount > 0) {
        document
          .querySelectorAll(".fully-visible")
          [fullyCount - 1]?.classList.add("active");
      } else {
        document
          .querySelectorAll(".partially-visible")
          [partialCount - 1]?.classList.add("active");
      }
    } else if (partialCount == 1) {
      if (fullyCount > 0) {
        //check if partial is on top of fully or otherwise
        if (
          document.querySelectorAll(".partially-visible")[0].offsetTop <
          document.querySelectorAll(".fully-visible")[fullyCount - 1].offsetTop
        ) {
          document
            .querySelectorAll(".partially-visible")[0]
            ?.classList.add("active");
        } else {
          document
            .querySelectorAll(".fully-visible")
            [fullyCount - 1]?.classList.add("active");
        }
      } else {
        document
          .querySelectorAll(".partially-visible")[0]
          ?.classList.add("active");
      }
    } else if (fullyCount > 0)
      document
        .querySelectorAll(".fully-visible")
        [fullyCount - 1]?.classList.add("active");
  }
  */
};

const intersectionObserver = new IntersectionObserver(
  intersectionCallback,
  intersectionOptions
);

/* Window event listenners to trigger the functions */
for (let i = 0; i < sections.length; i++) {
  intersectionObserver.observe(sections[i]);
}

//When on bottom, give the last section the "active" class
window.addEventListener(
  "scroll",
  function () {
    if (
      window.innerHeight + Math.ceil(window.pageYOffset) >=
      document.body.offsetHeight
    ) {
      menu.querySelector(".active")?.classList.remove("active");
      links[links.length - 1].classList.add("active");
    }
  },
  false
);

//Detect scroll-direction
var lastScrollTop = 0;
let scrollDirection = "bottom";
window.addEventListener(
  "scroll",
  function () {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      scrollDirection = "bottom";
    } else {
      console.log("Bottom");
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  },
  false
);

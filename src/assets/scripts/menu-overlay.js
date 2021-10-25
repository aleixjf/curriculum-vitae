/* Customizable setting */
const headerOffset = 50; //in pixels

/* Viewport dimensions */
let vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
let vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);

/* Select the HTML elements */
let menu = document.getElementById("menu");
let icon = document.getElementById("menu-icon");
let links = document.querySelectorAll("#menu a");
let sections = document.querySelectorAll(".cv-section");

function toggleMenu() {
  console.log("INFO: Click on menu icon registered");

  /* Toggle the "expanded" class on the HTML elements */
  menu.classList.toggle("expanded"); // So that the menu overlay slides in/out
  icon.classList.toggle("expanded"); // So that the SVG animation is triggered
  //icon.setAttribute("aria-expanded", icon.classList.contains("expanded"));

  if (menu.classList.contains("expanded")) {
    console.log("INFO: Menu expanded");
    /* Header expands to fit overlay content, moves background up/down */
    //menu.style.height = "100%";
    //menu.style.maxHeight = "100%";
    //menu.style.display = "block";
    //menu.style.visibility = "visible";
    //menu.style.opacity = "1";
    /* Header that expands to full-screen --> .style.minHeight = "100vh"; */
  } else {
    console.log("INFO: Menu hidden");
    //menu.style.height = "0";
    //menu.style.maxHeight = "0";
    //menu.style.visibility = "hidden";
    //menu.style.opacity = "0";
    //menu.style.display = "none";
  }
}

/* We can't use position: "sticky" because it moves
the content below it when it's in mobile mode,
and it ctreates a white space when in desktop mode */
function placeMenu() {
  if (this.scrollY > vh && !menu.classList.contains("sticky")) {
    menu.classList.add("sticky");
    console.log("INFO: Navigation Menu is now 'sticky'");
  } else if (this.scrollY <= vh && menu.classList.contains("sticky")) {
    menu.classList.remove("sticky");
    console.log("INFO: Navigation Menu is now fixed");
  }
}

function scrollSpy() {
  var scrollPosition =
    document.documentElement.scrollTop || document.body.scrollTop;

  var ids = {};
  Array.prototype.forEach.call(sections, function (e) {
    ids[e.id] = e.offsetTop;
  });

  for (id in ids) {
    if (ids[id] <= scrollPosition) {
      menu.querySelector(".active")?.classList.remove("active");
      menu.querySelector("a[href*=" + id + "]")?.classList.add("active");
    }
  }
}

/*
var smoothScroll = function (elementId) {
  var MIN_PIXELS_PER_STEP = 16;
  var MAX_SCROLL_STEPS = 30;
  var target = document.getElementById(elementId);
  var scrollContainer = target;
  do {
    scrollContainer = scrollContainer.parentNode;
    if (!scrollContainer) return;
    scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);

  var targetY = 0;
  do {
    if (target == scrollContainer) break;
    targetY += target.offsetTop;
  } while ((target = target.offsetParent));

  var pixelsPerStep = Math.max(
    MIN_PIXELS_PER_STEP,
    (targetY - scrollContainer.scrollTop) / MAX_SCROLL_STEPS
  );

  var stepFunc = function () {
    scrollContainer.scrollTop = Math.min(
      targetY,
      pixelsPerStep + scrollContainer.scrollTop
    );

    if (scrollContainer.scrollTop >= targetY) {
      return;
    }

    window.requestAnimationFrame(stepFunc);
  };

  window.requestAnimationFrame(stepFunc);
};
*/

for (const link of links) {
  link.addEventListener("click", clickHandler);
}

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop - headerOffset;

  scroll({
    top: offsetTop,
    behavior: "smooth",
  });
}

/* Menu click events */
links.forEach((link) => {
  link.onclick = () => {
    menu.classList.add("no-transition");
    toggleMenu();
    menu.classList.remove("no-transition");
    setTimeout(() => {
      links.forEach((a) => a.classList.remove("active"));
      link.classList.add("active");
    }, 250);
  };
});

/* Window event listenners to trigger the functions */
window.addEventListener("scroll", function () {
  console.log("INFO: Scroll registered");
  //scrollspy() /* We will use the Intersection Observer API instead of Scrollspy */
  placeMenu();
});

window.addEventListener("resize", function () {
  console.log("INFO: Resize registered");
  vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  //scrollspy() /* We will use the Intersection Observer API instead of Scrollspy */
  placeMenu();
});

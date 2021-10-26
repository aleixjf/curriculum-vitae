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
let header = document.getElementsByTagName("header")[0];
let menu = document.getElementById("menu");
let icon = document.getElementById("menu-icon");
let links = document.querySelectorAll("#menu a");
let sections = document.querySelectorAll(".cv-section");
let logo = document.getElementById("logo");
let scrollIndicator = document.getElementById("scroll-indicator");

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

function scrollTop(e) {
  e.preventDefault();

  if (menu.classList.contains("expanded")) toggleMenu();

  scroll({
    top: 0,
    behavior: "smooth",
  });  
}

function scrollDown(e) {
  console.log("Clicked, it should scroll")
  e.preventDefault();

  const headerOffset = header.style.display == "none" ? header.offsetTop : header.offsetHeight;
  const offsetTop = sections[0].offsetTop - headerOffset;

  scroll({
    top: offsetTop,
    behavior: "smooth",
  });  
}

function smoothScroll(e) {
  e.preventDefault();
  const headerOffset = header.style.display == "none" ? header.offsetTop : header.offsetHeight;
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop - headerOffset;

  if (header.style.display != "none") menu.classList.add("no-transition");
  toggleMenu();

  scroll({
    top: offsetTop,
    behavior: "smooth",
  });
  
  menu.classList.remove("no-transition");
  links.forEach((link) => link.classList.remove("active"));
  this.classList.add("active");
}

/* Click events */

logo.addEventListener("click", scrollTop)
scrollIndicator.addEventListener("click", scrollDown);
//addEventListener("click", scrollDown)

for (const link of links) {
  link.addEventListener("click", smoothScroll);
}


/* Window events */

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

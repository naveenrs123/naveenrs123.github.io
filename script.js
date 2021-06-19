/* GLOBALS */
var isSidebarOpen = false;
var above900 = window.innerWidth >= 900;
var overlay = document.getElementById("overlay");
var main = document.querySelector("main");
var sidebar = document.getElementById("sidebar");
var links = document.getElementById("sidebar-links")

$(document).ready(function () {
    // enables bootstrap tooltips
    $('[data-toggle="tooltip"]').tooltip({ boundary: 'window' });

    // makes sure that sidebar margins are correct on initial load, regardless of viewport size.
    if (window.innerWidth >= 900) {
        showNav();
        main.style.marginLeft = "200px";
    } else {
        hideNav();
        main.style.marginLeft = "0";
    }

    // enables smooth scrolling to section when clicking navigation links.
    $(".nav-link").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $('html, body').animate({ scrollTop: $(hash).offset().top }, 500);
        }
      });
});

// Updates icon when toggling collapsed state of about section links.
document.querySelectorAll(".about-title a").forEach(element => {
    element.addEventListener("click", event => {
        var clicked = event.currentTarget;
        var existingText = clicked.innerHTML;
        var isCollapsed = existingText[0] == "▸";
        clicked.innerHTML = (isCollapsed ? "▾" : "▸") + existingText.slice(1);
        document.querySelectorAll(".about-title a").forEach(el => {
            if (el.innerHTML[0] == "▾" && el != clicked) {
                el.innerHTML = "▸" + el.innerHTML.slice(1);
            }
        })
    });
});

function showNav() {
    sidebar.style.width = window.innerWidth > 900 ? "200px" : "160px";
    links.style.display = "flex";
}

function hideNav() {
    sidebar.style.width = "0";
    links.style.display = "none";
}

// function to toggle navigation bar (only used for small screens)
function toggleNav() {
    var sidebarWidth = sidebar.style.width;
    if (sidebarWidth == "0px" || sidebarWidth == "") {
        showNav();
        overlay.style.opacity = "0.6";  
        overlay.style.zIndex = 1;
    } else {
        hideNav();
        overlay.style.opacity = "0";
        overlay.style.zIndex = -1;
    }
}

// event listener to handle correct sidebar behaviour when resizing.
window.addEventListener("resize", () => {
    if (window.innerWidth >= 900 && !above900) {
        showNav();
        main.style.marginLeft = "200px";
        overlay.style.opacity = "0";
        overlay.style.zIndex = -1;
        above900 = true;
        isSidebarOpen = false;
    } else if (window.innerWidth < 900 && above900) {
        hideNav();
        main.style.marginLeft = "0";
        above900 = false;
    }
})

// helper to detect click outside of sidebar.
function outsideClick(event)	{
    var nav = document.querySelector("nav");
    var clickedOut = true;
    if (event.target == nav || nav.contains(event.target)) clickedOut = false;
    return clickedOut;
}

// listener to handle sidebar closing when clicking outside the element.
window.addEventListener("click", (event) => {
    if (outsideClick(event) && overlay.style.opacity == "0.6") {
        if (isSidebarOpen) {
            hideNav();
            overlay.style.opacity = "0";
            overlay.style.zIndex = -1;
            isSidebarOpen = false;
        } else {
            isSidebarOpen = true;
        }
    } else if (overlay.style.opacity == "0.6") {
        isSidebarOpen = true;
    } else {
        isSidebarOpen = false;
    }
});
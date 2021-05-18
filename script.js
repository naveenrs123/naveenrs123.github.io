/* GLOBALS */
var isSidebarOpen = false;
var above900 = window.innerWidth >= 900;
var overlay = document.getElementById("overlay");
var main = document.querySelector("main");
var sidebar = document.getElementById("sidebar");
var links = document.getElementById("sidebar-links")

// enables bootstrap tooltips and makes sure that sidebar margins are correct on
// initial load, regardless of viewport size.
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip({ boundary: 'window' });
    if (window.innerWidth >= 900) {
        openNav();
        document.querySelector("main").style.marginRight = "220px";
    } else {
        closeNav();
        document.querySelector("main").style.marginRight = "0";
    }

    $("a").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 500);
  
        } // End if
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

function openNav(noTransition) {
    sidebar.style.width = "220px";
    links.style.display = "flex";
}

function closeNav(noTransition) {
    sidebar.style.width = "0";
    links.style.display = "none";
}

function toggleNav() {
    var sidebarWidth = document.getElementById("sidebar").style.width;
    if (sidebarWidth == "0px" || sidebarWidth == "") {
        openNav();
        overlay.style.opacity = "0.6";  
        overlay.style.zIndex = 1;
    } else {
        closeNav();
        overlay.style.opacity = "0";
        overlay.style.zIndex = -1;
    }
}

window.addEventListener("resize", () => {
    if (window.innerWidth >= 900 && !above900) {
        openNav();
        main.style.marginRight = "220px";
        overlay.style.opacity = "0";
        overlay.style.zIndex = -1;
        above900 = true;
        isSidebarOpen = false;
    } else if (window.innerWidth < 900 && above900) {
        closeNav();
        main.style.marginRight = "0";
        above900 = false;
    }
})

// Makes sure that the sidebar collapses when clicking outside it. 
function outsideClick(event)	{
    notelem = document.querySelector("nav")
    var clickedOut = true;
    if (event.target == notelem || notelem.contains(event.target)) {
        clickedOut = false;
    }
    return clickedOut;
}


function clickOut(event) {
    if (outsideClick(event) && document.getElementById("overlay").style.opacity == "0.6") {
        if (isSidebarOpen) {
            closeNav();
            overlay.style.opacity = "0";
            overlay.style.zIndex = -1;
            isSidebarOpen = false;
        } else {
            isSidebarOpen = true;
        }
    } else if (document.getElementById("overlay").style.opacity == "0.6") {
        isSidebarOpen = true;
    } else {
        isSidebarOpen = false;
    }
}

window.addEventListener("click", clickOut);
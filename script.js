$(document).ready(function(){
    $("select").change(function(){
        $(this).find("option:selected").each(function(){
            var optionValue = $(this).attr("value");
            if(optionValue){
                var active = "." + optionValue;
                $(".collapsible-content").not(active).hide();
                $(active).animate({
                  height: "toggle"
                }, 800, function() {
                });

            } else{
                $(".collapsible-content").hide();
            }
        });
    }).change();

    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
        // Store hash
        var hash = this.hash;
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        if ($(window).width() > 900) {
          $('html, body').animate({
            scrollTop: $(hash).offset().top - 90
          }, 800);
        } else if ($(window).width() > 400) {
          $('html, body').animate({
            scrollTop: $(hash).offset().top - 153
          }, 800);
        } else {
          $('html, body').animate({
            scrollTop: $(hash).offset().top - 203
          }, 800);
        }

      } // End if
    });
  });


  
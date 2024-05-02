var $overlay = $('<div id="overlay"></div>');
var $image = $('<img>');


$overlay.append($image);
$("body").append($overlay);



/* Show Lightbox when clicking image */
$("#imageGallery a").click(function(event){
  event.preventDefault();
 var imageLocation = $(this).attr("href");
 $image.attr("src", imageLocation);
  //Show the overlay.
  $overlay.show();
  
  });

/* Hide the overlay when clicked */
$($overlay).on("click", function() {
  $($overlay).hide();
})
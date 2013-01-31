// this variable will hold a reference to the current element being dragged
var drag_object;

// get container where draggin n' droppin can happen
var drag_zone = document.getElementById('dragzone');

// bind events to container. I only used the necessary ones to make this example work
drag_zone.addEventListener('dragstart', function(e) {
    // save element that is being dragged to global scope
    drag_object = e.target;
}, false);

drag_zone.addEventListener('dragover', function(e) {
    // prevent default html element action from happening while we're dragging stuff
    if(e.preventDefault) {
      e.preventDefault();
  }

    //if it has class of coupon-dump
    if(e.target.className.match(/\bcoupon-dump\b/)) {
      e.target.classList.add("shadow");
  }
}, false);

drag_zone.addEventListener('dragleave', function(e) {
  e.target.classList.remove("shadow");
});

drag_zone.addEventListener('drop', function(e) {
    // check to make sure we are dropping an element into the container we want
    if(e.target.className.match(/\bcoupon-dump\b/)) {
        // cut out hard returns from container html text
        var drop_container = e.target.getAttribute("data-type");
        var results = document.getElementById("results");
        var coupon = drag_object.getAttribute("data-coupon");
        var month = drag_object.getAttribute("data-month");
        // e.target.classList.remove("shadow");
        // display results
        if(drop_container == "0") {
          results.innerHTML = "You chose the totally free option! Take the attorneys, we don't need 'em!";
      } else {
          results.innerHTML = "Congrats, you've signed up for "+month+" months! You chose the $"+coupon+" coupon! Your first month is $"+(drop_container - coupon+" with every next month being $"+drop_container+".");
      }
      var empty = document.getElementById("dragzone");
      empty.parentNode.removeChild(empty);
  }
}, false);
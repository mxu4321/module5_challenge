// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user
  // input in local storage. HINT: What does `this` reference in the click
  // listener function? How can DOM traversal be used to get the --- "hour-x" --- id of
  // the time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage? 
  $(".saveBtn").on("click", function () {
    // -------- set local storage --------
    var eventInput = $(this).siblings(".description").val();
    var key = $(this).parent(".time-block").attr("id").toString();
    // console.log(key);
    localStorage.setItem(key, eventInput);

    // -------- pop up reminder when user clicked saveBtn--------
    var pop = document.getElementById("pop-up");
    pop.style.display = "block";
    setTimeout(() => (pop.style.display = "none"), 2000);
  });

  // -------- delete local storage--------
  $(".deleteBtn").on("click", function () {
    // //var eventInput = $(this).siblings(".description").val();
    var key = $(this).parent(".time-block").attr("id").toString();
    localStorage.setItem(key, "");
    $(this).siblings(".description").val("");
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time? 
  // -------- current hour variable --------
  var currentHour = dayjs().hour();
  // ------ jQuery: add or remove class to change scheduler color -----
  function schedulerColor() {
    $(".time-block").each(function () {
      var businessHour = parseInt($(this).attr("id"));
      if (currentHour === businessHour) {
        $(this).addClass("present");
        $(this).removeClass("future");
        $(this).removeClass("past");
      }
      if (currentHour > businessHour) {
        $(this).addClass("past");
        $(this).removeClass("future");
        $(this).removeClass("present");
      } else {
        $(this).addClass("future");
        $(this).removeClass("past");
        $(this).removeClass("present");
      }
    });
  }
  schedulerColor();

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the
  // id attribute of each time-block be used to do this? 
  // -------- get local storage --------
  $(".time-block").each(function () {
    $(this)
      .children()
      .eq(1)
      .text(localStorage.getItem($(this).attr("id").toString()));
  });

  // -------- delete local storage --------
  // $('.deleteBtn').on('click', function(){

  // })

  // TODO: Add code to display the current date in the header of the page. 
  // -------- DayJS display current date and time --------
  function displayTime() {
    $("#currentDay").text(dayjs().format("MMM D, YYYY [at] h:mm:ss A"));
  }
  setInterval(displayTime, 1000);
});

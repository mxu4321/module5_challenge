
$(function () {

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

  // -------- current hour variable --------
  var currentHour = dayjs().hour();
  // console.log(currentHour);
  // ------ jQuery: add or remove class to change scheduler color -----
  function schedulerColor() {
    $(".time-block").each(function () {
      var businessHour = parseInt($(this).attr("id"));
      // console.log(businessHour);
      if (currentHour < businessHour) { // not working
        $(this).addClass("future");
        $(this).removeClass("past");
        $(this).removeClass("present");
      }
      if (currentHour > businessHour) {
        $(this).addClass("past");
        $(this).removeClass("future");
        $(this).removeClass("present");
      } else if (currentHour === businessHour) {
        $(this).addClass("present");
        $(this).removeClass("future");
        $(this).removeClass("past");
      } return
    }) 
  }
  schedulerColor();

  // -------- get local storage --------
  $(".time-block").each(function () {
    $(this)
      .children()
      .eq(1)
      .text(localStorage.getItem($(this).attr("id").toString()));
  });

  // -------- DayJS display current date and time --------
  function displayTime() {
    $("#currentDay").text(dayjs().format("MMM D, YYYY [at] h:mm:ss A"));
  }
  setInterval(displayTime, 1000);
});

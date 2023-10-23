document.addEventListener("DOMContentLoaded", function () {

  var userName = prompt("Lütfen isminizi girin:");
  
    if (userName) {
      var myNameElement = document.querySelector("#myName");
      myNameElement.textContent = userName;
      showTime();
    }
  });
  
  function showTime() {
    var myClockElement = document.querySelector("#myClock");
    var currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    var day = currentDate.toLocaleDateString("tr-TR", { weekday: "long" });
  
    var timeString = day 
    + " saat " + hours 
    + ":" + (minutes < 10 ? "0" : "") + minutes 
    + ":" + (seconds < 10 ? "0" : "") + seconds;
    myClockElement.textContent = timeString;
  
    setTimeout(showTime, 1000); // Her saniye güncellemek için
  }
  
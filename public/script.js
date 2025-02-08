var tableNo;

const confTable = document.querySelector(".conf-table");
const confDate = document.querySelector(".conf-date");
const confTime = document.querySelector(".conf-time");

const addTable = (table) => {
  tableNo = table;
  const nonSelectedTable = document.querySelectorAll(".table");
  nonSelectedTable.forEach((table) => {
    table.style.background = "gray";
  });
  const selectedTable = document.querySelector(".table-" + table);
  selectedTable.style.background = "rgb(182, 182, 182)";
};

const openDuration = () => {
  var hide = document.querySelector(".date");
  var date = document.querySelector("input[name=date]").value;

  if (tableNo === undefined) {
    alert("Please select a table");
    return;
  }
  confTable.innerHTML = "Table No.: " + tableNo;
  if (!date) {
    alert("Please select a date");
    return;
  }
  hide.classList.add("hidden");
  hide.classList.remove("format");
  var show = document.querySelector(".duration");
  show.classList.add("format");
  show.classList.remove("hidden");
  confDate.innerHTML = "Date: " + date;
};

const backToDate = () => {
  var hide = document.querySelector(".duration");
  hide.classList.add("hidden");
  hide.classList.remove("format");
  var show = document.querySelector(".date");
  show.classList.add("format");
  show.classList.remove("hidden");
  confDate.innerHTML = "";
};

const openTimings = () => {
  var duration;
  try {
    duration = document.querySelector("input[name=duration]:checked").value;
  } catch (e) {
    alert("Please select a duration");
    return;
  }
  if (!duration) {
    alert("Please select a duration");
    return;
  }
  var hide = document.querySelector(".duration");
  hide.classList.add("hidden");
  hide.classList.remove("format");
  var show = document.querySelector(".timings");
  show.classList.add("format");
  show.classList.remove("hidden");
};

const backToDuration = () => {
  var hide = document.querySelector(".timings");
  hide.classList.add("hidden");
  hide.classList.remove("format");
  var show = document.querySelector(".duration");
  show.classList.add("format");
  show.classList.remove("hidden");
};

const openUser = () => {
  var date = document.querySelector("input[name=date]").value;
  var time = document.querySelector("input[name=time").value;
  if (!time) {
    alert("Please select a time");
    return;
  }
  var hide = document.querySelector(".timings");
  hide.classList.add("hidden");
  hide.classList.remove("format");
  var show = document.querySelector(".user");
  show.classList.add("format");
  show.classList.remove("hidden");
  const duration = document.querySelector("input[name=duration]:checked").value;
  confTime.innerHTML =
    "Time: " + time + "-" + addToTime(time, Number(duration));
};

const backToTimings = () => {
  var hide = document.querySelector(".user");
  hide.classList.add("hidden");
  hide.classList.remove("format");
  var show = document.querySelector(".timings");
  show.classList.add("format");
  show.classList.remove("hidden");
  confTime.innerHTML = "";
};

function addToTime(timeString, minutesToAdd) {
  let [hours, minutes] = timeString.split(":").map(Number);
  let date = new Date();
  date.setHours(minutesToAdd > 30 ? hours + 1 : hours);
  date.setMinutes(minutesToAdd < 60 ? minutes + minutesToAdd : minutes);

  // Format new time
  let newHours = String(date.getHours()).padStart(2, "0");
  let newMinutes = String(date.getMinutes()).padStart(2, "0");

  return `${newHours}:${newMinutes}`;
}

const confirmBooking = () => {
  const name = document.querySelector("input[name=name]").value;
  const phone = document.querySelector("input[name=phone]").value;
  const date = document.querySelector("input[name=date]").value;
  var duration = document.querySelector("input[name=duration]:checked").value;
  if (!name || !phone) {
    alert("Please enter both name and phone");
    return;
  }
  const startTime = document.querySelector("input[name=time").value;
  const endTime = addToTime(startTime, Number(duration));
  const data = {
    name,
    phone,
    date,
    startTime,
    duration,
    endTime,
    tableNo,
  };

  var resultId = document.querySelector(".result");
  (async () => {
    const { storeBooking } = await import("./firebase.js");
    await storeBooking(data).then((result) => {
      console.log(result.toString());
      resultId.innerHTML =
        result.toString() +
        "<br><br>Booking Confirmed! <br><br>Take screenshot of this code for future reference.";
    });
  })();
};

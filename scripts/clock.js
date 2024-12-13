
function getUpdatingClock() {
  const now = new Date();
  let day = now.getDate();
  let month = now.toLocaleString("default", { month: "short" });
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const meridiem = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const suffix = (day) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  if (minutes !== previousMinutes) {
    date.innerText = `${month} ${day}${suffix(day)}, ${year}`;
    time.innerText = `${hours}:${minutes}${meridiem}`;
    console.log(` ${month}/${day}/${year} ${hours}:${minutes}.`);
    previousMinutes = minutes;
  }
}
// setInterval(getUpdatingClock(), 1000);


// let tmsp = 1734102781000
// let ntv = new Date(tmsp)
// console.log(ntv.getHours())
// let abcd = new Date()
// console.log(abcd)
// console.log(abcd.getHours())




function get5DayClock() {}

export { get5DayClock };

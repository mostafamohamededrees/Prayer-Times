let cityes = [
  "Faiyum",
  "Al Sharqia",
  "Sohag",
  "Aswan",
  "Luxor",
  "Cairo",
  "Giza",
  "Alexandria",
  "",
];

for (city of cityes) {
  let content = `<option value="${city}">${city}</option>`;
  document.getElementById("select").innerHTML += content;
}
play("cairo");

async function play(city) {
  let response = await fetch(
    `http://api.aladhan.com/v1/timingsByCity/:date?city=${city}&country=Egypt`
  );
  let json = await response.json();
  timing = json.data.timings;
  let date_1 = json.data.date.readable;
  let date_2 = json.data.date.hijri.weekday["ar"];

  // Write Date Dinamic in page
  let date = date_2 + " " + date_1;
  document.getElementById("date").textContent = date;

  document.getElementById("fajr").textContent = timing.Fajr;
  document.getElementById("sunrise").textContent = timing.Sunrise;
  document.getElementById("dhuhr").textContent = timing.Dhuhr;
  document.getElementById("asr").textContent = timing.Asr;
  document.getElementById("magharib").textContent = timing.Maghrib;
  document.getElementById("isha").textContent = timing.Isha;
  return json;
}
document.getElementById("select").addEventListener("change", function () {
  play(`${this.value}`).catch((rej) => {
    alert("I am Sorry We Have a problem in API Server");
  });
  document.getElementById("state").textContent = this.value;
});

const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  msg.innerText = "Submitting...";

  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    service: form.service.value,
    message: form.message.value
  };

  fetch("https://script.google.com/macros/s/AKfycby2HHqO-Ih4rLJe9ZhHK5RCQI-QJiB4wsCYOL_c0yWYWoSnUGkHSnmsJgkyGsYC24RHyQ/exec", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(data)
  })
    .then(() => {
      msg.innerText =
        "Thank you for contacting us. We will connect you shortly.";
      form.reset();
      setTimeout(() => (msg.innerText = ""), 5000);
    })
    .catch(() => {
      msg.innerText =
        "Something went wrong. Please try again.";
      setTimeout(() => (msg.innerText = ""), 5000);
    });
});

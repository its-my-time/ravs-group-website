const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");

form.addEventListener("submit", async function(e) {
  e.preventDefault();
  msg.innerText = "Submitting...";

  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    service: form.service.value,
    message: form.message.value
  };

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycby2HHqO-Ih4rLJe9ZhHK5RCQI-QJiB4wsCYOL_c0yWYWoSnUGkHSnmsJgkyGsYC24RHyQ/exec",
      { method: "POST", body: JSON.stringify(data) }
    );

    const result = await response.json();

    if (result.status === "success") {
      msg.innerText = "Thank you for contacting us. We will connect you shortly.";
      form.reset();
    } else {
      msg.innerText = "Something went wrong.";
    }
  } catch {
    msg.innerText = "Network error.";
  }

  setTimeout(() => msg.innerText = "", 5000);
});

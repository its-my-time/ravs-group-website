document.addEventListener("DOMContentLoaded", () => {

  // Typed Text
  const words = ["Business Growth", "Success", "Innovation"];
  let i = 0, j = 0, current = "";
  setInterval(() => {
    current = words[i].slice(0, j++);
    document.getElementById("typed").innerText = current;
    if (j > words[i].length) {
      j = 0; i = (i + 1) % words.length;
    }
  }, 150);

  // Contact Form
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMsg");

  const scriptURL = "https://script.google.com/macros/s/AKfycby2HHqO-Ih4rLJe9ZhHK5RCQI-QJiB4wsCYOL_c0yWYWoSnUGkHSnmsJgkyGsYC24RHyQ/exec";

  form.addEventListener("submit", e => {
    e.preventDefault(); // 🔥 stops page jump

    msg.innerText = "Submitting...";

    fetch(scriptURL, {
      method: "POST",
      body: new FormData(form)
    })
    .then(res => {
      msg.innerText = "✅ Thank you! We will contact you shortly.";
      form.reset();
      setTimeout(()=>msg.innerText="",5000);
    })
    .catch(() => {
      msg.innerText = "❌ Submission failed. Try again.";
    });
  });

});

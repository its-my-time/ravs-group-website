/* ==================================================
   TYPED TEXT EFFECT (HERO)
================================================== */
const typedText = [
  "Business Growth",
  "Staffing Solutions",
  "IT Services",
  "Accounting Excellence",
  "Digital Marketing",
  "Learning & Development"
];

let typedIndex = 0;
let charIndex = 0;
const typedSpan = document.getElementById("typed-text");

function typeEffect() {
  if (!typedSpan) return;

  if (charIndex < typedText[typedIndex].length) {
    typedSpan.textContent += typedText[typedIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 120);
  } else {
    setTimeout(eraseEffect, 1800);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    typedSpan.textContent = typedText[typedIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 70);
  } else {
    typedIndex = (typedIndex + 1) % typedText.length;
    setTimeout(typeEffect, 400);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);

/* ==================================================
   CONTACT FORM SUBMIT + VALIDATION
================================================== */
const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // 🚫 stop page jump

    msg.style.color = "#0b2a5b";
    msg.innerText = "Submitting...";

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const service = form.service.value;
    const message = form.message.value.trim();

    /* ========= VALIDATIONS ========= */
    if (!name || !email || !phone || !service || !message) {
      showError("All fields are mandatory.");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    // Indian phone number validation
    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(phone)) {
      showError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    /* ========= SEND DATA ========= */
    const data = {
      name,
      email,
      phone,
      service,
      message
    };

    fetch(
      "https://script.google.com/macros/s/AKfycby2HHqO-Ih4rLJe9ZhHK5RCQI-QJiB4wsCYOL_c0yWYWoSnUGkHSnmsJgkyGsYC24RHyQ/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
      }
    )
      .then(() => {
        msg.style.color = "green";
        msg.innerText =
          "Thank you! Your details have been submitted successfully.";
        form.reset();
        setTimeout(() => (msg.innerText = ""), 5000);
      })
      .catch(() => {
        showError("Something went wrong. Please try again later.");
      });
  });
}

function showError(text) {
  msg.style.color = "red";
  msg.innerText = text;
  setTimeout(() => (msg.innerText = ""), 5000);
}

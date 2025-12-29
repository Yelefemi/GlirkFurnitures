const toggleBtn = document.querySelector(".chat-toggle");
const chatWindow = document.querySelector(".chat-window");
const closeBtn = document.querySelector(".chat-close");
const chatForm = document.querySelector(".chat-input");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

toggleBtn.onclick = () => chatWindow.classList.toggle("show");
closeBtn.onclick = () => chatWindow.classList.remove("show");

chatForm.addEventListener("submit", e => {
  e.preventDefault();
  const msg = chatInput.value.trim();
  if (!msg) return;

  chatBody.innerHTML += `<div class="user-msg">${msg}</div>`;
  chatInput.value = "";

  setTimeout(() => botReply(msg), 600);
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_mfi4vgw",
      "template_wkvr23d",
      this
    )
    .then(() => {
  document.getElementById("formStatus").textContent =
    "✅ Message sent successfully. We’ll get back to you shortly.";
  form.reset();
})
    .catch(error => {
      alert("❌ Failed to send message. Try again.");
      console.error(error);
    });
  });
});

function botReply(message) {
  let reply = "Thanks for reaching out! We'll get back to you shortly.";

  if (message.toLowerCase().includes("price")) {
    reply = "Our prices depend on customization. Would you like to request a quote?";
  }

  if (message.toLowerCase().includes("custom")) {
    reply = "Yes! We specialize in custom furniture. Tell us what you need.";
  }

  if (message.toLowerCase().includes("contact")) {
    reply = "You can reach us via WhatsApp or the contact form on this page.";
  }

  chatBody.innerHTML += `<div class="bot-msg">${reply}</div>`;
  chatBody.scrollTop = chatBody.scrollHeight;
}

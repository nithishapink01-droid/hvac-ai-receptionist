// HVAC AI Receptionist
// Basic client-side application logic

function addMessage(text, type) {
  const chat = document.getElementById("chat");

  if (!chat) return;

  const message = document.createElement("div");
  message.className = "message " + type;
  message.textContent = text;

  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("messageInput");

  if (!input) return;

  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  setTimeout(() => {
    const question = text.toLowerCase();

    let reply =
      "I'd be happy to help. Please tell me your name and phone number so our HVAC team can contact you.";

    if (
      question.includes("price") ||
      question.includes("cost") ||
      question.includes("quote")
    ) {
      reply =
        "HVAC pricing depends on the problem and service needed. I can collect your details so the team can provide a quote.";
    } else if (
      question.includes("ac") ||
      question.includes("air conditioning")
    ) {
      reply =
        "We can help with AC repair, maintenance, and installation. What problem are you experiencing?";
    } else if (
      question.includes("heat") ||
      question.includes("furnace")
    ) {
      reply =
        "We can help with heating and furnace problems. What is happening with your system?";
    } else if (
      question.includes("emergency") ||
      question.includes("urgent")
    ) {
      reply =
        "For an HVAC emergency, please provide your name and phone number so the service team can contact you.";
    } else if (
      question.includes("appointment") ||
      question.includes("book")
    ) {
      reply =
        "Sure. Please provide your name, phone number, and the HVAC service you need.";
    }

    addMessage(reply, "bot");
  }, 500);
}

function submitLead() {
  const name = document.getElementById("name")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const service = document.getElementById("service")?.value.trim();

  if (!name || !phone || !service) {
    alert("Please complete all fields.");
    return;
  }

  const leads = JSON.parse(
    localStorage.getItem("hvacLeads") || "[]"
  );

  leads.push({
    name,
    phone,
    service,
    createdAt: new Date().toISOString()
  });

  localStorage.setItem("hvacLeads", JSON.stringify(leads));

  const success = document.getElementById("success");

  if (success) {
    success.style.display = "block";
  }

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("service").value = "";
}

console.log("HVAC AI Receptionist loaded successfully.");

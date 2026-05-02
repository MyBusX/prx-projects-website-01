const form = document.querySelector("#quoteForm");
const statusMessage = document.querySelector("#formStatus");

function buildMailto(data) {
  const subject = encodeURIComponent(`PRX Projects enquiry - ${data.projectType}`);
  const body = encodeURIComponent(
    [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Property area: ${data.area}`,
      `Project type: ${data.projectType}`,
      "",
      "Project notes:",
      data.notes || "No notes supplied yet.",
    ].join("\n"),
  );

  return `mailto:quotes@plexirenovations.co.za?subject=${subject}&body=${body}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const requiredFields = ["name", "email", "area"];
  const missingField = requiredFields.find((field) => !String(data[field] || "").trim());

  if (missingField) {
    statusMessage.textContent = "Please complete your name, email and property area.";
    return;
  }

  statusMessage.textContent = "Your enquiry summary is ready in your email app.";
  window.location.href = buildMailto(data);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

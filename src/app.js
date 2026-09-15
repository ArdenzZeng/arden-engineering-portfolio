import { portfolio } from "./portfolio-data.js";

const root = document.documentElement;
const body = document.body;
const header = document.querySelector("[data-header]");
const nav = document.querySelector("#site-nav");
const navToggle = document.querySelector(".nav-toggle");
const themeToggle = document.querySelector(".theme-toggle");
const projectGrid = document.querySelector("[data-project-grid]");
const projectCount = document.querySelector("[data-project-count]");
const dialog = document.querySelector("[data-project-dialog]");
const dialogContent = document.querySelector("[data-dialog-content]");

document.querySelectorAll("[data-profile]").forEach((element) => {
  element.textContent = portfolio.profile[element.dataset.profile] ?? "";
});
document.querySelector("[data-year]").textContent = new Date().getFullYear();

document.querySelector("[data-focus-grid]").innerHTML = portfolio.focusAreas
  .map(
    (area) => `
      <article class="focus-card reveal">
        <span>${area.number}</span>
        <h3>${area.title}</h3>
        <p>${area.text}</p>
      </article>
    `,
  )
  .join("");

const projectCard = (project) => `
  <button class="project-card project-card--${project.accent}" type="button" data-project-id="${project.id}">
    <span class="project-card-top">
      <span>${project.category}</span>
      <span>${project.year}</span>
    </span>
    <span class="project-index">${String(portfolio.projects.indexOf(project) + 1).padStart(2, "0")}</span>
    <span class="project-card-body">
      <span class="project-context">${project.context}</span>
      <strong>${project.title}</strong>
      <span class="project-summary">${project.summary}</span>
    </span>
    <span class="project-card-footer">
      <span>${project.tags.slice(0, 2).join(" · ")}</span>
      <span class="project-arrow" aria-hidden="true">↗</span>
    </span>
  </button>
`;

function renderProjects(filter = "All") {
  const visible = portfolio.projects.filter(
    (project) => filter === "All" || project.category === filter,
  );

  const update = () => {
    projectGrid.innerHTML = visible.map(projectCard).join("");
    projectCount.textContent = visible.length;
    bindProjectCards();
  };

  if (document.startViewTransition) document.startViewTransition(update);
  else update();
}

function bindProjectCards() {
  document.querySelectorAll("[data-project-id]").forEach((card) => {
    card.addEventListener("click", () => openProject(card.dataset.projectId));
  });
}

function openProject(id) {
  const project = portfolio.projects.find((item) => item.id === id);
  if (!project) return;

  dialogContent.innerHTML = `
    <p class="dialog-eyebrow">${project.context}</p>
    <div class="dialog-title-row">
      <h2>${project.title}</h2>
      <span>${project.status}</span>
    </div>
    <p class="dialog-summary">${project.detail}</p>
    <div class="dialog-meta">
      <div><span>CATEGORY</span><p>${project.category}</p></div>
      <div><span>TIMELINE</span><p>${project.year}</p></div>
    </div>
    <div class="dialog-tags">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
  `;
  dialog.showModal();
  body.classList.add("dialog-open");
}

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener("close", () => body.classList.remove("dialog-open"));

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderProjects(button.dataset.filter);
  });
});

document.querySelector("[data-experience-list]").innerHTML = portfolio.experience
  .map(
    (item, index) => `
      <article class="experience-item reveal">
        <div class="experience-period"><span>${String(index + 1).padStart(2, "0")}</span><p>${item.period}</p></div>
        <div class="experience-role"><h3>${item.role}</h3><p>${item.organization}</p></div>
        <ul>${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>
      </article>
    `,
  )
  .join("");

document.querySelector("[data-coursework-list]").innerHTML = portfolio.coursework
  .map(
    (group) => `
      <div class="course-row">
        <span>${group.label}</span>
        <div>${group.courses.map((course) => `<strong>${course}</strong>`).join("")}</div>
      </div>
    `,
  )
  .join("");

document.querySelector("[data-contact-list]").innerHTML = portfolio.contact
  .map(
    (item) => `
      <${item.href ? "a" : "button"}
        class="contact-item ${item.href ? "" : "is-placeholder"}"
        ${item.href ? `href="${item.href}" target="_blank" rel="noreferrer"` : `type="button" data-placeholder="${item.label}"`}
      >
        <span>${item.label}</span>
        <strong>${item.value}</strong>
        <i aria-hidden="true">${item.href ? "↗" : "+"}</i>
      </${item.href ? "a" : "button"}>
    `,
  )
  .join("");

document.querySelectorAll("[data-placeholder]").forEach((button) => {
  button.addEventListener("click", () => showToast(`Add your ${button.dataset.placeholder.toLowerCase()} in portfolio-data.js`));
});

let toastTimer;
function showToast(message) {
  const toast = document.querySelector("[data-toast]");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

navToggle.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!open));
  body.classList.toggle("nav-open", !open);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
    body.classList.remove("nav-open");
  });
});

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredLight = window.matchMedia("(prefers-color-scheme: light)").matches;
if (savedTheme) root.dataset.theme = savedTheme;
else if (preferredLight) root.dataset.theme = "light";

themeToggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("portfolio-theme", next);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

function observeReveals() {
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => revealObserver.observe(element));
}

const navLinks = [...nav.querySelectorAll("a")];

let activeFoundationLink = ["#coursework", "#contact"].includes(
  window.location.hash,
)
  ? window.location.hash
  : "#coursework";

function setActiveNav(activeHash) {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.hash === activeHash);
  });
}

function getSectionTop(selector) {
  const element = document.querySelector(selector);

  return element.getBoundingClientRect().top + window.scrollY;
}

function updateActiveNavOnScroll() {
  const scrollPosition = window.scrollY + window.innerHeight * 0.35;

  if (scrollPosition >= getSectionTop("#coursework")) {
    setActiveNav(activeFoundationLink);
  } else if (scrollPosition >= getSectionTop("#experience")) {
    setActiveNav("#experience");
  } else if (scrollPosition >= getSectionTop("#projects")) {
    setActiveNav("#projects");
  } else {
    setActiveNav("#biography");
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (["#coursework", "#contact"].includes(link.hash)) {
      activeFoundationLink = link.hash;
    }

    setActiveNav(link.hash);
  });
});

window.addEventListener("hashchange", () => {
  if (["#coursework", "#contact"].includes(window.location.hash)) {
    activeFoundationLink = window.location.hash;
  }

  setActiveNav(window.location.hash);
});

window.addEventListener("scroll", updateActiveNavOnScroll, {
  passive: true,
});

updateActiveNavOnScroll();

window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);

    const max =
      document.documentElement.scrollHeight - window.innerHeight;

    document.querySelector(".scroll-progress span").style.transform =
      `scaleX(${max ? window.scrollY / max : 0})`;
  },
  { passive: true },
);

renderProjects();
observeReveals();

const { objectSetToArray } = require("../functions/object-set-to-array");
const { createObjSet } = require("../functions/create-set-array");

const skills = new Set();

document.addEventListener("DOMContentLoaded", () => {
  const skillsList = document.querySelector(".js-skill-list");
  const alerts = document.querySelectorAll('.js-alerts');

  if (skillsList) {
    getSkillsSelected();
    const skillsToAdd = [...skills];
    document.querySelector("#js-skills").value = skillsToAdd;

    skillsList.addEventListener("click", (event) => {
      addSkills(event);
    });
  }

  // Limpiar las alertas
  if (alerts) {
    cleanAlerts();
  }

});

const addSkills = (event) => {
  if (event.target.tagName === "LI") {
    if (event.target.classList.contains("active")) {
      skills.delete(event.target.textContent);
      event.target.classList.remove("active");
    } else {
      skills.add(event.target.textContent);
      event.target.classList.add("active");
    }
  }

  const skillsToAdd = [...skills];
  document.querySelector("#js-skills").value = skillsToAdd;
};

const getSkillsSelected = () => {
  const selectedSkills = Array.from(
    document.querySelectorAll(".js-skill-list .active")
  );

  selectedSkills.map((skill) => {
    skills.add(skill.textContent);
  });
};


const cleanAlerts = () => {
  const alerts = document.querySelectorAll('.js-alerts');

  const interval = setInterval(() => {
    if (alerts[0].children.length > 0) {
      alerts[0].removeChild(alerts[0].children[0]);
  
    } else if (alerts[0].children.length === 0) {

      clearInterval(interval);
    }

  }, 1000);
}
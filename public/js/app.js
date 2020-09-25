const { objectSetToArray } = require("../functions/object-set-to-array");
const { createObjSet } = require("../functions/create-set-array");

const selectedSkills = () => {
  console.log("Hello world");
};

document.addEventListener("DOMContentLoaded", () => {
  const skillsList = document.querySelector(".js-skill-list");

  if (skillsList) {
    selectedSkills();

    skillsList.addEventListener("click", (event) => {
      const arraySkills = objectSetToArray(createObjSet(event, "LI", "active"));
      document.querySelector("#js-skills").value = arraySkills;
    });
  }
});

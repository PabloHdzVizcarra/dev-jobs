const { objectSetToArray } = require("../functions/object-set-to-array");
const { createObjSet } = require("../functions/create-set-array");
import axios from 'axios';
import Swal from 'sweetalert2';

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

  //_ Delete Vacancy
  const adminPanel = document.querySelector('.js-admin-panel');

  if (adminPanel) {
    adminPanel.addEventListener('click', actionsList);
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

const actionsList = event => {
  event.preventDefault();

  if (event.target.dataset.delete) {
    Swal.fire({
      title: 'Confirmar Eliminacion',
      text: "Una vez eliminada no se puede recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // enviar la peticion via axios
        const url =
          `${location.origin}/vacancies/delete/${event.target.dataset.delete}`
        ;
        
        axios
          .delete(url, {
            params: { url },
          })
          .then((response) => {
            if (response.status === 200) {
              Swal.fire(
                'Eliminado!',
                response.data,
                'success'
              );

              // TODO: eliminar del DOM
              event.target.parentElement.parentElement.parentElement.removeChild(
                (event.target.parentElement.parentElement)
              );
              
            }
          })
          .catch(() => {
            Swal.fire({
              type: 'error',
              title: "Hubo un error",
              text: 'No se pudo eliminar'
            });
          });

      }
    })
    
  } else if (event.target.tagName === 'A') {
    
    window.location.href = event.target.href;
  }
}
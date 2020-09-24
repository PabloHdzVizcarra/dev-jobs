export const createObjSet = (() => {
  const addedSkills = new Set;

  return (event, tagName, className) => {
    if (event.target.tagName === tagName) {

      if (event.target.classList.contains(className)) {
        
        addedSkills.delete(event.target.textContent);
        event.target.classList.remove(className);
      } else {
  
        addedSkills.add(event.target.textContent);
        event.target.classList.add(className);
      }
  
    }

    return addedSkills;
  }
})();
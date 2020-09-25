module.exports = {
  selectSkills: (selected = [], options) => {

    console.log(selected);

    const skillsList = [
      'HTML5',
      'CSS3',
      'JavaScript',
      'JQuery',
      'Node JS',
      'Angular',
      'Vue JS',
      'React JS',
      'GraphQL',
      'TypeScript',
      'PHP',
      'Python',
      'SQL',
      'Go',
      'Deno',
      'Rust',
      'Java',
      'C#',
      'C++',
      'C'
    ];

    let html = '';
    skillsList.forEach(skill => {
      html += `
        <li ${selected.includes(skill) ? 'class="active"' : ''} >${skill}</li>
      `;
    });

    return options.fn().html = html;
  }
}
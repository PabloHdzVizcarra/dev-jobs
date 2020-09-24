module.exports = {
  selectSkills: (selected = [], options) => {
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
        <li>${skill}</li>
      `;
    });

    return options.fn().html = html;
  }
}
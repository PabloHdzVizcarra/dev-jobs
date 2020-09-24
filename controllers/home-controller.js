exports.showJobs = (req, res) => {
  res.render('home', {
    namePage: 'Dev Jobs',
    tagline: 'Encuentra y Publica trabajos',
    navbar: true,
    button: true
  });
}
export const getStudent = (req, res) => {
  res.render('student.ejs', { name: req.name })
}
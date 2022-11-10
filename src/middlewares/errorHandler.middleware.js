export const errorHandler = (err, req, res, next) => {
  return res.render('error.page.ejs', { message: err.message, status: err.status })
}
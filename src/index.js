import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import expressFileupload from 'express-fileupload'
import ejs from 'ejs'
import routes from './routes/routes.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';


const app = express();
dotenv.config();

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
app.use(expressFileupload())
app.use(routes)
app.use("/assets", express.static(path.join(process.cwd(), "src", "assets")));

// SETTINGS
app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'src', 'view'))

// ERRORS
app.use(errorHandler)

app.all('/*', (req, res) => res.render('error.page.ejs', { message: req.url + ' not found', status: 404 }))

app.listen(9090, console.log(9090))

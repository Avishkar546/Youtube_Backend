import cookieParser from 'cookie-parser';
import express from 'express';

const app = express();

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}));
app.use(express.json({
    limit:'16kb'
}));
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser);

export {app};
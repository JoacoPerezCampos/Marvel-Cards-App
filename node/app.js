import express from "express";
import cors from "cors";
import db from "./database/db.js";
import appRoutes from "./routes/routes.js";

const app = express();

app.use( cors());
app.use(express.json());
app.use("/marvels", appRoutes)

try {
    await db.authenticate()
    console.log("Conection to DB: Success")
} catch (error) {
    console.log(`Conection error: ${error}`)
}

app.get("/", (req, res)=>{
    res.send("Hello World")
})

app.listen(8000, ()=>{
    console.log("Server UP running in http://localhost:8000/")
})
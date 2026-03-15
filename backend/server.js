const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("resume"), async (req, res) => {

    try{

    const dataBuffer = fs.readFileSync(req.file.path);

    const data = await pdfParse(dataBuffer);

    const text = data.text.toLowerCase();

    let jobs = [];

    if(text.includes("python") || text.includes("machine learning")){
        jobs.push("Data Scientist");
    }

    if(text.includes("react") || text.includes("javascript")){
        jobs.push("Frontend Developer");
    }

    if(text.includes("node") || text.includes("express")){
        jobs.push("Backend Developer");
    }

    res.json({
        message:"Resume analyzed successfully",
        recommended_jobs:jobs
    });

    }
    catch(error){
        res.status(500).json({error:"Error processing resume"});
    }

});

app.listen(5000,()=>{
console.log("Server running on port 5000");
});
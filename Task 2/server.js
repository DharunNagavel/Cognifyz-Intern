import express from 'express';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
let studentRecords = [];
app.get("/",(req,res)=>
    {
        res.render("index")
    });
app.post("/submit", (req, res) => 
    {
        const { name, email, roll, age, course } = req.body;
        studentRecords.push({ name, email, roll, age, course });
        console.log(studentRecords);
        res.send(`<script>alert("Student record submitted successfully!");window.location.href = "/";</script>`);

    });
app.listen( 5000, () => 
    {
        console.log(`Server running on http://localhost:5000`);
    }); 
import express from 'express';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/",(req,res)=>
    {
        res.render("index")
    });
app.post("/submit",(req,res) =>
    {
        const {name,email,roll} = req.body;
        res.render("submit",{name,email,roll});
    });
app.listen( 5000, () => 
    {
        console.log(`Server running on http://localhost:5000`);
    }); 
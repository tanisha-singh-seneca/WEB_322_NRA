/********************************************************************************
*  WEB322 – Assignment 04
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Tanisha Singh, Student ID: 134891225, Date: 2024-03-22
*
*  Published URL: https://lime-itchy-macaw.cyclic.app/
*
********************************************************************************/

const express = require("express");
const path = require("path");
const legoData = require("./modules/legoSets");

const app = express();
const PORT = process.env.PORT || 7513;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

legoData.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error("Failed to initialize LEGO data:", error);
    });

app.get("/", (req, res) => {
    const featuredSets = [
        {
            img_url: "https://cdn.rebrickable.com/media/sets/001-1.jpg",
            name: "Gears",
            theme: "Technic",
            year: "1965",
            set_num: "001-1"
            
        },
        {
            img_url: "https://cdn.rebrickable.com/media/sets/0012-1.jpg",
            name: "Space Mini-Figures",
            theme: "Supplemental",
            year: "1979",
            set_num: "0012-1"
        },
        {
            img_url: "https://cdn.rebrickable.com/media/sets/005-1.jpg",
            name: "Basic Building Set in Cardboard",
            theme: "Basic Set",
            year: "1965",
            set_num: "005-1"
            
        },
        {
            img_url: "https://cdn.rebrickable.com/media/sets/002253963-1.jpg",
            name: "Legend of Chima: Corbeaux et Gorilles",
            theme: "Books",
            year: "2013",
            set_num: "002253963-1"
            
        }
    ];
    res.render("home", { page: "home", featuredSets: featuredSets });
});

app.get("/about", (req, res) => {
    res.render("about", { page: "about" });
});

app.get("/lego/sets", (req, res) => {
    const theme = req.query.theme;
    if (theme) {
        legoData.getSetsByTheme(theme)
            .then(sets => res.render("sets", { sets: sets, page: "sets" }))
            .catch(error => res.status(404).render("404", { message: "No sets found for the provided theme", page: "error" }));
    } else {
        legoData.getAllSets()
            .then(sets => res.render("sets", { sets: sets, page: "sets" }))
            .catch(error => res.status(404).render("404", { message: "Unable to retrieve sets", page: "error" }));
    }
});

app.get("/lego/sets/:setNum", (req, res) => {
    const setNum = req.params.setNum;
    legoData.getSetByNum(setNum)
        .then(set => res.render("set", { set: set, page: "" }))
        .catch(error => res.status(404).render("404", { message: "Set not found", page: "error" }));
});

app.use((req, res) => {
    res.status(404).render("404", { message: "Sorry, we can't find that!", page: "error" });
});

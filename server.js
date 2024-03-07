/********************************************************************************
* WEB322 – Assignment 03
* 
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
* 
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
* Name: Tanisha Singh, Student ID: 134891225, Date: 2024-03-07
*
* Published URL: https://lime-itchy-macaw.cyclic.app/
*
********************************************************************************/

const express = require("express");
const path = require('path');
const legoData = require("./modules/legoSets");

const app = express();
const PORT = process.env.PORT || 7513;

app.use(express.static(path.join(__dirname, 'public')));

legoData.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error initializing LEGO data:", error);
    });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/home.html'));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/about.html'));
});

app.get("/lego/sets", (req, res) => {
    const theme = req.query.theme;
    if (theme) {
        legoData.getSetsByTheme(theme)
            .then(sets => res.json(sets))
            .catch(error => {
                console.error("Error getting sets by theme:", error);
                res.status(404).send(error);
            });
    } else {
        legoData.getAllSets()
            .then(sets => res.json(sets))
            .catch(error => {
                console.error("Error getting all sets:", error);
                res.status(404).send(error);
            });
    }
});

app.get("/lego/sets/:setNum", (req, res) => {
    const setNum = req.params.setNum;
    legoData.getSetByNum(setNum)
        .then(set => res.json(set))
        .catch(error => {
            console.error("Error getting set by num:", error);
            res.status(404).send(error);
        });
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
});


// const express = require("express");
// const legoData = require("./modules/legoSets");

// const app = express();
// const PORT = process.env.PORT || 7513;

// app.use(express.static(path.join(__dirname, 'public')));

// legoData.initialize()
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Server is running on http://localhost:${PORT}`);
//         });
//     })
//     .catch(error => {
//         console.error("Error initializing LEGO data:", error);
//     });

// app.get("/", (req, res) => {
//     res.send("Assignment 2: Tanisha Singh - 134891225");
// });

// app.get("/lego/sets", (req, res) => {
//     legoData.getAllSets()
//         .then(sets => {
//             res.json(sets);
//         })
//         .catch(error => {
//             console.error("Error getting all sets:", error);
//             res.status(500).send(error);
//         });
// });

// app.get("/lego/sets/:setNum", (req, res) => {
//     const setNum = req.params.setNum;
//     legoData.getSetByNum(setNum)
//         .then(set => {
//             res.json(set);
//         })
//         .catch(error => {
//             console.error("Error getting set by num:", error);
//             res.status(404).send(error);
//         });
// });

// app.get("/lego/sets/:theme", (req, res) => {
//     const theme = req.params.theme;
//     legoData.getSetsByTheme(theme)
//         .then(sets => {
//             res.json(sets);
//         })
//         .catch(error => {
//             console.error("Error getting sets by theme:", error);
//             res.status(404).send(error);
//         });
// });

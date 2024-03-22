const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            setData.forEach(set => {
                let setTheme = { ...set, theme: themeData.find(theme => theme.id === set.theme_id).name }
                sets.push(setTheme);
            });
            console.log("LEGO data initialized");
            resolve();
        } catch (error) {
            console.error("Error initializing LEGO data:", error);
            reject(error);
        }
    });
}

function getAllSets() {
    return new Promise((resolve, reject) => {
        if (sets) {
            resolve(sets);
        } else {
            reject("Sets array is empty");
        }
    });
}

function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        let filteredSet = sets.find(set => set.set_num === setNum);
        if (filteredSet) {
            resolve(filteredSet);
        } else {
            reject("Set not found");
        }
    });
}

function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        let filteredSets = sets.filter(set =>
            set.theme.toLowerCase().includes(theme.toLowerCase())
        );
        if (filteredSets) {
            resolve(filteredSets);
        } else {
            reject("No sets found for the provided theme");
        }
    });
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };

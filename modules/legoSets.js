const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            sets = setData.map(set => {
                const theme = themeData.find(theme => theme.id === set.theme_id);
                return { ...set, theme: theme.name };
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
        if (sets.length > 0) {
            resolve(sets);
        } else {
            reject("Sets array is empty");
        }
    });
}

function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        const set = sets.find(set => set.set_num === setNum);
        if (set) {
            resolve(set);
        } else {
            reject("Set not found");
        }
    });
}

function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        const filteredSets = sets.filter(set =>
            set.theme.toLowerCase().includes(theme.toLowerCase())
        );
        if (filteredSets.length > 0) {
            resolve(filteredSets);
        } else {
            reject("No sets found for the provided theme");
        }
    });
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };

const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
const finals2014 = fifaData.filter(function(item){
    return item.Year===2014&&item.Stage==="Final";
});
console.log(finals2014);
//(a) Home Team name for 2014 world cup final
console.log("task 1a", finals2014[0]["Home Team Name"]);
//(b) Away Team name for 2014 world cup final
console.log("task 1b", finals2014[0]["Away Team Name"]);
//(c) Home Team goals for 2014 world cup final
console.log("task 1c", finals2014[0]["Home Team Goals"]);
//(d) Away Team goals for 2014 world cup final
console.log("task 1d", finals2014[0]["Away Team Goals"]);
//(e) Winner of 2014 world cup final */
console.log("task 1e", finals2014[0]["Win conditions"]);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
    return data.filter(item => item.Stage==="Final");
}

console.log("task 2", getFinals(fifaData));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(data, getFinalscb) {
    return getFinalscb(data).map(item => item.Year);
}

console.log("task 3", getYears(fifaData, getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(data, getFinalscb) {
    return getFinalscb(data).map(function(item){
        if(item["Home Team Goals"]>item["Away Team Goals"]){
            return item["Home Team Name"];
        } else {
            return item["Away Team Name"];
        }
    });
}

console.log("task 4", getWinners(fifaData, getFinals));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(data, getYearscb, getWinnerscb) {
    const outputArray = [];
    const years = getYearscb(data, getFinals);
    const winners = getWinnerscb(data, getFinals);
    for(let i=0;i<years.length;i++){
        outputArray.push(`In ${years[i]}, ${winners[i]} won the world cup!`)
    }
    return outputArray;
}

console.log("task 5", getWinnersByYear(fifaData, getYears, getWinners));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(getFinalsValue) {
    return getFinalsValue.reduce((acc, item, index) => ((acc*index)+item["Home Team Goals"]+item["Away Team Goals"])/(index+1), 0).toFixed(2);
}

console.log("task 6", getAverageGoals(getFinals(fifaData)));

/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, ti) { //ti=Team Initials
    const htg = "Home Team Goals"; //short-handing
    const atg = "Away Team Goals"; //^
    const hti = "Home Team Initials"; //^
    const ati = "Away Team Initials"; //^
    return getFinals(data).reduce((acc, obj)=>{if((obj[hti]===ti&&obj[htg]>obj[atg])||(obj[ati]===ti&&obj[atg]>obj[htg])){return acc+1;}else{return acc;}}, 0); //adds 1 if the team with the Team Initials got more points
}

// function getCountryWins(data, teamInitials) {
//     let wins = 0;
//     const finalsArray = getFinals(data);
//     for(let i=0;i<finalsArray.length;i++){
//         if(finalsArray[i]["Home Team Initials"]===teamInitials&&finalsArray[i]["Home Team Goals"]>finalsArray[i]["Away Team Goals"]){
//             wins++;
//         } else if(finalsArray[i]["Home Team Initials"]===teamInitials&&finalsArray[i]["Home Team Goals"]<finalsArray[i]["Away Team Goals"]){
//             wins++;
//         }
//     }
//     return wins;
// }

console.log("Stretch 1", getCountryWins(fifaData, "ITA"));

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
    const finalsArray = getFinals(data);
    const tg = {}; //Team Goals
    const tp = {}; //Team Played
    finalsArray.forEach(item => {
        let team1 = item["Home Team Name"];
        let team2 = item["Away Team Name"];
        let goals1 = item["Home Team Goals"];
        let goals2 = item["Away Team Goals"];
        if(!(team1 in tg)) tg[team1]=0;
        if(!(team2 in tg)) tg[team2]=0;
        if(!(team1 in tp)) tp[team1]=0;
        if(!(team2 in tp)) tp[team2]=0;
        tg[team1]+=goals1;
        tg[team2]+=goals2;
        tp[team1]++;
        tp[team2]++;
        // console.log(team1, tg[team1], ":", tp[team1], "  ", team2, tg[team2], ":", tp[team2]);
    });
    // console.log(tg);
    // console.log(tp);
    const tag = {}; // Team Average Goals
    for(const [key, value] of Object.entries(tg)){
        tag[key]=value/tp[key];
    }
    const highestValue = Math.max(...Object.values(tag));
    // console.log(tag, highestValue);
    return Object.keys(tag).filter(item => tag[item]===highestValue).join(" ");
}

console.log("Stretch 2:", getGoals(fifaData));

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
    const finalsArray = getFinals(data);
    const tg = {}; //Team Goals
    const tp = {}; //Team Played
    finalsArray.forEach(item => {
        let team1 = item["Home Team Name"];
        let team2 = item["Away Team Name"];
        let goals1 = item["Home Team Goals"];
        let goals2 = item["Away Team Goals"];
        if(!(team1 in tg)) tg[team1]=0;
        if(!(team2 in tg)) tg[team2]=0;
        if(!(team1 in tp)) tp[team1]=0;
        if(!(team2 in tp)) tp[team2]=0;
        tg[team1]+=goals2;
        tg[team2]+=goals1;
        tp[team1]++;
        tp[team2]++;
        // console.log(team1, tg[team1], ":", tp[team1], "  ", team2, tg[team2], ":", tp[team2]);
    });
    // console.log(tg);
    // console.log(tp);
    const tag = {}; // Team Average Goals
    for(const [key, value] of Object.entries(tg)){
        tag[key]=value/tp[key];
    }
    const highestValue = Math.max(...Object.values(tag));
    // console.log(tag, highestValue);
    return Object.keys(tag).filter(item => tag[item]===highestValue).join(" ");
}

console.log("Stretch 3:", badDefense(fifaData));

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */



/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}

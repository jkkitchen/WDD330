import { loadHeaderFooter } from "./functions.mjs";
import { observeUserLoginChanges, logoutUser } from "./auth.js";
import MockAPIData from "./mockAPI.mjs";
import StateCutDates from "./state-cut-dates.mjs";

//Call function to load headers and footers
loadHeaderFooter();


//Create a new instance of MockAPIData
//API ENDPOINT FROM MOCKAPI:
const stateDatesAPIendpoint = `https://692f280e91e00bafccd6c5d3.mockapi.io/swim-cut-check/state-dates`;

//State Meets Dates
const savedStateDates = new MockAPIData(stateDatesAPIendpoint);

//Create a new instance of StateCutDates
const stateCutDates = new StateCutDates(savedStateDates);

stateCutDates.init();

//Create an event listener for submit dates button
document.querySelector('#state-dates-submit').addEventListener("click", async (e) => {
    e.preventDefault();    
    await stateCutDates.saveDates();
})

//Create an event listener for update dates button
document.querySelector('#update-dates-button').addEventListener("click", async (e) => {
    document.querySelector('#state-dates-form').classList.remove('hide');
    document.querySelector('#dates-and-update-button').classList.add('hide');
})

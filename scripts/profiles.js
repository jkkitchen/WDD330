import { loadHeaderFooter } from "./functions.mjs";
import SwimmerProfiles from "./build-profiles.mjs";

//Call function to load headers and footers
loadHeaderFooter();

//Create a new instance of SwimmerProfiles
const newSwimmerProfiles = new SwimmerProfiles();
newSwimmerProfiles.init();

//Show/Hide New Swimmer Form
document.getElementById('.add-swimmer').addEventListener('click', () => {
    document.querySelector('.new-swimmer-form').classList.toggle('hide');
});

//Submit New Swimmer Profile button on form
document.getElementById('new-swimmer-submit').addEventListener('click', (event) => {
    event.preventDefault();
    const form = document.querySelector('.new-swimmer-form');
    newSwimmerProfiles.addSwimmerToAccount(form);
});
export default class StateCutDates {
    //CONSTRUCTOR
    constructor(dataSource) {
        this.dataSource = dataSource; //dataSource will be MockAPI
        this.dates = null;        
    }

    //METHODS
    async init() {
        const results = await this.dataSource.getDates();
        //Set this.dates value based on whether there is anything in dataSource (any dates are saved)     
        if (results.length > 0) {
            this.dates = results[0];
        } else {
            this.dates = null;
        }

        this.renderDates();
    }

    async renderDates() {
        //Get elements from state-cuts.html
        const displayDiv = document.querySelector('#dates-and-update-button');
        const form = document.querySelector('#state-dates-form');

        //Use if statement to determine if there are dates saved, or if this is the first time they are being entered
        if (this.dates) {
            //Show existing dates
            displayDiv.classList.remove('hide');
            form.classList.add('hide');
            displayDates(this.dates);
        } else {
            //Enter new dates in form, hide existing dates and update button
            displayDiv.classList.add('hide');
            form.classList.remove('hide');
        }             
    }
    
    async saveDates(form) {
        //Get form from html
        form = document.querySelector('#state-dates-form');
        //Get values from form, these are the values I assigned on MockAPI
        const shortCourse = form.querySelector('#short-course-date').value;
        const longCourse = form.querySelector('#long-course-date').value;
        //Create object containing the values
        const datesObject = { shortCourse, longCourse };

        //Update MockAPI
        let savedDates;
        if (this.dates) {
            //Udpate existing record
            savedDates = await this.dataSource.updateDates(this.dates.id, datesObject);
        } else {
            //Create new record
            savedDates = await this.dataSource.addDates(datesObject);
        }

        //Update local value
        this.dates = savedDates; //Now contains id assigned by MockAPI as well

        //Hide form and show updated dates
        document.querySelector('#dates-and-update-button').classList.remove('hide');
        document.querySelector('#state-dates-form').classList.add('hide');

        //Call function to render updated dates
        displayDates(this.dates);

        //Clear Form
        form.querySelector('#short-course-date').value = '';
        form.querySelector('#long-course-date').value = '';
    }
}

//GLOBAL FUNCTIONS
function displayDates(dates) {
    //Get div from html
    const datesDiv = document.querySelector('#existing-state-dates');

    //Clear div so dates are not shown more than once
    datesDiv.innerHTML = "";

    //Create new values to be added to div
    const scDate = document.createElement('p');
    scDate.classList.add('date-p');
    const lcDate = document.createElement('p');
    lcDate.classList.add('date-p');

    //Display content
    scDate.textContent = `Short Course: ${dates.shortCourse}`;
    lcDate.textContent = `Long Course: ${dates.longCourse}`;

    //Append to div
    datesDiv.appendChild(scDate);
    datesDiv.appendChild(lcDate);
}
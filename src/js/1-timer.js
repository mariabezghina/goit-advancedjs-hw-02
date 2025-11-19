import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



let userSelectedDate = null;

//Get refs to the "Start" button
const startButton = document.querySelector('[data-start]')
const datePickerInput = document.getElementById("datetime-picker");

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        
        const now = new Date();

        if (selectedDate.getTime() < now.getTime()) {
            
            // window.alert("Please choose a date in the future");
            iziToast.show({
            title: 'WARRNING',
            message: 'Please choose a date in the future',
            color: 'red', 
            position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            });
            startButton.disabled = true;
            
            userSelectedDate = null;

        } else {
            userSelectedDate = selectedDate;

            startButton.disabled = false;
            
            console.log("Valid date selected:", userSelectedDate);
        }
    }
};


flatpickr("#datetime-picker", options); 

startButton.addEventListener('click', () => {
   if (userSelectedDate) {
   
       timer.start();
       startButton.disabled = true;
       datePickerInput.disabled = true
       
   }
});


const timer = {
    intervalId: null,

    refs: {
        days: document.querySelector('[data-days]'),
        hours: document.querySelector('[data-hours'),
        minutes: document.querySelector('[data-minutes'),
        seconds: document.querySelector('[data-seconds'),
    },


    start() {
        this.intervalId = setInterval(() => {
        this.deadline = userSelectedDate;
        const diff = this.deadline - Date.now();
        if (diff <= 0) {
            this.stop();

            return
        }
        const {days, hours, minutes, seconds} = this.convertMs(diff)

        this.refs.days.textContent = this.padDoble(days);
        this.refs.hours.textContent = this.padDoble(hours);
        this.refs.minutes.textContent = this.padDoble(minutes);
        this.refs.seconds.textContent = this.padDoble(seconds);
        

        }, 1000)
    },

    stop() {
        clearInterval(this.intervalId)
        datePickerInput.disabled = false
    },

    convertMs(ms) {
    // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Remaining days
        const days = Math.floor(ms / day);
        // Remaining hours
        const hours = Math.floor((ms % day) / hour);
        // Remaining minutes
        const minutes = Math.floor(((ms % day) % hour) / minute);
        // Remaining seconds
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { 
            days, 
            hours, 
            minutes, 
            seconds };
        },

        padDoble(value) {
            return String(value).padStart(2, '0');
        },
}


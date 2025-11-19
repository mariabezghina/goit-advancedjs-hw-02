// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";




// A function that creates and returns a promise based on delay and state.
const createPromise = (delay, state) => {
  
  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};



const form = document.querySelector('.form');


form.addEventListener('submit', event => {
  
  event.preventDefault();

 
  const formData = new FormData(event.currentTarget);

  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  const promise = createPromise(delay, state);


  promise
    .then(resultDelay => {

      iziToast.show({
            message: `✅ Fulfilled promise in ${resultDelay}ms`,
            color: 'green', 
            position: 'topRight', 
            });
    })
    .catch(errorDelay => {
         iziToast.show({
            message: `❌ Rejected promise in ${errorDelay}ms`,
            color: 'red', 
            position: 'topRight', 
            });
    });
});
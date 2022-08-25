const url = 'https://api.adviceslip.com/advice';

const adviceText = document.getElementById('advice-text');
const adviceNo = document.getElementById('advice-no');
const btn = document.getElementById('btn');
let newAdvice = null;

btn.addEventListener('click', (e) => {
  if (!e.target.disabled) {
    getNewAdvice();
  }
});

const getNewAdvice = async () => {
  // Triggering loading function to show Loader and make that button
  // disabled so user can't make Multiple API calls while the data has been fetched
  triggerLoading();
  // Getting response of New Advice
  const newGeneratedAdvice = await generateAdvice();
  // Setting Local Variable to the data we just received
  newAdvice = newGeneratedAdvice;
  // Again triggering loading function to know the data has receieved and
  // make that button available for the future API calls
  triggerLoading();
  // Destructuring (id & ddvice) property from slip object
  const { id, advice } = newGeneratedAdvice.slip;
  // Passing (id & advice) to a function that will updated the DOM
  insertData(id, advice);
  // Setting the global variable to null
  newAdvice = null;
};

const insertData = (id, advice) => {
  adviceText.innerText = `"${advice}"`;
  adviceNo.innerText = id;
};

const generateAdvice = async () => {
  try {
    const response = await fetch(url, { cache: 'no-cache' });
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
};

const triggerLoading = () => {
  if (!newAdvice) {
    // If the global variale named 'newAdvice' is Null set the
    // button status as disabled and show loading animation
    btn.disabled = true;
    btn.firstElementChild.className = 'loading';
  } else {
    // If the global variale named 'newAdvice' is filled with
    // response then set the button status as available and
    // remove loading animation
    btn.disabled = false;
    btn.firstElementChild.classList.remove('loading');
  }
};

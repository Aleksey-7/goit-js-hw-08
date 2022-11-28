import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-message';
const formData = {};

populateFormData();

form.addEventListener('submit', onFormSubmit);
form.addEventListener(
  'input',
  throttle(e => {
    formData[e.target.name] = e.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, 500)
);

function onFormSubmit(e) {
  e.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    const parseData = JSON.parse(savedData);
    Object.entries(parseData).forEach(([name, value]) => {
      formData[name] = value;
      form.elements[name].value = value;
    });
  }
}

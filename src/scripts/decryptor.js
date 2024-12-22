document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const uid = form.uid.value;


    document.querySelector('#keyAppear').innerHTML = `<h3>Your Key: ${btoa(uid)}</h3>`;
  });
});
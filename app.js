
// for Dark-mode and Light-mode

const btn = document.querySelector('.dark-button');
btn.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
});


fetch('https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,languages,region,subregion,population,area,borders/posts')
.then (response => response.json())
.then (data => {
    console.log(data);
})

.catch(error => {
console.error("Error:, error");
})

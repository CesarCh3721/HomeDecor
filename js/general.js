
//menu responsive
const menu = document.querySelector('#bars-icon');
const navPrincipal = document.querySelector('.nav-principal');
menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navPrincipal.classList.toggle('active');
}

// mostrar la barra de busqueda
const searchForm = document.querySelector('.search-form');
const searchBtn = document.querySelector('#search-btn');
searchBtn.addEventListener('click', () => { searchForm.classList.toggle('active') });


 

 






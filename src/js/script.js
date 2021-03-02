{
  'use strict';

  const select = {
    templateOf: {
      templateBook: '#template-book', 
    },
    containerOf: {
      booksList: '.books-list',
      form: '.filters',
    },
    image: '.books-list .book__image',
  

  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
    
  };

  
  function render(){
    for(let book of dataSource.books){
      // generate html basen on template
      const generateHTML = templates.templateBook(book);
      console.log(book);
      // generate DOM element
      const  generateDOM = utils.createDOMFromHTML(generateHTML);
      console.log(generateDOM);
      //find books list
      const booksList = document.querySelector(select.containerOf.booksList);
      // add DOM element to books-list
      booksList.appendChild(generateDOM);

     
    }
  }
  
  const favoriteBooks = [];

  const allFilters = [];

  function initActions(){
    
    const filters = document.querySelector(select.containerOf.form);
    
    filters.addEventListener('click', function(event) {
      const clickedElement = event.target;

      if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter' ){
        console.log(clickedElement.value);
      }
      if(clickedElement.checked){
        allFilters.push(clickedElement.value);
        console.log(allFilters);
      } else {
        const indexOfAllFilters = allFilters.indexOf(clickedElement.value);
        allFilters.splice(indexOfAllFilters, 1);
        console.log(allFilters);
      }
      filterBooks();
    });

    const booksList = document.querySelectorAll(select.image);
    console.log(booksList);
    // for every element in bookList
    
      
    const allBooks = document.querySelector(select.containerOf.booksList);
    // add event listener on double click
    allBooks.addEventListener('click', function(event){
        
      event.preventDefault();
      const clickedElement = event.target.offsetParent;
      if(clickedElement.classList.contains('book__image')){
        const bookId = clickedElement.getAttribute('data-id');
        console.log(bookId);

        if(!clickedElement.classList.contains('favorite')){
          clickedElement.classList.add('favorite');
          favoriteBooks.push(bookId);
        } else {
          clickedElement.classList.remove('favorite');
          favoriteBooks.splice(favoriteBooks.indexOf(bookId));
        }
      }
    });
  }

  function filterBooks(){
    

    for(const book in dataSource.books){
      console.log(allFilters);
      let shouldBeHidden = false;

      for(const filter of allFilters) {
        if(!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden){
        const book = document.querySelector('book__image[data-id="' + book.id + '"]');
        book.classList.add('hidden');
      } else {
        book.classList.remove('hidden');
      }
      
    }
  }
  

  render();
  initActions();

 
}
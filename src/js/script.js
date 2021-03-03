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

      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = determineRatingwidth(book.rating);
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
    

    for(const element of dataSource.books){
      let shouldBeHidden = false;

      for(const filter of allFilters) {
        if(!element.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden){
        const book = document.querySelector('.book__image[data-id="' + element.id + '"]');
        book.classList.add('hidden');
      } else {
        const book = document.querySelector('.book__image[data-id="' + element.id + '"]');
        book.classList.remove('hidden');
      }
      
    }
  }

  function determineRatingBgc(rating){
    
    let background = '';

    if(rating < 6) { 
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) { 
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <=9) { 
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if(rating > 9) { 
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }

    return background;
  }

  function determineRatingwidth(rating){

    let Width = 0;

    if (rating > 1) {
      Width = 10;
    }
    if (rating > 2) {
      Width = 20;
    }
    if (rating > 3) {
      Width = 30;
    }
    if (rating > 4) {
      Width = 40;
    }
    if (rating > 5) {
      Width = 50;
    }
    if (rating > 6) {
      Width = 60;
    }
    if (rating > 7) {
      Width = 70;
    }
    if (rating > 8) {
      Width = 80;
    }
    if (rating > 9) {
      Width = 90;
    }
    if (rating > 10) {
      Width = 100;
    }

    return Width;
  }
  

  render();
  determineRatingBgc();
  determineRatingwidth();
  initActions();

 
}
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

  class BooksList {
    constructor(){
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.determineRatingBgc();
      thisBooksList.determineRatingwidth();
      thisBooksList.initActions();

    }
    initData(){
      const thisBooksList = this;

      thisBooksList.data = dataSource.books;
    }
    
    render(){
      const thisBooksList = this;

      for(let book of thisBooksList.data){

        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingWidth = thisBooksList.determineRatingwidth(book.rating);
        // generate html basen on template
        const generateHTML = templates.templateBook(book);
        console.log(book);
        // generate DOM element
        const  generateDOM = utils.createDOMFromHTML(generateHTML);
        console.log(generateDOM);
        
        // add DOM element to books-list
        thisBooksList.booksList.appendChild(generateDOM);

      }
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.booksList = document.querySelector(select.containerOf.booksList);
      thisBooksList.filters = document.querySelector(select.containerOf.form);
      //thisBooksList.bookImage = thisBooksList.element.querySelectorAll(select.image);

      thisBooksList.favoriteBooks = [];
      thisBooksList.allFilters = [];
    }
    


    initActions(){
      const thisBooksList = this;
      
      
      thisBooksList.filters.addEventListener('click', function(event) {
        const clickedElement = event.target;

        if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter' ){
          console.log(clickedElement.value);
        }
        if(clickedElement.checked){
          thisBooksList.allFilters.push(clickedElement.value);
          
        } else {
          const indexOfAllFilters = thisBooksList.allFilters.indexOf(clickedElement.value);
          thisBooksList.allFilters.splice(indexOfAllFilters, 1);
          
        }
        thisBooksList.filterBooks();
      });

      
      
      
      thisBooksList.booksList.addEventListener('click', function(event){
          
        event.preventDefault();
        const clickedElement = event.target.offsetParent;
        if(clickedElement.classList.contains('book__image')){
          const bookId = clickedElement.getAttribute('data-id');
          console.log(bookId);

          if(!clickedElement.classList.contains('favorite')){
            clickedElement.classList.add('favorite');
            thisBooksList.favoriteBooks.push(bookId);
          } else {
            clickedElement.classList.remove('favorite');
            thisBooksList.favoriteBooks.splice(thisBooksList.favoriteBooks.indexOf(bookId));
          }
        }
      });
    }

    filterBooks(){
      const thisBooksList = this;

      for(const element of dataSource.books){
        let shouldBeHidden = false;

        for(const filter of thisBooksList.allFilters) {
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

    determineRatingBgc(rating){
      

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

    determineRatingwidth(rating){

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
    

  }

  const app = {
    initializeProject: function(){
      new BooksList();
    }
  };

  app.initializeProject();
}
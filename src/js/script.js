{
  'use strict';

  const select = {
    templateOf: {
      templateBook: '#template-book', 
    },
    containerOf: {
      booksList: '.books-list',
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
  
  
  function initActions(){
    const favoriteBooks = [];
    const booksList = document.querySelectorAll(select.image);
    console.log(booksList);
    // for every element in bookList
    for(const book of booksList){
      // add event listener on double click
      book.addEventListener('dblclick', function(event){
        // add preventDefault
        event.preventDefault();
        // add class favorite
        book.classList.add('favorite');
        const bookId = book.getAttribute('data-id');
        console.log(bookId);
        favoriteBooks.push(bookId);
      });
      
    }
   
  }
  
  render();
  initActions();

 
}
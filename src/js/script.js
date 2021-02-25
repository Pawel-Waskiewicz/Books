{
  'use strict';

  const select = {
    templateOf: {
      templateBook: '#template-book', 
    },
    panel: {
      booksPanel: '.books-panel',
    },
    containerOf: {
      booksList: '.books-list',
    },
    image: '.books-list .book-image',
  

  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
    //booksPanel: Handlebars.compile(document.querySelector(select.panel.booksPanel).innerHTML),
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

  function initActions(){
    const booksList = document.querySelectorAll(select.image);

    for(let book of booksList){
      book.addEventListener('dblclick', function(event){
        event.preventDefault();
        book.classList.add('favorite');
        const bookId = book.getAttribute('data-id');

        favoriteBooks.push(bookId);
      });
      console.log(book);
    }
  
  }
 
  render();
  initActions();
}
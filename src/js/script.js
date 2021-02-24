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
      bookImage: 'book__image',
    },

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
  /*
  const favouriteBooks = [];

  function initActions(){
    const booksList = document.querySelector(select.containerOf.booksList);

    for(let book of booksList){
      book.addEventListener('dbclick', function(event){
        event.preventDefault();

      });
      console.log(book)
    }
  }
 */
  render();

  
}
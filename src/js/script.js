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
  
  const favoriteBooks = [];

  function initActions(){
    
    const booksList = document.querySelectorAll(select.image);
    console.log(booksList);
    // for every element in bookList
    //for(const book of booksList){
      
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
  
  render();
  initActions();

 
}
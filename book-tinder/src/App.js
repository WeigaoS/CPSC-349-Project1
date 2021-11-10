/*
    CPSC 349 Project 1: Full-stack webpage 

    Team Name: Barry and the Otters
    Team Leader: Lloyd Blazina
    Team Members: Weigao Sun, Quauhtli Garcia-Brindis
    Project Name: Bookinder
    Project Type: Users can swipe left or right on other people’s reading material (think “Tinder for Books”, or perhaps Intellectual or not)

*/

import { useState, useEffect } from 'react';                      // Using react's built in states allows for elements to be rerendered 
                                                                  // if the state changes
import Modal from "./components/Modal";                           // Modal component
import ModalBackground from "./components/ModalBackground";       // Modal backdrop
import BookList from './components/BookList';                     // Maps the passed in data from the database into a book item to be displayed
import SiteHeader from './components/SiteHeader';                 // Website header, currently only contains a logo
import classes from '../src/components/Likebuttons.module.css';   // CSS used mainly on the main page with the positioning of the buttons
import dlbutton from '../src/images/trash.png';                   // Trash can button image
import lbutton from '../src/images/smart.png';                    // Einstein button image

function App() {
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(true);

  // Network states for loading and pushing data
  const [refreshBooks, setRefreshBooks] = useState(false);
  const [bookIsLoading, setBookIsLoading] = useState(true);
  const [booksLoaded, setBooksLoaded] = useState([]);
  const [swipped, setSwipped] = useState(false);

  // Determines which book to display from the book list array
  const [bookSelected, setBookSelected] = useState(-1);

  // Closes the Modal
  function closeHandler(){
    setModalOpen(false);
    setRefreshBooks(true);
  }

  // Opens the Modal
  function openHandler(){
    setModalOpen(true);
  }

  //Load in our books. This will run only once because of the empty [] at the end of it
  useEffect(()=> {
    setBookIsLoading(true);
    fetch('https://react-books-a8d9a-default-rtdb.firebaseio.com/books.json')
    .then(response => {
      return response.json();
    }).then(data => {
      const books = [];

      // Map each element from the data in the database to a book array
      for (const key in data){
        const book = {
          id: key,
          ...data[key]
        };
        books.push(book);
      }

      // When finished, update these states so that page is rerendered accordingly
      setBookIsLoading(false);
      setBooksLoaded(books);
      setBookSelected(books.length-1);
      console.log(books);
    });
  }, [refreshBooks]);


  // Pushes an update to the database if user liked a book
  function updateLikesHandler() {
    if(booksLoaded){
    const temp_book = booksLoaded[bookSelected];
    temp_book.likes = temp_book.likes + 1;
    console.log(temp_book);
    
    fetch('https://react-books-a8d9a-default-rtdb.firebaseio.com/books.json',
    {
        method: 'PUT',
        body: JSON.stringify(booksLoaded),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() =>{
        setBookSelected(bookSelected-1);
        setSwipped(!swipped);
    });
    
    }
  }

  // Pushes an update to the database if user disliked a book
  function updateDislikesHandler() {
    if(booksLoaded){
    const temp_book = booksLoaded[bookSelected];
    temp_book.dislikes = temp_book.dislikes + 1;
    console.log(temp_book);
    
    fetch('https://react-books-a8d9a-default-rtdb.firebaseio.com/books.json',
    {
        method: 'PUT',
        body: JSON.stringify(booksLoaded),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() =>{
        setBookSelected(bookSelected-1);
        setSwipped(!swipped);
    });
    
    }
  }

  // If our site is in the process of pulling in data, it will only display "Loading..."
  if(bookIsLoading){
    return(
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  // Displayed message when the book list has been exhausted. Will also display if no books can be loaded
  if(bookSelected <= -1)
  {
    return(
      <section>
         <SiteHeader />
        <section className={classes.outOfBooks}>
          <p>We're all out of books! Refresh the page to start over or click the button to add a new book.</p>
          <button onClick={openHandler}>Add New Book</button>
        </section>
        {modalOpen && <Modal onClose={closeHandler} />}
        {modalOpen && <ModalBackground onClose={closeHandler}/>}
      </section>
    );
  }

  //Default site
  return (
    <div>
      <SiteHeader />
        
      {modalOpen && <Modal onClose={closeHandler} />}
      {modalOpen && <ModalBackground onClose={closeHandler}/>}

      <BookList books={booksLoaded[bookSelected]}/>
      <section className={classes.likebuttons}>
          <div onClick={updateDislikesHandler}><img src={dlbutton} alt="Dislike"/></div>
          <div onClick={updateLikesHandler}><img src={lbutton} alt="Like"/></div>
      </section>
    </div>
  );
}

export default App;

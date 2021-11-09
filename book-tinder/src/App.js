import { useState, useEffect } from 'react';
import Modal from "./components/Modal";
import ModalBackground from "./components/ModalBackground";
import BookList from './components/BookList';
import SiteHeader from './components/SiteHeader';
import classes from '../src/components/Likebuttons.module.css';
import dlbutton from '../src/images/trash.png';
import lbutton from '../src/images/smart.png';

function App() {
  const [modalOpen, setModalOpen] = useState(true);
  const [refreshBooks, setRefreshBooks] = useState(false);
  const [bookIsLoading, setBookIsLoading] = useState(true);
  const [booksLoaded, setBooksLoaded] = useState([]);
  const [swipped, setSwipped] = useState(false);
  const [bookSelected, setBookSelected] = useState(-1);

  function closeHandler(){
    setModalOpen(false);
    setRefreshBooks(true);
  }

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

      for (const key in data){
        const book = {
          id: key,
          ...data[key]
        };

        books.push(book);
      }

      setBookIsLoading(false);
      setBooksLoaded(books);
      setBookSelected(books.length-1);
      console.log(books);
    });
  }, [refreshBooks]);


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

  //Make this look pretty
  if(bookIsLoading){
    return(
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  //Message for when we're out of books to display
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

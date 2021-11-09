// This is the component that will display when the modal is set to true.
// The modal acts as a landing page and allows the user to add a new book to the database

import { useRef }from 'react';

import classes from './Modal.module.css';
import logo from '../images/bookinder-logo.png';

function Modal(props){
    const bookTitleInputRef = useRef();
    const bookAddressInputRef = useRef();

    function closeHandler(){
        props.onClose();
    }

    // Handles the structure of our book that will be pushed and pulled from the database
    function submitHandler(event){
        event.preventDefault();

        const enteredBookTitle = bookTitleInputRef.current.value;
        const enteredBookAddress = bookAddressInputRef.current.value;
        const zeroLikes = 0;
        const zeroDislikes = 0;

        const bookData = {
            title: enteredBookTitle,
            image: enteredBookAddress,
            likes: zeroLikes,
            dislikes: zeroDislikes
        };

        addNewBookHandler(bookData);
    }

    //Function that sends data to the firebase database then closes modal when the promise returns success
    function addNewBookHandler(bookData) {
        fetch('https://react-books-a8d9a-default-rtdb.firebaseio.com/books.json',
        {
            method: 'POST',
            body: JSON.stringify(bookData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() =>{
            //We've sent the new book data. Close our modal
            closeHandler();
        });
    }

    return (
        <form onSubmit={submitHandler} className={classes.modal}>
            <h3>Welcome to Bookinder!</h3>
            <hr/>
            <img src={logo} alt="Bookinder"/>
            <p>Enter in the name of a book and the image url to get started. Otherwise, click outside this box if you do not wish to upload a new book.</p>
            <div className={classes.control}>
                <label htmlFor="title">Book Title</label>
                <input type="text" required id="title" ref={bookTitleInputRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="image">Book Image URL</label>
                <input type="url" required id="image" ref={bookAddressInputRef}/>
            </div>
            <button onNewBook={submitHandler}>SUBMIT</button>
            <button onClick={closeHandler}>CLOSE</button>
        </form>
    );
}

export default Modal;
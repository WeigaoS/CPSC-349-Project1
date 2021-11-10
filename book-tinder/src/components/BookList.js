import BookItem from "./BookItem";
import classes from './BookList.module.css';


function BookList(props){

    const book = props.books;

    return (
        <ul className={classes.list}>
            
            <BookItem 
                key={book.id}
                id={book.id}
                title={book.title}
                image={book.image}
                likes={book.likes}
                dislikes={book.dislikes}
            />

        </ul>
    );
}
export default BookList;
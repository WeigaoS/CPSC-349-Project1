import Card from "./Card";
import classes from "./BookItem.module.css";

function BookItem(props) {
    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <img src={props.image} alt={props.title}/>
                </div>
                <div className={classes.content}>
                    <h3>{props.title}</h3>
                    <h3>Likes: {props.likes}</h3>
                    <h3>Dislikes: {props.dislikes}</h3>
                </div>
            </Card>
        </li>
    );
}
export default BookItem;
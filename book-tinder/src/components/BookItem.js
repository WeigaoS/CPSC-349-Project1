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
                    <h2>{props.title}</h2>
                    <h3>Intelligent: {props.likes}</h3>
                    <h3>Not: {props.dislikes}</h3>
                </div>

            </Card>
        </li>
    );
}
export default BookItem;
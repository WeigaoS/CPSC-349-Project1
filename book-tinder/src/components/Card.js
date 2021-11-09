import classes from './Card.module.css';
//import likeButton from '../images/like.png';
//import dislikeButton from '../images/dislike.png';

function Card(props) {
    return (
        <div>
            <div className={classes.card}>
                {props.children}
            </div>
        </div>
    );
}
export default Card;
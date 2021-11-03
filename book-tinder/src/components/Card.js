import classes from './Card.module.css';
import likeButton from '../images/like.png';
import dislikeButton from '../images/dislike.png';


function Card(props) {
    return (
        <div>
            
            <div className={classes.card}>
                {props.children}
            <div className={classes.buttonRow}>

                <ul className={classes.navUl}>
                    <li className={classes.navLi}><img src={likeButton} alt="Like"/></li>
                    <li className={classes.navLi}><img src={dislikeButton} alt="Dislike"/></li>
                </ul>
                </div>
            </div>
        </div>
    );
}
export default Card;
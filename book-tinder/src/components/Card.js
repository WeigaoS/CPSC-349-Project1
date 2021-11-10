import classes from './Card.module.css';

//Card container. {props.children} displays all contents that were passed in via props
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
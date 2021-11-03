import classes from './ModalBackground.module.css';

function ModalBackground(props) {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}
export default ModalBackground;
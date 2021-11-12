import { useState} from 'react';    
import classes from "./LoginModel.module.css";
import ModalBackground from "./ModalBackground"; 
import loginjpg from '../images/login.jpg';   
function LoginModel() {
    const [LoginModelShow, setLoginModelShow] = useState(false);


    function showLogin() {
        console.log(123)
        setLoginModelShow(true);
    }
    function closeLogin() {
        setLoginModelShow(false);
    }
    return (
        <>
            <span>
                <span onClick={showLogin} style={{'fontSize': '18px','cursor':'pointer'}}>Login</span>
            </span>
            {LoginModelShow && 
                <div className={[`${classes.modal}`,`${classes.fade}`].join(' ')}>
                    <div className={classes.modalDialog}>
                        <div className={classes.modalContent}>
                            <div className={classes.modalHeader}>
                            <h5 className={classes.modalTitle} id="modal-loginLabel">Login</h5>
                            <button type="button" className={classes.close} onClick={closeLogin} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            
                            <form action="action_page.php" method="post">
                                <div className={classes.imgcontainer}>
                                    <img src={loginjpg} alt="USER" className={classes.avatar} style={{'width':'100px','height':'100px'}} />
                                </div>
                                <div className={classes.container}>
                                    <label htmlFor="uname"><b>Username</b></label>
                                    <input type="text" placeholder="Please Enter Username" name="uname" required />
                                    <label htmlFor="psw"><b>Password</b></label>
                                    <input type="password" placeholder="Please Enter Password" name="psw" required />
                                    <button type="submit">Login</button>
                                    <label>
                                        <input type="checkbox" /> Remember me
                                    </label>
                                </div>
                                <div className={classes.container} style={{'backgroundColor':'rgb(206, 66, 245)'}}></div>
                                {/* <button type="button" className={classes.cancelbtn}>Cancel</button> */}
                                <div style={{'padding':'20px'}}>
                                    <span className={classes.psw}>Forgot <a href="123.htm">password?</a></span>
                                </div>
                                
                            </form>

                        </div>
                    </div>
                </div>
                
            }
            {LoginModelShow && <ModalBackground />}
        </>
    );
}
export default LoginModel;
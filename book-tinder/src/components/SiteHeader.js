import logo from '../images/bookinder-logo.png';

import LoginModel from "./LoginModel";
//import chat from '../images/chat.png';
function SiteHeader()
{
    return(
        <section>
            <div style={{'display':'flex', 'padding':'0 15px'}}>
                <div style={{'flex':1}}>
                    <img src={logo} alt='Logo' width='100px' height='100px'/>
                </div>
                <div style={{'flex':1,'textAlign':'right'}}>
                    <LoginModel />
                </div>
            </div>
            
        </section>
    );

}

export default SiteHeader;
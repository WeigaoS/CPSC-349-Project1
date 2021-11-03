import logo from '../images/bookinder-logo.png';
//import chat from '../images/chat.png';
function SiteHeader()
{
    return(
        <section>
            <img src={logo} alt='Logo' width='100px' height='100px'/>
        </section>
    );

}
export default SiteHeader;
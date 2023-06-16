import '../App.css';
import { MDBFooter } from "mdbreact";

function Footer() {
  return (
    <MDBFooter className="font-small pt-2 mt-5 stick-bottom">
        &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> CastlePlanner </a>
  </MDBFooter>
  );
}

export default Footer;
import { Container, Nav } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { AppState } from '../../redux/appState';
import './NavigationBar.css'


function NavigationBar () {
  let currentUserDetails = useSelector((state: AppState) => state.currentUserDetails);
  let currentUserType = currentUserDetails.userType;
  let navigate = useNavigate();
    
  let onRegisterClick = (() =>{
    navigate('/RegisterModal');
  })

  let onLoginClick = (() =>{
    navigate('/LoginModal');
  })
 

return(
  <Navbar bg="danger" variant="dark">
      <Container>
        <Nav className="me-auto">
        {currentUserType == "guest" && (<Nav.Link className="nav-link" onClick={onLoginClick}>Login</Nav.Link>)}
        {currentUserType == "guest" && (<Nav.Link className="nav-link" onClick={onRegisterClick}>Register</Nav.Link>)}
        </Nav>
        <h6 className="navbar-text">Now on Sale: Travel to London Only for 200$!!!</h6>
      </Container>
    </Navbar>
)
}

export default NavigationBar
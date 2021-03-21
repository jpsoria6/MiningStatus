import React from 'react'
import {Nav} from 'react-bootstrap'

class NavBar extends React.Component {
  

    render() { 
        const styles = {
            color : '#FFFFFF'
        }
        return (  
            <Nav className="justify-content-center mb-5 bg-primary" >
            <Nav.Item>
              <Nav.Link style={styles}>Mineros</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link style={styles} >Pagos</Nav.Link>
            </Nav.Item>
          </Nav>  
        );
    }
}
 
export default NavBar;
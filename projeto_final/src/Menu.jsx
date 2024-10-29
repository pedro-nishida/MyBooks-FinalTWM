import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '/livro.png'
import 'bootstrap/dist/css/bootstrap.min.css';

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed='top'>
      <Container>
        <Navbar.Brand href="/home">
        <img
            src={logo}
            alt="Mybook Logo"
            width="40" 
            height="35" 
            className="d-inline-block align-top"
          />
          {" "} 
          Mybook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="\home">Home</Nav.Link> 

            <NavDropdown title="Cadastro" id="basic-nav-dropdown">
              <NavDropdown.Item href="/lidos">
                Cadastro de Livros Lidos
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/desejados">
                Cadastro de Livros Desejados
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="biblioteca">Biblioteca</Nav.Link> 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
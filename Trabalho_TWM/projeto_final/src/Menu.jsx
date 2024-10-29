import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '/de.png'
import 'bootstrap/dist/css/bootstrap.min.css';

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed='top'>
      <Container>
        <Navbar.Brand href="/home">
        <img
            src={logo}
            alt="Delta Logo"
            width="40" 
            height="35" 
            className="d-inline-block align-top"
          />
          {" "} 
          Delta Company</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="\home">Home</Nav.Link> 

            <NavDropdown title="Clientes" id="basic-nav-dropdown">
              <NavDropdown.Item href="/cliente">
                Cadastro de Clientes
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/chamado">
                Envio de Chamado
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Técnicos" id="basic-nav-dropdown">
              <NavDropdown.Item href="/tecnico">
                Cadastro de Técnicos
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/relato">
                Realizar Relato
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="produto">Produtos</Nav.Link> 
            <Nav.Link href="ordem_servicos">Ordem de Serviços</Nav.Link> 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
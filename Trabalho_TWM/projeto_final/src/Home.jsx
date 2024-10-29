import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Home.css'; // Arquivo CSS para estilização

function HomePage() {
  return (
    <div>
      {/* Navbar no topo da página */}

      {/* Seção de boas-vindas */}
      <Container fluid className="hero-section">
        <Row>
          <Col>
            <h1>Bem-vindo à Delta</h1>
            <p>Descubra nossos produtos e serviços de alta qualidade.</p>
          </Col>
        </Row>
      </Container>

      {/* Seções para informações adicionais */}
      <Container className="info-section">
        <Row>
          <Col>
            <h2>Sobre Nós</h2>
            <p>
              Nossa empresa tem uma equipe dedicada e anos de experiência. Estamos aqui para
              oferecer o melhor para nossos clientes.
            </p>
          </Col>
          <Col>
            <h2>Contato</h2>
            <p>
              Se precisar de assistência ou tiver perguntas, entre em contato conosco.
              email: delta@delta.com.br
            </p>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;

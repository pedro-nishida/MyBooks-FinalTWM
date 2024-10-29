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
            <h1>Bem-vindo à Mybook</h1>
            <p>Aqui você gerencia os livros que você já leu ou em andamento ou deseja, e tenha sugestões em base a suas avaliações.</p>
          </Col>
        </Row>


      </Container>
            {/* Seções para informações adicionais */}
            <Container className="info-section" fixed='down'>
        <Row>
          <Col>
            <h2>Sobre Nós</h2>
            <p>
              Estudantes de tecnologia e apaixonados por livros, buscamos soluções para facilitar o hobbies para todos os leitores.
            </p>
          </Col>
          <Col>
            <h2>Contato</h2>
            <p>
              Se precisar de assistência ou tiver perguntas, entre em contato conosco.
              email: suporte@mybook.com.br
            </p>
            
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default HomePage;

import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductDisplay from './components/ProductDisplay.js'
import NavbarHead from './components/NavbarHead.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import pla from './images/pla.jpg'

function App() {
  return (
    <div>
      <NavbarHead/>
      <Container>
        <Row className = "mt-4">
          <Col md={3}><ProductDisplay img = {pla} name = "Black Filament" qty = "3" date = "07/31/2020"/></Col>
          <Col md={3}><ProductDisplay img = {pla} name = "Black Filament" qty = "3" date = "07/31/2020"/></Col>
          <Col md={3}><ProductDisplay img = {pla} name = "Black Filament" qty = "3" date = "07/31/2020"/></Col>
          <Col md={3}><ProductDisplay  img = {pla} name = "Black Filament" qty = "3" date = "07/31/2020"/></Col>
        </Row>
        <Row className = "mt-4">
          <Col md={3}><ProductDisplay img = {pla} name = "Black Filament" qty = "3" date = "07/31/2020"/></Col>
          <Col md={3}><ProductDisplay img = {pla} name = "Black Filament" qty = "3" date = "07/31/2020"/></Col>
          <Col md={3}><ProductDisplay img = {pla} name = "Black Filament" qty = "3" date = "07/31/2020"/></Col>
          <Col md={3}><ProductDisplay  img = {pla} name = "Black Filament" qty = "3" date = "07/31/2020"/></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

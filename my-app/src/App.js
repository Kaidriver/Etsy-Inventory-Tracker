import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container'
import ProductDisplay from './components/ProductDisplay.js'
import NavbarHead from './components/NavbarHead.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import pla from './images/pla.jpg'

function App() {
  return (
    <div>
      <NavbarHead/>
      <Container>
        <div class = "all-products">
          <ProductDisplay img = {pla} name = "Black Filament" qty = "3"/>
          <ProductDisplay img = {pla} name = "Black Filament" qty = "3"/>
          <ProductDisplay img = {pla} name = "Black Filament" qty = "3"/>
          <ProductDisplay img = {pla} name = "Black Filament" qty = "3"/>
        </div>
      </Container>
    </div>
  );
}

export default App;

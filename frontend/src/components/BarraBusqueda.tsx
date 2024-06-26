import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
/*Bootstrap */
import { Navbar, Nav, Container } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext.jsx';
import Dropdown from 'react-bootstrap/Dropdown';
/*Iconos */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart,faBars,faShirt} from '@fortawesome/free-solid-svg-icons';
/* estilos */
import './BarraBusqueda.css';

function CustomToggle({ children, onClick }) {
  return (
    <Nav.Link
      onClick={
        (e) => {
          e.preventDefault();
          onClick(e);
        }
      }/*evento */
      style={{ padding: '0.5rem 1rem' }}/*estilo*/
    >
      {children}
    </Nav.Link>
  );
}

interface Props {
  loggedInUser: any; // Tipo del usuario autenticado, ajusta según tu implementación
}

const BarraBusqueda: React.FC<Props> = ({ loggedInUser }) => {
  const { logout } = useContext(AuthContext); // Assuming logout is defined in AuthContext

  const handleLogout = () => {
    // Elimina el token de autenticación del almacenamiento local
    localStorage.removeItem('token');
    logout(); // Assuming logout is a function in AuthContext
    window.location.href = '/login'; // Redirect to login after logout
  };

  /*empieza la entrega de la navbar */
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="Navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ padding: 0 }}>{/*esta es la marca, brand*/}
          <img
            src="/images/ElsaVal_Logo.png"
            alt="Logo"
            style={{ width: '60px', height: 'auto'/*, borderRadius: '50%' */}}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
            <FontAwesomeIcon icon={faBars} className='IconosNavbar'/>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className='Navbar_Collapse'>
          <Nav className="ml-auto">
            {loggedInUser ? (/*Si el usuario esta logeado */
              <>
                <Nav.Link as={Link} to="/Acercade" className='LinkNav'>Acerca de</Nav.Link>
                <Nav.Link as={Link} to="/categories" title="Nuestros Productos" className='LinkNav'>
                    <FontAwesomeIcon icon={faShirt} className='IconosNavbar' />
                </Nav.Link>
                <Nav.Link as={Link} title="Ir al Carrito" to="/CarritodeCompras" className='LinkNav'>
                  <FontAwesomeIcon icon={faShoppingCart} className='IconosNavbar'/>
                </Nav.Link>

                <Dropdown className="Navbar-dropdown" align="end">
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    <FontAwesomeIcon title="Mi Cuenta" icon={faUser} className='IconosNavbar'/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="DropdownMenu">
                    <Dropdown.Item as={Link} to="/Detalles" className="DropdownItem">Información de la Cuenta</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/HistorialOrdenes" className="DropdownItem">Historial de Órdenes</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout} className="DropdownItem">Cerrar Sesión</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/Acercade" className='LinkNav'>Acerca de</Nav.Link>
                <Nav.Link as={Link} to="/categories" title="Nuestros Productos" className='LinkNav'>
                    <FontAwesomeIcon icon={faShirt} className='IconosNavbar' />
                </Nav.Link>
                <Nav.Link as={Link} title="Iniciar Sesión" to="/Login">
                  <FontAwesomeIcon icon={faUser} className='IconosNavbar' />
                </Nav.Link>
                <Nav.Link as={Link} title="Ir al Carrito" to="/CarritodeCompras" className='LinkNav'>
                  <FontAwesomeIcon icon={faShoppingCart} />
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BarraBusqueda;
import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className='text-center text-white' style={{ backgroundColor: '#343a40', padding: '1rem 0' }}>
            <Container className='p-4'>
                <section className='mb-4'>
                    <Button variant="outline-light" className='m-1' href='#!'>
                        <FaFacebookF />
                    </Button>
                    <Button variant="outline-light" className='m-1' href='#!'>
                        <FaTwitter />
                    </Button>
                    <Button variant="outline-light" className='m-1' href='#!'>
                        <FaGoogle />
                    </Button>
                    <Button variant="outline-light" className='m-1' href='#!'>
                        <FaInstagram />
                    </Button>
                    <Button variant="outline-light" className='m-1' href='#!'>
                        <FaLinkedinIn />
                    </Button>
                    <Button variant="outline-light" className='m-1' href='#!'>
                        <FaGithub />
                    </Button>
                </section>

                <section className='mb-4'>
                    <p>
                        Descubre la belleza y calidez de nuestros productos tejidos a crochet. Desde hermosos bolsos y prendas de vestir hasta acogedores accesorios para el hogar, cada pieza está hecha con amor y cuidado artesanal. ¡Explora nuestra colección y encuentra tu próxima pieza favorita!
                    </p>
                </section>

                <section className=''>
                    <Form>
                        <Row className='d-flex justify-content-center'>
                            <Col md="auto">
                                <p className='pt-2'>
                                    <strong>Entérese de nuestras novedades</strong>
                                </p>
                                <Form.Group controlId="formEmail" className="d-flex">
                                    <Form.Control type='email' placeholder='Dirección de correo electrónico' className='mb-2' />
                                    <Button variant='outline-light' type='submit' className='mb-2'>
                                        Enviar
                                    </Button>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </section>

                <section className='mt-4'>
                    <Row>
                        <Col md='5'>
                            <p>
                                Av. Los Rosales 122, 28021, Lima <br />
                                Email: info@misitio.com <br />
                                Tel.: 1-800-000-000 <br />
                            </p>
                        </Col>
                        <Col md='4'>
                            <h5 className='text-uppercase'>Enlaces</h5>
                            <ul className='list-unstyled'>
                                <li>
                                    <a href='#!' className='text-white'>Tienda</a>
                                </li>
                                <li>
                                    <a href='#!' className='text-white'>Acerca de</a>
                                </li>
                                <li>
                                    <a href='#!' className='text-white'>Blog</a>
                                </li>
                                <li>
                                    <a href='#!' className='text-white'>Dónde comprar</a>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </section>
            </Container>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2024 Copyright:
                <a className='text-white' href='https://example.com/'>
                    Elsa Val
                </a>
            </div>
        </footer>
    );
}

import {Col, Nav, Navbar, Row} from "react-bootstrap";

export default function NavBar()  {
    return (<>
        <Navbar className={'p-3'}>
            <Navbar.Brand>HyGrav</Navbar.Brand>
            <Navbar.Collapse>
                <Nav>
                    <Nav.Link href={'/history'}>History</Nav.Link>
                </Nav>
                <Row className={'w-100'}>
                    <Col>

                    </Col>
                    <Col  className="justify-content-end text-end">
                        {/*<Button variant={'secondary'}>Sign in</Button>
                      <Button>Sign up</Button>*/}

                    </Col>
                </Row>
            </Navbar.Collapse>
        </Navbar>
        </>)
    
}
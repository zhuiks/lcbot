import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

interface LoginProps {
    loginAction: () => void;
}

const Login: React.FC < LoginProps > = ({loginAction}) => (
    <Row className="h-100 justify-content-center align-items-center text-center" style={{ minHeight: "100vh", marginTop: "-7rem" }}>
        <Col sm={6}>
            <p>You must log in to view the page</p>
            <Button size="lg" onClick={()=>loginAction()}>Log in</Button>
        </Col>
    </Row>
)

export default Login;
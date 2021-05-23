import React, { useState, useEffect } from 'react';
import { Form, Container, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('JwtToken'));
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token || jwtToken) {
      history.push('/upload');
    }
  }, [history, token, jwtToken]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('/login', { email, password }, config);
      if (data) {
        localStorage.setItem('JwtToken', data);
        setJwtToken(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async (googleData) => {
    setToken(googleData.tokenId);
    localStorage.setItem('token', token);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/verify', { token }, config);
    if (res.status === 200) {
      history.push('/upload');
    }
  };
  const handleLoginFailure = async () => {
    setMessage('Google Login Failed');
    history.push('/login');
  };

  return (
    <Container className='mt-5'>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={4}>
          <Form onSubmit={onSubmitHandler}>
            {message && <Alert variant='danger'>{message}</Alert>}
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type='email'
                value={email}
                placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type='password'
                value={password}
                placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' className='my-3'>
              Login
            </Button>
          </Form>

          <GoogleLogin
            clientId='53514777365-iiktvu30m7sop4781phc8gjvgdoq4c4n.apps.googleusercontent.com'
            buttonText='Log in with Google'
            onSuccess={handleLogin}
            onFailure={handleLoginFailure}
            cookiePolicy={'single_host_origin'}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

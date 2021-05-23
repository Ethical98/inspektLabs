import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import { Row, Col, Alert, Form, Container, Button } from 'react-bootstrap';

const UploadScreen = ({ history }) => {
  const formData = new FormData();
  const [file, setFile] = useState('');

  const [url, setUrl] = useState('');
  const [logged, setLogged] = useState(false);
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('JwtToken'));
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token && !jwtToken) {
      setMessage('Not Authorized!! Please Login');
    } else if (!token) {
      getVerified();
      setJwtToken(localStorage.getItem('JwtToken'));
    } else {
      verifyoauth();
      setToken(localStorage.getItem('token'));
    }
  }, [token]);

  const getVerified = async () => {
    try {
      const { data } = await axios.get('/verifyJwt', {
        headers: {
          Authorization: 'Bearer ' + jwtToken,
        },
      });

      if (data) {
        setLogged(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verifyoauth = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post('/verify', { token }, config);
      if (res.status === 200) {
        setLogged(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFile = async (e) => {
    e.preventDefault();

    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try {
      const res = await axios.post('/upload', formData, config);
      if (res.data.url) {
        history.push(res.data.url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logoutHandler = () => {
    if (token) {
      localStorage.removeItem('token');
      setLogged(false);
      setMessage('');
    } else {
      localStorage.removeItem('JwtToken');
      setLogged(false);
      setMessage('');
    }
  };
  return (
    <Container className='mt-5' fluid>
      {!logged || message ? (
        <div>{message && <Alert variant='danger'>{message}</Alert>}</div>
      ) : (
        <Row className='justify-content-md-center'>
          <Col xs={12} md={4}>
            <Form onSubmit={uploadFile}>
              <Form.Group>
                <Form.File
                  type='submit'
                  id='uploadImage'
                  label='Upload Car Image'
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Form.Group>

              <Button type='submit'>Upload</Button>
            </Form>
            <Button className='my-3' onClick={logoutHandler}>
              Log Out
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default UploadScreen;

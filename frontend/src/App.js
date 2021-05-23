import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './Screens/Login';
import UploadedScreen from './Screens/UploadedScreen';
import UploadScreen from './Screens/UploadScreen';

function App() {
  return (
    <Container>
      <Router>
        <Route path='/uploads' component={UploadedScreen} />
        <Route path='/upload' component={UploadScreen} />

        <Route path='/' component={Login} exact />
      </Router>
    </Container>
  );
}

export default App;

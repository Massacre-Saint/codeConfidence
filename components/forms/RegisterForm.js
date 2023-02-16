import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { registerUser } from '../../utils/data';

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    displayName: '',
    firstName: '',
    lastName: '',
    imageUrl: user.photoURL,
    email: '',
    bio: '',
    uid: user.uid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <div className="half-hero_container">
      <div className="form-container">
        <h1>Create An Account</h1>
        <p>By creating an account, you will be allowed to begin your journey.</p>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Display Name</Form.Label>
                <Form.Control name="displayName" required placeholder={user.displayName} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" required placeholder={user.displayName.split(' ')[0]} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="lastName" required placeholder={user.displayName.split(' ')[1]} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" required placeholder={user.email} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Bio</Form.Label>
            <Form.Control as="textarea" name="bio" required placeholder="Enter your Bio" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'next/image';
import MediaQuery from 'react-responsive';
import { registerUser } from '../../utils/data';
import AuthenticationButton from '../buttons/Authentication';

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    displayName: user.displayName,
    firstName: user.displayName.split(' ')[0],
    lastName: user.displayName.split(' ')[1],
    imageUrl: user.photoURL,
    email: user.email,
    bio: '',
    uid: user.uid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };
  useEffect(() => {

  }, [formData]);
  return (
    <>
      <MediaQuery maxWidth={1024}>
        <div className="register-container">
          <div className="form-container">
            <AuthenticationButton />
            <h1>Create An Account</h1>
            <p className="fnt-secondary margin-btm">By creating an account, you will be allowed to begin your journey.</p>
            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Display Name</Form.Label>
                <Form.Control name="displayName" value={formData.displayName} required placeholder={user.displayName} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" value={formData.firstName} required placeholder={user.displayName.split(' ')[0]} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="lastName" value={formData.lastName} required placeholder={user.displayName.split(' ')[1]} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" value={formData.email} required placeholder={user.email} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Bio</Form.Label>
                <Form.Control as="textarea" name="bio" value={formData.bio} required placeholder="Enter your Bio" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
              </Form.Group>

              <Button bsPrefix="sign-in-btn" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <div className="half-hero_container">
            <Image
              className="offset"
              src="/logo.v2.svg"
              width={900}
              height={900}
            />
          </div>
        </div>
      </MediaQuery>
      <MediaQuery minWidth={1025}>
        <div className="register-container">
          <div className="fnt-secondary form-container">
            <AuthenticationButton />
            <h1>Create An Account</h1>
            <p className="fnt-secondary margin-btm">By creating an account, you will be allowed to begin your journey.</p>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control name="displayName" value={formData.displayName} required placeholder={user.displayName} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="firstName" value={formData.firstName} required placeholder={user.displayName.split(' ')[0]} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lastName" value={formData.lastName} required placeholder={user.displayName.split(' ')[1]} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" value={formData.email} required placeholder={user.email} onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Bio</Form.Label>
                <Form.Control as="textarea" value={formData.bio} name="bio" required placeholder="Enter your Bio" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
              </Form.Group>

              <Button bsPrefix="sign-in-btn" type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <div className="half-hero_container">
            <Image
              className="offset"
              src="/logo.v2.svg"
              width={900}
              height={900}
            />
          </div>
        </div>
      </MediaQuery>
    </>
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

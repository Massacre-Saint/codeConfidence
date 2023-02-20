import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export default function Guided() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert show={show} variant="success" className="alert">
        <Alert.Heading>Goals</Alert.Heading>
        <p>
          Here you will be able to create learning goals. From here you can assign
          topics and watch your progress grow! Once you feel that this goal is complete,
          you can close the goal!
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Got It!
          </Button>
        </div>
      </Alert>

      {!show && <button type="button" onClick={() => setShow(true)}>About Goals</button>}
    </>
  );
}

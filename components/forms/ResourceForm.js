import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { updateResource } from '../../utils/data/resources';

function ResourceForm({
  obj, goals, topics, showForm, handleShowForm, onUpdate,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const getAssignedTo = () => {
    if (obj.resource.objectId) {
      const { objectId } = obj.resource;
      return objectId;
    }
    const objectId = null;
    return objectId;
  };
  const [formData, setFormData] = useState(() => ({
    id: obj.resource.id,
    bookmark: obj.resource.bookmark,
    objectId: getAssignedTo(),
    tech: obj.resource.tech,
  }));
  const handleOptionsToggle = (target) => {
    if (target.checked) {
      setShowOptions(true);
    } else setShowOptions(false);
  };
  const handleSubmit = (e) => {
    const body = {
      id: formData.resource.id,
      bookmark: formData.resource.bookmark,
      tech: formData.resource.tech,
      objectId: formData.objectId,
    };
    updateResource(body).then(() => onUpdate());
    e.preventDefault();
  };
  useEffect(() => {
    if (showForm) {
      setFormData(obj);
    }
  }, [formData, obj, showForm]);

  return (
    <>
      {obj.resource
        ? (
          <Form onSubmit={handleSubmit} className="edit-form">
            <Row className="mb-3">
              <Form.Group className="mb-3" controlId="title" as={Col}>
                <Form.Label>{obj.bookmark.children
                  ? (
                    <>
                      <span>
                        Importing
                      </span>
                  &nbsp;
                      <span>{obj.bookmark.children.length} Children</span>
                    </>
                  )
                  : (
                    'Bookmark'
                  )}
                </Form.Label>
                <Form.Control
                  name="title"
                  onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
                  value={formData?.bookmark?.title}
                  type="text"
                  placeholder="Title"
                  required
                  spellCheck="true"
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description" as={Col}>
                <Form.Label>Tech</Form.Label>
                <Form.Control
                  name="description"
                  onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
                  value={formData.tech?.tech.name}
                  type="text"
                  placeholder="Description"
                  required
                  spellCheck="true"
                  disabled
                />
              </Form.Group>
            </Row>
            <Form.Check
              type="switch"
              name="completed"
              onChange={({ target }) => {
                handleOptionsToggle(target);
              }}
              id="completed"
              label="Assign?"
            />
            {showOptions
              ? (
                <>
                  <Form.Select
                    aria-label="Selected Goal"
                    name="objectId"
                    onChange={({ target }) => {
                      const value = target.value === '' ? null : target.value;
                      setFormData((prev) => ({ ...prev, [target.name]: value }));
                    }}
                    value={formData.objectId}
                    bsPrefix="form-box"
                  >
                    <option className="form-drop" value="">Topic or Goal</option>
                    {
                goals.concat(topics).map((i) => (
                  <option
                    className="form-drop"
                    key={i.id}
                    value={i.id}
                  >
                    {i.title}
                  </option>
                ))
              }
                  </Form.Select>
                </>
              )
              : ('')}
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button onClick={handleShowForm} variant="outline-danger" type="button">
              Cancel
            </Button>
          </Form>
        )
        : (
          ''
        )}
    </>

  );
}

export default ResourceForm;

ResourceForm.propTypes = {
  handleShowForm: PropTypes.func.isRequired,
  showForm: PropTypes.bool.isRequired,
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  obj: PropTypes.shape({
    bookmark: PropTypes.shape({
      id: PropTypes.number,
      index: PropTypes.number,
      parentId: PropTypes.number,
      title: PropTypes.string,
      url: PropTypes.string,
      children: PropTypes.arrayOf((PropTypes.shape({
        id: PropTypes.number,
      }))),
    }),
    resource: PropTypes.shape({
      id: PropTypes.number,
      bookmark: PropTypes.shape({
        id: PropTypes.number,
      }),
      objectId: PropTypes.shape({
        id: PropTypes.string,
      }),
      tech: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

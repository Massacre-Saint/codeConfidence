import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IconContext } from 'react-icons';
import { BiTimeFive, BiWindows } from 'react-icons/bi';
import AssignResourceModal from '../modals/AssignResourceModal';
import TechImage from '../icons/TechImage';
import convertTime from '../../utils/convertTime';
import { createResource } from '../../utils/data/resources';

function BookmarkForm({
  obj,
  lTech,
  goals,
  topics,
  // handleShowForm,
  onUpdate,
  fetchBookmarks,
  handleCloseFormAndResetFormStates,
}) {
  const [assignedTopicOrGoal, setAssignedTopicOrGoal] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const [showAssignedResourceModal, setShowAssignedResourceModal] = useState(false);
  const [showingGoals, setShowingGoals] = useState(false);

  const [formData, setFormData] = useState(() => ({
    bookmark: obj.id,
    assignedTo: null,
    learnedTech: lTech.id,
  }));

  const handleOptionsToggle = (target) => {
    if (target.checked) {
      setShowOptions(true);
    } else setShowOptions(false);
  };

  const handleShowAssignedResourceModal = (e) => {
    if (e.target.id === 'goal') {
      setShowingGoals(true);
      setShowAssignedResourceModal(true);
    } else if (e.target.id === 'topic') {
      setShowAssignedResourceModal(true);
      setShowingGoals(false);
    } else {
      setShowingGoals(false);
      setShowAssignedResourceModal(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleShowAssignedResourceModal(e);
    if (Object.values(assignedTopicOrGoal).length > 0) {
      formData.assignedTo = assignedTopicOrGoal;
    }
    if (e.target.id === 'create-resource') {
      createResource(formData).then(() => {
        onUpdate();
        fetchBookmarks();
      });
    }
  };

  return (
    <>
      <Form className="edit-form">
        <Row className="mb-3">
          <Form.Group className="mb-3" controlId="title" as={Col}>
            <Form.Label>
              {obj.children
                ? (
                  <>
                    <span>
                      Importing
                    </span>
                  &nbsp;
                    <span>{obj.children.length} Children</span>
                  </>
                )
                : (
                  'Bookmark'
                )}
            </Form.Label>
            <Form.Control
              name="title"
              onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
              value={obj.title}
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
              value={lTech.tech.name}
              type="text"
              placeholder="Description"
              required
              spellCheck="true"
              disabled
            />
          </Form.Group>
        </Row>
        {Object.values(assignedTopicOrGoal).length > 0 && showOptions
          ? (
            <div className="card_spacing topic-goal_card_container">
              <div className="topic-goal-image">
                <TechImage obj={assignedTopicOrGoal.learnedTech.tech} />
              </div>
              <div className="topic-goal_card">
                <div>
                  <span className="topic-goal_card_title">
                    {assignedTopicOrGoal.title.length > 20
                      ? (`${assignedTopicOrGoal.title.slice(0, 20)}....`)
                      : (assignedTopicOrGoal.title)}
                  </span>
                </div>
                <div className="topic-goal_card_footer">
                  <span>
                    <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                      <BiTimeFive />
                    </IconContext.Provider>
                    <span className="topic-goal_card_footer-text">
                      {convertTime(assignedTopicOrGoal.lastUpdated)}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )
          : (
            ''
          )}
        <Form.Check
          type="switch"
          name="completed"
          onChange={({ target }) => {
            handleOptionsToggle(target);
          }}
          id="completed"
          label={`Toggle to choose you ${lTech.tech.name} Goal or Topic`}
        />
        {showOptions
          ? (
            <div>
              <button
                type="button"
                id="goal"
                onClick={(e) => handleShowAssignedResourceModal(e)}
              >
                <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                  <BiWindows />
                </IconContext.Provider>
                Choose Goal
              </button>
              <button
                type="button"
                id="topic"
                onClick={(e) => handleShowAssignedResourceModal(e)}
              >
                <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                  <BiWindows />
                </IconContext.Provider>
                Choose Topic
              </button>
            </div>
          )
          : ('')}
        {(showOptions && assignedTopicOrGoal.id) || !showOptions
          ? (
            <Button
              variant="primary"
              type="submit"
              id="create-resource"
              onClick={(e) => {
                handleSubmit(e);
                handleCloseFormAndResetFormStates();
              }}
            >
              Submit
            </Button>
          )
          : (
            ''
          )}
        <Button
          variant="outline-danger"
          type="button"
          onClick={handleCloseFormAndResetFormStates}
        >
          Cancel
        </Button>
      </Form>
      <AssignResourceModal
        handleShowAssignedResourceModal={handleShowAssignedResourceModal}
        showAssignedResourceModal={showAssignedResourceModal}
        setAssignedTopicOrGoal={setAssignedTopicOrGoal}
        assignedTopicOrGoal={assignedTopicOrGoal}
        showingGoals={showingGoals}
        goals={goals}
        topics={topics}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default BookmarkForm;

BookmarkForm.propTypes = {
  obj: PropTypes.shape({
    children: PropTypes.arrayOf((PropTypes.shape({
      id: PropTypes.number,
    }))),
    id: PropTypes.number,
    title: PropTypes.string,
    learnedTech: PropTypes.shape({
      tech: PropTypes.shape({
        id: PropTypes.number,
      }),
    }),
    lastUpdated: PropTypes.string,
  }).isRequired,
  lTech: PropTypes.shape({
    id: PropTypes.number,
    tech: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  // handleShowForm: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  fetchBookmarks: PropTypes.func.isRequired,
  handleCloseFormAndResetFormStates: PropTypes.func.isRequired,
};

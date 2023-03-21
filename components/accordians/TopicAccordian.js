import Accordion from 'react-bootstrap/Accordion';
import PropTypes from 'prop-types';
import { BiTimeFive } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import convertTime from '../../utils/convertTime';

function TopAccordian({ show, topics }) {
  if (show) {
    return (
      <>
        <Accordion defaultActiveKey="0" flush className="accordion" bsPrefix="accordion">
          {topics.map((topic) => (
            <Accordion.Item eventKey={topic.id} key={topic.id}>
              <Accordion.Header>
                <span className="topic-goal_card_title">
                  {topic.title}
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <div className="topic-goal_card">
                  <div className="topic-goal_body">
                    <span className="topic-goal_card_desc">
                      {topic.description}
                    </span>
                  </div>
                  <div className="topic-goal_card_footer">
                    <span>
                      <IconContext.Provider value={{ size: '1.5em', color: 'white' }}>
                        <BiTimeFive />
                      </IconContext.Provider>
                      <span className="topic-goal_card_footer-text">
                        {convertTime(topic.lastUpdated)}
                      </span>
                    </span>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

          ))}
        </Accordion>
      </>
    );
  }
  return (
    <></>
  );
}

export default TopAccordian;

TopAccordian.propTypes = {
  show: PropTypes.bool.isRequired,
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))),
};

TopAccordian.defaultProps = {
  topics: [],
};

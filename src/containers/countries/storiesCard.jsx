import React from 'react';
import { Card, Image, Avatar} from "tabler-react";
const StoriesCard = ({story:{body, cityId, countryId, title}}) => {
  return (
    <Card>
      <Card.Body>
        <img
          alt=""
          src="https://tabler-react.com/demo/photos/ilnur-kalimullin-218996-500.jpg"
        />
      </Card.Body>
      <Card.Footer>
        <div className="avatar-container">
          <Avatar size="sm" imageURL={'https://react.semantic-ui.com/images/avatar/small/matthew.png'}
          />
          &nbsp;
          <b>{title}</b>
        </div>
      </Card.Footer>
  </Card>
  );
}
export default StoriesCard;
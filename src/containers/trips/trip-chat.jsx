import React, { useState, Component } from 'react';
import {baseUrl, userImg} from '../../lib/constants';
import {useFetch} from '../../lib/useFetch';
import {Card, List, Button, Dimmer, Form} from "tabler-react";

const TripChatModal = ({recordId, closeMainModal}) => {
  const [disabled, toggleDisabled]= useState(true)
  const {data, loading} = useFetch(`trips/${recordId}`);
  return (
    
    <Card>
       <Dimmer active={loading} loader={loading}>
      {/* <Card.Status color="blue" side /> */}
      <Card.Header>
        <Card.Title>Trip Chat ({1})</Card.Title>
        <Card.Options>
          <Button size="sm" icon="x" onClick={()=>closeMainModal()}/>
        </Card.Options>
      </Card.Header>
      {!loading && data &&
        <Card.Body>

        </Card.Body>
      }

      </Dimmer>
    </Card>
  )
}

export default TripChatModal;
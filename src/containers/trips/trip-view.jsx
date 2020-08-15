import React, { useState, Component } from 'react';
import {baseUrl, userImg} from '../../lib/constants';
import {useFetch} from '../../lib/useFetch';
import {Card, List, Button, Dimmer, Form} from "tabler-react";

const TripViewModal = ({recordId, closeMainModal}) => {
  const [disabled, toggleDisabled]= useState(true)
  const {data, loading} = useFetch(`trips/${recordId}`);
  return (
    
    <Card>
       <Dimmer active={loading} loader={loading}>
      {/* <Card.Status color="blue" side /> */}
      <Card.Header>
        <Card.Title>Trip ({1})</Card.Title>
        <Card.Options>
          <Button size="sm" icon="x" onClick={()=>closeMainModal()}/>
        </Card.Options>
      </Card.Header>
      {!loading && data &&
        <Card.Body>
          <Form onSubmit={(event) => console.log(event.target.name + 'clicked')}>
          <Form.FieldSet>
            <Form.Input
              disabled
              name='id' 
              label='Id'
              placeholder='' 
              value={data['_id']} />
            <Form.Input
              disabled={disabled}
              name='from'
              label='From'
              placeholder=''
              value={data['fromCity']['name']} />
            </Form.FieldSet>
          </Form>
        </Card.Body>
      }
      <Card.Footer>
        <div style={{textAlign:'right'}}>
            <Button 
              outline 
              color="primary" 
              size="sm" 
              className="ml-2"
            >
              Edit
            </Button>
            <Button 
              outline 
              color="danger" 
              size="sm" 
              className="ml-2"
            >
              Delete
            </Button>
        </div>
      </Card.Footer>
      </Dimmer>
    </Card>
  )
}

export default TripViewModal;
import React, { useState, Component } from 'react';
import {baseUrl, userImg} from '../../lib/constants';
import {Card, List, Button, Avatar, Tag, Form, Dimmer} from "tabler-react";
import DeleteObject from '../../lib/deleteObject';
const ConfirmDeleteModal = ({
  recordId, closeMainModal, type
}) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Confirm Delete</Card.Title>
      </Card.Header>
      <Card.Body>
        Are you sure you want to delete this?!
      </Card.Body>
      <Card.Footer>
        <div style={{textAlign:'right'}}>
          <Button
            color="danger"
            size="sm"
            className="ml-2"
            type="submit"
            onClick={()=> {
              DeleteObject(type, recordId);closeMainModal();
            }}
          >
            Confirm Delete
          </Button>
          <Button
            outline
            color="secondary"
            size="sm"
            className="ml-2"
            onClick={()=>closeMainModal()}
          >
            cancel
          </Button>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default ConfirmDeleteModal;
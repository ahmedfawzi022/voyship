import React, { useState, Component } from 'react';
import {baseUrl, userImg} from '../../lib/constants';
import {Card, List, Button, Avatar, Tag, Form, Dimmer} from "tabler-react";
import {useFetch} from '../../lib/useFetch';

const ProductViewModal = ({recordId, openMainModal, closeMainModal}) => {
  const [disabled, toggleDisabled]= useState(true);
  const {data, loading} = useFetch(`products/${recordId}`);
  return (
    <Card>
      <Dimmer
        active={loading}
        loader={loading}
      >
      {/* <Card.Status color="blue" side /> */}
      <Card.Header>
        <Card.Title>Product ({recordId})</Card.Title>
        <Card.Options>
          <Button
            size="sm"
            icon="x"
            onClick={()=>closeMainModal()}
          />
        </Card.Options>
      </Card.Header>
      {!loading && data &&
        <Card.Body>
          <Form
            onSubmit={(event) => console.log(event.target.name + 'clicked')}
          >
              <Form.Input 
                disabled={true}
                name='_id'
                label='Id'
                placeholder=''
                value={data['_id']}
              />
              <Form.Input
                disabled={disabled}
                name='name'
                label='Name'
                placeholder=''
                value={data['name']}
              />
              <Form.Input
                disabled={disabled}
                name='price'
                label='price'
                placeholder=''
                value={data['price']}
              />
              <Form.Input
                disabled={disabled}
                name='image'
                label='Image'
                placeholder=''
                value={data['image']}
              />
              <Form.Input
                disabled={disabled}
                name='url'
                label='url'
                placeholder=''
                value={data['url']}
              />
              <Form.Input
                disabled={disabled}
                name='description'
                label='description'
                placeholder=''
                value={data['description']}
              />
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
            onClick={()=>toggleDisabled(false)}
          >
            Edit
          </Button>
          <Button
            outline
            color="danger"
            size="sm"
            className="ml-2"
            onClick={()=>openMainModal('product-delete', recordId)}
          >
            Delete
          </Button>
        </div>
      </Card.Footer>
      </Dimmer>
    </Card>
  )
}

export default ProductViewModal;
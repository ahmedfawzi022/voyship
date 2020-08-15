import React, { useState, Component } from 'react';
import {baseUrl, userImg} from '../../lib/constants';
import {Card, List, Button, Avatar, Tag, Form, Dimmer} from "tabler-react";
import {useFetch} from '../../lib/useFetch';
import postObject from '../../lib/postObject';
import {useForm} from '../../lib/useForm';

const CategoryCreateModal = ({recordId, closeMainModal}) => {
  const [data, handleChange] = useForm({name: '', image:'', icon:''});
  const uploadFile = (event) => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function(){
      let dataURL = reader.result;
      data['image'] = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
  }
  const uploadIcon = (event) => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function(){
      let dataURL = reader.result;
      data['icon'] = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
  }
  return (
    <Card>
      <Card.Header>
        <Card.Title>Create Category</Card.Title>
        <Card.Options>
          <Button
            size="sm"
            icon="x"
            onClick={()=>closeMainModal()}
          />
        </Card.Options>
      </Card.Header>
        <Card.Body>
          <Form>
              <Form.Input
                name='name'
                label='Name'
                placeholder=''
                value={data['name']}
                onChange={handleChange}
              />
              <Form.Input
                name='icon'
                label='Icon'
                placeholder=''
                value={data['icon']}
                type='file'
                onChange={(e)=>uploadIcon(e)}
              />
              <Form.Input
                name='image'
                label='Image'
                placeholder=''
                value={data['image']}
                type='file'
                onChange={(e)=>uploadFile(e)}
              />
          </Form>
        </Card.Body>
      <Card.Footer>
        <div style={{textAlign:'right'}}>
          <Button
            outline
            color="primary"
            size="sm"
            className="ml-2"
            type="submit"
            onClick={()=> postObject('categories', data)}
          >
            Save
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

export default CategoryCreateModal;
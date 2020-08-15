import React, { useState, Component } from 'react';
import {baseUrl, userImg} from '../../lib/constants';
import {Card, List, Button, Avatar, Tag, Form, Dimmer} from "tabler-react";
import {useFetch} from '../../lib/useFetch';
import putObject from '../../lib/putObject';

const UserViewModal = ({recordId, openMainModal,closeMainModal}) => {
  const {data, loading} = useFetch(`users/${recordId}`);
  const [disabled, toggleDisabled]= useState(true);
  const [edited, setEdited] = useState({});
  const toggleEdit = () => {
    toggleDisabled(!disabled)
    setEdited({...data})
  }
  const handleChange = (e) => {
    const attr ={}
    attr[e.target.name]= e.target.value;
    setEdited ({
      ...edited,
      ...attr
    })
  }
  return (
    <Card>
      <Dimmer
        active={loading}
        loader={loading}
      >
      {/* <Card.Status color="blue" side /> */}
      <Card.Header>
        <Card.Title>User ({recordId})</Card.Title>
        <Card.Options>
          <Button size="sm" icon="x" onClick={()=>closeMainModal()}/>
        </Card.Options>
      </Card.Header>
      {!loading && data &&
        <Card.Body>
          <Form onSubmit={(event) => console.log(event.target.name + 'clicked')}>
              <Form.Label>Image</Form.Label>
              <Avatar
                size="md"
                imageURL={data['photo'] || userImg}
              />
              <Form.Input 
                // disabled={disabled}
                name='firstName'
                label='First Name'
                placeholder=''
                // value={data['firstName']}
                value={disabled ? data['firstName'] : edited['firstName']}
                onChange={(e)=>handleChange(e)}
                disabled={disabled}
              />
              <Form.Input
                disabled={disabled}
                name='lastName'
                label='Last Name'
                placeholder=''
                value={data['lastName']}
              />
              <Form.Input
                disabled={disabled}
                name='email'
                label='E-mail'
                placeholder=''
                value={data['email']}
              />
              <Form.Input
                disabled={disabled}
                name='phone'
                label='phone'
                placeholder=''
                value={data['phone']}
              />
            {/* <Form.Group label="phone verified">
              <Form.SwitchStack>
                <Form.Switch type="radio" name="toggle" value="option1" label="" />
              </Form.SwitchStack>
            </Form.Group> */}
            <Form.Label>Roles</Form.Label>
            <List.GroupItem>
            {data && data.roles && data.roles.map((r, i) => (
              <Tag>{r}</Tag>
            ))}
            </List.GroupItem>
          </Form>
        </Card.Body>
      }
      <Card.Footer>
        {disabled ?
          <div style={{textAlign:'right'}}>
            <Button
              outline
              color="primary"
              size="sm"
              className="ml-2"
              onClick={()=>toggleEdit()}
            >
              Edit
            </Button>
            <Button
            outline
            color="danger"
            size="sm"
            className="ml-2"
            onClick={()=>{
              closeMainModal();
              openMainModal('country-delete', recordId)
            }}
            // icon='trash'/
          >
            Delete
            </Button>
          </div>
      :
          <div style={{textAlign:'right'}}>
            <Button
              outline
              color="primary"
              size="sm"
              className="ml-2"
              onClick={()=> {putObject(
                'users',
                edited
              ); closeMainModal()}}
            >
              Save
            </Button>
            <Button
            outline
            color="secondary"
            size="sm"
            className="ml-2"
            onClick={()=>toggleDisabled(true)}
            // icon='trash'/
          >
            cancel
            </Button>
        </div>
      }
      </Card.Footer>
      
      {/* <Card.Footer>
        <div style={{textAlign:'right'}}>
          <Button outline color="primary" size="sm" className="ml-2" onClick={()=>toggleDisabled(false)}>Edit</Button>
          <Button outline color="danger" size="sm" className="ml-2">Delete</Button>
        </div>
      </Card.Footer> */}
      </Dimmer>
    </Card>
  )
}

export default UserViewModal;
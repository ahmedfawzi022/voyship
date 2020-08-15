import React, { useState, Component } from 'react';
import { baseUrl, userImg } from '../../lib/constants';
import { Card, List, Button, Avatar, Tag, Form, Dimmer } from "tabler-react";
import { useFetch } from '../../lib/useFetch';
import putObject from '../../lib/putObject';

const AdminUserViewModal = ({ recordId, openMainModal, closeMainModal }) => {
  const { data:admin, loading } = useFetch(`admins/${recordId}`);
  const [disabled, toggleDisabled] = useState(true);
  const [edited, setEdited] = useState({})
  const attr = {}
  const toggleEdit = () => {
    toggleDisabled(!disabled)
    setEdited({...admin})
  }
  // const [newData, changeFormInput] = useState({
  //   firstName: null,
  //   lastName: null,
  
  // });
  const handleChange = (e) => {
    const  attr = admin
    attr[e.target.name] = e.target.value;
    setEdited({
      ...admin,
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
          <Card.Title>Admin User ({recordId})</Card.Title>
          <Card.Options>
            <Button size="sm" icon="x" onClick={() => closeMainModal()} />
          </Card.Options>
        </Card.Header>
        {!loading && admin &&
          <Card.Body>
            <Form onSubmit={(event) => console.log(event.target.name + 'clicked')}>
              <Form.Label>Image</Form.Label>
              <Avatar
                size="md"
                imageURL={admin['photo'] || userImg}
              />

              <Form.Input
                name='firstName'
                label='First Name'
                placeholder=''
                value={disabled ? admin['firstName'] : edited['firstName']}
                // onChange={(e) => handleChange('firstName',e)}
                onChange={(e)=>{handleChange(e)}}

               disabled={disabled}
              />
              <Form.Input
                disabled={disabled}
                name='lastName'
                label='Last Name'
                placeholder=''
                value={disabled ? admin['lastName'] : edited['lastName']}
                onChange={(e) => handleChange(e)}
               disabled={disabled}
              />
              <Form.Input
                disabled={disabled}
                name='email'
                label='E-mail'
                placeholder=''
                value={disabled ? admin['email'] : edited['email']}
                onChange={(e) => handleChange(e)}
               disabled={disabled}
              />
              <Form.Input
                disabled={disabled}
                name='phone'
                label='phone'
                placeholder=''
                value={disabled ? admin['phone'] : edited['phone']}
                onChange={(e) => handleChange(e)}
               disabled={disabled}
              />
              {/* <Form.Group label="phone verified">
              <Form.SwitchStack>
                <Form.Switch type="radio" name="toggle" value="option1" label="" />
              </Form.SwitchStack>
            </Form.Group> */}
              <Form.Label>Roles</Form.Label>
              <List.GroupItem>
                {admin && admin.roles && admin.roles.map((r, i) => (
                  <Tag>{r}</Tag>
                ))}
              </List.GroupItem>
            </Form>
          </Card.Body>
        }
        <Card.Footer>
          {disabled ?
            <div style={{ textAlign: 'right' }}>
              <Button
                outline
                color="primary"
                size="sm"
                className="ml-2"
                onClick={() => toggleEdit()}
              >
                Edit
            </Button>
              <Button
                outline
                color="danger"
                size="sm"
                className="ml-2"
                onClick={() => {
                  closeMainModal();
                  openMainModal('country-delete', recordId)
                }}
              // icon='trash'/
              >
                Delete
            </Button>
            </div>
            :
            <div style={{ textAlign: 'right' }}>
              <Button
                outline
                color="primary"
                size="sm"
                className="ml-2"
                onClick={() => {
                  putObject(
                    'admins',
                    edited
                  ); closeMainModal()
                }}
              >
                Save
            </Button>
              <Button
                outline
                color="secondary"
                size="sm"
                className="ml-2"
                onClick={() => toggleDisabled(true)}
              // icon='trash'/
              >
                cancel
            </Button>
            </div>
          }
        </Card.Footer>
        {/* <Card.Footer>
        <div style={{textAlign:'right'}}>
          <Button outline color="primary" size="sm" className="ml-2" onClick={()=>toggleEdit()}>Edit</Button>
          <Button outline color="danger" size="sm" className="ml-2">Delete</Button>
        </div>
      </Card.Footer> */}
      </Dimmer>
    </Card>
  )
}

export default AdminUserViewModal;
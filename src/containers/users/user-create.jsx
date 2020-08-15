import React, { useState, Component } from 'react';
import { Card, List, Button, Avatar, Tag, Form } from "tabler-react";
import { useForm } from '../../lib/useForm'
import Select from 'react-select';
import PostObject from '../../lib/postObject';
const UserCreateModal = ({ id, closeMainModal }) => {
  const [user, handleChange] = useForm({ photo: '', firstName: '', lastName: '', email: ''})
  const globeroles = [{ label: 'Guest', value: 'Guest' }, { label: 'Admin', value: 'Admin' }]
  const [selectedRoles, changeRoles] = useState([]);
  const uploadFile = (event) => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function(){
      let dataURL = reader.result;
      user['photo'] = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
  }
  const submitForm = () => {
    console.log("submit")
    // const roles = selectedRoles.map(a => a.value);
    // PostObject('users', {...user, roles})
    PostObject('users', { ...user })
  }
  return (
    <Card>
      <Card.Header>
        <Card.Title>Create User</Card.Title>
        <Card.Options>
          <Button
            size="sm"
            icon="x"
            onClick={() => closeMainModal()}
          />
        </Card.Options>
      </Card.Header>
      <Card.Body>
        <Form
          onSubmit={(event) => console.log(event.target.name + 'clicked')}
        >
          <Form.FieldSet>
            <Form.Input
              name='firstName'
              label='First Name'
              placeholder=''
              value={user['firstName']}
              onChange={handleChange}
            />

            <Form.Input
              name='lastName'
              label='Last Name'
              placeholder=''
              value={user['lastName']}
              onChange={handleChange}
            />
            <Form.Input
              name='password'
              label='Password'
              placeholder=''
              type="password"
              value={user['password']}
              onChange={handleChange}
            />

            <Form.Input
              name='email'
              label='E-mail'
              placeholder=''
              value={user['email']}
              onChange={handleChange}
            />
            {/* <Form.Input
              name='phone'
              label='Phone'
              placeholder='phone number'
              value={user['phone']}
              onChange={handleChange}
            /> */}
                        <Form.Input
              name='photo'
              label='Image'
              placeholder=''
              value={user['photo']}
              type="file"
              onChange={(e) => uploadFile(e)}
            />
            {/* <Form.Group label="phone verified">
            <Form.SwitchStack>
              <Form.Switch
                type="radio"
                name="toggle"
                value="option1"
                label=""
                onChange={handleChange}
              /> */}
            {/* </Form.SwitchStack>
          </Form.Group> */}
            {/* <Form.Label>roles: </Form.Label>
          <List.GroupItem>
            <Select
              value={selectedRoles}
              onChange={(e)=>{changeRoles(e)}}
              options={globeroles && globeroles.map(({label, value}) => ({label, value}))}
              multi
            />
          </List.GroupItem> */}
          </Form.FieldSet>
        </Form>
      </Card.Body>
      <Card.Footer>
        <div style={{ textAlign: 'right' }}>
          <Button
            color="primary"
            size="sm"
            className="ml-2"
            onClick={() => submitForm()}
          >
            Save
          </Button>
          <Button
            outline
            color="secondary"
            size="sm"
            className="ml-2"
            onClick={() => closeMainModal(false)}
          >
            Cancel
          </Button>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default UserCreateModal;
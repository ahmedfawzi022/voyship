import React, { useState, Component } from 'react';
import { Card, List, Button, Avatar, Tag, Form } from "tabler-react";
import { useForm } from '../../lib/useForm';
import PostObject from '../../lib/postObject';
import Select from 'react-select';

const AdminUserCreateModal = ({ id, closeMainModal }) => {
  const [user, handleChange] = useForm({ photo: '', firstName: '', lastName: '', email: '', phone: '' })
  const globeroles = ["Guest", "superAdmin"]
  // const [selectedRoles, changeRoles] = useState([""]);
  const [selectedRoles, setChangeRoles] = useState([]);

  // globeroles.forEach(function (element) {
  //   selectedRoles.push({ label: element, value: element })
  // });
  const [addrtype, setAddrtype] = useState(["SuperAdmin", "Administrator", "Operator", "HubAdmin"])
  const Add = addrtype.map(Add => Add
  )
  const handleAddrTypeChange = (e) => {
    // setChangeRoles(selectedRoles.push(addrtype[e.target.value]))
    setChangeRoles([...selectedRoles, addrtype[e.target.value]]);

  }

  const uploadFile = (event) => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      user['photo'] = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
  }

 
  const submitForm = () => {
    console.log("submit")
    debugger;
    console.log(selectedRoles);
    
    // selectedRoles.push(selectedRoles)
    // const roles = selectedRoles.map(a => {
    //   return ([a])
    // });
    // setChangeRoles.push(addrtype[e.target.value]);
    const roles = selectedRoles
    PostObject('admins', { ...user, roles })
  }
  return (
    <Card>
      <Card.Header>
        <Card.Title>Create Admin User</Card.Title>
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
              name='email'
              label='E-mail'
              placeholder=''
              value={user['email']}
              onChange={handleChange}
            />
            <Form.Input
              name='phone'
              label='Phone'
              placeholder='phone number'
              value={user['phone']}
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
            <Form.Label>roles: </Form.Label>
            <List.GroupItem>
              {/* <Select
                value=""
                options={globeroles}
                // onInputChange={(e)=>{changeRoles(e)}}
                isSearchable
                placeholder="user"
                onChange={(e)=>setChangeRoles(e)}
              /> */}
                  < select
                 multi
      onChange={e => handleAddrTypeChange(e)}
      className="browser-default custom-select" >
      {
        Add.map((address, key) => <option value={key}>{address}</option>)
      }
    </select > 
        
               {/* <Select
              value={selectedRoles}
              onChange={e => handleAddrTypeChange(e)}
              options=  {
                Add.map((address, key) => <option value={key}>{address}</option>)
              }
              multi
            />  */}
            </List.GroupItem>
            <Form.Input
              name='photo'
              label='Image'
              placeholder=''
              value={user['photo']}
              type="file"
              onChange={(e) => uploadFile(e)}
            />
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

export default AdminUserCreateModal;
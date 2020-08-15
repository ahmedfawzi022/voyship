import React, { useState, Component } from 'react';
import {baseUrl, userImg} from '../../lib/constants';
import {Card, List, Button, Avatar, Tag, Form, Dimmer} from "tabler-react";
import {useFetch} from '../../lib/useFetch';
import putObject from '../../lib/putObject';

const CategoryViewModal = ({recordId, closeMainModal,openMainModal}) => {
  const [disabled, toggleDisabled]= useState(true);
  const {data, loading} = useFetch(`categories/${recordId}`);
  const {data:subcategories, loading:subcategoriesLoading} = useFetch(`categories/${recordId}/sub-category`);
  const [edited, setEdited] = useState({})

  const toggleEdit = () => {
    debugger;
    console.log(data)
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
        <Card.Title>Category ({recordId})</Card.Title>
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
                onChange={(e)=>handleChange(e)}
                value={data['_id']}
              />
              <Form.Input
                disabled={disabled}
                name='name'
                label='Name'
                placeholder=''
                onChange={(e)=>handleChange(e)}
                value={disabled ? data['name'] : edited['name']}
              />
              {/* <Form.Input
                disabled={disabled}
                name='icon'
                label='Icon'
                placeholder=''
                onChange={(e)=>handleChange(e)}
                value={disabled ? data['icon'] : edited['icon']}
              /> */}
                            <Form.Label>Icon</Form.Label>
              <Avatar
                size="md"
                imageURL={data['icon'] || userImg}
              />
                            <Form.Label>Image</Form.Label>
              <Avatar
                size="md"
                imageURL={data['image'] || userImg}
              />
              {/* <Form.Input
                disabled={disabled}
                name='image'
                label='Image'
                placeholder=''
                onChange={(e)=>handleChange(e)}
                value={disabled ? data['image'] : edited['image']}
              /> */}
            <Form.Label>Sub Category</Form.Label>
            <List.GroupItem>
              {!subcategoriesLoading && subcategories && subcategories.map((r, i) => (
                <Tag>
                  {r.name}
                </Tag>
                
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
              openMainModal('categories-delete', recordId)
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
                'categories',
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
          >
            Delete
          </Button>
        </div>
      </Card.Footer> */}
      </Dimmer>
    </Card>
  )
}

export default CategoryViewModal;
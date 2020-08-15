import React, { useState, Component } from 'react';
import {baseUrl, userImg} from '../../lib/constants';
import {Card, List, Button, Avatar, Tag, Form, Dimmer} from "tabler-react";
import {useFetch} from '../../lib/useFetch';
import postObject from '../../lib/postObject';
import {useForm} from '../../lib/useForm';
import Select from 'react-select';
const StoreCreateModal = ({recordId, closeMainModal}) => {
  const [form, handleChange] = useForm({name: '', image:'', icon:''});
  const [category, changeCategory] = useState(null)
  const {data:categories, loading:categoriesLoading} = useFetch(`categories`);
  const uploadFile = (event) => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function(){
      let dataURL = reader.result;
      form['image'] = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
  }
  const uploadIcon = (event) => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function(){
      let dataURL = reader.result;
      form['icon'] = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
  }
  const submitStore = () => {
    const data = {

      categoryId: category.value,
      name: form.name,
      image: form.image,
      icon: form.icon
    }
    postObject('stores', {...data});
  }
  return (
    <Card>
      <Card.Header>
        <Card.Title>Create Store</Card.Title>
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
            <Form.Label>Category:</Form.Label>
              <Select
                value={category}
                options={categories && categories.map(cat => {
                  return({label: cat.name, value:cat['_id']});
                })}
                placeholder="Category"
                isLoading={categoriesLoading}
                onChange={(e)=> changeCategory(e)}
              />
              <Form.Input
                name='name'
                label='Name'
                placeholder=''
                value={form['name']}
                onChange={handleChange}
              />
              <Form.Input
                name='icon'
                label='Icon'
                placeholder=''
                value={form['icon']}
                type='file'
                onChange={(e)=>uploadIcon(e)}
              />
              <Form.Input
                name='image'
                label='Image'
                placeholder=''
                value={form['image']}
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
            onClick={()=> submitStore()}
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

export default StoreCreateModal;
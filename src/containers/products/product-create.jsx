import React, { useState, Component } from 'react';
import {Card, List, Button, Form} from "tabler-react";
import axios from 'axios'
import {useForm} from '../../lib/useForm';
import { useError } from "../../state/error";
import { useAuth } from '../../state/auth';
import {baseUrl} from'../../lib/constants'
import postObject from '../../lib/postObject';

const ProductCreateModal = ({id, closeMainModal}) => {
  const [values, handleChange] = useForm({name:'', image: '', description:'', price: '', url: ''});
  const {setIsError} = useError();
  const {authTokens}= useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const uploadFile = (event) => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function(){
      let dataURL = reader.result;
      values['image'] = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
  }
  const handleSubmit = (e) => {

    postObject('products', {...values});
    // const payload = {
    //   headers:{ Authorization: authTokens },
    //   ...values
    // }
    // e.preventDefault();
    // setIsLoading(true)
    // axios.post(`${baseUrl}/products/`, payload).then(response => {
    //   if (response.data.status === true || response.status === 200) {
    //     setIsLoading(false);
    //     setIsError(response.data.data, 'success')
    //   }
    //   if (response.data.status === false || response.status === 400) {
    //     setIsError(response.data.data)
    //   }
    // }).catch(e => {
    //   setIsLoading(false);
    //   setIsError(e.message);
    // });
  }
  return (
    <Card>
      {/* <Card.Status color="blue" side /> */}
      <Card.Header>
        <Card.Title>Create Product</Card.Title>
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
        <Form.FieldSet>
          <Form.Input
            name='name'
            label='Name'
            placeholder='' 
            value={values['name']}
            onChange={handleChange}
          />
          <Form.Input
            name='image'
            label='Image'
            placeholder='' 
            value={values['image']}
            type="file"
            onChange={(e)=>uploadFile(e)}
          />
          <Form.Input
            name='description'
            label='Description'
            placeholder='' 
            value={values['description']}
            onChange={handleChange}
          />
          <Form.Input
            name='price'
            label='Price'
            placeholder='' 
            value={values['price']}
            onChange={handleChange}
          />
          <Form.Input
            name='url'
            label='Url'
            placeholder='' 
            value={values['url']}
            onChange={handleChange}
          />
        </Form.FieldSet>
        </Form>
      </Card.Body>
      <Card.Footer>
        <div style={{textAlign:'right'}}>
          <Button
            color="primary" 
            size="sm" 
            className={`ml-2 ${isLoading ? 'btn-loading' : ''}`}
            onClick={(e)=>handleSubmit(e)}
          >
            Save
          </Button>
          <Button
            outline
            color="secondary"
            size="sm" 
            className="ml-2"
            onClick={()=>closeMainModal(false)}
          >
            Cancel
          </Button>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default ProductCreateModal;
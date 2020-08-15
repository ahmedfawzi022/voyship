import React, { useState, Component } from 'react';
import {Card, List, Button, Avatar, Tag, Form, Grid} from "tabler-react";
import Select from 'react-select';
import {useFetch} from '../../lib/useFetch';
import {baseUrl} from '../../lib/constants';
import postObject from '../../lib/postObject';

const CityCreateModal = ({closeMainModal}) => {
  const [form, changeFormInput] = useState({
    country: null,
    city: null,
    title: null,
    body: null,
  });

  const {data:countries, loading:countriesLoading} = useFetch(`countries`);

  const submitCity =() =>{
    const city = {
      country: form.country.value,
      city: form.toCity.value,
      title: form.title,
      body: form.body
    }
    console.log(city);
    postObject('stories', {...city});
  }
  return (
    <Card>
      <Card.Header>
        <Card.Title>CreateCity</Card.Title>
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
          <Form.Label>Country:</Form.Label>
          <Select
            isLoading={countriesLoading}
            value={form.country}
            onChange={(e)=>{changeFormInput({...form, country:e});}}
            options={countries && countries.map(country => {
              return({label: country.name, value: country['_id']});
            })}
          />
          <div className="pt-1"/>
          <Form.Input 
            name='title'
            label='Title'
            type='text'
            placeholder=''
            value={form.title}
            onChange={(e)=>{changeFormInput({...form, title:e.target.value})}}
          />
          <Form.Input 
            name='body'
            label='Body'
            type='text'
            placeholder=''
            value={form.body}
            onChange={(e)=>{changeFormInput({...form, title:e.target.value})}}
          />
        </Form>
      </Card.Body>
      <Card.Footer>
        <div style={{textAlign:'right'}}>
          <Button
            color="primary" 
            size="sm" 
            className="ml-2"
            onClick={()=>submitCity()}
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

export default CityCreateModal;
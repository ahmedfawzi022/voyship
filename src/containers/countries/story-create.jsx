import React, { useState, Component } from 'react';
import {Card, List, Button, Avatar, Tag, Form, Grid} from "tabler-react";
import Select from 'react-select';
import {useFetch} from '../../lib/useFetch';
import {baseUrl} from '../../lib/constants';
import postObject from '../../lib/postObject';
import {useForm} from '../../lib/useForm';


const StoryCreateModal = ({closeMainModal}) => {
  // const [form, changeFormInput] = useState({
  //   country: null,
  //   city: null,
  //   title: null,
  //   body: null,
  // });
  const [city, changeCity] = useState(null)
  const [country, changeCountry] = useState(null)

  const {data:countries, loading:countriesLoading} = useFetch(`countries`);
  const {data:cities, loading:citiesLoading} = useFetch(`cities?countryId=${country && country.value}`);
  const [form, handleChange] = useForm({
    countryId: '',
    cityId: '',
    title: '',
    body: '',
  });
  const submitStory =() =>{
    debugger;
    const story = {
      countryId: country.value,
      cityId: city.value,
      title: form.title,
      body: form.body
    }
    console.log(story);
    postObject('stories', {...story});
  }
  return (
    <Card>
      <Card.Header>
        <Card.Title>Create Story</Card.Title>
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
            // value={form.country}
            value={country}
            // onChange={(e)=>{changeFormInput({...form, country:e});}}
            onChange={(e)=> changeCountry(e)}
            options={countries && countries.map(country => {
              return({label: country.name, value: country['_id']});
            })}
          />
          <div className="pt-1"/>
          <Form.Label>City:</Form.Label>
          <Select
            isLoading={citiesLoading}
            // value={form.city}
            value={city}
            // onChange={(e)=>{changeFormInput({...form, fromCity:e})}}
            onChange={(e)=> changeCity(e)}
            options={cities && cities.map(city => {
              return({label: city.name, value: city['_id']});
            })}
          />
          <Form.Input 
            name='title'
            label='Title'
            type='text'
            placeholder=''
            value={form['title']}

            // onChange={(e)=>{changeFormInput({...form, title:e.target.value})}}
            onChange={handleChange}

          />
          <Form.Input 
            name='body'
            label='Body'
            type='text'
            placeholder=''
            value={form['body']}
            // onChange={(e)=>{changeFormInput({...form, title:e.target.value})}}
            onChange={handleChange}

          />
        </Form>
      </Card.Body>
      <Card.Footer>
        <div style={{textAlign:'right'}}>
          <Button
            color="primary" 
            size="sm" 
            className="ml-2"
            onClick={()=>submitStory()}
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

export default StoryCreateModal;
import React, { useState, Component } from 'react';
import {baseUrl, userImg} from '../../lib/constants';
import {Card, List, Button, Avatar, Tag, Form, Dimmer} from "tabler-react";
import {useFetch} from '../../lib/useFetch';
import postObject from '../../lib/postObject';
import {useForm} from '../../lib/useForm';
import Select from 'react-select';

const CountryCreateModal = ({recordId, closeMainModal}) => {
  const [data, handleChange] = useForm({
    name: '',
    countryCode: '',
    currency: '',
    pricePerKg: '',
    minTravelerReward: '',
    voyshipFeesPercentageOfTheTravelerReward:'',
    countryFlag:''
  });
  
  const uploadFile = (event) => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function(){
      let dataURL = reader.result;
      data['countryFlag'] = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>Create Country</Card.Title>
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
            name='countryCode'
            label='countryCode'
            placeholder=''
            value={data['countryCode']}
            onChange={handleChange}
          />
          <Form.Input
            name='currency'
            label='currency'
            placeholder=''
            value={data['currency']}
            onChange={handleChange}
          />
          <Form.Input
            name='pricePerKg'
            label='pricePerKg'
            type="number"
            min="0"
            placeholder=''
            value={data['pricePerKg']}
            onChange={handleChange}
          />
          <Form.Input
            name='minTravelerReward'
            label='minTravelerReward'
            type="number"
            min="0"
            placeholder=''
            value={data['minTravelerReward']}
            onChange={handleChange}
          />
          <Form.Input
            name='voyshipFeesPercentageOfTheTravelerReward'
            label='voyshipFeesPercentageOfTheTravelerReward'
            type="number"
            min="0"
            placeholder=''
            value={data['voyshipFeesPercentageOfTheTravelerReward']}
            onChange={handleChange}
          />
          <Form.Input
            name='countryFlag'
            label='Icon'
            placeholder=''
            value={data['countryFlag']}
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
            onClick={()=> postObject('countries', data)}
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

export default CountryCreateModal;
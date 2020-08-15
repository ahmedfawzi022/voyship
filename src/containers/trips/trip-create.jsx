import React, { useState, Component } from 'react';
import {Card, List, Button, Avatar, Tag, Form, Grid} from "tabler-react";
import Select from 'react-select';
import {useFetch} from '../../lib/useFetch';
import {baseUrl} from '../../lib/constants';
import postObject from '../../lib/postObject';

const TripCreateModal = ({closeMainModal}) => {
  const [form, changeFormInput] = useState({
    fromCountry : null,
    toCountry: null,
    fromCity: null,
    toCity: null,
    startDate: null,
    endDate: null,
    tripType: null,
    vehicleType: null,
    tripCapacity: null
  });

  const {data:countries, loading:countriesLoading} = useFetch(`countries`);
  const {data:fromCities, loading:fromCitiesLoading} = useFetch(`cities?countryId=${form.fromCountry && form.fromCountry.value}`);
  const {data:toCities, loading:toCitiesLoading} = useFetch(`cities?countryId=${form.toCountry && form.toCountry.value}`);

  const tripTypes = [{label: 'OneTrip', value: 'OneTrip'}]
  const vehicleTypes = [{label: 'Airline', value: 'Airline'}]

  const submitTrip =() =>{
    const trip = {
      fromCity: {
        cityId: form.fromCity.value['_id'],
        name: form.fromCity.value['name'],
        countryId: form.fromCity.value.countryId,
      },
      toCity: {
        cityId: form.toCity.value['_id'],
        name: form.toCity.value['name'],
        countryId: form.toCity.value.countryId,
      },
      startDate: form.startDate,
      endDate: form.endDate,
      tripType: form.tripType.value,
      vehicleType: form.vehicleType.value,
      tripCapacity: form.tripCapacity,
    }
    postObject('trips', {...trip});
  }
  return (
    <Card>
      <Card.Header>
        <Card.Title>Create Trip</Card.Title>
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
          <Grid>
            
            <Grid.Row>
              <Grid.Col width={6}>
                  <Form.Label>From:</Form.Label>
                  <Select
                    isLoading={countriesLoading}
                    value={form.fromCountry}
                    onChange={(e)=>{changeFormInput({...form,fromCity: null, fromCountry:e});}}
                    options={countries && countries.map(country => {
                      return({label: country.name, value: country['_id']});
                    })}
                  />
                  <div className="pt-1"/>
                  <Select
                    isLoading={fromCitiesLoading}
                    value={form.fromCity}
                    onChange={(e)=>{changeFormInput({...form, fromCity:e})}}
                    options={fromCities && fromCities.map(city => {
                      return({label: city.name, value: city});
                    })}
 
                  />
              </Grid.Col>
              <Grid.Col width={6}>
                <Form.Label>To:</Form.Label>
                <Select
                  isLoading={countriesLoading}
                  value={form.toCountry}
                  onChange={(e)=>{changeFormInput({...form,toCity:null, toCountry:e});}}
                  options={countries && countries.map(country => {
                    return({label: country.name, value: country['_id']});
                  })}
                />
                <div className="pt-1"/>
                <Select
                  isloading={toCitiesLoading}
                  value={form.toCity}
                  onChange={(e)=>{changeFormInput({...form, toCity:e})}}
                  options={toCities && toCities.map(city => {
                    return({label: city.name, value: city});
                  })}
                />
              </Grid.Col>
            </Grid.Row>
            
            <Grid.Row>
              <Grid.Col width={6}>
              <Form.Input 
                name='startdate'
                label='Start Date'
                type='date'
                placeholder=''
                value={form.startDate}
                onChange={(e)=>{changeFormInput({...form, startDate:e.target.value})}}
              />
              </Grid.Col>
              <Grid.Col width={6}>
                <Form.Input 
                  name='enddate'
                  label='End Date'
                  type='date'
                  placeholder=''
                  value={form.endDate}
                  onChange={(e)=>{changeFormInput({...form, endDate:e.target.value})}}
                />
              </Grid.Col>
            </Grid.Row>
            
            <Grid.Row>
              <Grid.Col width={6}>
                <Form.Label>Trip Type</Form.Label>
                  <Select
                    value={form.tripType}
                    onChange={(e)=>{changeFormInput({...form,tripType:e});}}
                    options={tripTypes}
                  />
              </Grid.Col>
              <Grid.Col width={6}>
                <Form.Label>Vehicle Type</Form.Label>
                  <Select
                    value={form.vehicleType}
                    onChange={(e)=>{changeFormInput({...form, vehicleType:e});}}
                    options={vehicleTypes}
                  />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col width={6}>
                <Form.Input
                  name='tripCapacity'
                  label='Trip Capacity'
                  placeholder='tripCapacity'
                  type="number"
                  min="0"
                  step="1"
                  value={form.tripCapacity}
                  onChange={(e)=>{changeFormInput({...form, tripCapacity:e.target.value})}}
                />
              </Grid.Col>
            </Grid.Row>
          </Grid>
        </Form>
      </Card.Body>
      <Card.Footer>
        <div style={{textAlign:'right'}}>
          <Button
            color="primary" 
            size="sm" 
            className="ml-2"
            onClick={()=>submitTrip()}
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

export default TripCreateModal;
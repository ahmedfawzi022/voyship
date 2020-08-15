import React, { useState, Component } from 'react';
import {Card, List, Button, Form, Grid, Avatar} from "tabler-react";
import {useFetch} from '../../lib/useFetch';
import {useError} from "../../state/error";
import postObject from '../../lib/postObject';
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
import ShipmentCreateAddProduct from './shipment-create-add-product';
import ShipmentCreateSelectLocation from './shipment-create-select-location';
import PriceDetails from './price-details';

const ShipmentCreateModal = ({closeMainModal}) => {
  const [page, showPage]= useState('main')
  const {setIsError} = useError();
  const [form, changeFormInput] = useState({
    name: null,
    fromCountry : null,
    toCountry: null,
    fromCity: null,
    toCity: null,
    owner: null,
    products: [],
    shipmentArrivalDate: null,
    meetingPoint: {
      name: "none",
      lat: "0",
      lng: "0"
    },
    isHomeDelivery: false,
    price: null,
  });
  const [userString, userStringChange] = useState('');
  const {data:users, loading:usersLoading} = useFetch(`users?email=${userString}`);
  const {data:countries, loading:countriesLoading} = useFetch(`countries`);
  const {data:fromCities, loading:fromCitiesLoading} = useFetch(`cities?countryId=${form.fromCountry && form.fromCountry.value}`);
  const {data:toCities, loading:toCitiesLoading} = useFetch(`cities?countryId=${form.toCountry && form.toCountry.value}`);

  const validateData = (obj) => {
    let errors = [];
    Object.keys(obj).forEach(key => {
      if (!obj[key] && obj[key]!== false) {errors.push(key)}
      if (typeof obj[key] === 'object') {
        validateData(obj[key])
      }
    });
    console.log(errors)
    if (errors && errors.length> 0) {
      setIsError("there was an error")
    }
    return errors && errors.length > 0 ? false : true;
  }

  const saveProduct = (product)=> {
    const {category, subcategory, ...trimmed} = product
    const productTogo = {
      subCategoryId: subcategory.value,
      ...trimmed,
    }
    if (validateData(productTogo)){
      form.products.push(productTogo);
      showPage('main');
    }
  }

  const calculatePrice = () => {
    const pricingObj = {
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
      isHomeDelivery: form.isHomeDelivery,
      products: form.products,
    }
    if (validateData(pricingObj)){
      postObject('prices/calculate', pricingObj)
      .then(data => {
        changeFormInput({...form, price: data.data})
        showPage('priceDetails');
      })
    }
  }
  const submitShipment = ()=>{
    const shipment = {
      shipmentType: "ShipmentOnly",
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
      owner: {
        userId: form.owner.value['_id'],
        username: form.owner.value.username,
        roles: form.owner.value.roles,
      },
      shipmentArrivalDate: form.shipmentArrivalDate,
      meetingPoint: form.meetingPoint,
      products: form.products,
      isHomeDelivery: form.isHomeDelivery,
      price: form.price
    }
    postObject('shipments', shipment);
  }
  return (
    <Card>
      {/* <Card.Status color="blue" side /> */}
      <Card.Header>
        <Card.Title>Create Shipment</Card.Title>
        <Card.Options>
          <Button size="sm" icon="x" onClick={()=>closeMainModal()} />
        </Card.Options>
      </Card.Header>
      <Card.Body>
        {page==='main' &&
          <Form>
          <Grid>
            <Grid.Row>
              <Grid.Col width={6}>
                <Form.Label>User:</Form.Label>
                <Select
                  value={form.owner}
                  options={users && users.map(user => {
                    return({label: user.email, value:user});
                  })}
                  onInputChange={(e)=>{userStringChange(e)}}
                  isSearchable
                  placeholder="user"
                  isLoading={usersLoading}
                  onChange={(e)=>{changeFormInput({...form, owner:e});}}
                />
              </Grid.Col>
              <Grid.Col width={6}>
                <Form.Label>Arrival Date:</Form.Label>
                <DateTimePicker
                  onChange={(e)=>{changeFormInput({...form, shipmentArrivalDate:e})}}
                  value={form.shipmentArrivalDate}
                />
              </Grid.Col>
            </Grid.Row>
            <br/>
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
            <br/>
            <Grid.Row>
              <Grid.Col width={6}>
                <Form.Label>
                  Meeting Point:
                  <Button
                    color="secondary" 
                    outline
                    size="sm" 
                    className="ml-2"
                    onClick={()=>showPage('selectLocation')}
                  >
                    SelectLocation
                  </Button>
                </Form.Label>
                <Grid>
                  <Grid.Row>
                  <Grid.Col width={4}>
                  <Form.Input 
                    name='meetingpoint[name]'
                    label='Name'
                    placeholder=''
                    value={form.meetingPoint.name}
                    onChange={(e)=>{changeFormInput({...form, meetingPoint:{...form.meetingPoint, name:e.target.value}})}}
                  />
                  </Grid.Col>
                  <Grid.Col width={4}>
                  <Form.Input 
                    name='lat'
                    label='LAT'
                    placeholder=''
                    value={form.meetingPoint.lat}
                    onChange={(e)=>{changeFormInput({...form, meetingPoint:{...form.meetingPoint, lat:e.target.value}})}}
                  />
                  </Grid.Col>
                  <Grid.Col width={4}>
                  <Form.Input
                    name='lng'
                    label='LNG'
                    placeholder=''
                    value={form.meetingPoint.lng}
                    onChange={(e)=>{changeFormInput({...form, meetingPoint:{...form.meetingPoint, lng:e.target.value}})}}
                  />
                  </Grid.Col>
                  </Grid.Row>
                </Grid>
              </Grid.Col>
              
              <Grid.Col width={6}>
                <Form.Label>
                  Products:
                  <Button
                    color="secondary" 
                    outline
                    size="sm" 
                    className="ml-2"
                    onClick={()=>showPage('addProduct')}
                  >
                    Add Products to Shipment
                  </Button>
                </Form.Label>
                {form.products && form.products.length > 0 &&
                  <Avatar.List stacked>
                    {form.products.map(product =>
                      <Avatar imageURL={product.picture || ""} />
                    )}
                  </Avatar.List>
                }            
              </Grid.Col>
            </Grid.Row>
          </Grid>
          </Form>
        }
        {page ==='addProduct' &&
          <ShipmentCreateAddProduct showPage={showPage} saveProduct={saveProduct}/>
        }
        {page === 'selectLocation' && 
          <ShipmentCreateSelectLocation showPage={showPage} />
        }
        {page === 'priceDetails' && form.price &&
          <PriceDetails
            showPage={showPage}
            pricingDetails={form.price}
            shipmentDetails={form}
          />
        }
      </Card.Body>
      <Card.Footer>
        <div style={{textAlign:'right'}}>
          {page === 'priceDetails' &&
            <Button
            color="secondary" 
            size="sm" 
            onClick={()=>showPage('main')}
            >
              back
            </Button>
          }
          { page === 'main' &&
            <Button
              color="primary" 
              size="sm" 
              className="ml-2"
              onClick={()=>calculatePrice()}
            >
              calculate
            </Button>
          }
          <Button
            color="primary" 
            size="sm" 
            className="ml-2"
            onClick={()=>submitShipment()}
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

export default ShipmentCreateModal;
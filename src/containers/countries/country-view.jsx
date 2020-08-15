import React, { useState, Component } from 'react';
import {baseUrl} from '../../lib/constants';
import {Card, List, Button, Avatar, Tag, Form, Dimmer, Grid} from "tabler-react";
import {useFetch} from '../../lib/useFetch';
import putObject from '../../lib/putObject';
import {useForm} from '../../lib/useForm';
const CountryViewModal = ({recordId, openMainModal, closeMainModal}) => {
  const [disabled, toggleDisabled]= useState(true);
  const {data:country, loading:countryLoading} = useFetch(`countries/${recordId}`);
  const {data:cities, loading:citiesLoading} = useFetch(`cities?countryId=${recordId}`);
  const [edited, setEdited] = useState({})

  const uploadFile = (event) => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function(){
      let dataURL = reader.result;
      country['countryFlag'] = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
  }
  const toggleEdit = () => {
    toggleDisabled(!disabled)
    setEdited({...country})
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
        active={countryLoading}
        loader={countryLoading}
      >
      {/* <Card.Status color="blue" side /> */}
      <Card.Header>
        <Card.Title>Country ({recordId})</Card.Title>
        <Card.Options>
          <Button size="sm" icon="x" onClick={()=>closeMainModal()}/>
        </Card.Options>
      </Card.Header>
      {!countryLoading && country &&
        <Card.Body>
          <Form onSubmit={(event) => console.log(event.target.name + 'clicked')}>
              <Form.FieldSet>
                <Grid>
                  <Grid.Row>
                    <Grid.Col width={6}>
                      {disabled ?
                        <Avatar size="md" imageURL={country['countryFlag']} />
                      :
                        <Form.Input
                          name='countryFlag'
                          label='Flag'
                          placeholder=''
                          type='file'
                          onChange={(e)=>uploadFile(e)}
                        />
                      }
                      <Form.Input
                        name='countryCode'
                        label='countryCode'
                        placeholder=''
                        value={disabled ? country['countryCode'] : edited['countryCode']}
                        onChange={(e)=>handleChange(e)}
                        disabled={disabled}
                      />
                      <Form.Input
                        name='currency'
                        label='currency'
                        placeholder=''
                        value={disabled ? country['currency'] : edited['currency']}
                        onChange={(e)=>handleChange(e)}
                        disabled={disabled}
                      />
                      <Form.Input
                        name='voyshipFeesPercentageOfTheTravelerReward'
                        label='voyshipFeesPercentageOfTheTravelerReward'
                        type="number"
                        min="0"
                        placeholder=''
                        value={
                          disabled ? country['voyshipFeesPercentageOfTheTravelerReward']
                        :
                        edited['voyshipFeesPercentageOfTheTravelerReward']
                      }
                        onChange={(e)=>handleChange(e)}
                        disabled={disabled}
                      />
                    </Grid.Col>
                    <Grid.Col width={6}>
                    <Form.Input
                      name='name'
                      label='Name'
                      placeholder=''
                      value={disabled ? country['name'] : edited['name']}
                      onChange={(e)=>handleChange(e)}
                      disabled={disabled}
                    />
                    <Form.Input
                      name='pricePerKg'
                      label='pricePerKg'
                      type="number"
                      min="0"
                      placeholder=''
                      value={disabled ? country['pricePerKg'] : edited['pricePerKg']}
                      onChange={(e)=>handleChange(e)}
                      disabled={disabled}
                    />
                    <Form.Input
                      name='minTravelerReward'
                      label='minTravelerReward'
                      type="number"
                      min="0"
                      placeholder=''
                      value={disabled ? country['minTravelerReward'] : edited['minTravelerReward']}
                      onChange={(e)=>handleChange(e)}
                      disabled={disabled}
                    />
                    </Grid.Col>
                  </Grid.Row>
                </Grid>

              {!citiesLoading && cities.length> 0 && (
                <List.GroupItem>
                  {cities && cities.map((city, i) => (
                    <Tag key={city['_id']} className="mr-2">{city.name}</Tag>
                  ))}
                </List.GroupItem>
              )}
            </Form.FieldSet>
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
              openMainModal('country-delete', recordId)
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
                'countries',
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
      </Dimmer>
    </Card>
  )
}

export default CountryViewModal;
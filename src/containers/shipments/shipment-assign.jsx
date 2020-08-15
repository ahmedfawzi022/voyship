import React, { useState, Component } from 'react';
import {Card, List, Button, Form, Dimmer} from "tabler-react";
import {useFetch} from '../../lib/useFetch';
import Select from 'react-select';
import putObject from '../../lib/putObject';

const ShipmentAssignModal = ({
  recordId,
  openMainModal,
  closeMainModal
}) => {
  const [tripString, tripStringChange] = useState('');
  const {data:shipment, loading:shipmentLoading} = useFetch(`shipments/${recordId}`);
  const {data:trips, loading:tripsLoading} = useFetch(`trips?id=${tripString}`);
  const assignShipment = () => {
    putObject(`trips/${tripString}/assignShipment`, {shipmentId: recordId})
  }
  return (
    <Card>
      <Dimmer
        active={shipmentLoading}
        loader={shipmentLoading}
      >
      <Card.Header>
        <Card.Title>Assign Shipment({recordId})</Card.Title>
        <Card.Options>
          <Button
            size="sm"
            icon="x"
            onClick={()=>closeMainModal()}
          />
        </Card.Options>
      </Card.Header>
      {!shipmentLoading && shipment &&
        <Card.Body>
          <Form>
            <Form.Label>Trips:</Form.Label>
            <Select
              value={tripString}
              options={trips && trips.map(trip => {
                return({label: trip.bookingInfo.flightNo, value:trip});
              })}
              onInputChange={(e)=>{tripStringChange(e)}}
              isSearchable
              placeholder="Trip id"
              isLoading={tripsLoading}
              onChange={(e)=>{tripStringChange(e);}}
            />
          </Form>
        </Card.Body>
      }
      <Card.Footer>
        <div style={{textAlign:'right'}}>
          <Button
            color="primary"
            size="sm"
            className="ml-2"
            onClick={()=>assignShipment()}
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
            Cancel
          </Button>
        </div>
      </Card.Footer>
      </Dimmer>
    </Card>
  )
}

export default ShipmentAssignModal;

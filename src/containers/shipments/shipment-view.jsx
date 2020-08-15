import React, { useState, Component } from 'react';
import {Card, List, Button, Form, Dimmer, Grid} from "tabler-react";
import {baseUrl, userImg} from '../../lib/constants';
import {useFetch} from '../../lib/useFetch';

const ShipmentViewModal = ({
  recordId,
  openMainModal,
  closeMainModal
}) => {
  const {data:shipment, loading:shipmentLoading} = useFetch(`shipments/${recordId}`);
  return (
    <Card>
      <Dimmer
        active={shipmentLoading}
        loader={shipmentLoading}
      >
      {/* <Card.Status color="blue" side /> */}
      <Card.Header>
        <Card.Title>Shipment({recordId})</Card.Title>
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
          <Grid>
            <Grid.Row>
              <Grid.Col width={6}>
                <p>
                  <span>From: </span>
                  <span>{shipment.fromCity.name}</span>
                </p>
                <p>
                  <span>To: </span>
                  <span>{shipment.toCity.name}</span>
                </p>
                <p>
                  <span>Owner: </span>
                  <span>{shipment.owner.username}</span>
                </p>
              </Grid.Col>
              <Grid.Col width={6}>
                  <p>
                   <span>MileStone: </span>
                   <span>{shipment.milestone}</span>
                  </p>
                  <p>
                   <span>State: </span>
                   <span>{shipment.state}</span>
                  </p>
                  <p>
                   <span>shipmentType: </span>
                   <span>{shipment.shipmentType}</span>
                  </p>
                  <p>
                   <span>Total Weight: </span>
                   <span>{shipment.totalWeight}</span>
                  </p>
              </Grid.Col>
            </Grid.Row>
          </Grid>
        </Card.Body>
      }
      <Card.Footer>
        <div style={{textAlign:'right'}}>
            <Button
              outline
              color="primary"
              size="sm"
              className="ml-2"
              onClick={()=>{}}
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
                openMainModal('shipments-delete', recordId);
              }}
            >
              Delete
            </Button>
        </div>
      </Card.Footer>
      </Dimmer>
    </Card>
  )
}

export default ShipmentViewModal;

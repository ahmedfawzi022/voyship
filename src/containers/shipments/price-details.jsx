import React, { useState, useEffect, Component } from 'react';
import {baseUrl, productImg} from '../../lib/constants';
import {Card, List, Button, Form, Grid, Dimmer} from "tabler-react";

const PriceDetails = ({showPage, pricingDetails, shipmentDetails}) => {
  console.log(shipmentDetails);
  return (
    <Grid>
      <Grid.Row>
        <Grid.Col width={6}>
          <p>
            <span>From:</span>
            <span>{shipmentDetails.fromCity.value.name}</span>
          </p>
          <p>
            <span>To:</span>
            <span>{shipmentDetails.toCity.value.name}</span>
          </p>
          <p>
            <span>Owner:</span>
            <span>{shipmentDetails.owner.value.username}</span>
          </p>
        </Grid.Col>
        <Grid.Col width={6}>
            <p>
              <span>shipment Price: </span>
              <span>{pricingDetails['shipmentPrice']}</span>
            </p>
            <p>
              <span>Reward: </span>
              <span>{pricingDetails['reward']}</span>
            </p>
            <p>
              <span>Voyship Fees: </span>
              <span>{pricingDetails['voyshipFees']}</span>
            </p>
            <p>
              <span>Delivery Fees: </span>
              <span>{pricingDetails['deliveryFees']}</span>
            </p>
            <p>
              <span><b>Total: </b></span>
              <span><b>{pricingDetails['total']}</b></span>
            </p>
        </Grid.Col>
      </Grid.Row>
    </Grid>
  );
}
export default PriceDetails;
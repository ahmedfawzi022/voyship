import React, { useState, Component } from 'react';
import {Card, List, Button, Form} from "tabler-react";
import {baseUrl} from '../../lib/constants';
import Map from '../../components/googleMap/index.js';
import LocationPickerMap from '../../components/googleMap/locationPicker'
const ShipmentCreateSelectLocation = ({showPage}) => (
  // <Map />
  <LocationPickerMap />
)

export default ShipmentCreateSelectLocation
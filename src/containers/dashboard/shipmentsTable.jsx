import React,{Fragment, useState} from 'react';
import {Table,  Button, Dimmer, Card, Avatar, Nav} from 'tabler-react'
import {sortBy} from 'lodash'
import {GetLabelColor} from '../../lib/helpers'
import {useFetch} from '../../lib/useFetch';
import {userImg} from '../../lib/constants'

const tableHeaders = ["Shopper", "Pick Up", "Destination", "State"];
const mapResponseData = (data) => {
    const getTrimmedObj = (obj) =>{
      let trimmedObj = {}
      trimmedObj['id'] = obj['_id'];
      trimmedObj['owner'] = {
          img: obj.owner && (obj.owner.image || userImg),
          user: obj.owner && obj.owner.username
      }
      trimmedObj['pickup'] = obj.fromCity.name;
      trimmedObj['Destination'] = obj.toCity.name;
      trimmedObj['state'] = obj.state;
      return trimmedObj;
    }
    if (data){
        return data.map(obj => getTrimmedObj(obj));
      }
    return [];
}

const ShipmentsTable = ({
    openMainModal,
}) => {
    const [type, changeType] = useState('shipmentType=ShipmentOnly');
    const [status, changeStatus] = useState('state=In Negotiation');
    const {data, loading} = useFetch(`shipments?${type}&${status}`);
    const renderActions = (id) => {
        return(
            <Fragment>
                <Button
                    color="secondary"
                    icon=""
                    size="sm"
                    onClick={()=>openMainModal('shipment-view',id)}
                >
                    View
                </Button>
                &nbsp;
                <Button
                    color="secondary"
                    icon=""
                    size="sm"
                    onClick={()=>openMainModal('shipment-view', id)}
                    // disabled={type!=='ship'}
                >
                    Offer
                </Button>
                &nbsp;
                <Button
                    color="secondary"
                    icon=""
                    size="sm"
                    onClick={()=>openMainModal('shipment-view', id)}
                >
                    Assign
                </Button>
            </Fragment>
        )
    }
    return (
        <Fragment>
        <Card>
            <Card.Header>
                Shipments
            </Card.Header>
            <Nav>
                <Nav.Item
                    active={type==='shipmentType=ShipmentOnly'}
                    icon=""
                    onClick={()=>{
                        changeType('shipmentType=ShipmentOnly');
                        changeStatus('state=In Negotiation');
                    }}
                >
                    Ship Only
                </Nav.Item>
                <Nav.Item
                    active={type==='shipmentType=PrimeShipment'}
                    icon=""
                    onClick={()=>{
                        changeType('shipmentType=PrimeShipment');
                        changeStatus('state=In Negotiation')
                    }}
                >
                    Prime Shipments
                </Nav.Item>
                <Nav.Item
                    active={type==='purchase'}
                    icon=""
                    onClick={()=>{
                        changeType('purchase');
                        changeStatus('state=In Negotiation')
                    }}
                >
                    Purchase and ship
                </Nav.Item>
                <Nav.Item
                    active={type===''}
                    icon=""
                    onClick={()=>{changeType(''); changeStatus('')}}
                >
                    All Shipments
                </Nav.Item>
            </Nav>
            {type !== '' &&
                <Nav>
                    <Nav.Item
                        active={status==='state=In Negotiation'} icon=""
                        onClick={()=>changeStatus('state=In Negotiation')}
                    >
                        In Negotiation
                    </Nav.Item>
                    <Nav.Item
                        active={status==='state=In Progress'} icon=""
                        onClick={()=>changeStatus('state=In Progress')}
                    >
                        In Progress
                    </Nav.Item>
                </Nav>
            }
        <Card.Body>
        <Dimmer active={loading} loader={loading}>
        {!loading && data.length <1 ?
            <div className="alert alert-primary m-0">
                No shipments to show!
            </div>
        :
            <Table>
            <Table.Header>
                {tableHeaders.map((head, i) => (
                    <Table.ColHeader
                        key={`tableHeader-${i}`}
                    >{head}</Table.ColHeader>
                ))}
                <Table.ColHeader>Actions</Table.ColHeader>
            </Table.Header>
            <Table.Body>
                {mapResponseData(data).map((r, i) => (
                    <Table.Row key={i}>
                        {Object.keys(r).map((k, i)=>{
                            if(k=== 'id') return false;
                            if(k==='owner'){
                                return(
                                    <Table.Col>
                                        <Avatar size="sm" imageURL={r['owner']['img']} />
                                        &nbsp;
                                        {r['owner']['user']}
                                    </Table.Col>
                                );
                            }else if(k==='state'){
                                return(
                                    <Table.Col>
                                        <span className={`status-icon bg-${GetLabelColor(r[k])}`}/>
                                        {r[k]}
                                    </Table.Col>)
                                ;
                            }else{
                                return(
                                    <Table.Col>
                                        {r[k]}
                                    </Table.Col>
                                );
                            }
                        })}
                        <Table.Col>
                            {renderActions(r['id'])}
                        </Table.Col>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
        }
        </Dimmer>
        </Card.Body>
        </Card>
        </Fragment>
    )
}

export default ShipmentsTable;

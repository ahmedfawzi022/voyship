import React,{Fragment, useState} from 'react';
import {Table,  Button, Dimmer, Card, Tag, Nav, Avatar} from 'tabler-react'
import {userImg} from '../../lib/constants';
import {useFetch} from '../../lib/useFetch';
import {GetLabelColor} from '../../lib/helpers'


const tableHeaders = ["Shopper", "Pick Up", "Destination", "Trip Capacity", "State"];
const mapResponseData = (data) => {
    const getTrimmedObj = (obj) =>{
      let trimmedObj = {}
      trimmedObj['id'] = obj['_id'];
      trimmedObj['user'] = obj.user && obj.user.username;
      trimmedObj['pickup'] = obj.fromCity.name;
      trimmedObj['Destination'] = obj.toCity.name;
      trimmedObj['tripCapaity'] = obj['tripCapacity'];
      trimmedObj.state = obj.state;
      //   trimmedObj['createdAt'] = obj.createdAt;
      return trimmedObj;
    }
    if (data){
      return data.map(obj => getTrimmedObj(obj));
    }
    return [];
  }

const TripsTable = ({
    openMainModal, 
}) => {
    const [type, changeType] = useState('');
    const {data, loading} = useFetch(`trips`);
    const renderActions = (id) => {
        return(
            <div>
                <Button
                    color="secondary"
                    icon=""
                    size="sm"
                    onClick={()=>openMainModal('trip-view', id)}
                    // disabled={type==='pending'}
                >
                    view
                </Button>
                &nbsp;
                <Button
                    color="secondary"
                    icon=""
                    size="sm"
                    onClick={()=>openMainModal('trip-view', id)}
                    // disabled={type==='progress'}
                >
                    verify
                </Button>
                &nbsp;
                <Button
                    color="secondary"
                    icon=""
                    size="sm"
                    // onClick={()=>openMainModal(id)}
                >
                    chat
                </Button>
            </div>
        )
    }
    return (
        <Card>
            <Card.Header>
                Trips
            </Card.Header>
            {type !=='' &&
                <Nav>
                    <Nav.Item 
                        active={type==='pending'} icon=""
                        onClick={()=>changeType('pending')}
                    >
                        Pending Trips
                    </Nav.Item>
                    <Nav.Item
                        active={type==='progress'} icon=""
                        onClick={()=>changeType('progress')}
                    >
                        In Progress
                    </Nav.Item>
                    
                </Nav>
            }
        <Card.Body>
        <Table>
            <Table.Header>
                {tableHeaders.map((head, i) => (
                    <Table.ColHeader key={`tableHeader-${i}`}>
                        {head}
                    </Table.ColHeader>
                ))}
                <Table.ColHeader>Actions</Table.ColHeader>
            </Table.Header>

            <Table.Body>
                {mapResponseData(data).map((r, i) => (
                    <Table.Row key={i}>
                        {Object.keys(r).map((k, i)=>{
                            if(k==='id') return false;
                            if(k==='user'){
                                return(
                                    <Table.Col>
                                        <Avatar size="sm" imageURL={userImg} />&nbsp;
                                        {r[k]}
                                    </Table.Col>
                                );
                            }else if(k==='state'){
                                return(<Table.Col>
                                    <Tag color={GetLabelColor(r[k])} >
                                    {r[k]}</Tag>
                                </Table.Col>);
                            }else{
                                return(<Table.Col>{r[k]}</Table.Col>);
                            }
                        })}
                        <Table.Col>
                            {renderActions(r['id'])}
                        </Table.Col>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
        </Card.Body>
        </Card>
    )
}
export default TripsTable;

import React,{Fragment,useEffect,useState, Component} from 'react';
import {GetLabelColor} from '../../lib/helpers';
import postObject from '../../lib/postObject';
import { Container, Dimmer, Table, Card, Button, Avatar, Page, Form, Tag} from "tabler-react";
var actionsDisplay=false;
const submitAccept =(id) =>{
console.log(id)
     postObject(`trips/${id}/approve`,{})
  }
  const submitReject =(id) =>{
    console.log(id)
         postObject(`trips/${id}/reject`,{})
      }
const RecordsTable = ({
    
    headers,
    records,
    closeMainModal,
    openMainModal,
    loading
})=>{
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        var location = window.location.href
        if(location.includes('pending'))
        setHidden(true)
        else
        setHidden(false)

        console.log(actionsDisplay)
        document.body.className = 'pendingclass';
        return () => { document.body.className = ''; }

      })
  return(
      <Container>
        <Page.Header>
            <Page.Title>Trips</Page.Title>
        </Page.Header>
        <Card className="">
            <Dimmer active={loading} loader={loading}>
            <Card.Header>
                <Card.Options>
                    <Form.Input
                        icon="search"
                        placeholder="Search for..."
                        position="append"
                    />
                    {/* <Button
                        className="ml-2"
                        icon="plus"
                        color="primary"
                        size="md"
                        onClick={()=>openMainModal('trip-create')}
                    >
                        Create Trip
                    </Button> */}
                </Card.Options>
            </Card.Header>
            {!loading && records.length< 1 ?
                <div className="alert alert-primary m-0">
                    No Trips to show!
                </div>
            :
                <Table hasOutline striped>
            <Table.Header>
                {headers.map((head, i) => (
                <Table.ColHeader key={`tableHeader-${i}`}>{head}</Table.ColHeader>
                ))}
                <Table.ColHeader>Actions</Table.ColHeader>
            </Table.Header>
            <Table.Body>
                {records.map((r, i) => (
                <Table.Row key={i}>
                    {Object.keys(r).map((k, i)=>{
                        if (k==='id'){return false}
                        if (k==='imgUrl'){
                            return(<Table.Col>
                                <Avatar size="sm" imageURL={r[k]['imgUrl']} />
                            </Table.Col>);
                        }else if(k==='state'){
                            return(<Table.Col>
                                <Tag color={GetLabelColor(r[k])}>
                                {r[k]}</Tag>
                            </Table.Col>);
                        }else{
                            return(<Table.Col>{r[k]}</Table.Col>);
                        }
                    })}
                    <Table.Col>
                        <Button 
                            color="secondary" 
                            icon="" 
                            size="sm" 
                            onClick={()=>openMainModal('trip-view', r['id'])}
                        >
                            View
                        </Button>
                        <Button 
                            color="secondary" 
                            icon="" 
                            size="sm" 
                            onClick={()=>openMainModal('trip-chat', r['id'])}
                        >
                            Chat
                        </Button>
                        <Button 
                            color="secondary" 
                            icon="" 
                            size="sm"
                            // className={`${hidden}`}
                            className={"" + (hidden ? 'show-action' : 'hidden-action')}
                            onClick={()=>submitAccept(r['id'])}
                        >
                            Accept
                        </Button>
                        <Button 
                            color="secondary" 
                            icon="" 
                            size="sm" 
                            className={"" + (hidden ? 'show-action' : 'hidden-action')}

                            onClick={()=>submitReject(r['id'])}
                        >
                            Reject
                        </Button>
                    </Table.Col>
                </Table.Row>
                ))}
            </Table.Body>
            </Table>
            }
            </Dimmer>
        </Card>
    </Container>

  );
}

export default RecordsTable;
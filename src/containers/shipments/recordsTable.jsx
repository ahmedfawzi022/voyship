import React, {Fragment} from 'react';
import {GetLabelColor} from '../../lib/helpers'
import { Container, Table, Card, Button, Page, Form, Dimmer, Avatar} from "tabler-react";

const RecordsTable = ({
  headers,
  records,
  closeMainModal,
  openMainModal,
  loading
})=>{
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
                onClick={()=>openMainModal('shipment-assign', id)}
            >
                Assign
            </Button>
        </Fragment>
    )
  }
  return(
    <Container>
      <Page.Header>
        <Page.Title>Shipments</Page.Title>
      </Page.Header>
      <Card>
      <Dimmer active={loading} loader={loading}>
        <Card.Header>
          <Card.Options>
            <Form.Input
              icon="search"
              placeholder="Search for..."
              position="append"
            />
            <Button
              className="ml-2"
              icon="plus"
              color="primary"
              size="md"
              onClick={()=>openMainModal('shipment-create')}
            >
              Create Shipment
            </Button>
          </Card.Options>
        </Card.Header>
        {!loading && records.length< 1 ?
            <div className="alert alert-primary m-0">
                No Shipments to show!
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
      </Card>
    </Container>
  );
}

export default RecordsTable;
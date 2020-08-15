import React,{Fragment, Component} from 'react';
import {
  Container, Dimmer, Table, Card, 
  Button, Avatar, Page, Form
} from "tabler-react";

const RecordsTable = ({
  headers,
  records,
  closeMainModal,
  openMainModal,
  loading
})=>{
  return(
    <Container>
      <Page.Header>
        <Page.Title>Users</Page.Title>
      </Page.Header>
      <Card>
        <Dimmer
          active={loading}
          loader={loading}
        >
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
                onClick={()=>openMainModal('user-create')}
              >
                Create User
              </Button>
            </Card.Options>
          </Card.Header>
          {!loading && records.length< 1 ?
            <div className="alert alert-primary m-0">
              No Users to show!
            </div>
          :
            <Table
            hasOutline
            striped
          >
            <Table.Header>
              {headers.map((head, i) => (
                <Table.ColHeader
                  key={`tableHeader-${i}`}
                >
                  {head}
                </Table.ColHeader>
              ))}
              <Table.ColHeader>Actions</Table.ColHeader>
            </Table.Header>
            <Table.Body>
              {records.map((r, i) => (
                <Table.Row key={i}>
                  {Object.keys(r).map((k, i)=>{
                    if (k==='id'){ return false }
                    if (k==='image'){
                      return(<Table.Col>
                        <Avatar
                          size="sm" 
                          imageURL={r['image']}
                        />
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
                      onClick={()=>openMainModal('user-view', r['id'])}
                    >
                    View
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
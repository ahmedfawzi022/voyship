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
        <Page.Title>Countries</Page.Title>
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
                onClick={()=>openMainModal('country-create')}
              >
                Create Country
              </Button>
              <Button
                outline
                className="ml-2"
                icon="plus"
                color="secondary"
                size="md"
                onClick={()=>openMainModal('city-create')}
              >
                  Create City
              </Button>
            </Card.Options>
          </Card.Header>
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
                    if (k==='flag'){
                      return(
                        <Table.Col>
                          <Avatar size="sm" imageURL={r['flag']} />
                        </Table.Col>
                      );
                    } else if(k==='id'){
                      return false;
                    }else{
                      return(<Table.Col>{r[k]}</Table.Col>);
                    }
                  })}
                  <Table.Col>
                    <Button
                      color="secondary"
                      icon=""
                      size="sm"
                      onClick={()=>openMainModal('country-view', r['id'])}
                    >
                      View
                    </Button>
                  </Table.Col>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Dimmer>
      </Card>
    </Container>
  );
}

export default RecordsTable;
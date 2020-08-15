import React, { } from 'react';
import putObject from '../../lib/putObject';

import { Container, Table, Card, Button, Page, Form, Dimmer, Grid } from "tabler-react";
import Products from '.';
const submitAccept =(id) =>{
  console.log(id)
  putObject(`products/${id}/activate`,{"activate": true})
    }
    const submitReject =(id) =>{
      console.log(id)
      putObject(`products/${id}/activate`,{"activate": false})
        }
const RecordsTable = ({
  headers,
  records,
  closeMainModal,
  openMainModal,
  loading
}) => {
  return (
    <Container>
      <Page.Header>
        <Page.Title>Products</Page.Title>
      </Page.Header>
      <Grid>
        <Grid.Row>
          {!loading && records.length < 1 ?
            <Card className="p0">
              <Card.Header>
                <Card.Options>
                  <Button
                    className="ml-2"
                    icon="plus"
                    color="primary"
                    size="md"
                    onClick={() => openMainModal('product-create')}
                  >
                    Create Product
            </Button>
                </Card.Options>
              </Card.Header>
              <div className="alert alert-primary m-0">
                No products to show!
        </div>
            </Card>
            :
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
                      onClick={() => openMainModal('product-create')}
                    >
                      Create Product
            </Button>
                  </Card.Options>
                </Card.Header>
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
                        {Object.keys(r).map((k, i) => {
                          if (k === 'id') return false;
                          return (
                            <Table.Col>
                              {r[k]}
                            </Table.Col>
                          );
                        })}
                        <Table.Col>
                          <Button
                            color="secondary"
                            icon=""
                            size="sm"
                            onClick={() => openMainModal('product-view', r['id'])}
                          >
                            View
                    </Button>
                          <Button
                            color="secondary"
                            icon=""
                            size="sm"
                            // className={`${hidden}`}
                            // className={"" + (hidden ? 'show-action' : 'hidden-action')}
                            onClick={() => submitAccept(r['id'])}
                          >
                            Activate
                        </Button>
                          <Button
                            color="secondary"
                            icon=""
                            size="sm"
                            // className={"" + (hidden ? 'show-action' : 'hidden-action')}

                            onClick={() => submitReject(r['id'])}
                          >
                            Deactivate
                        </Button>
                        </Table.Col>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Dimmer>
            </Card>
          }
        </Grid.Row>
      </Grid>
    </Container>

  );
}

export default RecordsTable;
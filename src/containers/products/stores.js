import React,{Fragment, Component, useState} from 'react';
import {productImg} from '../../lib/constants';
import {useFetch} from '../../lib/useFetch';
import { Container, Grid, Table, Card, Button, Page, Form, Dimmer} from "tabler-react";

const  Stores = ({
  openMainModal,
  closeMainModal
})=>{
  const [page, setPage] = useState(1);
  const {data, loading} = useFetch(`stores?page=${page}&`);
    return(
      <Fragment>
        <Container>
          <Page.Header>
            <Page.Title>Stores</Page.Title>
          </Page.Header>
          <Grid>
            <Grid.Row>
            {!loading && data.length <1 ?
              <Card className="p0">
                <Card.Header>
                  <Card.Options>
                    <Button
                      className="ml-2"
                      icon="plus"
                      color="primary"
                      size="md"
                      onClick={()=>openMainModal('store-create')}
                    >
                      Create Store
                    </Button>
                  </Card.Options>
                </Card.Header>
                <div className="alert alert-primary m-0">
                  No stores to show!
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
                        onClick={()=>openMainModal('store-create')}
                    >
                        Create Store
                    </Button>
                </Card.Options>
            </Card.Header>
            <Table 
              hasOutline
              striped
              className="table card-table table-vcenter"
            >
              <Table.Header>
                {['Logo', 'Store Name', 'Products'].map((head, i) => (
                  <Table.ColHeader
                    key={`tableHeader-${i}`}
                    className="text-center"
                  >
                    {head}
                  </Table.ColHeader>
                ))}
            </Table.Header>
              <Table.Body>
                {data && data.map(({image, logo, name,category, url}, i) => (
                  <Table.Row key={i}>
                    <Table.Col className="text-center">
                      <img
                        src={image || productImg}
                        alt=""
                        className="h-8"
                      />
                    </Table.Col>
                    <Table.Col className="text-center">
                      {name}
                    </Table.Col>
                    <Table.Col
                      className="text-center text-muted d-none d-md-table-cell text-nowrap"
                    >
                      {category}
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
      </Fragment>
    );
  }

export default Stores;

import React, { Fragment, useState } from 'react';
import { baseUrl } from '../../lib/constants';
import { useFetch } from '../../lib/useFetch';
import { Container, Grid, Table, Card, Button, Page, Form, Dimmer } from "tabler-react";
import { useHistory } from 'react-router-dom';


const Subcategories = ({
  openMainModal,
  closeMainModal
}) => {
  const history = useHistory();

  const [page, setPage] = useState(1);
  const { data, loading } = useFetch(`categories?page=${page}&`);
  return (
    <Fragment>
      <Container>
        <Page.Header>
          <Page.Title>Sub</Page.Title>
        </Page.Header>
        <Grid>
          <Grid.Row>
            <Card>
              <Dimmer active={loading} loader={loading}>
                <Card.Header>

                </Card.Header>
                <Table
                  hasOutline
                  striped
                  className="table card-table table-vcenter"
                >
                  <Table.Header>
                    {['name', 'image', 'icon'].map((head, i) => (
                      <Table.ColHeader
                        key={`tableHeader-${i}`}
                        className="text-center"
                      >
                        {head}
                      </Table.ColHeader>
                    ))}
                    <Table.ColHeader>Actions</Table.ColHeader>
                  </Table.Header>
                  <Table.Body>
                    {data && data.map(({ name, image, icon, _id }, i) => (
                      <Table.Row key={i}>
                        <Table.Col className="text-center">
                          {name}
                        </Table.Col>
                        <Table.Col className="text-center">
                          {image}
                        </Table.Col>
                        <Table.Col className="text-center">
                          {icon}
                        </Table.Col>
                        <Table.Col>
                          <Button
                            color="secondary"
                            icon=""
                            size="sm"
                            onClick={() => openMainModal('category-view', _id)}
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
          </Grid.Row>
        </Grid>
      </Container>
    </Fragment>
  );
}

export default Subcategories;

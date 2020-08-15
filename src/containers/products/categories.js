import React,{Fragment, useState} from 'react';
import {baseUrl} from '../../lib/constants';
import {useFetch} from '../../lib/useFetch';
import { Container, Grid, Table, Card, Button, Page, Form, Dimmer} from "tabler-react";
import { useHistory } from 'react-router-dom';
import PaginationBar from '../../components/pagination';


const  Categories = ({
  openMainModal,
  closeMainModal
})=>{
  const history = useHistory();
  const [limit, setLimit] = useState(20);

  const [page, setPage] = useState(1);
  const {data, loading,totalCount} = useFetch(`categories?page=${page}&`);
    return(
      <Fragment>
        <Container>
          <Page.Header>
            <Page.Title>Categories</Page.Title>
          </Page.Header>
          <Grid>
            <Grid.Row>
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
                      onClick={()=>openMainModal('category-create')}
                    >
                        Create Category
                    </Button>
                    <Button
                      className="ml-2"
                      icon="plus"
                      color="secondary"
                      size="md"
                      onClick={()=>openMainModal('sub-category-create')}
                    >
                        Create SubCategory
                    </Button>
                </Card.Options>
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
                {data && data.map(({name, image, icon, _id}, i) => (
                  <Table.Row key={i}>
                    <Table.Col className="text-center">
                      {name}
                    </Table.Col>
                    <Table.Col className="text-center">
                      <img width="50" height="50" src={image} />
                    </Table.Col>
                    <Table.Col className="text-center">
                      <img width="50" height="50" src={icon} />
                    </Table.Col>
                    <Table.Col>
                      <Button
                        color="secondary"
                        icon=""
                        size="sm"
                        onClick={()=> openMainModal('category-view', _id)}
                      >
                        View
                      </Button>
                      {/* <Button
                        color="secondary"
                        icon=""
                        size="sm"
                        onClick={()=> history.push(`/products/categories/${_id}/subcategories`)}
                      >
                        Sub Category
                      </Button> */}

                    </Table.Col>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <PaginationBar
          page={page}
          totalCount={totalCount}
          limit={limit}
          setPage={setPage}
        />
            </Dimmer>
            </Card>
            </Grid.Row>
          </Grid>
        </Container>
      </Fragment>
    );
  }

export default Categories;

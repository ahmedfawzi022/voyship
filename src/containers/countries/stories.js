import React,{Fragment, Component} from 'react';
import { Container, Page, Grid, Table, Card, Button, Dimmer, Form} from "tabler-react";
import {sortBy} from 'lodash'
import MainModal from '../../components/modal'
import StoriesCard from './storiesCard'
import {baseUrl, userImg} from '../../lib/constants';
import {useFetch} from '../../lib/useFetch';

const Stories =({openMainModal}) =>{
    const {data, loading} = useFetch(`stories`);
    return(
      <Fragment>
        <Container>
          <Page.Header>
            <Page.Title>Stories</Page.Title>
          </Page.Header>
          <Card>
           <Dimmer active={loading} loader={loading}><Card.Header>
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
                  onClick={()=>openMainModal('story-create')}
                >
                  Create Story
                </Button>
              </Card.Options>
            </Card.Header>
           {!loading && data && data.length <0 &&
              <div className="alert alert-primary m-0">
                No Stories to show!
              </div>
            }
            {!loading && data && data.length >0 &&
              <Card.Body>
              <Grid>
                <Grid.Row>
                  {data.map((story, i) => (
                    <Grid.Col width={3}>
                      <StoriesCard
                        story={story}
                        key={`${story}-${i}`}
                      />
                    </Grid.Col>
                  ))}
                </Grid.Row>
              </Grid>
              </Card.Body>
            }
            </Dimmer>
            </Card>
        </Container>
      </Fragment>
    );
}

export default Stories;

import React, { Fragment, Component } from 'react';
import {users, revenue, allStats} from "./stats.json"
import PieToShow from '../../components/pieToShow'
import { Container, Grid, Card, Dimmer, StatsCard, StampCard, Page, Progress} from "tabler-react";

import UsersTable from './usersTable';
import TravellersTable from './travellersTable';
import ShoppersTable from './shoppersTable';
import ShipmentsTable from './shipmentsTable';
import TripsTable from './tripsTable';

const DashBoard = ({ openMainModal, closeMainModal })=> {
    return (
      <Container>
        <Page.Header>
          <Page.Title>DashBoard</Page.Title>
        </Page.Header>
        <Grid>
          <Grid.Row cards deck alignItems="center">
            {allStats.map(({text, val, color, icon}, i) => (
              <Grid.Col>
                <StatsCard 
                  layout={1}
                  movement={3}
                  total={val}
                  label={text}
                />
              </Grid.Col>
            ))}
          </Grid.Row>

          <Grid.Row>
            <Grid.Col width={6}>
              <Grid>
                <Grid.Row cards deck alignItems="center">
                  {revenue.map(({text, val, color}, i) => (
                    <Grid.Col className="stat-cards-col">
                      <Card className="pb-4 pt-4">
                        <div className="card-body text-center">
                          <div className="h5">{text}</div>
                          <div className="display-4 font-weight-bold mb-4">{val}</div>
                          <Progress size="sm">
                            <Progress.Bar color={color} width={50}/>
                          </Progress>
                        </div>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid.Row>
                
                <Grid.Row cards deck>
                  {users.map(({text, val, icon, color}, i) => (
                    <Grid.Col>
                      <StampCard icon={icon} color={color}>
                        {val}&nbsp;{text}
                      </StampCard>
                    </Grid.Col>
                  ))}
                </Grid.Row>

              </Grid>
            </Grid.Col>
            <Grid.Col width={3}>
              <Card>
                <Card.Header>
                  <Card.Title>
                    Revenue VS collection
                  </Card.Title>
                </Card.Header>
                <Card.Body className="p-0 text-center">
                  <PieToShow type={'donut'} />
                </Card.Body>
              </Card>
            </Grid.Col>
            <Grid.Col width={3}>
            <Card>
                <Card.Header>
                  <Card.Title>
                    Travelers VS Shippers
                  </Card.Title>
                </Card.Header>
                <Card.Body className="p-0 text-center">
                  <PieToShow type={'pie'} />
                </Card.Body>
              </Card>
            </Grid.Col>      
          </Grid.Row>
          
          
          <Grid.Row>
            <Grid.Col width={12}>
              <ShipmentsTable
                openMainModal={openMainModal}
                closeMainModal={closeMainModal}
              />
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col width={12}>
              <TripsTable
                openMainModal={openMainModal}
                closeMainModal={closeMainModal}
              />
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col width={4}>
              <UsersTable
                openMainModal={openMainModal}
                closeMainModal={closeMainModal}
              />
            </Grid.Col>
            <Grid.Col width={4}>
              <TravellersTable
                openMainModal={openMainModal}
                closeMainModal={closeMainModal}
              />
            </Grid.Col>
            <Grid.Col width={4}>
              <ShoppersTable
                openMainModal={openMainModal}
                closeMainModal={closeMainModal}
              />
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }


export default DashBoard;
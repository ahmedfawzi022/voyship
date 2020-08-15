import React, {Fragment} from 'react';
import { Grid, Table, Card, Button, Avatar, Dimmer } from "tabler-react";
import {baseUrl, userImg}  from '../../lib/constants';
import {useFetch} from '../../lib/useFetch';
const ShoppersTable = ({ openMainModal }) => {
const {data, loading} = useFetch(`users`);
return(
  <Fragment>
    <Card>
        <Card.Header>
          Shoppers
        </Card.Header>
        <Card.Body>
          <Dimmer active={loading} loader={loading}>
          <Table>
            <Table.Header>
              <Table.ColHeader>username</Table.ColHeader>
              <Table.ColHeader>Actions</Table.ColHeader>
            </Table.Header>
            <Table.Body>
              {data && data.map((r, i) => (
                <Table.Row key={i}>
                  {Object.keys(r).map((k, i)=>{
                    if (k==='phone'){
                      return(<Table.Col>{r[k]}</Table.Col>);
                    }
                    if (k==='username'){
                      return(
                        <Table.Col>
                          <Avatar
                            size="sm"
                            imageURL={r['imgUrl'] || userImg}
                          />
                          &nbsp;
                          {r['firstName']}
                        </Table.Col>
                      );
                    }
                  })}
                  <Table.Col>
                    <Button
                      color="secondary"
                      icon=""
                      size="sm"
                      onClick={()=>openMainModal('user-view', r['_id'])}
                    >
                      View
                    </Button>
                  </Table.Col>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          </Dimmer >
        </Card.Body>
      </Card>
  </Fragment>
)}

export default ShoppersTable;

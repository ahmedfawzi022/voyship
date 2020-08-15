import React, {Fragment} from 'react';
import {Dimmer, Table, Card, Button, Avatar} from "tabler-react";
import {baseUrl} from '../../lib/constants';
import {useFetch} from '../../lib/useFetch';
const TravellersTable = ({ openMainModal }) => {
  const {data, loading} = useFetch(`users`);
  return(
  <Fragment>
    <Card>
        <Card.Header>
          Travellers
        </Card.Header>
        <Card.Body>
          <Dimmer active={loading} loader={loading}>
          <Table>
            <Table.Header>
              <Table.ColHeader>name</Table.ColHeader>
              <Table.ColHeader>email</Table.ColHeader>
              <Table.ColHeader>Actions</Table.ColHeader>
            </Table.Header>
            <Table.Body>
              {data && data.map((r, i) => (
                <Table.Row key={i}>
                  {Object.keys(r).map((k, i)=>{
                    if (k==='email'){
                      return(<Table.Col>{r[k]}</Table.Col>);
                    }
                    if (k==='username'){
                      return(
                        <Table.Col>
                          {/* <Avatar
                            size="sm"
                            imageURL={r['imgUrl']}
                          /> */}
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
          </Dimmer>
        </Card.Body>
      </Card>
  </Fragment>
)}

export default TravellersTable;

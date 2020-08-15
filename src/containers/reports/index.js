import React,{Fragment} from 'react';
import { Container, Page} from "tabler-react";


const Reports = ({
  openMainModal,
  closeMainModal
}) => {

  return(
    <Fragment>
      <Container>
      <Page.Header>
          <Page.Title>Reports</Page.Title>
      </Page.Header>
      </Container>
    </Fragment>
  );
}

export default Reports;

import React, { Fragment } from 'react';
import { Nav, Container, Notification, Avatar} from "tabler-react";
import logo from '../../assets/logo.png'
const MainActionsHeader = ({openMainModal, closeMainModal}) => {
  return(
    <div className="bg-white border-bottom main-action-header">
      <Container className="logo-div">
        <div className="pt-1">
          <img src={logo} alt="logo" className="logo-img"/>
        </div>

        <div className="main-header-div">
          <Nav>
            <Nav.Item
              icon="plus"
              onClick={()=>openMainModal('shipment-create')}
            >
              Shipment
            </Nav.Item>
            <Nav.Item
              icon="plus"
              onClick={()=>openMainModal('user-create')}
            >
              User
            </Nav.Item>
            <Nav.Item 
              icon="plus"
              onClick={()=>openMainModal('product-create')}
            >
              Product
            </Nav.Item>
            <Nav.Item
              icon="plus"
              onClick={()=>openMainModal('category-create')}
            >
              Category
            </Nav.Item>
            <Nav.Item 
              icon="plus"
              onClick={()=>openMainModal('country-create')}
            >
              Country
            </Nav.Item>
            <Nav.Item
              icon="plus"
              onClick={()=>openMainModal('store-create')}
            >
              Store
            </Nav.Item>
            <Nav.Item
              icon="plus"
              onClick={()=>openMainModal('story-create')}
            >
              Story
            </Nav.Item>
          </Nav>
        </div>

        <div>
          <Notification.Tray
            notificationsObjects={[
              {
                avatarURL: "demo/faces/male/41.jpg",
                message: (
                  <React.Fragment>
                    <strong>Nathan</strong> pushed new commit: Fix page load performance
                    issue.
                  </React.Fragment>
                ),
                time: "10 minutes ago",
              },
              {
                avatarURL: "demo/faces/female/1.jpg",
                message: (
                  <React.Fragment>
                    <strong>Alice</strong> started new task: Tabler UI design.
                  </React.Fragment>
                ),
                time: "1 hour ago",
              },
              {
                avatarURL: "demo/faces/female/18.jpg",
                message: (
                  <React.Fragment>
                    <strong>Rose</strong> deployed new version of NodeJS REST Api // V3
                  </React.Fragment>
                ),
                time: "2 hours ago",
              },
            ]}
          />
          <div className="avatar-container">
            <Avatar className="d-flex" size="md" imageURL={'https://react.semantic-ui.com/images/avatar/small/matthew.png'} />
          </div>
          <div className="user-details">
            <b>Ahmed Gendy</b>
            <p>Administrator</p>
          </div>
        </div>
      </Container>
    </div>
  )
}
export default MainActionsHeader;

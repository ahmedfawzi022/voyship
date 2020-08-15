import React, { Fragment, useState} from 'react'
import {Route, Redirect} from 'react-router-dom'
import MainActionsHeader from '../../components/mainActions'
import Sidebar from '../../components/sidebar'
import MainFooter from '../../components/footer'
import MainModal from '../../components/modal'

import { useAuth } from "../../state/auth";
const PrivateRoute = ({component: Component, ...rest}) => {
  const { authTokens } = useAuth();

  const [hovered, updateHovered] = useState(false)
  const [state, setState] = useState({
    modalVisible: false,
    modalVariant: null,
    recordId: null
  });
  const closeMainModal = ()=>{
    setState({
      modalVisible: false, 
      modalVariant: null,
      recordId: null
    })
  }
  const openMainModal= (modalVariant, recordId)=>{
    const modalVisible = true;
    console.log(modalVariant, recordId);
    setState({
      modalVisible,
      modalVariant,
      recordId
    })
  }
  return (
    <Route {...rest}
      render={props => (
        authTokens ?
          <Fragment>
            <MainActionsHeader 
              openMainModal={openMainModal}
              closeMainModal={closeMainModal}
            />
            <div className={`main-div ${hovered && "hovered-side"}`}>
              <div className="min-height">
                <Component {...props} 
                  openMainModal={openMainModal}
                  closeMainModal={closeMainModal}
                />
              </div>
              <MainFooter />
            </div>
            <Sidebar
              hovered={hovered} 
              updateHovered={updateHovered}
              activeItem={props.location}
            />
            <MainModal
              modalVisible={state.modalVisible}
              modalVariant={state.modalVariant}
              recordId={state.recordId}
              closeMainModal={closeMainModal}
              openMainModal={openMainModal}
            />
          </Fragment>
        :
          <Redirect to={{pathname: "/", state: {from: props.location}}}/>
      )}
    />
  )
};

export default PrivateRoute
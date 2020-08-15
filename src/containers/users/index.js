import React,{Fragment, useEffect, useState} from 'react';
import {baseUrl, userImg} from '../../lib/constants';
import RecordsTable from './recordsTable';
import {useFetch} from '../../lib/useFetch';
import PaginationBar from '../../components/pagination';


const userHeaders = ["Image", "User Name", "First", "Last", "email", "Created At"];

const mapResponseData = (data) => {
  const getTrimmedObj = (obj) =>{
    let trimmedObj = {}
    trimmedObj['id'] = obj['_id'];
    trimmedObj['image'] = userImg;
    trimmedObj['shopper'] = obj.username;
    trimmedObj['firstname'] = obj.firstName;
    trimmedObj['lastnname'] = obj.lastName;
    trimmedObj['email'] = obj.email;
    trimmedObj['createdAt'] = obj.createdAt;
    return trimmedObj;
  }
  if (data){
    return data.map(obj => getTrimmedObj(obj));
  }
  return [];
}

const Users = ({
  openMainModal,
  closeMainModal,
  location
}) => {
  const getRole= ()=>{
    const paths = {
      '/users/shoppers':`role=Shopper`,
      '/users/travellers':`role=Traveller`,
      '/users/prime':`role=PrimeTraveller`,
      '/users':'',
    }
    return paths[location.pathname] || ''
  }
  const [page, setPage] = useState(1);
  const {data, loading, totalCount} = useFetch(`users?page=${page}&${getRole()}`);
  return(
    <Fragment>
      <RecordsTable
        loading={loading}
        headers={userHeaders}
        records={mapResponseData(data)}
        closeMainModal={closeMainModal}
        openMainModal={openMainModal}
      />
      <PaginationBar page={page} totalCount={totalCount} limit={10} setPage={setPage}/>
    </Fragment>
  );
}
export default Users;
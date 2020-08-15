import React,{Fragment, useState} from 'react';
import {baseUrl, userImg} from '../../lib/constants';
import {useFetch} from '../../lib/useFetch';
import RecordsTable from './recordsTable';
import PaginationBar from '../../components/pagination';
const userHeaders = ["Image", "User Name", "First", "Last","email", "Phone"];

const mapResponseData = (data) => {
  const getTrimmedObj = (obj) =>{
    let trimmedObj = {}
    trimmedObj['id'] = obj['_id'];
    trimmedObj['image'] = obj['photo'] || userImg;
    trimmedObj['username'] = obj['username'];
    trimmedObj['firstname'] = obj['firstName'];
    trimmedObj['lastnname'] = obj['lastName'];
    trimmedObj['email'] = obj['email'];
    trimmedObj['phone'] = obj['phone'];
    return trimmedObj;
  }
  if (data){
    return data.map(obj => getTrimmedObj(obj));
  }
  return [];
}

const AdminUsers = ({
  openMainModal,
  closeMainModal,
  location
})=>{
  const getRole= ()=>{
    const paths = {
      '/admins/admins':`role=Admin`,
      '/admins/superadmin':`role=SuperAdmin`,
      'admins/operator':`role=Operator`,
    }
    return paths[location.pathname] || ''
  }
  const [page, setPage] = useState(1);
  const {data, loading, totalCount} = useFetch(`admins?page=${page}&${getRole()}`);
    return(
      <Fragment>
        <RecordsTable
          loading={loading}
          headers={userHeaders}
          records={mapResponseData(data)}
          closeMainModal={closeMainModal}
          openMainModal={openMainModal}
          setPage={setPage}

        />
        <PaginationBar page={page} totalCount={totalCount} limit={10} setPage={setPage} />
      </Fragment>
    );
  }

export default AdminUsers;

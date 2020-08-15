import React,{Fragment, useState} from 'react';
import {useFetch} from '../../lib/useFetch';
import PaginationBar from '../../components/pagination';
import RecordsTable from './recordsTable'

const tableHeaders = ["Traveler Name","Trip Capacity", "Pick Up", "Destination", "State", "Created At"];
const mapResponseData = (data) => {
  const getTrimmedObj = (obj) =>{
    let trimmedObj = {
      id: obj['_id'],
      user: obj.user && obj.user.username,
      tripCapacity:obj.tripCapacity,
      pickup: obj.fromCity.name,
      destination: obj.toCity.name,
      state: obj.state,
      createdAt: obj.createdAt,
    }
    return trimmedObj;
  }
  if (data){ return data.map(obj => getTrimmedObj(obj))}
  return [];
}

const Trips = ({ openMainModal, closeMainModal, location})=>{
  const getState= ()=>{
    const paths = {
      '/trips/progress':`state=In Progress`,
      '/trips/pending':`state=Pending`,
      '/trips/complete':`state=Payment Done`,
    }
    return paths[location.pathname] || ''
  }
  const [reload,setRealod]=useState(false);
  const [page, setPage] = useState(1);
  const {data, loading, totalCount} = useFetch(`trips?page=${page}&${getState()}`,reload);

  return(
    <Fragment>
      <RecordsTable
        loading={loading}
        headers={tableHeaders}
        records={mapResponseData(data)}
        closeMainModal={()=>closeMainModal(setRealod=true)}
        openMainModal={openMainModal}
      />
      <PaginationBar page={page} totalCount={totalCount} limit={10} setPage={setPage} />
    </Fragment>
  );
}

export default Trips;

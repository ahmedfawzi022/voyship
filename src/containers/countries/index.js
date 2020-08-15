import React,{Fragment, useState} from 'react';
import RecordsTable from './recordsTable';
import {useFetch} from '../../lib/useFetch';
import PaginationBar from '../../components/pagination';


const userHeaders = ["flag", "name", "code"];

const mapResponseData = (data) => {
  const getTrimmedObj = (obj) =>{
    let trimmedObj = {}
    trimmedObj['id'] = obj['_id'];
    trimmedObj['flag'] = obj['countryFlag'];
    trimmedObj['name'] = obj['name'];
    trimmedObj['code'] = obj['countryCode'];
    return trimmedObj;
  }
  if (data){
    return data.map(obj => getTrimmedObj(obj));
  }
  return [];
}

const Countries = ({
  openMainModal,
  closeMainModal
}) => {
  const [page, setPage] = useState(1);
  const {data, loading, totalCount} = useFetch(`countries?page=${page}`);
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
      <PaginationBar page={page} totalCount={totalCount} limit={10} setPage={setPage}/>
    </Fragment>
  );
}
export default Countries;
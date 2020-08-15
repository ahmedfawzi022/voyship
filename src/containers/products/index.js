import React,{Fragment, useEffect, useState} from 'react';
import {useFetch} from '../../lib/useFetch';
import PaginationBar from '../../components/pagination';
import RecordsTable from './recordsTable';
const mapResponseData = (data) => {
  const getTrimmedObj = (obj) =>{
    // const trimmedObj = {
    //   image: obj.image, name: obj.name, desc: obj.description, url: obj.url, price: obj.price, id: obj['_id']
    // }
    const trimmedObj = {
      image: obj.image, name: obj.name, url: obj.url, price: obj.price, id: obj['_id']
    }
    return trimmedObj;
  }
  if (data){
    return data.map(obj => getTrimmedObj(obj));
  }
  return [];
}
const tableHeaders = ["Image", "Name", "url", "Price"];
const  Products = ({ openMainModal, closeMainModal})=>{
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  // const {data, loading, totalCount} = useFetch(`products?page=${page}&limit=${limit}`);
  const {data, loading, totalCount} = useFetch(`products?page=${page}`);
    return(
      <Fragment>
        <RecordsTable 
          loading={loading}
          headers={tableHeaders}
          records={mapResponseData(data)}
          closeMainModal={closeMainModal}
          openMainModal={openMainModal}
        />
        <PaginationBar
          page={page}
          totalCount={totalCount}
          limit={limit}
          setPage={setPage}
        />
      </Fragment>
    );
  }

export default Products;

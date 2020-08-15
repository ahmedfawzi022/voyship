import React,{Fragment, useEffect, useState} from 'react';
import {userImg} from '../../lib/constants';
import {useFetch} from '../../lib/useFetch';
import RecordsTable from './recordsTable';
import PaginationBar from '../../components/pagination';

const tableHeaders = ["Shopper", "Pick Up", "Destination", "State"];
const mapResponseData = (data) => {
  const getTrimmedObj = (obj) =>{
    let trimmedObj = {}
    trimmedObj['id'] = obj['_id'];
    trimmedObj['owner'] = {
        img: (obj.user && obj.user.image) || userImg,
        user: obj.owner && obj.owner.username
    }
    trimmedObj['pickup'] = obj.fromCity.name;
    trimmedObj['Destination'] = obj.toCity.name;
    trimmedObj['state'] = obj.state;
    return trimmedObj;
  }
  if (data){
      return data.map(obj => getTrimmedObj(obj));
    }
  return [];
}

const Shipments = ({ openMainModal, closeMainModal, location }) => {
  const getType= ()=>{
    const paths = {
      '/shipments/prime':`shipmentType=PrimeShipment`,
      '/shipments/ship-only':`shipmentType=ShipmentOnly`,
      '/shipments/purchase':`shipmentType=PurchaseShipment`,
    }
    return paths[location.pathname] || ''
  }
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const {data, loading, totalCount} = useFetch(`shipments?page=${page}&${getType()}`);

    return(
        <Fragment>
            <RecordsTable
                loading={loading}
                headers={tableHeaders}
                records={mapResponseData(data)}
                closeMainModal={closeMainModal}
                openMainModal={openMainModal}
            />
            {data && data.length > 0 && 
              <PaginationBar
                page={page}
                totalCount={totalCount}
                limit={limit}
                setPage={setPage}
              />
            }
        </Fragment>
    );
}
export default Shipments;
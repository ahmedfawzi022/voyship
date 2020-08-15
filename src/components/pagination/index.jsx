import React, { Component } from 'react'

import { Container } from "tabler-react";
const PaginationBar =({totalCount, limit, page, setPage}) => {
  const remainder = (totalCount % limit) || 0
  const noOfPages = remainder ? Math.floor(totalCount/limit)+1 : (totalCount/limit);
  const pageDown = page===1 ? 1 : limit * (page-1);
  const pageUp = page*limit
  const lastPage = (page*limit)>totalCount
  return (
    <Container>
      {totalCount && totalCount > 0 &&
        <div className="page-total-text ">{pageDown}-{pageUp} of {totalCount} items</div>
      }
      {totalCount && totalCount > 0 &&
        <ul className="pagination  pagination-pager">
            <li className={`page-item ${page>1 ? '' : 'disabled'}`}>
              <a className="page-link pointer" tabindex="-1" onClick={()=>setPage(page-1)}>
              Prev
              </a>
            </li>
          {page>1 &&
            <li className="page-item pointer">
              <a className="page-link" onClick={()=>setPage(page-1)}><span>{page-1}</span></a>
            </li>
          }
          <li className={`page-item pointer active`}>
              <a className="page-link" ><span>{page}</span></a>
            </li>
          {noOfPages > page &&
            <li className="page-item pointer">
              <a className="page-link"  onClick={()=>setPage(page+1)}><span>{page+1}</span></a>
            </li>
          }
            <li className={`page-item ${lastPage ? 'disabled' : ''}`}>
              <a className="page-link" onClick={()=>setPage(page+1)}>
              Next
              </a>
            </li>
        </ul>
      }
    </Container>
  );
}

export default PaginationBar;
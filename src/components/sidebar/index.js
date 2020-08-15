import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import {sortBy} from 'lodash'
import Items from "./schema.json"
import {Icon, Button} from 'tabler-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {mapIcon} from '../../lib/helpers'


const SideBar = ({activeItem, hovered, updateHovered}) => {
  console.log(activeItem.pathname)
  const history = useHistory();
  const handleItemClick = (path)=>{
    history.push(path);
  }
  return (
    <div className={`side-bar-div ${hovered && "hovered-side"}`}
      onMouseEnter={()=>updateHovered(true)}
      onMouseLeave={()=>updateHovered(false)}
    >
      <ul className="side-bar-list">
        {Items.map(({name, path, icon, subCats}, i) => (
          <>
            <li key={`sidebar-item-${i}`}
              className={activeItem.pathname.indexOf(path)>-1 && 'active'} 
              onClick={()=>handleItemClick(path)}
            >
              <FontAwesomeIcon icon={mapIcon(icon)} />
              &nbsp;
              {hovered && <span>{name}</span>}
            </li>
            {activeItem.pathname.indexOf(path)>-1 && subCats &&
              <ul className="side-bar-sub-list">
                {subCats.map(({name, subPath, subIcon},ii) => (
                  <li key={`subnav-${ii}`}
                    className={activeItem.pathname.indexOf(subPath)>-1 && 'active-sub'} 
                    onClick={()=>handleItemClick(subPath)}
                  >
                    <FontAwesomeIcon
                      icon={mapIcon(subIcon)}
                    />
                    &nbsp;
                    {hovered && <span>{name}</span>}
                  </li>
                ))}
              </ul>
            }
          </>
        ))}
      </ul>
    </div>
  )
}
export default SideBar;

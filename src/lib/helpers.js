import {faCoffee, faMapPin, faPaperPlane, faTruck, faSignOutAlt,
  faHome, faUsers,faUser, faHouseUser, faSitemap, faGlobeAmericas,
  faShoppingBag, faTasks, faCogs, faBuilding, faGlobeEurope, faParachuteBox,
} from '@fortawesome/free-solid-svg-icons'

export const GetLabelColor = (status) => {
  const colors = {
    Complete: "green",
    Pending: "orange",
    Inprogress: "teal"
  }
  return colors[status] || "grey"
}

export const mapIcon =(iconName) =>{
  const icons = {
    "faHome": faHome,
    "faUsers": faUsers,
    "faUser": faUser,
    "faTruck": faTruck,
    "faPaperPlane":faPaperPlane,
    "faHouseUser": faHouseUser,
    "faSitemap": faSitemap,
    "faGlobeAmericas": faGlobeAmericas,
    "faTasks": faTasks,
    "faCogs": faCogs,
    "faShoppingBag": faShoppingBag,
    "faBuilding": faBuilding,
    "faCoffee": faCoffee,
    "faGlobeEurope": faGlobeEurope,
    "faParachuteBox": faParachuteBox,
    "faSignOutAlt": faSignOutAlt
  }
  return icons[iconName] || faMapPin;
}
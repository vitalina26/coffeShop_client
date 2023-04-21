import React from 'react';


const ProtectedRoute = ({ isAllowed ,children }:{isAllowed:boolean|null, children:JSX.Element}) => {
  return isAllowed? children : <></>;
};

export default ProtectedRoute;
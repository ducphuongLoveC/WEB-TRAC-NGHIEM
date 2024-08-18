import React, { useState } from 'react';

import { MDBInputGroup, MDBInput, MDBIcon,  MDBBtn } from 'mdb-react-ui-kit';
import { FaSearchPlus } from 'react-icons/fa';
const Search: React.FC = () => {
    return (
        <>
        <MDBInputGroup>
          <MDBInput label='Search' />
          <MDBBtn rippleColor='dark'>
            <FaSearchPlus />
          </MDBBtn>
        </MDBInputGroup>
  
    
      </>
    );
}
export default Search;
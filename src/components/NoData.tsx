import React from 'react'
import styled from 'styled-components'
import  noResultsImg  from '../images/no-results-img.jpg'
const NoDataContainer = styled.div`
    min-height : 90vh;
    color : black;
    display: flex;
    justify-content : center;
    align-items:center;
    background-image: url(${noResultsImg});  
  background-size: contain;                 
  background-position: center;      
  background-repeat: no-repeat;
`


const NoData : React.FC = () => {
  return (
    <NoDataContainer>
        <h1>
            No Destinations Found
            </h1>
    </NoDataContainer>
  )
}

export default NoData;
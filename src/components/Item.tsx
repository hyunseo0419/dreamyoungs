import React from 'react'
import styled from "styled-components";
import {ItemType} from 'data'

export interface ItemProps {
   item:ItemType  
}

export const Item = ( {item} :ItemProps) => {

  return (
    <ItemContainer>
      <ItemText>{item.name}</ItemText>
    </ItemContainer>
  );
};


const ItemContainer = styled.div`
  width: 336px;
  height: 38px;
  padding-left:70px;
  padding-top:8px;
`;

const ItemText = styled.div`
  font-size: 14px;
  line-height: 20px;
`;

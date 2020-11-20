import React,{useState} from 'react'
import styled from "styled-components";
import {FolderIcon} from './icons/FolderIcon'
import {FoldIcon} from './icons/FoldIcon'
import {UnFoldIcon} from './icons/UnFoldIcon'
import {Item} from './Item'
import {Draggable,DraggableGroup} from './Draggable'
import {Droppable,DroppableGroup} from './Droppable'
import {GroupType,ItemType} from 'data'

interface GroupProps {
    group:GroupType;
    list:GroupType[];
    setList:(newList:GroupType[])=>void;
    isGroup:boolean;
    setIsGroup:(status:boolean)=>void;
  }

export const Group = ({ group,list,isGroup,setIsGroup,setList}:GroupProps) => {
    const [overlap,setOverlap] = useState<boolean>(false)
    const [toggle, setToggle] = useState<boolean>(false)
    const [groupData, setGroupData] = useState<GroupType>(group)
    
    const handleToggleGroupClick = () => {
        setToggle(!toggle)
    }

    const updateGroupData = (newData:GroupType) => {
        setGroupData(newData)
    }

    const checkOverlap = (status:boolean) => {
      setOverlap(status)
  }
    
    return (
        <>
        <DraggableGroup group={groupData} isGroup={isGroup} setIsGroup={setIsGroup} > 
        <DroppableGroup list={list} setList={setList} group={groupData} setGroup={updateGroupData} isGroup={isGroup}>
        <GroupContainer onClick={handleToggleGroupClick} >
        <GroupText>
            {!groupData.items ? null : toggle ?<UnFoldIcon/>  : <FoldIcon />}
            <FolderIcon/>{groupData.name}</GroupText>
      </GroupContainer>
      </DroppableGroup>
    </DraggableGroup>
      {toggle && 
        <>
        {groupData.items.map((item:ItemType,index:number)=>(
            <Draggable key={index} item={item} group={groupData} setGroup={updateGroupData} overlap={overlap} setOverlap={checkOverlap} >
                <Droppable group={groupData} setGroup={updateGroupData} item={item} overlap={overlap} setOverlap={checkOverlap} isGroup={isGroup}>
            <Item item={item}  ></Item>
            </Droppable>
            </Draggable>   
        ))}
        </>
        }
    </>
    )
}

const GroupContainer = styled.div`
  width: 336px;
  height: 38px;
  padding-left:27px;
  padding-top:8px;
`;

const GroupText = styled.div`
  font-size: 14px;
  display:flex;
  align-items:center;
`;
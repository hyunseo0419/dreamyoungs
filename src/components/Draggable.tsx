import React,{useState} from 'react'
import styled from 'styled-components'
import {GroupType,ItemType} from 'data'

interface ItemDragProps {
    children: React.ReactNode;
    item:ItemType;
    group:GroupType;
    overlap:boolean;
    setGroup:(newData:GroupType) => void;
    setOverlap:(status:boolean) => void;
}

interface GroupDragProps {
    children: React.ReactNode;
    group:GroupType;
    isGroup:boolean;
    setIsGroup:(status:boolean)=>void;
    
}

interface DragWrapperProps {
    dragStart:boolean;
}


export const Draggable = ({children,item,group,setGroup,overlap,setOverlap}:ItemDragProps) => {
    const [dragStart, setDragStart] = useState(false)
    
    const handleDragStart =(item:ItemType) =>  (e:React.DragEvent<HTMLDivElement>)=>{
        setDragStart(true)
        const value = JSON.stringify(item)
        e.dataTransfer.setData('key',value)
    }

    const handleDragEnd = (e:React.DragEvent<HTMLDivElement>) => {
        setDragStart(false)
        if(e.dataTransfer.dropEffect==='none'){
            return;
        }
        if(overlap){
            setOverlap(false)
            return
        }
        const deleteTarget = group.items.findIndex(((target:ItemType)=>
             target.itemUid===item.itemUid
            ))
            group.items.splice(deleteTarget,1)
        const clone= {...group}
        setGroup(clone)
    }

    

    return (
        <DraggableWrapper dragStart={dragStart} draggable onDragStart={handleDragStart(item)} onDragEnd={handleDragEnd} >
            {children}
        </DraggableWrapper>
    )
}

// Drag Group

export const DraggableGroup = ({children,group,setIsGroup}:GroupDragProps) => {
    const [dragStart, setDragStart] = useState(false)
    
    const handleDragStart =(group:GroupType) =>  (e:React.DragEvent<HTMLDivElement>)=>{
        if(group.groupUid===null){
            e.preventDefault()
            return
        }
        setIsGroup(true)
        setDragStart(true)
        const value = JSON.stringify(group)
        e.dataTransfer.setData('key',value)
    }

    const handleDragEnd = (e:React.DragEvent<HTMLDivElement>) => {
        setIsGroup(false)
        setDragStart(false)
        if(e.dataTransfer.dropEffect==='none'){
            return;
        }
    }

    return (
        <DraggableWrapper dragStart={dragStart} draggable onDragStart={handleDragStart(group)} onDragEnd={handleDragEnd}  >
            {children}
        </DraggableWrapper>
    )
}


const DraggableWrapper = styled.div<DragWrapperProps>`
width:fit-content;
${({dragStart})=> dragStart ?  `background-color:#ffe7e7; opacity:0.7;` : `background-color:white; opacity:1;`} 
`
import React,{useState,useRef,useEffect} from 'react'
import styled from 'styled-components'
import {GroupType,ItemType} from 'data'

interface ItemDropProps {
    children: React.ReactNode;
    group:GroupType;
    item:ItemType;
    overlap:boolean;
    isGroup:boolean;
    setOverlap:(status:boolean) => void;
    setGroup:(newData:GroupType)=>void;
}

interface GroupDropProps {
    children: React.ReactNode;
    group:GroupType;
    list:GroupType[];
    isGroup:boolean;
    setGroup:(newData:GroupType)=>void;
    setList:(newList:GroupType[])=>void;
}

// Item Drop

export const Droppable = ({children,group,setGroup,item,overlap,setOverlap,isGroup}:ItemDropProps) => {
    const [element, setElement] = useState<any>(null)
    const [borderPosition, setBorderPosition] = useState<string>('none')
    const ref = useRef<HTMLDivElement|null>(null)
    
    useEffect(() => {
        setElement(ref.current)
      },[])
      
    const handleDrop = (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if(isGroup){
            return;
        }
        const data = JSON.parse(e.dataTransfer.getData('key'))
        
        const overlapIndex = group.items.findIndex(((target:ItemType)=>
        data.itemUid===target.itemUid
       )) 
        
        let clone = {...group}
            const insertItemPosition = clone.items.findIndex(((target:ItemType)=>
            item.itemUid===target.itemUid
           ))
        
           const targetPosition = clone.items.findIndex(((target:ItemType)=>
            data.itemUid===target.itemUid
           ))

           if(overlapIndex>=0){
            setOverlap(true)
            clone.items.splice(overlapIndex,1)
           }
        if(borderPosition==='top'){
            if(insertItemPosition===0){   
                clone.items.unshift(data)
                setGroup(clone) 
            }
            else {
                clone.items.splice(insertItemPosition,0,data)            
                setGroup(clone) 
            }
            
        }else if(borderPosition==='bottom'){
            if(overlap&&insertItemPosition > targetPosition){
                clone.items.splice(insertItemPosition,0,data)            
                setGroup(clone)
            }
            if(insertItemPosition < targetPosition ||insertItemPosition===0){
                clone.items.splice(insertItemPosition+1,0,data)            
                setGroup(clone)
            }
            else {
                clone.items.splice(insertItemPosition,0,data)            
            setGroup(clone)
            }
        }
        else{
            setBorderPosition('none')
            return
        }

        setBorderPosition('none')
    }
    

    const handleDragOver = (e:React.DragEvent<HTMLDivElement>) =>{
        e.preventDefault()

        if(isGroup){
            return;
        }
        const elementPosition = e.clientY-element.offsetTop;
        const middle = element.clientHeight/2
        
        if(elementPosition >= middle){
            setBorderPosition('bottom')
        }
        else if(elementPosition < middle){
            setBorderPosition('top')
        }
}

const handleDragEnd = () => {
    setBorderPosition('none')
}
    
    return (
        <DroppableWrapper onDrop={handleDrop} onDragOver={handleDragOver} ref={ref} borderPosition={borderPosition} onDragLeave={handleDragEnd}>
            {children}
        </DroppableWrapper>
    )
}

// Group Drop

export const DroppableGroup = ({children,group,setGroup,isGroup,list,setList}:GroupDropProps) => {
    const [element, setElement] = useState<any>(null)
    const [borderPosition, setBorderPosition] = useState<string>('none')
    const ref = useRef<HTMLDivElement|null>(null)
    
    useEffect(() => {
        setElement(ref.current)
      },[])

    const handleDrop = (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()        
        if(isGroup&& group.groupUid===null){
            setBorderPosition('none')
            return;
        }
        
        const data = JSON.parse(e.dataTransfer.getData('key'))
        if(!isGroup){
            const clone = {...group}
            clone.items.push(data)
            setGroup(clone)
        }
        else {
            let clone = [...list]
                    
            const insertItemPosition = clone.findIndex(((target:GroupType)=>
                group.groupUid===target.groupUid
            ))
            
            const targetPosition = clone.findIndex(((target:GroupType)=>
            data.groupUid===target.groupUid
           ))

            const overlapIndex = list.findIndex(((group:GroupType)=>
                data.groupUid===group.groupUid
                )) 
  
              if(overlapIndex>=0){
              clone.splice(overlapIndex,1)
             }               
            if(borderPosition==='top'){
                if(insertItemPosition===0){   
                    clone.unshift(data)
                    setList(clone) 
                }
                else if(insertItemPosition>targetPosition) {
                    clone.splice(insertItemPosition-1,0,data)            
                    setList(clone) 
                }
                else {
                    clone.splice(insertItemPosition,0,data)            
                    setList(clone) 
                }
                
            }else if(borderPosition==='bottom'){
                if(insertItemPosition<targetPosition){
                    clone.splice(insertItemPosition+1,0,data)            
                setList(clone)
                }
                else {
                    clone.splice(insertItemPosition,0,data)            
                    setList(clone)
                }
            }
            else{
                
                setBorderPosition('none')
                return
            }
        }
        setBorderPosition('none')
    }
    
    

    const handleDragOver = (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if(isGroup&& group.groupUid===null){
            return;
        }
        if(isGroup){
            const elementPosition = e.clientY-element.offsetTop;
            const middle = element.clientHeight/2
            
            if(elementPosition >= middle){
        
                setBorderPosition('bottom')
            }
            else if(elementPosition < middle){
                setBorderPosition('top')
            }
        }else {
            setBorderPosition('middle')  
        }
        
}

const handleDragEnd = () => {
    setBorderPosition('none')
}
    
    return (
        <DroppableWrapper onDrop={handleDrop} onDragOver={handleDragOver} ref={ref} borderPosition={borderPosition} onDragLeave={handleDragEnd}>
            {children}
        </DroppableWrapper>
    )
}


// Drop Area Wrapper


const DroppableWrapper = styled.div<{borderPosition:string}>`
 ${({borderPosition})=> renderBorderPosition(borderPosition)}
`

const renderBorderPosition = (status:string) => {
    switch (status) {
        case "top":
            return 'border-top: 1px solid red;';
      case "middle":
        return 'border: 1px solid red;'
      case "bottom":
        return  'border-bottom: 1px solid red;'
        case "none":
        return 'border:none;'
      default :
        return 'border:none;'
    }
  };



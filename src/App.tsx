import React,{useState,useEffect} from 'react';
import {Group} from 'components/Group'
import ListData,{GroupType} from 'data'
import './App.css';
import styled from 'styled-components';

const App =()=> {

  const [isGroup, setIsGroup] = useState<boolean>(false)
  const [list,setList] = useState<GroupType[]>(ListData)

useEffect(() => {
  const unknownGroupIndex =  ListData.findIndex((group:GroupType)=>
    group.groupUid===null
  )
  let clone = [...ListData]
  clone.splice(unknownGroupIndex,1)
  clone.push(ListData[unknownGroupIndex])
  setList(clone)
}, [])

  const updateList = (newList:GroupType[]) =>{
    setList(newList)
  }

  const checkIsGroup = (status:boolean) =>{
    setIsGroup(status)
  }

  return (
    <Container >
      {list.map((group:GroupType)=> (
        <Group key={group.groupUid} group={group} list={list} setList={updateList} isGroup={isGroup} setIsGroup={checkIsGroup}/>
      ))}
    </Container>
  );
}

export default App;

const Container = styled.div`
padding: 50px 20px;
`
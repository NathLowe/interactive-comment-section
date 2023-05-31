import React, { useMemo } from 'react'
import Avatar from '../Avatar'
import Comment, { data } from '../Comment'
import { randomNumber } from '../../assets/functions'
import TextArea from '../TextArea'
import Button from '../Button'
import Nested from '../Nested'

export default function AddComment({
  reinitializeFather,
  tag,
  isMain,
}:{
  reinitializeFather?: () => void,
  tag?:string,
  isMain?:boolean,
}) {
    let user = useMemo(()=>data[randomNumber(0, data.length-1)],[]) 
    let [value,setValue] = React.useState('')
    let [isComment,setIsComment] = React.useState(false)

    let handleClick = ()=>{
      setIsComment(true)
    }
    let handleReinitialize = ()=>{
      if(reinitializeFather) reinitializeFather()
      if(isMain) setIsComment(false)
    }

    if (isComment) return (
      <Nested>
        <Comment tagged={tag} reinitializeFather={handleReinitialize} isUserComment={true} comment={value} />
      </Nested>
    )
    return (
      <div className="card add-comment sm:flex items-start sm:space-x-4">
          <div className="hidden sm:block h-10">
              <Avatar user={user}/>
          </div>
          <div className="grow">
              <TextArea onChange={(e)=>setValue(e.target.value)} value={value} placeholder="Add Comment..." />
          </div>
          <div className="hidden sm:block">
            <Button onClick={handleClick} >Send</Button>
          </div>
          <div className="sm:hidden mt-4 flex items-center justify-between">
            <div className="h-10">
                <Avatar user={user}/>
            </div>
            <Button onClick={handleClick} >Send</Button>
          </div>
      </div>
    )
}

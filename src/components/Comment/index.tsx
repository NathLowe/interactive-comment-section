import amyrobson from '../../assets/images/avatars/image-amyrobson.png'
import juliusomo from '../../assets/images/avatars/image-juliusomo.png'
import maxblagun from '../../assets/images/avatars/image-maxblagun.png'
import ramsesmiron from '../../assets/images/avatars/image-ramsesmiron.png'

import { useMemo, useState } from 'react'
import { BsReplyFill, BsTrashFill, BsPencilFill } from 'react-icons/bs'

import './index.css'
import { randomNumber } from '../../assets/functions'
import Avatar from '../Avatar'
import AddComment from '../AddComment'
import TextArea from '../TextArea'
import Button from '../Button'
import { useModal } from '../../providers/ModalProvider'


export interface User {
  id: number,
  name: string,
  username: string,
  avatar: string
}

export const data = [
  {
    id: 1,
    avatar: amyrobson,
    username: 'amyrobson',
    name: 'Amy Robson',
  },
  {
    id: 2,
    avatar: juliusomo,
    username: 'juliusomo',
    name: 'Juliusomo',
  },
  {
    id: 3,
    avatar: maxblagun,
    username:'maxblagun',
    name: 'Max Blagun',
  },
  {
    id: 4,
    avatar: ramsesmiron,
    username: 'ramsesmiron',
    name: 'Ramsesmiron',
  }
]

const NotUserCommentIcons = ({onClick}:{onClick:()=>void})=>{
  return (
    <div onClick={onClick} className="reply font-semibold flex items-center cursor-pointer ">
      <BsReplyFill className="w-5 h-5 mr-1" /> Reply
    </div>
  )
}

const UserCommentIcons = ({
  onDelete,
  onEdit,
}:{
  onDelete:()=>void,
  onEdit:()=>void,
}) => {
  return (
    <div className="font-semibold flex items-center text-xs ">
      <div onClick={onDelete} className="cursor-pointer flex items-center delete mr-4">
        <BsTrashFill className="w-4 h-4 mr-1" /> Delete
      </div>
      <div onClick={onEdit} className="cursor-pointer flex items-center edit">
        <BsPencilFill className="w-4 h-4 mr-1" /> Edit
      </div>
    </div>
  )
}

const SideStuff = () => {
  let quantity = useMemo(()=>randomNumber(1, 20), []);
  return (
    <div className="quantity flex space-x-2 px-2 text-lg text-center rounded-lg items-center
      sm:flex-col-reverse sm:space-x-0 sm:justify-center">
      <span className="block cursor-pointer text-2xl">
        -
      </span>
      <span className="block number cursor-pointer font-semibold">{quantity}</span>
      <span className="block cursor-pointer text-2xl">+</span>
    </div>
  )
}

export default function Comment({
  tagged,
  isUserComment,
  comment,
  reinitializeFather,
}:{
  tagged?: string,
  isUserComment?: boolean,
  comment?:string
  reinitializeFather?:()=>void,
}) {
  let user = useMemo(()=>data[randomNumber(0, data.length - 1)], []);
  let time = useMemo(()=>randomNumber(1, 3), []);

  let { openModal } = useModal()

  let [isReplying, setIsReplying] = useState(false);
  let [isEditing, setIsEditing] = useState(false);
  let [commentText, setCommentText] = useState(comment?comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Lorem ipsum. Ut enim ad minim ven.');
  let [isDeleted, setIsDeleted] = useState(false);

  let handleReply = ()=>{
    setIsReplying(true);
  }
  let handleDelete = ()=>{
    openModal(()=>{
      setIsDeleted(true);
      if(reinitializeFather) reinitializeFather();
    })
  }
  let handleEdit = ()=>{
    setIsEditing(true);
  }
  let handleChangeText = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setCommentText(e.target.value);
  }
  let handleTextAreaButtonClick = () => {
    setIsEditing(false);
  }
  let handleAddComment = ()=>{
    setIsReplying(false);
  }

  if (isDeleted) return null
  return (
    <>
    <div className="card comment flex items-start sm:space-x-6">
      {/* Side stuff */}
      <div className="hidden sm:block">
        <SideStuff/>
      </div>
      {/* Main Content */}
      <div className="grow">
        {/* header */}
        <div className="flex justify-between mb-3">
          <div className="flex items-center" >
            <div className="h-8 mr-4 flex items-center">
              <Avatar user={user} />
              {isUserComment && <div className="badge">you</div> }
            </div>
            <span className="username block font-semibold mr-4">{user.username}</span>
            <span className="time hidden sm:block">{time} months ago</span>
          </div>
          <div className="hidden sm:block">
            {isUserComment ? <UserCommentIcons onDelete={handleDelete} onEdit={handleEdit} /> : <NotUserCommentIcons onClick={handleReply} />}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-auto sm:overflow-hidden">
          {
            !isEditing
            ? (
              <p className="tracking-tight">
                {tagged  && <span className="tagged inline-block mr-1">@{tagged}</span>}
                {commentText}
              </p>
              )
            : (
              <div className="w-full">
                <TextArea onChange={handleChangeText} value={commentText} />
                <div className="ml-auto mt-2">
                  <Button onClick={handleTextAreaButtonClick} >Update</Button>
                </div>
              </div>
            )
          }
        </div>
        {/* Mobile Icons */}
        <div className="sm:hidden flex items-center justify-between mt-4">
          <SideStuff/>
          <div>
            {isUserComment ? <UserCommentIcons onDelete={handleDelete} onEdit={handleEdit} /> : <NotUserCommentIcons onClick={handleReply} />}
          </div>
        </div>
      </div>
    </div>
    {isReplying && (<AddComment tag={user.username} reinitializeFather={handleAddComment}/>)}
    </>
  )
}



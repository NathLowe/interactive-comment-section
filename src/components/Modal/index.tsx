import { useModal } from '../../providers/ModalProvider'
import Button from '../Button'
import "./index.css"
import { useCallback } from 'react';

export default function Modal() {
    let {isOpen, closeModal, deleteComment} = useModal()
    let handleDelete = useCallback(()=>{
        deleteComment()
        closeModal()
    },[deleteComment])
    if(!isOpen) return null
    return (
        <div id="modal" onClick={()=>closeModal()} className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/40">
            <div className="max-w-sm mx-auto h-full flex items-center px-3">
                <div onClick={e=>e.stopPropagation()} className="h-fit card">
                    <h2>Delete Comment</h2>
                    <p className="my-4" >
                        {"Are you sure you want to delete this comment? This will remove the comment and can't be undone."}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        <Button className="cancel" onClick={closeModal} >No, Cancel</Button>
                        <Button className="delete" onClick={handleDelete} >Yes Delete</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

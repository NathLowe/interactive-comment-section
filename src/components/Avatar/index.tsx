import { User } from "../Comment"


export default function Avatar({
    user
}:{
    user: User
}) {
  return (
    <img src={user.avatar} alt={user.name} className="h-full aspect-square rounded-full" />
  )
}

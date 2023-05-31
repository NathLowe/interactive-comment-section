import "./index.css"

export default function TextArea({
    value,
    placeholder,
    onChange,
}:{
    value:string,
    placeholder?:string,
    onChange:(e:React.ChangeEvent<HTMLTextAreaElement>)=>void,
}) {
  return (
    <textarea onChange={onChange} name="text" className="my-text-area" placeholder={placeholder} cols={30} rows={4} value={value} ></textarea>
  )
}

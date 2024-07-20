import { Loader2 } from "lucide-react"
const loading = () => {
  return (
    <div className='flex justify-center items-center w-full h-full'>
        <Loader2 className="size-20 animate-spin"/>
    </div>
  )
}

export default loading
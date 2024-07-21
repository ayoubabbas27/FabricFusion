import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "../ui/button"
  

const SkeletonCard = () => {
  return (
    <Card className="flex flex-col justify-between items-center animate-pulse">
        <CardHeader className="w-full aspect-square">
            <div className="w-full rounded-md aspect-square bg-gray-300 "/>
        </CardHeader>
        <CardContent className="w-full h-full flex flex-col justify-between items-start gap-3">
            <div className="bg-gray-300 rounded-full w-full min-h-6"></div>
            <div className="bg-gray-300 rounded-full w-full min-h-6"></div>
            <div className="bg-gray-300 rounded-full w-3/4 min-h-6"></div>
        </CardContent>
        <CardFooter className="w-full flex flex-row justify-end items-center">
            <Button disabled className="bg-gray-500 w-1/4"></Button>
        </CardFooter>
    </Card>
  )
}

export default SkeletonCard
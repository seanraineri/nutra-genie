import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome to Health Analytics</h1>
        <p className="text-muted-foreground">Get started by completing your health profile</p>
        <Button onClick={() => navigate("/input")}>
          Start Health Assessment
        </Button>
      </div>
    </div>
  )
}

export default HomePage
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Send, Paperclip } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

const mockData = [
  { month: "Jan", vitaminD: 30, b12: 400, iron: 80 },
  { month: "Feb", vitaminD: 35, b12: 450, iron: 85 },
  { month: "Mar", vitaminD: 40, b12: 500, iron: 90 },
  { month: "Apr", vitaminD: 45, b12: 550, iron: 95 },
];

const recommendations = [
  {
    name: "Vitamin D3",
    dosage: "2000 IU",
    reason: "Current levels below optimal range",
  },
  {
    name: "B-Complex",
    dosage: "500 mcg",
    reason: "Support energy levels and metabolism",
  },
  {
    name: "Iron Supplement",
    dosage: "18 mg",
    reason: "Maintain healthy iron levels",
  },
];

const quickReplies = [
  "View my supplement plan",
  "Check my progress",
  "Update my goals",
  "Side effects",
];

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const Dashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I'm your health assistant. How can I help you today?",
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: message },
      { role: "assistant", content: "I'll help you with that! (This is a mock response)" },
    ]);
    setMessage("");
  };

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-secondary">Your Health Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-6">
        {/* Left Panel */}
        <div className="space-y-6">
          {/* Health Summary */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome back, John!</h2>
            <p className="text-muted-foreground mb-6">Here's an overview of your health metrics and goals.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="font-semibold text-primary">Vitamin D Status</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Current level: 45 ng/mL
                  <br />
                  Target range: 30-50 ng/mL
                </p>
                <Progress value={75} className="mt-2" />
              </div>
              <div className="p-4 bg-accent/10 rounded-lg">
                <h3 className="font-semibold text-accent">B12 Status</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Current level: 550 pg/mL
                  <br />
                  Target range: 400-1000 pg/mL
                </p>
                <Progress value={65} className="mt-2" />
              </div>
              <div className="p-4 bg-secondary/10 rounded-lg">
                <h3 className="font-semibold text-secondary">Iron Status</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Current level: 95 μg/dL
                  <br />
                  Target range: 60-170 μg/dL
                </p>
                <Progress value={85} className="mt-2" />
              </div>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="vitaminD" stroke="#0891B2" name="Vitamin D" />
                  <Line type="monotone" dataKey="b12" stroke="#F97316" name="B12" />
                  <Line type="monotone" dataKey="iron" stroke="#164E63" name="Iron" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Supplement Recommendations */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Personalized Supplement Plan</h2>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-primary">{rec.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Dosage: {rec.dosage}</p>
                  <p className="text-sm text-muted-foreground">{rec.reason}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Goals Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Health Goals</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Improve Sleep Quality</span>
                  <span>75%</span>
                </div>
                <Progress value={75} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Boost Energy Levels</span>
                  <span>60%</span>
                </div>
                <Progress value={60} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Optimize Vitamin D</span>
                  <span>85%</span>
                </div>
                <Progress value={85} />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Panel - Chat Interface */}
        <Card className="flex flex-col h-[800px]">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Health Assistant</h2>
            <p className="text-sm text-muted-foreground">Ask me anything about your health data and supplements</p>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMessage(reply);
                  }}
                >
                  {reply}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button
                className="shrink-0"
                onClick={handleSendMessage}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: number;
  text: string;
  isUser: boolean;
};

const AiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! How can I help you today?", isUser: false },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  // Mock AI response function
  const getAiResponse = (userMessage: string): Promise<string> => {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        const responses = [
          "I'm a frontend developer with 5+ years of experience.",
          "You can download my resume from the About page.",
          "I specialize in React, TypeScript, and UI/UX design.",
          "I'm currently available for freelance projects.",
          "Feel free to contact me via the Contact form!",
          "My portfolio showcases projects in web development and design.",
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        resolve(randomResponse);
      }, 1000);
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      isUser: true,
    };
    setMessages([...messages, userMessage]);
    setNewMessage("");

    try {
      // Get and add AI response
      const response = await getAiResponse(newMessage);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: response,
          isUser: false,
        },
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all z-30 ${
          isOpen ? "rotate-90" : "animate-pulse"
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-80 sm:w-96 rounded-xl shadow-xl border border-border z-30 overflow-hidden transition-all duration-300 transform ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-accent p-3 flex justify-between items-center border-b border-border">
          <h3 className="font-bold text-lg font-heading">Chat Assistant</h3>
          <Button variant="ghost" size="icon" onClick={toggleChat}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="bg-card flex flex-col h-96">
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 max-w-[85%] ${
                  message.isUser ? "ml-auto" : "mr-auto"
                }`}
              >
                <div
                  className={`p-3 rounded-xl ${
                    message.isUser
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-accent text-foreground rounded-tl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSendMessage}
            className="border-t border-border p-2 flex gap-2"
          >
            <Input
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AiChat;

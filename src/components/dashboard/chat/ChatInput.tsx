import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileExt = selectedFile.name.split('.').pop();
      const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('health_files')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('health_files')
        .insert({
          user_id: user.id,
          filename: selectedFile.name,
          file_path: filePath,
          file_type: selectedFile.type,
        });

      if (dbError) throw dbError;

      toast({
        title: "File uploaded successfully",
        description: "Your file has been uploaded and will be processed shortly.",
      });

      onSendMessage(`I've uploaded a file: ${selectedFile.name}`);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {selectedFile && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
          <span className="text-sm truncate flex-1">{selectedFile.name}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              setSelectedFile(null);
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            onClick={handleFileUpload}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Upload"
            )}
          </Button>
        </div>
      )}
      <div className="flex gap-2">
        <div className="relative">
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".pdf,.doc,.docx,.txt,.csv"
          />
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            disabled={isLoading || uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !isLoading) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          disabled={isLoading || uploading}
        />
        <Button
          className="shrink-0"
          onClick={handleSubmit}
          disabled={isLoading || uploading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Upload, 
  Image as ImageIcon, 
  Mic, 
  RefreshCw, 
  Sparkles
} from "lucide-react";

interface ContentInputSectionProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  uploadedFiles: File[];
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleGenerate: () => void;
  isGenerating: boolean;
  placeholder: string;
}

export function ContentInputSection({
  prompt,
  setPrompt,
  uploadedFiles,
  handleFileUpload,
  handleGenerate,
  isGenerating,
  placeholder
}: ContentInputSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span>Content Request</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder={placeholder}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-32 text-base"
        />
        
        {/* Upload Section */}
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button variant="outline" className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4" />
              <span>Upload Images</span>
            </Button>
          </div>
          
          <div className="relative">
            <input
              type="file"
              id="audio-upload"
              accept="audio/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button variant="outline" className="flex items-center space-x-2">
              <Mic className="w-4 h-4" />
              <span>Upload Audio</span>
            </Button>
          </div>
          
          <div className="relative">
            <input
              type="file"
              id="document-upload"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button variant="outline" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload Documents</span>
            </Button>
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Uploaded Files:</p>
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map((file, index) => (
                <span key={index} className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                  {file.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <Button 
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full"
          variant="warm"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Content
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
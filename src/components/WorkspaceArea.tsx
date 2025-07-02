import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Upload, 
  Image as ImageIcon, 
  Mic, 
  Printer, 
  Download, 
  RefreshCw, 
  Save,
  FileText,
  Sparkles
} from "lucide-react";

interface WorkspaceAreaProps {
  activeTab: string;
}

const tabContent = {
  story: {
    title: "Generate Story",
    placeholder: "Describe the type of story you'd like to create. For example: 'A moral story about honesty for grade 3 students' or 'Adventure story with animals for young learners'",
    icon: FileText,
    color: "warm"
  },
  worksheet: {
    title: "Create Worksheet",
    placeholder: "Describe the worksheet you need. For example: 'Math problems on addition for grade 2' or 'Reading comprehension on animals for grade 4'",
    icon: FileText,
    color: "sky"
  },
  question: {
    title: "Ask a Question",
    placeholder: "Ask any question about teaching, curriculum, or educational content. For example: 'How to explain fractions to grade 3 students?'",
    icon: FileText,
    color: "success"
  },
  visual: {
    title: "Visual Aids",
    placeholder: "Describe the visual content you need. For example: 'Diagram showing water cycle for grade 5' or 'Colorful charts for learning alphabets'",
    icon: ImageIcon,
    color: "soft"
  },
  lesson: {
    title: "Lesson Planner",
    placeholder: "Describe your lesson requirements. For example: 'Science lesson on plants for grade 4, 45 minutes duration'",
    icon: FileText,
    color: "warm"
  },
  audio: {
    title: "Audio Reading Assessment",
    placeholder: "Describe the audio assessment you need. For example: 'Reading comprehension test for grade 3 with Hindi text'",
    icon: Mic,
    color: "sky"
  }
};

export function WorkspaceArea({ activeTab }: WorkspaceAreaProps) {
  const [prompt, setPrompt] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const currentTab = tabContent[activeTab as keyof typeof tabContent] || tabContent.story;
  const Icon = currentTab.icon;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(`Generated content for: ${prompt}\n\nThis is a sample output that would be created by the AI assistant based on your prompt. The actual implementation would integrate with your AI backend service.`);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${
            currentTab.color === 'warm' ? 'from-primary to-primary-glow' :
            currentTab.color === 'sky' ? 'from-secondary to-secondary' :
            currentTab.color === 'success' ? 'from-success to-success' :
            'from-accent to-accent'
          }`}>
            <Icon className={`w-6 h-6 ${
              currentTab.color === 'warm' ? 'text-primary-foreground' :
              currentTab.color === 'sky' ? 'text-secondary-foreground' :
              currentTab.color === 'success' ? 'text-success-foreground' :
              'text-accent-foreground'
            }`} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{currentTab.title}</h2>
            <p className="text-muted-foreground">Create engaging educational content with AI assistance</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>Content Request</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={currentTab.placeholder}
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

        {/* Output Section */}
        {generatedContent && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Content</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button variant="success" size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save to Drive
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-foreground">
                  {generatedContent}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "Math Worksheet - Addition", time: "2 hours ago", type: "worksheet" },
                { title: "Story about Friendship", time: "Yesterday", type: "story" },
                { title: "Science Diagram - Water Cycle", time: "2 days ago", type: "visual" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Open
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
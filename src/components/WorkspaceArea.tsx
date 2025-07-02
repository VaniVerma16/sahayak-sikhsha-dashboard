import { useState } from "react";
import { FileText, Image as ImageIcon, Mic } from "lucide-react";
import { ContentInputSection } from "@/components/ContentInputSection";
import { GeneratedContentSection } from "@/components/GeneratedContentSection";
import { DemoContentSection } from "@/components/DemoContentSection";

interface WorkspaceAreaProps {
  activeTab: string;
  currentLanguage: string;
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

export function WorkspaceArea({ activeTab, currentLanguage }: WorkspaceAreaProps) {
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
        <ContentInputSection
          prompt={prompt}
          setPrompt={setPrompt}
          uploadedFiles={uploadedFiles}
          handleFileUpload={handleFileUpload}
          handleGenerate={handleGenerate}
          isGenerating={isGenerating}
          placeholder={currentTab.placeholder}
        />

        {/* Output Section */}
        <GeneratedContentSection generatedContent={generatedContent} />

        {/* Demo Content */}
        <DemoContentSection currentLanguage={currentLanguage} />
      </div>
    </div>
  );
}
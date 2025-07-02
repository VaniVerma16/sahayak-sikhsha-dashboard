import { useState } from "react";
import { FileText, Image as ImageIcon, Mic } from "lucide-react";
import { ContentInputSection } from "@/components/ContentInputSection";
import { GeneratedContentSection } from "@/components/GeneratedContentSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { translations, type Language } from "@/data/translations";
import { contentData, type ContentLanguage, type ContentType } from "@/data/contentData";

interface WorkspaceAreaProps {
  activeTab: string;
  currentLanguage: Language;
}

const tabContent = {
  story: {
    icon: FileText,
    color: "warm"
  },
  worksheet: {
    icon: FileText,
    color: "sage"
  },
  question: {
    icon: FileText,
    color: "success"
  },
  visual: {
    icon: ImageIcon,
    color: "soft"
  },
  lesson: {
    icon: FileText,
    color: "warm"
  },
  audio: {
    icon: Mic,
    color: "sage"
  }
};

export function WorkspaceArea({ activeTab, currentLanguage }: WorkspaceAreaProps) {
  const [prompt, setPrompt] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const t = translations[currentLanguage];
  const currentTab = tabContent[activeTab as keyof typeof tabContent] || tabContent.story;
  const Icon = currentTab.icon;

  // Get content for current language and tab
  const langCode = currentLanguage as ContentLanguage;
  const tabType = activeTab as ContentType;
  const content = contentData[langCode]?.[tabType] || contentData.en[tabType];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(`${t.generateContent}: ${prompt}\n\n${content.content}`);
      setIsGenerating(false);
    }, 2000);
  };

  const handleShowContent = () => {
    setGeneratedContent(content.content);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${
            currentTab.color === 'warm' ? 'from-primary to-primary-glow' :
            currentTab.color === 'sage' ? 'from-secondary to-secondary' :
            currentTab.color === 'success' ? 'from-success to-success' :
            'from-accent to-accent'
          }`}>
            <Icon className={`w-6 h-6 ${
              currentTab.color === 'warm' ? 'text-primary-foreground' :
              currentTab.color === 'sage' ? 'text-secondary-foreground' :
              currentTab.color === 'success' ? 'text-success-foreground' :
              'text-accent-foreground'
            }`} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t.navigation[activeTab as keyof typeof t.navigation]}</h2>
            <p className="text-muted-foreground">Create engaging educational content with AI assistance</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Sample Content Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary-glow/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Icon className="w-5 h-5 text-primary" />
                <span>{content.title}</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{content.grade}</Badge>
                <Badge variant="outline">{content.subject}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white/50 p-4 rounded-lg border">
              <div className="text-sm text-foreground line-clamp-6">
                {content.content.substring(0, 300)}...
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleShowContent}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                View Full Content
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Input Section */}
        <ContentInputSection
          prompt={prompt}
          setPrompt={setPrompt}
          uploadedFiles={uploadedFiles}
          handleFileUpload={handleFileUpload}
          handleGenerate={handleGenerate}
          isGenerating={isGenerating}
          placeholder={t.placeholders[activeTab as keyof typeof t.placeholders]}
          currentLanguage={currentLanguage}
        />

        {/* Output Section */}
        <GeneratedContentSection 
          generatedContent={generatedContent} 
          currentLanguage={currentLanguage}
        />
      </div>
    </div>
  );
}
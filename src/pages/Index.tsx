import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { WorkspaceArea } from "@/components/WorkspaceArea";
import { WorksheetMockup } from "@/components/WorksheetMockup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, BookOpen, Award } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("story");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [showMockup, setShowMockup] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-primary via-primary-glow to-secondary p-4 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-6 h-6" />
              <div>
                <h2 className="font-bold">Welcome to Sahayak AI</h2>
                <p className="text-sm opacity-90">Your intelligent teaching assistant for multi-grade classrooms</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>50K+ Teachers</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>500K+ Contents</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4" />
                <span>Education Award 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Toggle */}
        <div className="p-4 bg-card border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                Live Demo
              </Badge>
              <p className="text-sm text-muted-foreground">
                Experience AI-powered worksheet generation
              </p>
            </div>
            <Button 
              variant={showMockup ? "outline" : "warm"} 
              onClick={() => setShowMockup(!showMockup)}
            >
              {showMockup ? "Back to Tools" : "View Worksheet Demo"}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        {showMockup ? (
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  AI Worksheet Generation Demo
                </h2>
                <p className="text-muted-foreground">
                  Upload any textbook page and watch AI create customized worksheets instantly
                </p>
              </div>
              <WorksheetMockup />
            </div>
          </div>
        ) : (
          <WorkspaceArea activeTab={activeTab} />
        )}

        {/* Usage Stats Footer */}
        <div className="p-4 bg-muted/30 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">1,247</p>
              <p className="text-sm text-muted-foreground">Stories Generated</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">856</p>
              <p className="text-sm text-muted-foreground">Worksheets Created</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">2,103</p>
              <p className="text-sm text-muted-foreground">Questions Answered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent-foreground">95%</p>
              <p className="text-sm text-muted-foreground">Teacher Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

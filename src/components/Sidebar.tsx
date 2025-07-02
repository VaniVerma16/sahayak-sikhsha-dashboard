import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Image, 
  Calendar, 
  Mic,
  Menu,
  X,
  Globe,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigationItems = [
  { id: "story", label: "Generate Story", icon: BookOpen, color: "warm" },
  { id: "worksheet", label: "Create Worksheet", icon: FileText, color: "sky" },
  { id: "question", label: "Ask a Question", icon: HelpCircle, color: "success" },
  { id: "visual", label: "Visual Aids", icon: Image, color: "soft" },
  { id: "lesson", label: "Lesson Planner", icon: Calendar, color: "warm" },
  { id: "audio", label: "Audio Assessment", icon: Mic, color: "sky" },
];

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇮🇳" },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function Sidebar({ 
  activeTab, 
  onTabChange, 
  isOpen, 
  onToggle, 
  currentLanguage, 
  onLanguageChange 
}: SidebarProps) {
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 z-50 h-full w-72 bg-card border-r border-border
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:transform-none lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Sahayak</h1>
                <p className="text-sm text-muted-foreground">AI Teaching Assistant</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onToggle}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Teacher Profile */}
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                PT
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-foreground">Priya Teacher</p>
              <p className="text-sm text-muted-foreground">Grade 5-8 • Marathi</p>
            </div>
          </div>
        </div>

        {/* Language Selector */}
        <div className="p-4 border-b border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>{currentLang.flag} {currentLang.name}</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {languages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className="flex items-center space-x-2"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Teaching Tools
          </h3>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? item.color as any : "ghost"}
                className={`w-full justify-start space-x-3 h-12 ${
                  isActive ? 'shadow-lg' : ''
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Usage Tips */}
        <div className="p-4 m-4 bg-accent rounded-lg border">
          <h4 className="font-medium text-accent-foreground mb-2">💡 Quick Tip</h4>
          <p className="text-sm text-accent-foreground/80">
            Upload a textbook page image for automatic worksheet generation!
          </p>
        </div>
      </div>

      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        onClick={onToggle}
        className="fixed top-4 left-4 z-60 lg:hidden shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </Button>
    </>
  );
}
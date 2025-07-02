import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Printer, 
  Download, 
  RefreshCw, 
  Save
} from "lucide-react";
import { translations, type Language } from "@/data/translations";
import ReactMarkdown from "react-markdown";
import React, { Fragment } from "react";

interface GeneratedContentSectionProps {
  generatedContent: string;
  currentLanguage: Language;
}

export function GeneratedContentSection({ generatedContent, currentLanguage }: GeneratedContentSectionProps) {
  const t = translations[currentLanguage];
  
  if (!generatedContent) return null;

  // Helper: Render lesson plan as table
  function renderLessonPlan(content: string) {
    // Simple parsing for demo: split by ** and newlines
    const rows = content.split(/\n\n|\*\*/).filter(Boolean);
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm bg-white rounded-lg overflow-hidden">
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 ? 'bg-muted/30' : ''}>
                <td className="border px-3 py-2 whitespace-pre-line">
                  <ReactMarkdown>{row.trim()}</ReactMarkdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Helper: Render worksheet in a worksheet-like format
  function renderWorksheet(content: string) {
    return (
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <div className="prose text-foreground">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    );
  }

  // Helper: Render story as a story card with an image
  function renderStory(content: string) {
    return (
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto flex flex-col items-center">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Story Illustration" className="rounded-lg mb-4 w-full max-h-56 object-cover" />
        <div className="text-lg font-serif leading-relaxed prose prose-lg text-foreground">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    );
  }

  // Helper: Render question as Q&A block with markdown
  function renderQuestion(content: string) {
    // Split by '**Question:**' and '**Answer:**' for demo
    const qMatch = content.match(/\*\*Question:?\*\*|\*\*प्रश्न:?\*\*/i);
    const aMatch = content.match(/\*\*Answer:?\*\*|\*\*उत्तर:?\*\*/i);
    let question = content, answer = '';
    if (qMatch && aMatch) {
      question = content.slice(qMatch.index! + qMatch[0].length, aMatch.index).trim();
      answer = content.slice(aMatch.index! + aMatch[0].length).trim();
    }
    return (
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <div className="mb-4">
          <span className="font-bold text-primary">Question:</span>
          <div className="mt-1 text-base prose text-foreground">
            <ReactMarkdown>{question}</ReactMarkdown>
          </div>
        </div>
        <div>
          <span className="font-bold text-success">Answer:</span>
          <div className="mt-1 text-base prose text-foreground">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }

  // Helper: Render visual as an illustrated section with an image
  function renderVisual(content: string) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow p-6 max-w-2xl mx-auto flex flex-col items-center">
        <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" alt="Visual Illustration" className="rounded-lg mb-4 w-full max-h-56 object-cover" />
        <div className="text-base prose text-foreground">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    );
  }

  // Helper: Render audio as a listening activity with markdown
  function renderAudio(content: string) {
    return (
      <div className="bg-yellow-50 rounded-lg shadow p-6 max-w-2xl mx-auto">
        <div className="font-bold text-yellow-800 mb-2">Listening Activity</div>
        <div className="text-base prose text-foreground">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    );
  }

  // Detect content type
  let renderedContent: React.ReactNode = null;
  if (/lesson plan|lesson/i.test(generatedContent)) {
    renderedContent = renderLessonPlan(generatedContent);
  } else if (/worksheet/i.test(generatedContent)) {
    renderedContent = renderWorksheet(generatedContent);
  } else if (/story/i.test(generatedContent)) {
    renderedContent = renderStory(generatedContent);
  } else if (/question/i.test(generatedContent)) {
    renderedContent = renderQuestion(generatedContent);
  } else if (/visual/i.test(generatedContent)) {
    renderedContent = renderVisual(generatedContent);
  } else if (/audio/i.test(generatedContent)) {
    renderedContent = renderAudio(generatedContent);
  } else {
    renderedContent = (
      <div className="prose max-w-none text-foreground text-sm">
        <ReactMarkdown>{generatedContent}</ReactMarkdown>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t.generatedContent}</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              {t.print}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              {t.exportPdf}
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              {t.regenerate}
            </Button>
            <Button variant="success" size="sm">
              <Save className="w-4 h-4 mr-2" />
              {t.saveToDrive}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-lg">
          {renderedContent}
        </div>
      </CardContent>
    </Card>
  );
}
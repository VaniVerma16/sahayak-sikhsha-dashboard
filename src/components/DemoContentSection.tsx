import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { demoContent, type LanguageCode } from "@/data/demoContent";

interface DemoContentSectionProps {
  currentLanguage: string;
}

export function DemoContentSection({ currentLanguage }: DemoContentSectionProps) {
  const currentLangCode = currentLanguage as LanguageCode;
  const langContent = demoContent[currentLangCode] || demoContent.en;

  const getLanguageDisplayName = (lang: string) => {
    switch (lang) {
      case 'hi': return 'Hindi';
      case 'mr': return 'Marathi';
      default: return 'English';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demo Content ({getLanguageDisplayName(currentLanguage)})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Stories */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Sample Stories</h4>
          <div className="space-y-3">
            {langContent.stories.map((story) => (
              <div key={story.id} className="p-4 bg-accent/30 rounded-lg border">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-foreground">{story.title}</h5>
                  <Badge variant="secondary" className="text-xs">{story.grade}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{story.content.substring(0, 120)}...</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">{story.type}</Badge>
                  <Badge variant="secondary" className="text-xs">{story.moral}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Worksheets */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Sample Worksheets</h4>
          <div className="space-y-3">
            {langContent.worksheets.map((worksheet) => (
              <div key={worksheet.id} className="p-4 bg-accent/30 rounded-lg border">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-foreground">{worksheet.title}</h5>
                  <Badge variant="secondary" className="text-xs">{worksheet.grade}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{worksheet.subject}</p>
                <div className="text-xs text-muted-foreground">
                  {worksheet.questions.length} questions included
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Teaching Q&A</h4>
          <div className="space-y-3">
            {langContent.questions.map((qa) => (
              <div key={qa.id} className="p-4 bg-accent/30 rounded-lg border">
                <h5 className="font-medium text-foreground mb-2">{qa.question}</h5>
                <p className="text-sm text-muted-foreground">{qa.answer.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Aids */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Visual Aids</h4>
          <div className="space-y-3">
            {langContent.visualAids.map((visual) => (
              <div key={visual.id} className="p-4 bg-accent/30 rounded-lg border">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-foreground">{visual.title}</h5>
                  <Badge variant="secondary" className="text-xs">{visual.grade}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{visual.description}</p>
                <Badge variant="outline" className="text-xs">{visual.subject}</Badge>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
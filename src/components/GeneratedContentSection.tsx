import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Printer, 
  Download, 
  RefreshCw, 
  Save
} from "lucide-react";

interface GeneratedContentSectionProps {
  generatedContent: string;
}

export function GeneratedContentSection({ generatedContent }: GeneratedContentSectionProps) {
  if (!generatedContent) return null;

  return (
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
  );
}
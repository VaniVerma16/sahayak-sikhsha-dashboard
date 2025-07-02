import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  FileText, 
  Download, 
  Printer, 
  RefreshCw,
  Save,
  ArrowRight
} from "lucide-react";

export function WorksheetMockup() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 p-6">
      {/* Input Section - Textbook Image */}
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span>Textbook Page Upload</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Simulated textbook page */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 bg-muted/30 min-h-96 flex flex-col items-center justify-center">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-bold text-gray-800">Chapter 5: Plants</h3>
                
                <div className="space-y-3 text-left text-sm text-gray-700">
                  <p>Plants are living things that need sunlight, water, and air to grow.</p>
                  
                  <div className="bg-green-50 p-3 rounded">
                    <h4 className="font-medium text-green-800">Parts of a Plant:</h4>
                    <ul className="mt-2 space-y-1 text-green-700">
                      <li>• Roots - absorb water</li>
                      <li>• Stem - supports the plant</li>
                      <li>• Leaves - make food</li>
                      <li>• Flowers - help in reproduction</li>
                    </ul>
                  </div>
                  
                  <p>Different plants grow in different environments. Some plants like wet soil, while others can grow in dry places.</p>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground mt-4 text-center">
              Sample textbook page uploaded
            </p>
          </div>
          
          <Button variant="outline" className="w-full">
            <BookOpen className="w-4 h-4 mr-2" />
            Upload Different Page
          </Button>
        </CardContent>
      </Card>

      {/* Output Section - Generated Worksheet */}
      <Card className="h-fit">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-secondary" />
              <span>Generated Worksheet</span>
            </CardTitle>
            <Badge variant="secondary" className="bg-success text-success-foreground">
              Auto-Generated
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Generated worksheet content */}
          <div className="bg-white border rounded-lg p-6 shadow-sm min-h-96">
            <div className="space-y-4">
              <div className="text-center border-b pb-3">
                <h2 className="text-xl font-bold text-gray-800">Plants Worksheet</h2>
                <p className="text-sm text-gray-600">Grade 3 • Science</p>
              </div>
              
              <div className="space-y-4 text-gray-800">
                <div>
                  <h3 className="font-medium mb-2">1. Fill in the blanks:</h3>
                  <div className="space-y-1 text-sm">
                    <p>a) Plants need _______, water, and air to grow.</p>
                    <p>b) _______ absorb water from the soil.</p>
                    <p>c) Leaves help plants make their own _______.</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">2. True or False:</h3>
                  <div className="space-y-1 text-sm">
                    <p>a) All plants need the same amount of water. ( )</p>
                    <p>b) Stems support the plant structure. ( )</p>
                    <p>c) Flowers help in plant reproduction. ( )</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">3. Short Answer:</h3>
                  <div className="space-y-2 text-sm">
                    <p>a) Name the four main parts of a plant.</p>
                    <div className="border-b w-full"></div>
                    <div className="border-b w-full"></div>
                    
                    <p>b) Why do plants need sunlight?</p>
                    <div className="border-b w-full"></div>
                    <div className="border-b w-full"></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">4. Draw and Label:</h3>
                  <div className="border-2 border-dashed border-gray-300 h-24 rounded flex items-center justify-center text-gray-500 text-sm">
                    Draw a plant and label its parts
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Regenerate
            </Button>
            <Button variant="success" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save to Drive
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Process indicator */}
      <div className="lg:col-span-2 flex items-center justify-center py-4">
        <div className="flex items-center space-x-4 text-muted-foreground">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Upload Textbook</span>
          </div>
          <ArrowRight className="w-4 h-4" />
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs text-primary-foreground font-bold">AI</span>
            </div>
            <span className="text-sm font-medium">AI Analysis</span>
          </div>
          <ArrowRight className="w-4 h-4" />
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-secondary" />
            <span className="text-sm font-medium">Generated Worksheet</span>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText, ImagePlay, Palette } from "lucide-react";

export default async function ContentTypesPage() {
  const codeText = `# Python
print("Hello, World!")

# PHP
echo "PHP is fun!";

// JavaScript
console.log("JavaScript");`;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Content Types</h1>
        <p className="mt-1 text-sm">Text, Graphics, and Multimedia examples</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Text Based</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-gray-50 p-4">
              <pre className="text-sm text-gray-700">
                <code>{codeText}</code>
              </pre>
            </div>
            <p className="text-sm">
              Examples of text-based programming languages and their syntax.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Graphics Based</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-md bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="aspect-square rounded-md bg-gradient-to-r from-green-500 to-yellow-500"></div>
            </div>
            <p className="text-sm">
              Visual programming examples using CSS and SVG.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <ImagePlay />
            <h2 className="text-lg font-semibold">Multimedia</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <video className="w-full rounded-md" controls>
              <source src="assets/video/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-sm">
              Interactive media and video content examples.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

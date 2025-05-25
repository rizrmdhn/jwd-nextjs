import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
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
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
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
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
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

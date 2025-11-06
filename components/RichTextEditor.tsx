import { useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Image, Code, Eye, Edit } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const [previewMode, setPreviewMode] = useState<"edit" | "preview">("edit");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      const markdownImage = `\n![${file.name}](${imageUrl})\n`;
      onChange(value + markdownImage);
      toast.success("Image uploaded successfully");
    };
    reader.readAsDataURL(file);
  };

  const insertCodeBlock = () => {
    const codeBlock = "\n```javascript\n// Your code here\n```\n";
    onChange(value + codeBlock);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <Button
          type="button"
          variant={previewMode === "edit" ? "default" : "outline"}
          size="sm"
          onClick={() => setPreviewMode("edit")}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          type="button"
          variant={previewMode === "preview" ? "default" : "outline"}
          size="sm"
          onClick={() => setPreviewMode("preview")}
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <div className="ml-auto flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={insertCodeBlock}
          >
            <Code className="h-4 w-4 mr-2" />
            Code Block
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      <div data-color-mode="light">
        <MDEditor
          value={value}
          onChange={(val) => onChange(val || "")}
          preview={previewMode}
          height={500}
          visibleDragbar={false}
          hideToolbar={false}
          enableScroll={true}
          textareaProps={{
            placeholder: "Write your content here... Use Markdown for formatting"
          }}
        />
      </div>

      <div className="text-sm text-muted-foreground space-y-1">
        <p><strong>Markdown tips:</strong></p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><code># Heading</code> for headings (# to ######)</li>
          <li><code>**bold**</code> for <strong>bold text</strong></li>
          <li><code>*italic*</code> for <em>italic text</em></li>
          <li><code>`code`</code> for inline code</li>
          <li><code>```language</code> for code blocks with syntax highlighting</li>
          <li><code>[link text](url)</code> for links</li>
          <li><code>- item</code> for lists</li>
        </ul>
      </div>
    </div>
  );
};

export default RichTextEditor;

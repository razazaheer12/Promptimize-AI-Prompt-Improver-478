import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { History } from "lucide-react";

interface ChatLite {
  id: string;
  prompt: string;
  improved: string;
  versions?: string[];
}

function renderDiff(original: string, improved: string) {
  // Simple word-based highlight for additions in the improved text
  const origWords = original.split(/\s+/);
  const counts = new Map<string, number>();
  for (const w of origWords) counts.set(w, (counts.get(w) || 0) + 1);

  const nodes = improved.split(/(\s+)/).map((token, idx) => {
    if (/^\s+$/.test(token)) return <span key={idx}>{token}</span>;
    const n = counts.get(token) || 0;
    if (n > 0) {
      counts.set(token, n - 1);
      return <span key={idx}>{token}</span>;
    }
    return (
      <span key={idx} className="bg-green-500/20 rounded px-0.5">{token}</span>
    );
  });
  return <p className="whitespace-pre-wrap break-words text-sm">{nodes}</p>;
}

export default function VersionHistoryDialog({ chat }: { chat: ChatLite }) {
  const versions = chat.versions?.length ? chat.versions : [chat.improved];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="View version history">
          <History className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Version History</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border p-3">
            <h4 className="text-sm font-medium mb-2">Original</h4>
            <p className="text-sm whitespace-pre-wrap break-words">{chat.prompt}</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Improved versions</h4>
            {versions.map((v, i) => (
              <div key={i} className="rounded-md border p-3">
                {renderDiff(chat.prompt, v)}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

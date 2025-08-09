import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2, Copy, Wand2, Heart, Trash2 } from "lucide-react";

const PromptImprover = () => {
  const [prompt, setPrompt] = useState("");
  const [improvedPrompt, setImprovedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  type Chat = { id: string; prompt: string; improved: string; favorited: boolean; createdAt: number };
  const [history, setHistory] = useState<Chat[]>(() => {
    try {
      const raw = localStorage.getItem("promptimize.history");
      return raw ? (JSON.parse(raw) as Chat[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("promptimize.history", JSON.stringify(history));
  }, [history]);

  const addToHistory = (promptText: string, improvedText: string) => {
    const newItem: Chat = {
      id: (typeof crypto !== "undefined" && "randomUUID" in crypto) ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      prompt: promptText,
      improved: improvedText,
      favorited: false,
      createdAt: Date.now(),
    };
    setHistory((prev) => {
      const next = [newItem, ...prev];
      return next.slice(0, 5);
    });
  };

  const toggleFavorite = (id: string) => {
    setHistory((prev) => prev.map((c) => (c.id === id ? { ...c, favorited: !c.favorited } : c)));
  };

  const deleteChat = (id: string) => {
    setHistory((prev) => prev.filter((c) => c.id !== id));
    toast({ title: "Chat deleted" });
  };

  const improvePrompt = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "The prompt field cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // For this demo, we'll simulate an AI improvement with some common enhancement patterns
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      let improved = prompt.trim();
      
      // Add more specific details
      if (!improved.includes("detailed")) {
        improved = "Create a detailed " + improved;
      }
      
      // Add quality expectations
      if (!improved.toLowerCase().includes("high quality")) {
        improved += ", ensuring high quality output";
      }
      
      // Add style guidance if not present
      if (!improved.includes("style")) {
        improved += ", maintaining a professional and engaging style";
      }
      
      // Add clarity about format if not specified
      if (!improved.includes("format")) {
        improved += ". Present the information in a clear, well-structured format";
      }
      
      // Add request for examples if appropriate
      if (!improved.includes("example")) {
        improved += ", including relevant examples where appropriate";
      }
      
      setImprovedPrompt(improved);
      addToHistory(prompt, improved);
      toast({
        title: "Prompt improved!",
        description: "Your prompt has been enhanced with more specific details and clarity.",
      });
    } catch (error) {
      toast({
        title: "Error improving prompt",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(improvedPrompt);
      toast({
        title: "Copied to clipboard!",
        description: "You can now paste the improved prompt anywhere",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
          AI Prompt Improver
        </h1>
        <p className="text-muted-foreground">
          Enter your prompt below and let AI help you make it better
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Prompt</label>
          <Textarea
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>

        <Button
          onClick={improvePrompt}
          className="w-full bg-brand-600 hover:bg-brand-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Improving...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Improve Prompt
            </>
          )}
        </Button>

        {improvedPrompt && (
          <div className="space-y-2 animate-in fade-in-50">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Improved Version</label>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="h-8"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-100/50 to-brand-200/50 rounded-lg" />
              <Textarea
                value={improvedPrompt}
                readOnly
                className="min-h-[100px] resize-none bg-transparent relative z-10"
              />
            </div>
          </div>
        )}
      </div>

      <section aria-labelledby="history-title" className="space-y-3">
        <h2 id="history-title" className="text-lg font-semibold">Your Chats</h2>
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="favourites">Favourites</TabsTrigger>
          </TabsList>
          <TabsContent value="recent">
            <div className="space-y-2">
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent chats yet.</p>
              ) : (
                history.map((c) => (
                  <article key={c.id} className="rounded-lg border bg-card text-card-foreground p-3 flex items-start gap-3">
                    <div className="flex-1">
                      <p className="text-sm truncate">{c.prompt}</p>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{c.improved}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleFavorite(c.id)} aria-label={c.favorited ? "Unfavourite" : "Favourite"}>
                        <Heart className={`h-4 w-4 ${c.favorited ? "text-brand-600" : ""}`} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteChat(c.id)} aria-label="Delete chat">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="favourites">
            <div className="space-y-2">
              {history.filter((c) => c.favorited).length === 0 ? (
                <p className="text-sm text-muted-foreground">No favourites yet. Tap the heart on a chat to save it.</p>
              ) : (
                history.filter((c) => c.favorited).map((c) => (
                  <article key={c.id} className="rounded-lg border bg-card text-card-foreground p-3 flex items-start gap-3">
                    <div className="flex-1">
                      <p className="text-sm truncate">{c.prompt}</p>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{c.improved}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleFavorite(c.id)} aria-label="Unfavourite">
                        <Heart className="h-4 w-4 text-brand-600" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteChat(c.id)} aria-label="Delete chat">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default PromptImprover;
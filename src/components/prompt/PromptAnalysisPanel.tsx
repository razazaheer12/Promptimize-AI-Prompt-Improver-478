import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Props {
  prompt: string;
}

function analyze(prompt: string) {
  const len = prompt.trim().length;
  let score = 0;
  const suggestions: string[] = [];

  if (len > 0) score += Math.min(3, Math.floor(len / 50)); // reward context up to ~150 chars
  if (/\b(examples?|example)\b/i.test(prompt)) score += 2; else suggestions.push("Include 1–2 concrete examples");
  if (/(tone|style|voice)/i.test(prompt)) score += 2; else suggestions.push("Specify tone/style (e.g., professional, friendly)");
  if (/(constraints?|format|length|steps?)/i.test(prompt)) score += 2; else suggestions.push("Define output format/constraints");
  if (/(audience|goal|purpose)/i.test(prompt)) score += 1; else suggestions.push("State the audience and goal");

  // Penalize vagueness
  if (/\b(thing|stuff|make|do|good|nice)\b/i.test(prompt)) suggestions.push("Replace vague words with specifics");
  if (len < 40) suggestions.push("Add more context to clarify intent");

  const outOf10 = Math.max(1, Math.min(10, score));
  const percent = Math.round((outOf10 / 10) * 100);
  return { score: outOf10, percent, suggestions: suggestions.slice(0, 4) };
}

export default function PromptAnalysisPanel({ prompt }: Props) {
  const { score, percent, suggestions } = useMemo(() => analyze(prompt), [prompt]);

  return (
    <section aria-labelledby="analysis-title" className="animate-in fade-in-50">
      <Card className="bg-card/60 border-muted/50">
        <CardHeader className="pb-2">
          <CardTitle id="analysis-title" className="text-sm font-medium">Prompt Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Score</span>
            <span className="text-sm font-semibold">{score}/10</span>
          </div>
          <Progress value={percent} className="h-2" />
          <div className="flex flex-wrap gap-2 pt-1">
            {suggestions.map((s, i) => (
              <Badge key={i} variant="secondary" className="text-xs">{s}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

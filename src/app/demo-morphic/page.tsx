import { MorphicBackground } from '@/components/ui/morphic-background';

export default function DemoMorphic() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center gap-12">
      <MorphicBackground ballColor="#4285F4" />
      <div className="relative z-10 text-center space-y-2">
        <h1 className="text-4xl font-bold">MorphicBackground</h1>
        <p className="text-muted-foreground">ballColor=&quot;#4285F4&quot; (default)</p>
      </div>
    </div>
  );
}

import { Check } from "lucide-react";

export default function FeatureItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 group">
      <div className="mt-1 flex-shrink-0 size-5 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40 group-hover:bg-blue-500/20 transition-colors">
        <Check className="size-3 text-blue-400" />
      </div>
      <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
        {children}
      </span>
    </div>
  );
}

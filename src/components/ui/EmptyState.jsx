
import { Search } from 'lucide-react';

export function EmptyState({ 
  icon: Icon = Search, 
  title = "No results found", 
  description = "Try adjusting your search or filters to find what you're looking for." 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
      <div className="p-4 rounded-2xl bg-muted text-text/45 mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-text mb-1">{title}</h3>
      <p className="text-sm text-text/55 max-w-xs mx-auto">{description}</p>
    </div>
  );
}

import React from 'react';

const Skeleton = ({ className = '', variant = 'rect' }) => {
  const baseClasses = "animate-pulse bg-border/40 rounded-md";
  
  const variantClasses = {
    rect: "",
    circle: "rounded-full",
    text: "h-4 w-full"
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    />
  );
};

export const TableSkeleton = ({ rows = 5, cols = 4 }) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex gap-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-32" />
        ))}
      </div>
      <div className="border border-border rounded-xl overflow-hidden bg-card/50">
        <div className="p-4 border-b border-border bg-border/20">
          <div className="flex gap-4">
            {[...Array(cols)].map((_, i) => (
              <Skeleton key={i} className="h-4 flex-1" />
            ))}
          </div>
        </div>
        <div className="p-4 space-y-6">
          {[...Array(rows)].map((_, i) => (
            <div key={i} className="flex gap-4 items-center">
              {[...Array(cols)].map((_, j) => (
                <Skeleton key={j} className="h-4 flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card/50 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton variant="circle" className="w-12 h-12" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 rounded-2xl border border-border bg-card/50 space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton variant="circle" className="w-8 h-8" />
            </div>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TableSkeleton rows={6} cols={5} />
        </div>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;

interface EmptyStateProps {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-bn-border px-6 py-16 text-center">
      <p className="text-sm font-medium text-bn-muted">{title}</p>
      {description && <p className="mt-2 text-xs text-bn-muted">{description}</p>}
    </div>
  );
}

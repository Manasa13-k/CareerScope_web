import React from 'react';
import { Compass, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  title = 'No entries mapped yet',
  description = 'Try adjusting your search criteria, exploring alternative streams, or clearing filters.',
  icon: Icon = Compass,
  actionText,
  actionLink,
  onAction,
}) {
  return (
    <div className="bg-surface border border-borderAtlas rounded-xl p-10 text-center max-w-lg mx-auto my-8 space-y-4 shadow-atlas-sm">
      <div className="w-14 h-14 bg-sage-light border border-borderAtlas rounded-xl flex items-center justify-center mx-auto text-teal">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-serif text-2xl font-bold text-teal">{title}</h3>
      <p className="text-ink-light text-sm leading-relaxed max-w-sm mx-auto">{description}</p>
      
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-block mt-2 px-5 py-2.5 bg-coral text-white hover:bg-coral-dark font-medium rounded-lg text-sm transition-all shadow-atlas-sm"
        >
          {actionText}
        </Link>
      )}

      {actionText && onAction && !actionLink && (
        <button
          onClick={onAction}
          className="mt-2 px-5 py-2.5 bg-coral text-white hover:bg-coral-dark font-medium rounded-lg text-sm transition-all shadow-atlas-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

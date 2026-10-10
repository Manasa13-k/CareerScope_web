import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  title = 'No items found',
  description = 'Try adjusting your search filters or explore other options.',
  icon: Icon = Search,
  actionText,
  actionLink,
  onAction,
}) {
  return (
    <div className="bg-cardBg border border-borderColor rounded-2xl p-10 text-center max-w-lg mx-auto my-8 space-y-4">
      <div className="w-14 h-14 bg-bgSecondary border border-borderColor rounded-full flex items-center justify-center mx-auto text-softLilac">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-warmIvory">{title}</h3>
      <p className="text-mutedText text-sm leading-relaxed">{description}</p>
      
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-block mt-2 px-5 py-2.5 bg-electricLime text-bgMain hover:bg-opacity-90 font-semibold rounded-xl text-sm transition"
        >
          {actionText}
        </Link>
      )}

      {actionText && onAction && !actionLink && (
        <button
          onClick={onAction}
          className="mt-2 px-5 py-2.5 bg-electricLime text-bgMain hover:bg-opacity-90 font-semibold rounded-xl text-sm transition"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

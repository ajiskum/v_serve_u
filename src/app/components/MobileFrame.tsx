import { ReactNode } from 'react';

interface MobileFrameProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function MobileFrame({ children, title, showBack, onBack }: MobileFrameProps) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ width: '375px', minHeight: '667px' }}>
      {(title || showBack) && (
        <div className="bg-[#1A2238] text-white px-4 py-4 flex items-center gap-3 min-h-[60px]">
          {showBack && (
            <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          )}
          {title && <h2 className="flex-1">{title}</h2>}
        </div>
      )}
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(667px - 60px)' }}>
        {children}
      </div>
    </div>
  );
}

import { ReactNode } from 'react';

interface MobileFrameProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function MobileFrame({ children, title, showBack, onBack }: MobileFrameProps) {
  return (
    <div className="bg-white w-full min-h-screen md:min-h-0 md:h-auto flex flex-col md:block">
      {/* Header removed in favor of global ResponsiveShell */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

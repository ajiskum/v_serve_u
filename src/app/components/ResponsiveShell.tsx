import React from 'react';
import { Header } from './Header';

interface ResponsiveShellProps {
    children: React.ReactNode;
    onBack?: () => void;
    onHome: () => void;
}

export function ResponsiveShell({ children, onBack, onHome }: ResponsiveShellProps) {
    // Basic mobile detection (can be enhanced with useMediaQuery)
    // For now, we assume mobile style for small screens via CSS, but some logic might need explicit JS check
    // We'll pass a prop to Header based on a simple assumption or hook, but for now let's just make it responsive via Tailwind classes
    // However, Header accepts `isMobile` prop to conditionally show/hide text. 
    // Let's implement a simple hook or just use CSS hidden classes inside Header.
    // Actually, Header uses `hidden md:block` which is good. `isMobile` logic might be better for conditional rendering of structure.

    // For this simple version, we can treat "isMobile" as "window width < 768px" if we want JS control, 
    // but cleaner to let CSS handle it.
    // Let's update Header to use CSS classes primarily, but if we need `isMobile` for specific logic:
    const isMobile = false; // Placeholder, relying on CSS `md:hidden` etc.

    return (
        <div className="min-h-screen bg-[#F7F8FC] flex flex-col">
            <Header onBack={onBack} onHome={onHome} isMobile={isMobile} />

            <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6">
                {/* On desktop, we want a centered card-like look or full width? The user said "full screen responsive layout". */}
                {/* So we just use max-w-7xl constraint and padding. */}
                {children}
            </main>
        </div>
    );
}

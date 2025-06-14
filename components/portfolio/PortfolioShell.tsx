import { ReactNode } from 'react';
import { PortfolioContent } from './PortfolioContent';

export default function PortfolioShell({ children }: { children?: ReactNode }) {
    return (
        <div>
            <PortfolioContent />
            {children}
        </div>
    );
}

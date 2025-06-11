import React from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="layout">
        <header className="layout-header">
            <h1>Formula 1 Stats</h1>
        </header>
        <main className="layout-main">
            {children}
        </main>
        <footer className="layout-footer">
            <p>&copy; {new Date().getFullYear()} Formula 1 Stats</p>
        </footer>
        </div>
    );
}

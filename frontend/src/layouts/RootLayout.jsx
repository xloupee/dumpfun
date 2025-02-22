import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';

export function RootLayout() {
    return (
        <div className="min-h-screen bg-[#0D1117] text-white">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
} 
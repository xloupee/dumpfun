import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export function Navbar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header className="border-b border-gray-800 bg-[#161B22] px-4 py-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <Link to="/" className="text-xl">dump.fun</Link>
                    <nav className="flex space-x-4">
                        <Link to="/portfolio">
                            <Button
                                variant="ghost"
                                className={`h-8 px-3 text-white hover:text-white hover:bg-gray-800 ${isActive('/portfolio') ? 'bg-gray-800' : ''
                                    }`}
                            >
                                Portfolio
                            </Button>
                        </Link>
                        <Link to="/spot">
                            <Button
                                variant="ghost"
                                className={`h-8 px-3 text-white hover:text-white hover:bg-gray-800 ${isActive('/spot') ? 'bg-gray-800' : ''
                                    }`}
                            >
                                Spot
                            </Button>
                        </Link>
                        <Link to="/perpetuals">
                            <Button
                                variant="ghost"
                                className={`h-8 px-3 text-white hover:text-white hover:bg-gray-800 ${isActive('/perpetuals') ? 'bg-gray-800' : ''
                                    }`}
                            >
                                Perpetuals
                            </Button>
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="outline" className="h-8 bg-white text-black hover:bg-gray-100">
                        Deposit
                    </Button>
                    <Button variant="ghost" className="h-8 text-white hover:text-white hover:bg-gray-800">
                        Rewards
                    </Button>
                </div>
            </div>
        </header>
    );
} 
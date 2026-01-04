
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import NavBar from "../(components)/Navbar";
import Back from "../(components)/Back";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
return (
    <div className="relative h-screen w-screen overflow-hidden bg-black flex flex-col">
    {/* Background stays absolute */}
    <div className="absolute inset-0 z-0">
        <Back/>
    </div>

    {/* Content Wrapper */}
    <div className="relative z-30 flex flex-col h-full w-full overflow-hidden">
        {/* Navbar stays at its natural height */}
        <div className="shrink-0">
        <NavBar />
        </div>
        
        {/* Main takes the remaining space */}
        <main className="flex-1 overflow-hidden">
        {children}
        </main>
    </div>
    </div>
);
}

import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import NavBar from "../(components)/Navbar";
import Aurora from "@/components/Aurora";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
return (
    <div className="relative h-screen w-screen overflow-hidden bg-black flex flex-col">
    {/* Background stays absolute */}
    <div className="absolute inset-0 z-0">
        {/* <DottedGlowBackground 
        className="pointer-events-none mask-radial-to-100% mask-radial-at-center"
        opacity={1} gap={10} radius={3.2} colorLightVar="#a7ef9e"
        glowColorLightVar="#a7ef9e" colorDarkVar="#a7ef9e"
        glowColorDarkVar="#a7ef9e" backgroundOpacity={0}
        speedMin={0.1} speedMax={0.6} speedScale={0.6}
        /> */}
        <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
        />
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
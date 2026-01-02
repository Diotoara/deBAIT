    // app/chat/layout.tsx
    import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
    import NavBar from "../(components)/Navbar";

    export default function ChatLayout({children,}: {children: React.ReactNode;}) {
    return (
        <div className="relative h-screen w-screen overflow-hidden opacity-100 bg-black">
            <div className="absolute inset-0 z-0 opacity-75 ">
            <DottedGlowBackground className="pointer-events-none mask-radial-to-100% mask-radial-at-center "
            opacity={1}
            gap={10}
            radius={3.2}
            // colorLightVar="--color-neutral-500"
            colorLightVar="#a7ef9e"
            glowColorLightVar="#a7ef9e" 
            colorDarkVar="#a7ef9e"
            glowColorDarkVar="#a7ef9e"
            backgroundOpacity={0}
            speedMin={0.1}
            speedMax={0.6}
            speedScale={0.6}
            />
            </div>


        <div className=" relative z-30 pointer-events-auto min-h-screen" >
            <NavBar/>
            <main className="">
                {children}
            </main>
        </div>
        </div>
    );
    }

import { CrowdCanvas , Skiper39 } from "./(components)/Crowd";
import { InputBox } from "./(components)/InputBox";
import FaultyTerminal from "./(components)/Terminal";


export default function Home(){
  return(
    <div className="relative h-screen w-screen overflow-hidden bg-black">
  {/* Background Layer: Absolute and Z-0 */}
  <div className="absolute inset-0 z-0 opacity-25 ">
    <FaultyTerminal scale={3} gridMul={[2, 1]} digitSize={1.2} timeScale={1} pause={false} scanlineIntensity={1} glitchAmount={1} flickerAmount={1} noiseAmp={1} chromaticAberration={0} dither={0} curvature={0} tint="#a7ef9e" mouseReact={true} mouseStrength={0.5} pageLoadAnimation={true} brightness={1} />
  </div>

  {/* Foreground Layer: Relative and Z-10 */}
  <div className="relative z-10 h-screen pointer-events-none">

    <div className="absolute flex justify-center pt-4 w-full text-center pointer-events-none z-50">
      <div>
      <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white">
        de<span className="text-[#a7ef9e] drop-shadow-[0_0_15px_rgba(167,239,158,0.5)]">BAIT</span>
      </h1>
      <p className="text-[#ffffff] font-medium text-sm tracking-[0.5em] uppercase mt-2 opacity-80">
        DEBATE  WITH  AI  NOW
      </p>
      {/* input box here  */}
      <div className="pointer-events-auto" >
        <InputBox w={140} />
      </div>
      </div>
    </div>

    <div className="">
       <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
    </div>
  </div>
  
</div>
  )
}
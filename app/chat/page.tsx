import ChatComponent from "../(components)/ChatComponent";
import { InputBox } from "../(components)/InputBox";



export default function Chat(){
    return(
        <div className="" >
            <div>
                <ChatComponent/>
            </div>
            <div className="absolute bottom-0 pb-6  w-full flex justify-center" >
            <InputBox w={90} />
            </div>
            
        </div>
    )
}
import React from "react";

import './GlobalStyle.css';
interface DefaultProps {
    children: React.ReactNode 
}
const GlobalStyle: React.FC<DefaultProps> = ({children})=> {
    return (
       <div>
        {
            children
        }
       </div>
    )
}
export default GlobalStyle;


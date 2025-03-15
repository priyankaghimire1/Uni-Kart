import React, { useState } from "react";
import { FaEye, FaEyeSlash} from "react-icons/fa";

const usePasswordToggle=()=>{
    const[visible,setVisibility]= useState(false);
    const Icon = (
        <div onClick={() => setVisibility(!visible)} style={{ cursor: 'pointer' }}>
          {visible ? <FaEyeSlash /> : <FaEye />}
        </div>
      );

    const InputType= visible ? "text" : "password";

    return [InputType,Icon];
}

export default usePasswordToggle
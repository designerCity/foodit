import { useState, useEffect, useRef } from "react";

function FileInput({ name, value, onChange }) {
    const [preview, setPreview] = useState(); // 미리보기 component 

    
    const inputRef = useRef();
    const handleInputChange = (e) => {
        const nextValue = e.target.files[0];
        onChange(name, nextValue);
    } 

    const handleClearClick = () => {
        const inputNode = inputRef.current;
        if (!inputNode) return;

        inputNode.value =''
        onChange(name, null)
    }
    useEffect(() => {
        if (!value) return;
        const nextPreview = URL.createObjectURL(value);
        setPreview(nextPreview);

        return () => {
            setPreview();
            URL.revokeObjectURL(nextPreview);
        }
    }, [value])
    return (
        <div>
            <img src={preview} alt="이미지 미리보기" />
            <input 
                type="file" 
                accept="image/png, image/jpeg"
                onChange={handleInputChange} 
                ref={inputRef}
            />
            {value && <button onClick={handleClearClick}>X</button>}
        </div>
    )
  }
  
  export default FileInput;

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useState } from "react";


export const ShareSnippetDialog = ({onClose}: {onClose: () => void}) => {
    const [title,setTitle] = useState('');
    const [isSharing, setIsSharing] = useState(false);
    const { language, getCode } = useCodeEditorStore();
    
  return (
    <div>ShareSnippetDialog</div>
  )
}

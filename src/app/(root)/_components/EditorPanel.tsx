import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useState } from "react";
import { LANGUAGE_CONFIG } from "../_constants";
import { Editor } from "@monaco-editor/react";

function EditorPanel() {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState();
  const { language, editor, theme, fontSize, setFontSize, setEditor } = useCodeEditorStore();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(newCode);
  }, [language, editor]);


  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if(savedFontSize) setFontSize(parseInt(savedFontSize));
  },[setFontSize]);


  const handleRefresh = () => {

  }

  const handleEditorChange = () => {

  }

  const handleFontSizeChange = () => {

  }

  return (
  <div className=""></div>
);
}

export default EditorPanel;

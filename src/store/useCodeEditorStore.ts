import { CodeEditorState } from "@/types";
import { Monaco } from "@monaco-editor/react";
import { create } from "zustand";

const getInitialState = () => {

  if (typeof window === "undefined") { //means we're on server
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };
  }

  //else we're on client, return values from local storage bcoz local storage is a browser API. Can't be accessed from server.
  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || 16;

  return {
    language: savedLanguage,
    fontSize: Number(savedFontSize),
    theme: savedTheme,
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,

    getCode: () => get().editor?.getValue() || "",

    setEditor: (editor: Monaco) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (savedCode) {
        editor.setValue(savedCode);
      }

      set({ editor });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      const currentCode = get().editor?.getValue(); // get current code from editor

      if (currentCode) { // if there's code in the editor
        localStorage.setItem(`editor-code-${language}`, currentCode); // save code in local storage
      }

      localStorage.setItem("editor-language", language); //then switch to new language
      set({ language, output: "", error: null });
    },

    runCode: async () => {
        const code = get().editor?.getValue() || "";
        const language = get().language;
        // const theme = get().theme;
        // const fontSize = get().fontSize;
        // const executionResult = await ex(code, language, theme, fontSize);
    }
  };
});

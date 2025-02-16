import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { CodeEditorState } from "@/types";
import { Monaco } from "@monaco-editor/react";
import axios from "axios";
import { create } from "zustand";

const API_ENDPOINT = "https://emkc.org/api/v2/piston/execute";

const getInitialState = () => {
  if (typeof window === "undefined") {
    //means we're on server
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

    setLanguage: (lang: string) => {
      const currentCode = get().editor?.getValue(); // get current code from editor

      if (currentCode) {
        // if there's code in the editor
        localStorage.setItem(`editor-code-${get().language}`, currentCode); // save code in local storage
      }

      localStorage.setItem("editor-language", lang); //then switch to new language
      set({ language: lang, output: "", error: null });
    },

    runCode: async () => {
      const { language, getCode } = get();
      const code = getCode();

      if (!code) {
        set({ error: "Please enter some code" });
        return;
      }

      set({ isRunning: true, error: null, output: "" });

      try {
        const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
        const response = await axios.post(
          API_ENDPOINT,
          JSON.stringify({
            language: runtime.language,
            version: runtime.version,
            files: [{ content: code }],
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.data;
        console.log("What we got: ", data);

        if (data.message) {
          //handle if received api-errors
          set({
            error: data.message,
            executionResult: { code, output: "", error: data.message },
          });
          return;
        }

        if (data.compile && data.compile.code !== 0) {
          //handle if code compilation failed
          const error = data.compile.stderr || data.compile.output;
          set({
            error,
            executionResult: {
              code,
              output: "",
              error,
            },
          });
          return;
        }

        if (data.run && data.run.code !== 0) {
          //handle if received runtime errors
          const error = data.run.stderr || data.run.output;
          set({
            error,
            executionResult: {
              code,
              output: "",
              error,
            },
          });
          return;
        }

        //handle if code execution was successful
        const output = data.run.output.trim();
        set({
          output,
          error: null,
          executionResult: {
            code,
            output,
            error: null,
          },
        });
      } catch (err: any) {
        console.log("Error running code: ", err);
        set({
          error: err.message,
          executionResult: {
            code,
            output: "",
            error: err.message,
          },
        });
      } finally {
        set({ isRunning: false });
      }
    },
  };
});

export const getExecutionResult = () => { 
  //to get updated execution result, before saving it to db
  return useCodeEditorStore.getState().executionResult;
};

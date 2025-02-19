import SyntaxHighlighter from "react-syntax-highlighter";
import CopyButton from "./CopyButton";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeBlock({
  language,
  code,
}: {
  language: string;
  code: string;
}) {
  const trimmedCode = code
    .split("\n") //split into lines
    .map((line) => line.trimEnd()) //remove trailing spaces from each line
    .join("\n"); //join back into single string

  return (
    <div className="my-4 bg-[#0a0a0f] rounded-lg overflow-hidden border border-[#ffffff0a]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#ffffff08]">
        <div className="flex items-center gap-2">
          <img
            src={`/${language}.png`}
            alt={language}
            className="size-4 object-contain"
          />
          <span className="text-sm text-gray-400">
            {language || "plaintext"}
          </span>
        </div>
        <CopyButton code={trimmedCode} />
      </div>
      <div className="relative">
        <SyntaxHighlighter
          language={language || "plaintext"}
          style={atomOneDark}
          customStyle={{
            padding: "1rem",
            background: "transparent",
            margin: 0,
          }}
          showLineNumbers={true}
          wrapLines={true}
        >
          {trimmedCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

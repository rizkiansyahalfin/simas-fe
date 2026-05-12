declare module "react-quill" {
  import type { ComponentType } from "react";

  interface ReactQuillProps {
    theme?: string;
    value?: string;
    onChange?: (value: string) => void;
  }

  const ReactQuill: ComponentType<ReactQuillProps>;
  export default ReactQuill;
}

declare module "react-quill/dist/quill.snow.css";

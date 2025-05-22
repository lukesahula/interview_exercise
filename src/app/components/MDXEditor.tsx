"use client";

import {
  MDXEditor,
  MDXEditorMethods,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  headingsPlugin,
  BlockTypeSelect,
} from "@mdxeditor/editor";

interface EditorProps {
  markdown: string;
  onChange: () => void;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor = ({ markdown = "", onChange, editorRef }: EditorProps) => {
  return (
    <MDXEditor
      onChange={onChange}
      ref={editorRef}
      markdown={markdown}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
            </>
          ),
        }),
        headingsPlugin(),
      ]}
      contentEditableClassName="markdown-editor"
    />
  );
};

export default Editor;

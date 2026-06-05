'use client';
import {useCreateBlockNote} from '@blocknote/react';
import {BlockNoteView} from '@blocknote/mantine';
import {PartialBlock} from '@blocknote/core';
import '@blocknote/mantine/style.css';
import './editor.css'
import {useTheme} from 'next-themes';
import {useEdgeStore} from '@/lib/edgestore';
interface BlockNoteEditorProps {
  onChange?: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

function BlockNoteEditor({
  onChange,
  initialContent,
  editable,
}: BlockNoteEditorProps) {
  const {resolvedTheme} = useTheme();
  const {edgestore} = useEdgeStore();
  const handleImageUpload = async (file: File) => {
    
    const res = await edgestore.publicFiles.upload({file});
    return res.url;
  };
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
     uploadFile:handleImageUpload
  });
  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      onChange={
        onChange ? () => onChange(JSON.stringify(editor.document)) : () => {}
      }
      editable={editable}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
    />
  );
}

export default BlockNoteEditor;

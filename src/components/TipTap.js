'use client'
// https://tiptap.dev/docs/editor/examples/default
// https://lucide.dev/icons/

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold,
  Italic,
  Strikethrough,
  Type,
  WrapText,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Minus,
  Undo,
  Redo,
  Palette,
  Codepen,
  Code,
  Quote,
  RemoveFormatting,
  Delete,
  Eye
} from 'lucide-react'
import React from 'react'
import { useState } from 'react'




const MenuBar = ({ setMessage }) => {

  const { editor } = useCurrentEditor()
  const [color, setColor] = useState('#000000')
  const [texto, setTexto] = useState( editor.getHTML())
  
  if (!editor) {
    return null
  }

  const showMessage = () => {
    const html = editor.getHTML()
    setMessage(html)
    alert(html) // Mostrar el HTML en una alerta
  }

    editor.on('update', ({editor}) => {
      setTexto (editor.getHTML())
    })


  return (
    <>
      <input type="hidden" name='post' defaultValue={texto} />  {/* Campo asociado dentro del formulario padre */}

      <Bold strokeWidth={4}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'editor-option is-active' : 'editor-option'}
      />

      <Italic
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'editor-option is-active' : 'editor-option'}
      />

      <Strikethrough
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'editor-option is-active' : 'editor-option'}
      />

      <WrapText
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className='editor-option'
      />

      <Type
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'editor-option is-active' : 'editor-option'}
      />

      <Heading1
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'editor-option is-active' : 'editor-option'}
      />

      <Heading2
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'editor-option is-active' : 'editor-option'}
      />

      <Heading3
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'editor-option is-active' : 'editor-option'}
      />

      <Heading4
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'editor-option is-active' : 'editor-option'}
      />

      <Heading5
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'editor-option is-active' : 'editor-option'}
      />

      <Heading6
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'editor-option is-active' : 'editor-option'}
      />

      <List
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'editor-option is-active' : 'editor-option'}
      />

      <ListOrdered
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'editor-option is-active' : 'editor-option'}
      />

      <Undo
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        className='editor-option'
      />

      <Redo
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
        className='editor-option'
      />

      <Code
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'editor-option is-active' : 'editor-option'}
      />

      <Codepen
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'editor-option is-active' : 'editor-option'}
      />

      <Quote
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'editor-option is-active' : 'editor-option'}
      />


      <Minus
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className='editor-option'
      />

      <RemoveFormatting
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className='editor-option'
      />

      <Delete
        onClick={() => editor.chain().focus().clearNodes().run()}
        className='editor-option'
      />

      <Palette
        id='paleta'
        onMouseOver={e => {
          document.getElementById('paleta').style.display = 'none';
          document.getElementById('color').style.display = 'inline'
          editor.chain().blur().run();
        }}
        className='editor-option'
      />

      <input id='color' type="color" defaultValue={color}
        onChange={e => {
          setColor(e.target.value);
          editor.chain().setColor(color).run();
        }}
        onMouseOut={e => {
          document.getElementById('color').style.display = 'none'
          document.getElementById('paleta').style.display = 'inline'
          editor.chain().focus().run();
        }}
        className='editor-option'
      />
      <Eye
        onClick={showMessage}
        className='editor-option'
      />
    </>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]


export default function Editor ({ contenido })  {
  const [message, setMessage] = useState('')
  return (
    <EditorProvider  slotBefore={<MenuBar setMessage={setMessage} />} extensions={extensions} content={contenido}>
    {/* <p>{message}</p> */}
  </EditorProvider>
  )
}
'use client'
// https://tiptap.dev/docs/editor/examples/default
// https://lucide.dev/icons/

import { useState } from 'react'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import Underline from "@tiptap/extension-underline";
import {
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    StrikethroughIcon,
    TypeIcon,
    RemoveFormattingIcon,
    ListIcon,
    ListOrderedIcon,
    RedoIcon,
    UndoIcon,
    Minus,
    Palette,
    Codepen,
    Code,
    Quote,
    Delete,
    Eye,
    WrapTextIcon,
} from 'lucide-react'




export default function Tiptap({ contenido }) {
    const [message, setMessage] = useState('')
    return (
        <EditorProvider
            slotBefore={<Toolbar setMessage={setMessage} />}
            extensions={[StarterKit, Underline]}
            immediatelyRender={false}
            content={contenido}
        >
            <p>{message}</p>
            {/* <EditorContent /> */}
        </EditorProvider>
    )
}


function Toolbar({ setMessage }) {
    // const [headingLevel, setHeadingLevel] = useState(1);
    const { editor } = useCurrentEditor()
    const [color, setColor] = useState('#000000')
    const [texto, setTexto] = useState(editor.getHTML())

    if (!editor) {
        return null
    }

    const showMessage = () => {
        const html = editor.getHTML()
        setMessage(html)
        alert(html) // Mostrar el HTML en una alerta
    }

    editor.on('update', ({ editor }) => {
        setTexto(editor.getHTML())
    })


    return (
        /* Barra de botones */
        < div className="flex flex-wrap" >
            <input type="hidden" name='post' defaultValue={texto} />  {/* Campo asociado dentro del formulario padre */}


            <div className="info">
                <Heading1Icon strokeWidth={2} size={28}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-1 ${editor.isActive('heading', { level: 1 }) ? 'bg-slate-600 text-white' : ''}`}
                />
                <span className="tooltip">Título 1</span>
            </div>

            <div className="info">
                <Heading2Icon strokeWidth={2} size={28}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-1 ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-600 text-white' : ''}`}
                />
                <span className="tooltip">Título 2</span>
            </div>

            <div className="info">
                <Heading3Icon strokeWidth={2} size={28}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`p-1 ${editor.isActive('heading', { level: 3 }) ? 'bg-slate-600 text-white' : ''}`}
                />
                <span className="tooltip">Título 3</span>
            </div>

            <div className="info">
                <BoldIcon strokeWidth={4} size={28}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-1 ${editor.isActive('bold') ? 'bg-slate-600 text-white' : ''}`}
                />
                <span className="tooltip">Negrita</span>
            </div>

            <div className="info">
                <ItalicIcon strokeWidth={2} size={28}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-1 ${editor.isActive('italic') ? 'bg-slate-600 text-white' : ''}`}
                />
                <span className="tooltip">Cursiva</span>
            </div>

            <div className="info">
                <UnderlineIcon strokeWidth={2} size={28}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-1 ${editor.isActive('underline') ? 'bg-slate-600 text-white' : ''}`}
                />
                <span className="tooltip">Subrayado</span>
            </div>

            <div className="info">
                <StrikethroughIcon strokeWidth={2} size={28}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`p-1 ${editor.isActive('strike') ? 'bg-slate-600 text-white' : ''}`}
                />
                <span className="tooltip">Tachado</span>
            </div>

            <div className="info">
                <TypeIcon strokeWidth={2} size={28}
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`info p-1 ${editor.isActive('paragraph') ? 'bg-slate-600 text-white' : ''}`}
                />
                <span className="tooltip">Párrafo</span>
            </div>

            <div className="info">
                <RemoveFormattingIcon strokeWidth={2} size={28}
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                    className='p-1'
                />
                <span className="tooltip">Eliminar formato</span>
            </div>

            <div className="info">
                <ListIcon strokeWidth={2} size={28}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-1 ${editor.isActive('bulletList') ? 'bg-slate-600 text-white' : ''}`}
                />
                <span className="tooltip">Lista con viñetas</span>
            </div>

            <div className="info">
                <ListOrderedIcon strokeWidth={2} size={28}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-1 ${editor.isActive('orderedList') ? 'bg-slate-600 text-white' : ''}`}
                />
                <span className="tooltip">Lista numerada</span>
            </div>

            <div className="info">
                <UndoIcon strokeWidth={2} size={28}
                    onClick={() => editor.chain().focus().undo().run()}
                    // disabled={!editor.can().chain().focus().undo().run()}
                    className='p-1'
                />
                <span className="tooltip">Deshacer</span>
            </div>

            <div className="info">
                <RedoIcon strokeWidth={2} size={28}
                    onClick={() => editor.chain().focus().redo().run()}
                    // disabled={!editor.can().chain().focus().redo().run()}
                    className='p-1'
                />
                <span className="tooltip">Rehacer</span>
            </div>

            <div className="info">
                <WrapTextIcon strokeWidth={2} size={28}
                    onClick={() => editor.chain().focus().setHardBreak().run()}
                    className='p-1'
                />
                <span className="tooltip">Salto de línea</span>
            </div>

            <Code
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={editor.isActive('code') ? 'rounded-sm inline bg-slate-500 text-white' : 'rounded-sm inline'}
            />

            <Codepen
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? 'rounded-sm inline bg-slate-500 text-white' : 'rounded-sm inline'}
            />

            <Quote
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'rounded-sm inline bg-slate-500 text-white' : 'rounded-sm inline'}
            />


            <Minus
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className='rounded-sm inline'
            />



            <Delete
                onClick={() => editor.chain().focus().clearNodes().run()}
                className='rounded-sm inline'
            />

            <Palette
                id='paleta'
                onMouseOver={e => {
                    document.getElementById('paleta').style.display = 'none';
                    document.getElementById('color').style.display = 'inline'
                    editor.chain().blur().run();
                }}
                className='rounded-sm inline'
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
                className='rounded-sm inline'
            />
            <Eye
                onClick={showMessage}
                className='rounded-sm inline'
            />

        </div >
    )
}




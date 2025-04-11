// Tiptap.jsx
import { useState } from 'react';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from "@tiptap/extension-underline";
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import {
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    BoldIcon,
    ItalicIcon,
    StrikethroughIcon,
    UnderlineIcon,
    ListIcon,
    ListOrderedIcon,
    UndoIcon,
    RedoIcon,
    WrapTextIcon,
    MinusIcon,
    PaletteIcon,
    QuoteIcon,
    RemoveFormattingIcon,
    CodeIcon,
    CodepenIcon,
    DeleteIcon,
    EyeIcon,
    TypeIcon,
} from 'lucide-react';



export default function Tiptap({ contenido }) {
    const [html, setHtml] = useState(contenido)

    return (

        <EditorProvider
            slotBefore={<Toolbar />}
            extensions={[StarterKit, Underline, TextStyle, Color]}
            immediatelyRender={false}
            content={contenido}
            onUpdate={({ editor }) => setHtml(editor.getHTML())}
        >
            <input type="hidden" name='post' defaultValue={html} />  {/* Campo asociado dentro del formulario padre */}
        </EditorProvider >

    );
}


function Toolbar() {
    const { editor } = useCurrentEditor();

    if (!editor) return null;


    const showMessage = () => {
        const html = editor.getHTML()
        alert(html) // Mostrar el HTML en una alerta
    }

    return (
        /* Barra de botones */
        <div className="mt-10 flex flex-wrap gap-0.5" >
            <div className="info">
                <Heading1Icon strokeWidth={2} size={28}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={` ${editor.isActive('heading', { level: 1 }) ? 'bg-slate-600 text-white' : ''}`}
                />
                <span className="tooltip">Título 1</span>
            </div>

            <div className="info">
                <Heading2Icon strokeWidth={2} size={28}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={` ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-600 text-white' : ''}`}
                />
                <span className="tooltip">Título 2</span>
            </div>

            <div className="info">
                <Heading3Icon strokeWidth={2} size={28}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={` ${editor.isActive('heading', { level: 3 }) ? 'bg-slate-600 text-white' : ''}`}
                />
                <span className="tooltip">Título 3</span>
            </div>

            <div className="info">
                <TypeIcon strokeWidth={2} size={28}
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`info p-1 ${editor.isActive('paragraph') ? 'bg-slate-600 text-white' : ''}`}
                />
                <span className="tooltip">Párrafo</span>
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

            <CodeIcon strokeWidth={2} size={28}
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`p-1 ${editor.isActive('code') ? 'bg-slate-600 text-white' : ''}`}
            />

            <CodepenIcon strokeWidth={2} size={28}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`p-1 ${editor.isActive('codeBlock') ? 'bg-slate-600 text-white' : ''}`}
            />

            <QuoteIcon strokeWidth={2} size={28}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-1 ${editor.isActive('blockquote') ? 'bg-slate-600 text-white' : ''}`}
            />


            <MinusIcon strokeWidth={2} size={28}
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className='p-1'
            />

            <DeleteIcon strokeWidth={2} size={28}
                onClick={() => editor.chain().focus().clearNodes().run()}
                className='p-1'
            />


            <input type="color" defaultValue={'#000000'}
                onInput={e => editor.chain().setColor(e.target.value).run()}
            />

            <EyeIcon strokeWidth={2} size={28}
                onClick={showMessage}
                className='p-1'
            />

        </div >
    );
}
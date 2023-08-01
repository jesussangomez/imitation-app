import React, { useCallback, useEffect, useState } from 'react'

import isHotkey from 'is-hotkey'

// Import the Slate editor factory.
import {
  Editor,
  Transforms,
  createEditor,
  // Descendant,
  Element as SlateElement,
} from 'slate'

// import { withHistory } from 'slate-history'

// Import the Slate components and React plugin.
import { Editable, withReact, useSlate, Slate } from 'slate-react'

import {
  Divider,
  Grid,
  IconButton,
  Toolbar
} from '@mui/material'

import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignJustified,
  IconAlignRight,
  IconBold,
  IconCode,
  IconH1,
  IconH2,
  IconItalic,
  IconList,
  IconListNumbers,
  IconQuote,
  IconUnderline,
} from '@tabler/icons-react'

import { withHistory } from 'slate-history'

const EditorWidget = (props) => {
  const { onEditorChanged, readOnly, value } = props
  // const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [editor] = useState(() => withHistory(withReact(createEditor())))

  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const LIST_TYPES = ['numbered-list', 'bulleted-list']
  const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

  const INITIAL_VALUE_DEFAULT = [{ children: [{ text: '' }] }]
  const [content, setContent] = useState(INITIAL_VALUE_DEFAULT)

  useEffect(() => {
    if (value === undefined) return
    setContent(value)
    editor.children = value
    if (readOnly === undefined) {
      onEditorChanged(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const Element = ({ attributes, children, element }) => {
    const style = { textAlign: element.align }
    switch (element.type) {
      case 'block-quote':
        return (
          <blockquote style={style} {...attributes}>
            {children}
          </blockquote>
        )
      case 'bulleted-list':
        return (
          <ul style={style} {...attributes}>
            {children}
          </ul>
        )
      case 'heading-one':
        return (
          <h3 style={style} {...attributes}>
            {children}
          </h3>
        )
      case 'heading-two':
        return (
          <h4 style={style} {...attributes}>
            {children}
          </h4>
        )
      case 'list-item':
        return (
          <li style={style} {...attributes}>
            {children}
          </li>
        )
      case 'numbered-list':
        return (
          <ol style={style} {...attributes}>
            {children}
          </ol>
        )
      default:
        return (
          <p style={style} {...attributes}>
            {children}
          </p>
        )
    }
  }

  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }

    if (leaf.code) {
      children = <code>{children}</code>
    }

    if (leaf.italic) {
      children = <em>{children}</em>
    }

    if (leaf.underline) {
      children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
  }

  const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    )
    const isList = LIST_TYPES.includes(format)
  
    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true,
    })
    let newProperties
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        align: isActive ? undefined : format,
      }
    } else {
      newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
      }
    }
    Transforms.setNodes(editor, newProperties)
  
    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  }
  
  const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)
  
    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  }
  
  const isBlockActive = (editor, format, blockType = 'type') => {
    const { selection } = editor
    if (!selection) return false
  
    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n[blockType] === format,
      })
    )
  
    return !!match
  }
  
  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }  
  
  const BlockButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
      <IconButton
        active={isBlockActive(
          editor,
          format,
          TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
        )}
        onMouseDown={event => {
          event.preventDefault()
          toggleBlock(editor, format)
        }}
      >
        {icons[icon]}
      </IconButton>
    )
  }
  
  const MarkButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
      <IconButton
        active={isMarkActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault()
          toggleMark(editor, format)
        }}
      >
        {icons[icon]}
      </IconButton>
    )
  }

  const iconSize = 18
  const iconStroke = 2
  const icons = {
    'format_bold': <IconBold size={iconSize} stroke={iconStroke}/>,
    'format_italic': <IconItalic size={iconSize} stroke={iconStroke}/>,
    'format_underlined': <IconUnderline size={iconSize} stroke={iconStroke}/>,
    'code': <IconCode size={iconSize} stroke={iconStroke}/>,
    'looks_one': <IconH1 size={iconSize} stroke={iconStroke}/>,
    'looks_two': <IconH2 size={iconSize} stroke={iconStroke}/>,
    'format_quote': <IconQuote size={iconSize} stroke={iconStroke}/>,
    'format_list_numbered': <IconListNumbers size={iconSize} stroke={iconStroke}/>,
    'format_list_bulleted': <IconList size={iconSize} stroke={iconStroke}/>,
    'format_align_left': <IconAlignLeft size={iconSize} stroke={iconStroke}/>,
    'format_align_center': <IconAlignCenter size={iconSize} stroke={iconStroke}/>,
    'format_align_right': <IconAlignRight size={iconSize} stroke={iconStroke}/>,
    'format_align_justify': <IconAlignJustified size={iconSize} stroke={iconStroke}/>,
  }

  const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
  }

  const onHandleChange = (value) => {
    onEditorChanged(value)
    // const isAstChange = editor.operations.some(
    //   op => 'set_selection' !== op.type
    // )
    // console.log(value)
    // if (isAstChange) {
    //   // Save the value to Local Storage.
    //   const content = JSON.stringify(value)
    //   console.log(content)
    //   // localStorage.setItem('content', content)
    // }
  }

  return (
    <Slate editor={editor} value={content} 
    onChange={onHandleChange}>
      {
        readOnly === undefined ? (
          <Toolbar variant='dense' sx={{ p: '0 !important' }}>
            <Grid container spacing={0}>
              <Grid item xs={12} md={4}>
                <MarkButton format='bold' icon='format_bold' />
                <MarkButton format='italic' icon='format_italic' />
                <MarkButton format='underline' icon='format_underlined' />
                <MarkButton format='code' icon='code' />
              </Grid>
              <Grid item xs={12} md={8}>
                <BlockButton format='heading-one' icon='looks_one' />
                <BlockButton format='heading-two' icon='looks_two' />
                <BlockButton format='block-quote' icon='format_quote' />
                <BlockButton format='numbered-list' icon='format_list_numbered' />
                <BlockButton format='bulleted-list' icon='format_list_bulleted' />
                <BlockButton format='left' icon='format_align_left' />
                <BlockButton format='center' icon='format_align_center' />
                <BlockButton format='right' icon='format_align_right' />
                <BlockButton format='justify' icon='format_align_justify' />
              </Grid>
            </Grid>
          </Toolbar>
        ) : null
      }
      { readOnly === undefined ? <Divider /> : null }
      <Editable 
        readOnly={readOnly !== undefined ? readOnly : false}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder='Ingresa una descripción...'
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
  )
}

export default EditorWidget
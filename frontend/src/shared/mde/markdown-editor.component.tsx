import React, { useState } from 'react'
import ReactMde, {
  SaveImageHandler,
  getDefaultToolbarCommands,
} from 'react-mde'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

import { theme } from '../styles/theme.style'
import styles from './markdown-editor.module.css'
import { api } from '../../services/api.service'

export type TMarkdownEditorTab = 'write' | 'preview'

const toolbarCommands = getDefaultToolbarCommands()

// remove the strikethrough command
toolbarCommands[0].pop()

// remove to do command
toolbarCommands[2].pop()

interface IProps {
  value: string
  initialTab?: TMarkdownEditorTab
  setValue?: (value: string) => void
  placeholder?: string
  imagesAreTemporary?: boolean
}
export const MarkdownEditor: React.FC<IProps> = ({
  initialTab,
  value,
  setValue,
  placeholder,
  imagesAreTemporary,
}) => {
  const [selectedTab, setSelectedTab] = useState<TMarkdownEditorTab>(
    initialTab ?? 'preview'
  )

  const save: SaveImageHandler = async function* (data: ArrayBuffer) {
    // Upload "data" to your server
    // Use XMLHttpRequest.send to send a FormData object containing
    // "data"
    // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest
    const formData = new FormData()
    const dataBlob = new Blob([data], { type: 'image/jpeg' })
    formData.append('image', dataBlob)

    let postUrl = '/images'
    if (imagesAreTemporary) postUrl += '?temporary=true'

    // https://github.com/andrerpena/react-mde/pull/268#issuecomment-707563996
    const response = await api.post(postUrl, formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    })

    const baseUrl = process.env.REACT_APP_STATIC_URL ?? 'http://localhost:5001'

    // yields the URL that should be inserted in the markdown
    yield `${baseUrl}/${response.data.data.imageUrl}`

    // returns true meaning that the save was successful
    return true
  }

  return (
    <SContainer>
      <ReactMde
        classes={{
          textArea: styles.textarea,
          toolbar: styles.toolbar,
          preview: styles.preview,
        }}
        childProps={{
          textArea: {
            placeholder,
          },
        }}
        value={value}
        onChange={setValue ? setValue : () => {}}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(<ReactMarkdown source={markdown} />)
        }
        paste={{
          saveImage: save,
        }}
        toolbarCommands={toolbarCommands}
      />
    </SContainer>
  )
}

const SContainer = styled.div`
  margin-top: ${theme.spacing.base};
`

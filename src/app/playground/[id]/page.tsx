'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import Split from 'react-split'
import { FileTree } from '@/components/file-tree/file-tree'
import { ConsoleShell } from '@/components/console-shell/shell'
import { useSession } from 'next-auth/react'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
})

export default function PlaygroundPage() {
  const router = useRouter()
  const searchParams = new URLSearchParams(window.location.search)
  const id = searchParams.get('id')
  const { data: session } = useSession()

  const [files, setFiles] = useState([
    { path: 'main.js', content: '// Hello world\nconsole.log("hi")' },
    { path: 'utils.js', content: '// some helper\n' },
  ])
  const [activeFile, setActiveFile] = useState(files[0].path)
  const [code, setCode] = useState(files[0].content)

  useEffect(() => {
    const f = files.find(f => f.path === activeFile)
    setCode(f?.content || '')
  }, [activeFile, files])

  const handleEditorChange = (val: string | undefined) => {
    setCode(val || '')
    setFiles(fs =>
      fs.map(f => f.path === activeFile ? { ...f, content: val || '' } : f)
    )
  }

  const handleRun = () => {
    console.log('Run:', activeFile, code)
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between bg-gray-800 text-white p-2">
        <h1>Project: {id}</h1>
        <button
          onClick={handleRun}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded"
        >
          Run ▶️
        </button>
      </div>

      <Split
        className="flex flex-1"
        sizes={[20, 80]}
        minSize={150}
        gutterSize={4}
      >
        <div className="bg-gray-100 p-2 overflow-auto">
          <FileTree
            files={files.map(f => f.path)}
            active={activeFile}
            onSelect={setActiveFile}
          />
        </div>

        <Split
          className="flex flex-col flex-1"
          direction="vertical"
          sizes={[75, 25]}
          gutterSize={4}
        >
          <MonacoEditor
            language="javascript"
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
          />

          <div className="bg-black text-green-300 font-mono p-2 overflow-auto">
            <ConsoleShell />
          </div>
        </Split>
      </Split>
    </div>
  )
}
import { FC } from 'react'

export const FileTree: FC<{
  files: string[]
  active: string
  onSelect: (path: string) => void
}> = ({ files, active, onSelect }) => (
  <ul>
    {files.map(f => (
      <li
        key={f}
        className={`px-2 py-1 rounded cursor-pointer ${
          f === active ? 'bg-blue-200' : 'hover:bg-gray-200'
        }`}
        onClick={() => onSelect(f)}
      >
        {f}
      </li>
    ))}
  </ul>
)

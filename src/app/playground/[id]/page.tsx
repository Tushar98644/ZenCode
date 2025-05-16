'use client'
import dynamic from 'next/dynamic';
import { ProjectEditor } from '@/components/editor/editor';
import { FileTree } from '@/components/editor/components/file-tree';
import { Directory, File, Type } from '@/utils/file-manager';

const PseudoTerminal = dynamic(
    async () => (await import('@/components/terminal')).PseudoTerminal, { ssr: false }
);

let rootDir: Directory = {
    id: "root",
    name: "root",
    parentId: undefined,
    type: Type.DIRECTORY,
    path: "",
    depth: 0,
    dirs: [
        {
            id: "src",
            name: "src",
            parentId: "root",
            type: Type.DIRECTORY,
            files: [],
            dirs: [],
            path: '',
            depth: 0
        }
    ],
    files: [
        {
            id: "src/index.js",
            name: "index.js",
            parentId: "src",
            type: Type.FILE,
            depth: 0,
            path: ''
        }
    ]
  };
  
const Playground = () => {
    return (
        <div className='flex flex-row w-screen h-screen'>
            <div className='file-tree w-1/5 h-full'>
                <FileTree 
                    rootDir={rootDir} 
                    selectedFile={undefined} 
                    onSelect={function (file: File): void {
                        console.log('Function not implemented.');
                    }} 
                />
            </div>
            <div className='terminal-editor flex flex-col w-full h-full'>
                <div className='editor h-2/3'>
                    <ProjectEditor />
                </div>
                <div className='terminal h-1/3'>
                    <PseudoTerminal />
                </div>
            </div>
        </div>
    );
}

export default Playground;
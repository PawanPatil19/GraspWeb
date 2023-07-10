'use client';

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { SafePost, SafeUser } from "@/app/types";
import React from 'react';
import {  BiEditAlt, BiSave, BiCheck } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineClose } from 'react-icons/ai';
import { VscSettings, VscFile } from 'react-icons/vsc';
import { useParams } from 'next/navigation';
import { Quill } from 'react-quill';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import { FileUploader } from "react-drag-drop-files";



import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import 'react-quill/dist/quill.snow.css';
import Link from "next/link";

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);


const modules = {
    
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [{'align': []}],
      ['link', 'image', 'video', 'formula', 'code-block'],
      ['clean'],
    ],

    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    imageActions: {},
    imageFormats: {},
}

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'align',
    'link',
    'image',
    'video',
    'formula',
    'code-block',
    'width',
    'float'
]






interface EditorClientProps {
    post: SafePost & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}


const EditorClient : React.FC<EditorClientProps> = ({
    post,
    currentUser
}) => {


    const [content, setContent] = useState(post?.displayContent || null);
    const [deltaContent, setDeltaContent] = useState(post?.content || null);
    const [title, setTitle] = useState(post?.title || null);
    const [preview, setPreview] = useState(false);
    const [edit, setEdit] = useState(true);
    const [save, setSave] = useState(false);
    const [upload, setUpload] = useState(false);
    const params = useParams();
    const postID = params?.postID;
    console.log(postID);
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (event:any) => {
        console.log(event.target.files[0]);
        //change reference of files
        let tmpFiles = [...files]
        tmpFiles.push(event.target.files[0]);
        setFiles(tmpFiles);
    }

    const removeFile = (index: number) => {
        let tmpFiles = [...files]
        tmpFiles.splice(index, 1);
        setFiles(tmpFiles);
    }



    const onEditorChange = (content: string, delta: any, source: string, editor: any) => {
        setContent(content);
        const deltaContent = editor.getContents();
        console.log(content);
        console.log(deltaContent);
        setDeltaContent(deltaContent);
    };

    // send postID, title, content to axios.post
    const handleSave = async () => {
        console.log(content);
        // change content to delta
        console.log(deltaContent);

        // convert files to binData
        let binData = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                binData.push(reader.result);
            }
        }

        const data = {
            postID: postID,
            title: title,
            content: deltaContent,
            displayContent: content
        }
        axios.post('/api/createPost', data)
            .then((res) => {
                console.log(res);
                toast.success('Post saved successfully!');
            }
        ).catch((err) => {
            console.log(err);
            toast.error('Error saving post!');
        }
        );

    }
    
    return (
        <main className="bg-white">
        <div className='flex flex-col'>

            <div className=''>
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-10 rounded-2xl bg-white'>
                    <input 
                        className='w-full border-b-2 px-4 py-2 text-3xl focus:outline-none focus:border-violet-800 focus-visible:' 
                        type="text" 
                        placeholder="Write your title here..."
                        value={title? title : ''}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
            </div>
            <div className='min-h-screen'>
                <div className='grid grid-cols-12 border-t-2 bg-white'>
                    <div className='col-span-1 bg-gray-100'>
                        <div className='flex flex-col justify-center items-center mt-10'>

                            
                            {!edit ? (<div className="flex flex-col items-center justify-center my-7">
                                        <BiEditAlt className='text-3xl text-gray-400' 
                                            onClick={() => {setEdit(true); setPreview(false); setSave(false);}}/>
                                        <span className='flex font-light text-sm text-gray-500'>Create</span>
                                    </div>)
                                : (
                                    <div className='flex items-center gap-4 my-7'>
                                        <BiEditAlt className='text-4xl text-violet-800' />
                                        <div className="w-2 h-2 bg-violet-800 rounded-full align-middle"></div>
                                    </div>
                                )
                            }

                            <Link href={`/view/${postID}`} >
                            {!preview ? 
                                (<div className="flex flex-col items-center justify-center my-7">
                                    
                                        <AiOutlineEye className='text-3xl text-gray-400' 
                                            onClick={() => {setPreview(true); setEdit(false); setSave(false);}}/>
                                        <span className='flex font-light text-sm text-gray-500'>Preview</span>
                                   
                                </div>) 
                                : (<div className='flex items-center gap-4'>
                                    <AiOutlineEye className='text-4xl text-violet-800 my-7' />
                                    <div className="w-2 h-2 bg-violet-800 rounded-full align-middle"></div>
                                  </div>)
                            }
                             </Link>
                            
                            {!save ? 
                                (<div className="flex flex-col items-center justify-center my-7">
                                    <BiSave className='text-3xl text-gray-400' 
                                        onClick={() => {setSave(true); setPreview(false); setEdit(false); handleSave();}}/>
                                    <span className='flex font-light text-sm text-gray-500'>Save</span>
                                </div>)
                                : <div className='flex items-center gap-4'>
                                    <BiSave className='text-4xl text-violet-800 my-7' />
                                    <div className="w-2 h-2 bg-violet-800 rounded-full align-middle"></div>
                                  </div>
                            }

                            {!upload ? 
                                (<div className="flex flex-col items-center justify-center my-7">
                                    <BiCheck className='text-3xl text-gray-400' 
                                        onClick={() => {setSave(true); setPreview(false); setEdit(false);}}/>
                                    <span className='flex font-light text-sm text-gray-500'>Upload</span>
                                </div>)
                                : <div className='flex items-center gap-4'>
                                    <BiCheck className='text-4xl text-violet-800 my-7' />
                                    <div className="w-2 h-2 bg-violet-800 rounded-full align-middle"></div>
                                  </div>
                            }
                                
                        </div>
                    </div>
                    <link
                        rel="stylesheet"
                        href="https://unpkg.com/react-quill@1.3.3/dist/quill.bubble.css"
                    />
                    <div className='col-span-9 min-h-screen' id='quill-container'>
                        <ReactQuill 
                            placeholder='Write your content here...'
                            theme='snow'
                            modules={modules}
                            formats={formats}
                            onChange={onEditorChange}
                            defaultValue={content}
                        />
                    </div>
                    <div className='col-span-2 bg-gray-100 px-5'>
                        <div className='flex flex-col py-5'>
                            <div>
                                <span className='flex font-light text-gray-500'><VscSettings className='text-2xl' /> &nbsp; Upload</span>
                            </div>
                            {/* browse files and upload */}
                            <div className='mt-5'>
                                <input type="file" id="file" className="hidden" onChange={handleFileChange} />
                                <label htmlFor="file" className='bg-white border-2 border-violet-800 hover:bg-violet-800 hover:text-white font-medium rounded-full px-6 py-2 text-center'>
                                    Browse Files
                                </label>
                            </div>
                            
                            {files.map((file, index) => (
                                <div key={index} className='mt-5'>
                                    <div className='flex font-light text-gray-500'>
                                        <VscFile className='text-2xl' /> &nbsp; {file.name}
                                        <AiOutlineClose className='text-2xl ml-2 hover:text-violet-800' onClick={() => removeFile(index)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        </main>
    );

}

export default EditorClient;
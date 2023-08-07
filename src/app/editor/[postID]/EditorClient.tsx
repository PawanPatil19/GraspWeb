'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { SafePost, SafeUser } from "@/app/types";
import React from 'react';
import {  BiEditAlt, BiSave, BiCheck } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineClose, AiOutlineUpload } from 'react-icons/ai';
import { VscSettings, VscFile } from 'react-icons/vsc';
import { useParams } from 'next/navigation';
import { Quill } from 'react-quill';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import BlotFormatter, {AlignAction, DeleteAction, ImageSpec, ResizeAction} from 'quill-blot-formatter';
import { redirect, useRouter } from 'next/navigation';
import useUploadModal from '@/app/hooks/useUploadModal';



import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import 'react-quill/dist/quill.snow.css';
import Link from "next/link";

const BlockEmbed = Quill.import('blots/block/embed');


Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);
Quill.register('modules/blotFormatter', BlotFormatter);


class CustomImageSpec extends ImageSpec {
    getActions() {
        return [AlignAction, DeleteAction];
    }
}



const modules = {
    
    toolbar: [
        [{ 'font': [] }, { 'size': [] }],
        [ 'bold', 'italic', 'underline', 'strike' ],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'super' }, { 'script': 'sub' }],
        [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
        [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
        [ 'direction', { 'align': [] }],
        [ 'link', 'image', 'video', 'formula' ],
        [ 'clean' ]
    ],

    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    imageActions: {},
    imageFormats: {},
    // ImageResize : {
    //     modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
    // }
    // blotFormatter: {
    //     specs: [CustomImageSpec],
    // },
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
    'float',
    'color',
    'background'
]


interface EditorClientProps {
    post: SafePost | null;
    currentUser?: SafeUser | null;
}


const EditorClient : React.FC<EditorClientProps> = ({
    post,
    currentUser
}) => {

    const router = useRouter();
    const uploadModal = useUploadModal();
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
    const [fileNames, setFileNames] = useState<string[]>([]);
    const [fileReferences, setFileReferences] = useState<string[]>(post?.uploadFiles || []);
    const [removedFiles, setRemovedFiles] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const getFileNames = () => {
        let tmpFileNames: string[] = [];
        for (let i = 0; i < fileReferences.length; i++) {
            const file = fileReferences[i];
            const fileName = file.split('/').pop();
            tmpFileNames.push(fileName as string);
        }
        setFileNames(tmpFileNames);
    }

    useEffect(() => {
        getFileNames();
    }, [])

        

    const handleFileChange = (event:any) => {
        //change reference of files
        let tmpFiles = [...files]
        tmpFiles.push(event.target.files[0]);
        setFiles(tmpFiles);

        let tmpFileNames = [...fileNames]
        tmpFileNames.push(event.target.files[0].name);
        setFileNames(tmpFileNames);
    }

    const removeFile = (index: number) => {
        let tmpFiles = [...files]
        tmpFiles.splice(index, 1);
        setFiles(tmpFiles);

        let tmpFileNames = [...fileNames]
        tmpFileNames.splice(index, 1);
        setFileNames(tmpFileNames);

        let tmpRemovedFiles = [...removedFiles]
        tmpRemovedFiles.push(fileNames[index]);
        setRemovedFiles(tmpRemovedFiles);

        let tmpFilereferences = [...fileReferences]
        tmpFilereferences.splice(index, 1);
        setFileReferences(tmpFilereferences);
    }

    const handleFileUpload = async () => {

        // delete the files that were removed
        for (let i = 0; i < removedFiles.length; i++) {
            const file = removedFiles[i];
            console.log(file);
            const data = {
                file: file
            }
            axios.post('/api/deleteFiles', data).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        }

        console.log('Files ', files);


        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileName = fileNames[i];
            const res = await axios.get(`/api/uploadFiles?file=${fileName}`);
            console.log(res);
            const { url, fields } = await res.data;
            const formData = new FormData();

            Object.entries({ ...fields, file }).forEach(([key, value]) => {
                formData.append(key, value as string);
            });

            
            const upload = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (upload.ok) {
                fileReferences.push(url+fileName);
                console.log('Uploaded successfully!');
            }
            else {
                console.error('Upload failed.');
            }

        }
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

        // console.log(content);
        // // change content to delta
        // console.log(deltaContent);

        const loadingToast = toast.loading('Saving post...');
        loadingToast;

        handleFileUpload().then(() => {
            console.log('Files uploaded successfully!');

            const data = {
                postID: postID,
                title: title,
                content: deltaContent,
                displayContent: content,
                uploadFiles: fileReferences
            }
            axios.post('/api/createPost', data)
                .then((res) => {
                    console.log(res);
                    toast.dismiss(loadingToast);
                    toast.success('Post saved successfully!');
                }
            ).catch((err) => {
                console.log(err);
                toast.error('Error saving post!');
            }
            );
        }).catch((err) => {
            console.log(err);
            toast.dismiss(loadingToast);
            toast.error('Error uploading files!');
        })
    }

    const handlePreview = async () => {
        // const loadingToast = toast.loading('Loading preview...');
        // loadingToast;

        // handleFileUpload().then(() => {
        //     console.log('Files uploaded successfully!');

        //     const data = {
        //         postID: postID,
        //         title: title,
        //         content: deltaContent,
        //         displayContent: content,
        //         uploadFiles: fileReferences
        //     }
        //     axios.post('/api/createPost', data)
        //         .then((res) => {
        //             console.log(res);
        //             toast.dismiss(loadingToast);
        //             // toast.success('Post saved successfully!');
        //             router.push(`/view/${postID}`);
        //         }
        //     ).catch((err) => {
        //         console.log(err);
        //         toast.error('Error loading post!');
        //     }
        //     );
        // }).catch((err) => {
        //     console.log(err);
        //     toast.dismiss(loadingToast);
        //     toast.error('Error uploading files!');
        // })

        router.push(`/view/${postID}`);
    }

    const handleUpload = async () => {
        const loadingToast = toast.loading('Uploading...');
        loadingToast;

        handleFileUpload().then(() => {
            console.log('Files uploaded successfully!');

            const data = {
                postID: postID,
                title: title,
                content: deltaContent,
                displayContent: content,
                uploadFiles: fileReferences
            }
            axios.post('/api/createPost', data)
                .then((res) => {
                    console.log(res);
                    toast.dismiss(loadingToast);
                    // toast.success('Post saved successfully!');
                    uploadModal.onOpen();
                    console.log(uploadModal.isOpen);
                }
            ).catch((err) => {
                console.log(err);
                toast.error('Error loading post!');
            }
            );
        }).catch((err) => {
            console.log(err);
            toast.dismiss(loadingToast);
            toast.error('Error uploading files!');
        })
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
                                            onClick={() => {setUpload(false); setEdit(true); setPreview(false); setSave(false);}}/>
                                        <span className='flex font-light text-sm text-gray-500'>Create</span>
                                    </div>)
                                : (
                                    <div className='flex items-center gap-4 my-7'>
                                        <BiEditAlt className='text-4xl text-violet-800' />
                                        <div className="w-2 h-2 bg-violet-800 rounded-full align-middle"></div>
                                    </div>
                                )
                            }

                            {!preview ? 
                                (<div className="flex flex-col items-center justify-center my-7">
                                        <AiOutlineEye className='text-3xl text-gray-400' 
                                            onClick={() => {setPreview(true); 
                                            setEdit(false); 
                                            setSave(false); 
                                            setUpload(false);
                                            //save and then redirect
                                            handlePreview();
                                        }}/>
                                        <span className='flex font-light text-sm text-gray-500'>Preview</span>
                                   
                                </div>) 
                                : (<div className='flex items-center gap-4'>
                                    <AiOutlineEye className='text-4xl text-violet-800 my-7' />
                                    <div className="w-2 h-2 bg-violet-800 rounded-full align-middle"></div>
                                  </div>)
                            }
                            
                            {!save ? 
                                (<div className="flex flex-col items-center justify-center my-7">
                                    <BiSave className='text-3xl text-gray-400' 
                                        onClick={() => {setUpload(false);setSave(true); setPreview(false); setEdit(false); handleSave();}}/>
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
                                        onClick={() => {setUpload(true); setSave(false); setPreview(false); setEdit(false); handleUpload(); }}/>
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
                            defaultValue={content as string}
                        />
                    </div>
                    <div className='col-span-2 bg-gray-100 px-5'>
                        <div className='flex flex-col py-5'>
                            <div>
                                <span className='flex font-light text-gray-500'><VscSettings className='text-2xl' /> &nbsp; Upload</span>
                            </div>
                            {/* browse files and upload */}
                            <div className='flex mt-5 bg-white border-2 border-violet-800  font-medium rounded-lg border-dotted'>
                                <input type="file" id="file" className="hidden" onChange={handleFileChange} />
                                <label htmlFor="file" className=' w-full py-10'>
                                    <div className="flex flex-col">
                                        <AiOutlineUpload className='text-2xl mx-auto text-violet-800' />
                                        <span className="mx-auto">Browse files</span><br></br>
                                        <span className="mx-auto text-sm text-gray-400">PDF/PPTX files only</span>
                                    </div>
                                    
                                </label>
                            </div>
                            
                            {fileNames.map((file, index) => (
                                <div key={index} className='mt-5'>
                                    <div className='flex font-light text-gray-500 items-center'>
                                        <VscFile className='text-lg' /> &nbsp; {file}
                                        <AiOutlineClose className='text-lg ml-auto hover:text-violet-800' onClick={() => removeFile(index)} />
                                    </div>
                                </div>
                            ))}

                            {/* <div className='flex justify-center mt-5'>
                                <button className='bg-violet-800 text-white px-5 py-2 rounded-lg' onClick={handleFileUpload}>Upload</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        </main>
    );

}

export default EditorClient;
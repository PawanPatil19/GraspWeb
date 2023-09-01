'use client';

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { SafePost, SafeUser } from "@/app/types";
import * as React from 'react';
import {  BiEditAlt, BiSave, BiCheck } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineClose, AiOutlineUpload } from 'react-icons/ai';
import { VscSettings, VscFile, VscReferences } from 'react-icons/vsc';
import { useParams } from 'next/navigation';
import { redirect, useRouter } from 'next/navigation';
import useUploadModal from '@/app/hooks/useUploadModal';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import Router from "next/router"

 // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

import SunEditorCore from "suneditor/src/lib/core";
import UploadModal from "@/app/components/modals/UploadModal";
import { CoursePlan } from "@prisma/client";




interface EditorClientProps {
    post: SafePost | null;
    currentUser?: SafeUser | null;
    coursePlans?: CoursePlan[] | null;
}


const EditorClient1 : React.FC<EditorClientProps> = ({
    post,
    currentUser,
    coursePlans
}) => {

    const editor = useRef<SunEditorCore>();

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
     const getSunEditorInstance = (sunEditor: SunEditorCore) => {
        editor.current = sunEditor;
    };

    const router = useRouter();
    const uploadModal = useUploadModal();

    const [title, setTitle] = useState(post?.title || null);
    const [preview, setPreview] = useState(false);
    const [edit, setEdit] = useState(true);
    const [save, setSave] = useState(false);
    const [upload, setUpload] = useState(false);

    const [savedState, setSavedState] = useState(true);

    const params = useParams();
    const postID = params?.postID;
    //console.log(postID);

    const [files, setFiles] = useState<File[]>([]);
    const [fileNames, setFileNames] = useState<string[]>([]);
    // use Set data structure for stroing file References
    const [fileReferences, setFileReferences] = useState<Set<string>>(new Set(post?.uploadFiles) || new Set());
    const [removedFiles, setRemovedFiles] = useState<string[]>([]);
    
    const [loading, setLoading] = useState(false);

    const [editorContent, setEditorContent] = useState(post?.content);

    

    const handleEditorChange = (content: string) => {
        setEditorContent(content);
        setSavedState(false);
        console.log("This content: ", content);
    }

    const getFileNames = () => {
        let tmpFileNames: string[] = [];

        fileReferences.forEach((file) => {
            console.log("FILE: ", file);
            const fileName = file.split('/').pop();
            tmpFileNames.push(fileName as string);
        })

        setFileNames(tmpFileNames);
    }

    useEffect(() => {
        getFileNames();
    }, [])

    React.useEffect(() => {
        const confirmationMessage = 'Changes you made may not be saved.';
        const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
          (e || window.event).returnValue = confirmationMessage;
          return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
        };
        const beforeRouteHandler = (url: string) => {
          if (Router.pathname !== url && !confirm(confirmationMessage)) {
            // to inform NProgress or something ...
            Router.events.emit('routeChangeError');
            // tslint:disable-next-line: no-string-throw
            throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
          }
        };
        if (!savedState) {
          window.addEventListener('beforeunload', beforeUnloadHandler);
          Router.events.on('routeChangeStart', beforeRouteHandler);
        } else {
          window.removeEventListener('beforeunload', beforeUnloadHandler);
          Router.events.off('routeChangeStart', beforeRouteHandler);
        }
        return () => {
          window.removeEventListener('beforeunload', beforeUnloadHandler);
          Router.events.off('routeChangeStart', beforeRouteHandler);
        };
      }, [savedState]);
      



        

    const handleFileChange = (event:any) => {
        //change reference of files
        let tmpFiles = [...files]
        tmpFiles.push(event.target.files[0]);
        setFiles(tmpFiles);

        let tmpFileNames = [...fileNames]
        tmpFileNames.push(event.target.files[0].name);
        setFileNames(tmpFileNames);

        setSavedState(false);
    }

    const removeFile = (index: number) => {
        setSavedState(false);
        let tmpFiles = [...files]
        tmpFiles.splice(index, 1);
        setFiles(tmpFiles);

        let tmpFileNames = [...fileNames]
        tmpFileNames.splice(index, 1);
        setFileNames(tmpFileNames);

        let tmpRemovedFiles = [...removedFiles]
        tmpRemovedFiles.push(fileNames[index]);
        setRemovedFiles(tmpRemovedFiles);


        let tmpFileRefArr = Array.from(fileReferences);
        let tmpFileReferences = [...tmpFileRefArr]
        tmpFileReferences.splice(index, 1);
        setFileReferences(new Set(tmpFileReferences));
        
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
                fileReferences.add(url+fileName);
                console.log('Uploaded successfully!');
            }
            else {
                console.error('Upload failed.');
            }

        }
    }

    // send postID, title, content to axios.post
    const handleSave = async () => {

        const loadingToast = toast.loading('Saving post...');
        loadingToast;
        setSavedState(true);

        handleFileUpload().then(() => {
            console.log('Files uploaded successfully!');

            const data = {
                postID: postID,
                title: title,
                content: editorContent,
                uploadFiles: Array.from(fileReferences)
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
        const loadingToast = toast.loading('Loading preview...');
        loadingToast;

        setSavedState(true);

        handleFileUpload().then(() => {
            console.log('Files uploaded successfully!');

            const data = {
                postID: postID,
                title: title,
                content: editorContent,
                uploadFiles: Array.from(fileReferences)
            }
            axios.post('/api/createPost', data)
                .then((res) => {
                    console.log(res);
                    toast.dismiss(loadingToast);
                    // toast.success('Post saved successfully!');
                    router.push(`/view/${postID}`);
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

        //router.push(`/view/${postID}`);
    }

    const handleUpload = async () => {
        const loadingToast = toast.loading('Uploading...');
        loadingToast;

        setSavedState(true);

        handleFileUpload().then(() => {
            console.log('Files uploaded successfully!');

            const data = {
                postID: postID,
                title: title,
                content: editorContent,
                uploadFiles: Array.from(fileReferences)
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
            <UploadModal plans={coursePlans}/>

            <div className=''>
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-10 rounded-2xl bg-white px-4'>
                    <input 
                        className='w-full border-b-2 px-4 py-2 text-3xl focus:outline-none focus:border-violet-800 focus-visible:' 
                        type="text" 
                        placeholder="Write your title here..."
                        value={title? title : ''}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setSavedState(false);
                        }}
                        maxLength={80}
                    />
                    <span className="ml-auto text-xs text-gray-400 mt-2">
                        (max. 80 characters)
                    </span>
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
                    <div className='col-span-9 min-h-screen' id='editor-container'>
                    <SunEditor
                        lang="en"
                        height={"auto"}
                        placeholder={'Please type here....'}
                        setOptions={{
                        resizingBar: true,

                        buttonList: [
                            [
                            'formatBlock',
                            'font',
                            'bold',
                            'underline',
                            'italic',
                            'strike',
                            'blockquote',
                            'showBlocks',
                            'fontColor',
                            'hiliteColor',
                            'align',
                            'list',
                            'table',
                            'link',
                            'image',
                            'video',
                            'removeFormat'
                            ]
                        ]
                        }}
                        onChange={handleEditorChange}
                        setContents={editorContent ? editorContent : ''}
                        
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
                                <div className="mt-4" key={index}>
                                    <div className='bg-white rounded-lg border-2 border-gray-400 p-2'>
                                        <div className="flex justify-between">
                                            <div className="flex">
                                                <VscFile className='text-lg' /> 
                                                <div className='text-xs font-light ml-2'>{file.split(".", 2).at(-1)?.toUpperCase()}</div>
                                            </div>
                                            <AiOutlineClose className='text-lg ml-auto hover:text-violet-800' onClick={() => removeFile(index)} />
                                        </div>
                                        <div className='flex font-light text-gray-500 items-center'>
                                            <p className='text-sm truncate'>{file}</p>
                                        </div>
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

export default EditorClient1;
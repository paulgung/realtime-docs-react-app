import React, {useEffect, useRef, useState} from 'react'
import {useParams} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {updateDoc, collection, doc, onSnapshot} from "firebase/firestore";

export default function EditDocs({database}) {
    const params = useParams();
    console.log(params.id)
    const [docsDesc, setDocsDesc] = useState('');
    const collectionRef = collection(database, 'docsData')
    const isMounted = useRef()
    const [documentTitle, setDocumentTitle] = useState('')

    const getData = () => {
        const document = doc(collectionRef, params.id)
        onSnapshot(document, (docs) => {
            setDocumentTitle(docs.data().title)
            setDocsDesc(docs.data().docsDesc)
        })
    }

    const getQuillData = (value) => {
        setDocsDesc(value)
    }

    useEffect(() => {
        // debounce update data
        const updateDocsData = setTimeout(() => {
            const document = doc(collectionRef, params.id)
            updateDoc(document, {
                docsDesc: docsDesc
            }).then(() => {
                alert('Saved')
            }).catch(() => {
                alert('Cannot Save')
            })
        }, 5000)
        return () => clearTimeout(updateDocsData)
    }, [docsDesc])

    useEffect(() => {
        if (isMounted.current) {
            return
        }
        isMounted.current = true;
        getData()
    }, [])

    return (
        <div>
            <h2 className='Docs-title'>{documentTitle}</h2>

            <div className='editDocs-inner'>
                <ReactQuill
                    className='react-quill'
                    value={docsDesc}
                    onChange={getQuillData}
                />
            </div>
        </div>
    )
}

import React, {useEffect, useRef, useState} from 'react';
import ModalComponent from './modal';
import {addDoc, collection, doc, onSnapshot} from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';

export default function Docs({database}) {
    const [open, setOpen] = React.useState(false);  // Create a state of open.
    const [title, setTitle] = useState('')  // Create a state of title.
    const handleOpen = () => setOpen(true);
    const collectionRef = collection(database, 'docsData')
    const isMounted = useRef()
    const [docsData, setDocsData] = useState([]);  // Create a state of docsData.
    const navigate = useNavigate();

    const addData = () => {
        addDoc(collectionRef, {
            title: title,
            docsDesc: ''
        })
            .then(() => {
                alert('Data Added');
                // handleClose()
            })
            .catch(() => {
                alert('Cannot add data')
            })
    }

    const getID = (id) => {
        navigate(`/editDocs/${id}`)
    }

    const getData = () => {
        onSnapshot(collectionRef, (data) => {
            setDocsData(data.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            }))
            console.log(data.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            }))
        })
    }

    useEffect(() => {
        if (isMounted.current) {
            return
        }

        isMounted.current = true;
        getData()
    }, [])

    return (
        <div className='docs-main'>
            <h1>Edit Your Docs</h1>

            <button className='add-docs' onClick={handleOpen}>
                Add a Document
            </button>

            <ModalComponent open={open} setOpen={setOpen} title={title} setTitle={setTitle} addData={addData}/>

            <div className='grid-main'>
                {docsData.map((doc) => {
                    return (
                        <div className='grid-child' key={doc.id} onClick={() => getID(doc.id)}>
                            <p>{doc.title}</p>
                            <div dangerouslySetInnerHTML={{__html: doc.docsDesc}}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

import React, { useRef, useState } from 'react'
import Model from '../model'
import './PuppyCard.css'

function PuppyCard({ puppy, data, setData }: { puppy: Model; data: Model[]; setData: React.Dispatch<React.SetStateAction<Model[]>> }) {
    const [displayBtn, setDisplayBtn] = useState<boolean>(false)
    const [enableEdit, setEnableEdit] = useState<boolean>(false)
    const breed = useRef<HTMLInputElement>(null)
    const name = useRef<HTMLInputElement>(null)
    const DOB = useRef<HTMLInputElement>(null)
    const doubleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setDisplayBtn(prev => !prev)
        setEnableEdit(false)
    }
    const deleteHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        await fetch(`http://localhost:8080/api/puppies/${puppy.id}`, {
            method: 'DELETE'
        });
        const copiedData = [...data]
        const requestedPuppy = copiedData.filter(pupp => pupp.id !==Number(puppy.id))
        setData(requestedPuppy)
        setDisplayBtn(prev => !prev)
        setEnableEdit(prev => !prev)
    };
    const editHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setEnableEdit(prev => !prev)
    }

    const saveHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const nameValue = name.current?.value
        const breedValue = breed.current?.value
        const DOBValue = DOB.current?.value
        await fetch(`http://localhost:8080/api/puppies/${puppy.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: nameValue, breed: breedValue, DOB: DOBValue })
        });

        const copiedData = [...data]
        const requestedPuppyId = copiedData.findIndex(pup => pup.id === Number(puppy.id))
        if (requestedPuppyId >= 0 && nameValue && breedValue && DOBValue) {
            copiedData[requestedPuppyId]!.name = nameValue;
            copiedData[requestedPuppyId]!.breed = breedValue;
            copiedData[requestedPuppyId]!.DOB = DOBValue;
        }
        console.log(copiedData)
        setData(copiedData)
        setDisplayBtn(prev => !prev)
        setEnableEdit(prev => !prev)
    }
    return (
        <article onDoubleClick={doubleClick} className='puppy-card'>
            <img className='puppy-image' src={puppy.img} alt="" />
            {enableEdit ? <input ref={name} type="text" className='info-input' defaultValue={puppy.name} /> : <h5 className='description'>{puppy.name}</h5>}
            {enableEdit ? <input ref={breed} type="text" className='info-input' defaultValue={puppy.breed} /> : <h5 className='description'>{puppy.breed}</h5>}
            {enableEdit ? <input ref={DOB} type="text" className='info-input' defaultValue={puppy.DOB} /> : <h5 className='description'>{puppy.DOB}</h5>}
            <div className="buttons-container">
                {displayBtn && !enableEdit ? <button onClick={editHandler} className='utility-button'>Update</button> : <div></div>}
                {displayBtn ? <button onClick={deleteHandler} className='utility-button'>Delete</button> : ''}
                {enableEdit ? <button onClick={saveHandler} className='utility-button'>Save</button> : ''}
            </div>
        </article>
    )
}

export default PuppyCard

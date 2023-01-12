import React, { useEffect, useRef, useState } from 'react'
import Model from '../model'
import './DisplayPuppies.css'
import PuppyCard from './PuppyCard';

function DisplayPuppies() {
    const [data, setData] = useState<Model[]>([]);
    const [filteredData, setfilteredData] = useState<Model[]>([])
    useEffect(() => {
        fetch('http://localhost:8080/puppies').then((res) => res.json()).then((result) =>
        setData(result))
    }, [])
    
    const searchedBreed = useRef<HTMLInputElement>(null);
    const handler = ():void => {
        if (typeof(searchedBreed.current?.value) === 'string') {
            const theValue = searchedBreed.current?.value
            setfilteredData(data?.filter(puppy => puppy.breed.toLowerCase().includes(theValue.toLowerCase())))
        }
        if(searchedBreed.current?.value === '') {
            filteredData.length = 0;
        }
        console.log(filteredData, searchedBreed.current?.value)
    }
    return (
        <main className='puppy-display'>
            <input className='input' ref={searchedBreed} onChange={handler} placeholder='Search for your next Puppy' />
            <section className='puppy-section'>
                {(filteredData.length < 1 ? data : filteredData)?.map((puppy) => {
                    return (
                        <PuppyCard key={puppy.id} puppy={puppy} setData={setData} data={data}/>
                    )
                })}
            </section>
        </main>
    )
}

export default DisplayPuppies

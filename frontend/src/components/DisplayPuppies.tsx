import React, { useEffect, useRef, useState } from 'react'
import Model from '../model'
import './DisplayPuppies.css'

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
        console.log(filteredData)
    }
    return (
        <main className='puppy-display'>
            <input className='input' ref={searchedBreed} onChange={handler} placeholder='Search for your next Puppy' />
            <section className='puppy-section'>
                {(filteredData.length < 1 ? data : filteredData)?.map((puppy) => {
                    return (
                        <article className='puppy-card'>
                            <img className='puppy-image' src={puppy.img} alt="" />
                            <h5 className='description'>{puppy.name} {filteredData.length}</h5>
                            <h5 className='description'>{puppy.breed}</h5>
                            <h5 className='description'>{puppy.DOB}</h5>
                        </article>
                    )
                })}
            </section>
        </main>
    )
}

export default DisplayPuppies

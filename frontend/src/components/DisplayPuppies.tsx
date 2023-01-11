import React from 'react'
import './DisplayPuppies.css'

function DisplayPuppies() {
  return (
   <main className='puppy-display'>
    <input className='input' placeholder='Search for your next Puppy'/>
    <section className='puppy-section'>
        <article className='puppy-card'>
            <img className='puppy-image' src="https://images.unsplash.com/photo-1526660690293-bcd32dc3b123?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
            <h5 className='description'>name</h5>
            <h5 className='description'>breed</h5>
            <h5 className='description'>date</h5>
        </article>
        <article className='puppy-card'>
            <img className='puppy-image' src="https://images.unsplash.com/photo-1526660690293-bcd32dc3b123?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
            <h5 className='description'>name</h5>
            <h5 className='description'>breed</h5>
            <h5 className='description'>date</h5>
        </article>
        <article className='puppy-card'>
            <img className='puppy-image' src="https://images.unsplash.com/photo-1526660690293-bcd32dc3b123?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
            <h5 className='description'>name</h5>
            <h5 className='description'>breed</h5>
            <h5 className='description'>date</h5>
        </article>
    </section>
   </main>
  )
}

export default DisplayPuppies

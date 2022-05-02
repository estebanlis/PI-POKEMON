import React from 'react'


export default function SearchBox({ input, handleChange, handleSubmit }) {


  return (
    <div className='boxSearch'>

      <form onSubmit={handleSubmit}>
        <input
          type='search'
          name='searchValue'
          value={input.name}
          onChange={(e) => handleChange(e)}
          placeholder='Name/Id'
          required>


        </input>
        <button className='button_find' type='submit'>Search</button>
      </form>

    </div>
  )
}

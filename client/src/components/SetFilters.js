import React from 'react'


export default function Filters({types,filters,setFilters, fsource, setFsource}) {


    const handleFilters = event => {

        if (event.target.value === 'PokApi') {
            setFilters({
                TypePok: 'todos',
                orderZA: false,
                orderAZ: false,
                orderDownAttack: false,
                orderUpAttack: false
            });
            setFsource({
                PokApi: event.target.checked,
                Todos: false,
                PokLocales: false

            });


        }

        if (event.target.value === 'PokLocales') {

            setFilters({
                TypePok: 'todos',
                orderZA: false,
                orderAZ: false,
                orderDownAttack: false,
                orderUpAttack: false
            });
            setFsource({
                PokLocales: event.target.checked,
                Todos: false,
                PokApi: false

            });
        }

        if (event.target.value === 'Todos') {

            setFilters({
                TypePok: 'todos',
                orderZA: false,
                orderAZ: false,
                orderDownAttack: false,
                orderUpAttack: false
            });
            setFsource({
                Todos: event.target.checked,
                PokLocales: false,
                PokApi: false

            });
        }

        if (event.target.value === 'orderUpAttack') {
            setFilters({
                ...filters,
                orderUpAttack: event.target.checked,
                orderZA: false,
                orderAZ: false,
                orderDownAttack: false,


            });
        }

        if (event.target.value === 'orderDownAttack') {
            setFilters({
                ...filters,
                orderDownAttack: event.target.checked,
                orderZA: false,
                orderAZ: false,

                orderUpAttack: false

            });
        }

        if (event.target.value === 'orderAZ') {
            setFilters({
                ...filters,
                orderAZ: event.target.checked,
                orderZA: false,
                orderDownAttack: false,
                orderUpAttack: false

            });
        }

        if (event.target.value === 'orderZA') {
            setFilters({
                ...filters,
                orderZA: event.target.checked,
                orderAZ: false,
                orderDownAttack: false,
                orderUpAttack: false
            });
        }

        if (event.target.name === 'TypePok') {
            setFilters({
                ...filters,
                TypePok: event.target.value,

            });
        }

    }

    
  return (
      <div className='filters'>
          <div className='fsource' style={{borderRight: "solid 1px #eee"}}>
              <span>All <input onChange={handleFilters} type='radio' name='filters' value='Todos' defaultChecked={fsource.Todos} /></span>
              <span>API <input onChange={handleFilters} type='radio' name='filters' value='PokApi' defaultChecked={fsource.PokApi} /></span>
              <span>Local <input onChange={handleFilters} type='radio' name='filters' value='PokLocales' defaultChecked={fsource.PokLocales} /></span>

          </div>

          <div className='fsource'>
              <span>aZ <input onChange={handleFilters} type='radio' name='filtersAZAttack' value='orderAZ' defaultChecked={filters.AZ} /></span>
              <span>zA <input onChange={handleFilters} type='radio' name='filtersAZAttack' value='orderZA' defaultChecked={filters.ZA} /></span>
              <span>Attack ++ <input onChange={handleFilters} type='radio' name='filtersAZAttack' value='orderUpAttack' defaultChecked={filters.orderUpAttack} /></span>
              <span>Attack -- <input onChange={handleFilters} type='radio' name='filtersAZAttack' value='orderDownAttack' defaultChecked={filters.orderDownAttack} /></span>
              <select style={{borderRadius: "5px",fontFamily: "sans-serif",fontSize: "12px",
              fontWeight: "600",padding: "3px 7px", }} 
              value={filters.TypePok} name='TypePok' onChange={handleFilters} id="selectType">
                  <option value='todos' >Tipos</option>
                  {types && types.map((t, index) => (
                      <option key={index} value={t.name}>{t.name}</option>
                  ))}
              </select>

          </div>
      </div>
  )
}

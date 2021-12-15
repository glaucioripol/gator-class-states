import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { useTransactionalState } from '~/services/transactional-state'

const TransactionalIndex = () => {
  const { data, isLoading, updateFilters } = useTransactionalState()

  if (isLoading) {
    return <h1>Loading....</h1>
  }

  return (
    <div>
      <Head>
        <title>Estado transacional</title>
      </Head>

      <div className='transactional-container'>

        <button onClick={() => updateFilters('status', 'dead')}>status</button>

        <button onClick={() => updateFilters('name', 'rick')}>name</button>

        <header>
          <h1>Estado transacional</h1>
        </header>

        <main className='main'>
          {data.map(character => (
            <section key={character.id} className='card'>
              <figure>
                <Image
                  src={character.image}
                  alt={character.name}
                  width='244px'
                  height='244px'
                />
              </figure>

              <h2 className='card__person-name'>{character.name}</h2>
              <p>
                <span className='card__person-attributes'>Status:</span> {character.status}
              </p>
              <p>
                <span className='card__person-attributes'>Specie:</span> {character.species}
              </p>
              <p>
                <span className='card__person-attributes'>Location:</span> {character.location?.name}
              </p>
              <p>
                <span className='card__person-attributes'>Gender:</span> {character.gender}
              </p>
            </section>
          ))}

        </main>
        <footer></footer>
      </div>

    </div >
  )
}

export default TransactionalIndex;

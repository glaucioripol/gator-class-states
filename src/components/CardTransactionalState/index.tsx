import React, { FC } from 'react'
import Image from 'next/image'

import { CharacterData } from '~/services/transactional-state'

type Props = { character: CharacterData }
export const CardTransactionalState: FC<Props> = ({ character }) => (
  <section className='card'>
    <figure className='card-image'>
      <Image
        src={character.image}
        alt={character.name}
        width='300px'
        height='300px'
        loading='lazy'
      />
    </figure>

    <figcaption className='content'>

      <h2 className='title is-4'>{character.name}</h2>

      <p className='subtitle is-6'>
        <span className='has-text-weight-bold'>Status:</span> {character.status}
      </p>
      <p className='subtitle is-6'>
        <span className='has-text-weight-bold'>Specie:</span> {character.species}
      </p>
      <p className='subtitle is-6'>
        <span className='has-text-weight-bold'>Location:</span> {character.location?.name}
      </p>
      <p className='subtitle is-6'>
        <span className='has-text-weight-bold'>Gender:</span> {character.gender}
      </p>
    </figcaption>

  </section>
)
import { FormEvent, useEffect, useState } from 'react'
import Head from 'next/head'

import { useTransactionalState } from '~/services/transactional-state'
import { CardTransactionalState } from '~/components'

const TransactionalIndex = () => {
  const [searchByName, setSearchByName] = useState('')
  const { data, info, queryStrings, isLoading, updateFilters } = useTransactionalState()

  useEffect(() => {
    if (queryStrings?.name) {
      setSearchByName(queryStrings?.name)
    }
  }, [queryStrings?.name])

  const handleSearchByName = (event: FormEvent) => {
    event.preventDefault()
    updateFilters('name', searchByName)
  }
  const handleChangeSearchByName = (event: FormEvent) => {
    setSearchByName((event.target as HTMLInputElement).value)
  }

  const getCurrentPage = () => queryStrings?.page ? +queryStrings?.page : 1
  const paginate = (page: number) => updateFilters('page', page)
  const handlePreviousPage = () => paginate(getCurrentPage() - 1)
  const handleNextPage = () => paginate(getCurrentPage() + 1)

  return (
    <div>
      <Head>
        <title>Estado transacional</title>
      </Head>

      <div className='container'>

        <header className='header'>
          <h1 className='title is-3'>Transactional State</h1>

          <form className='search-form' onSubmit={handleSearchByName}>
            <fieldset className="field">
              <div className={`control is-medium ${isLoading && 'is-loading'}`}>
                <input
                  className="input is-info is-medium"
                  name='searchByName'
                  placeholder="Search by name"
                  onChange={handleChangeSearchByName}
                  value={searchByName}
                  disabled={isLoading}
                />
              </div>
            </fieldset>

            <button
              className="button is-info is-medium is-outlined"
              disabled={isLoading}
              type='submit'
            >
              search
            </button>
          </form>
        </header>


        <main className='main'>
          {data.map(character =>
            <CardTransactionalState
              key={character.id}
              character={character}
            />
          )}
        </main>

        <footer>
          <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
            <button
              className="pagination-previous"
              disabled={!info.prev}
              onClick={handlePreviousPage}
            >
              Previous
            </button>

            <button
              className="pagination-next"
              disabled={!info.next}
              onClick={handleNextPage}
            >
              Next page
            </button>
          </nav>
        </footer>
      </div >

    </div >
  )
}

export default TransactionalIndex;

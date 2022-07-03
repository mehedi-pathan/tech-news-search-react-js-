import { FcSearch } from 'react-icons/fc'
import { useGlobalContext } from './Context'

const Search = () => {
  const { query, searchPost } = useGlobalContext()
  return (
    <>
      <h1>Technology News</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='search_box'>
          <span><FcSearch/></span>
          <input
            type="text"
            placeholder="Search Here"
            value={query}
            onChange={(e) => searchPost(e.target.value)}
          />
        </div>
      </form>
    </>
  )
}

export default Search
import { useGlobalContext } from "./Context"

const Stories = () => {
  const { hits, isLoading, removePost } = useGlobalContext()

  if (isLoading) {
    return (
      <>
        <h2>Loading....</h2>
      </>
    )
  }

  return (
    <div>
      <div className="stories_div">
        .{hits.map((currentPost) => {
          const { title, author, objectID, url, num_comments } = currentPost
          return (
            <div className="card" key={objectID}>
              <h2>{title}</h2>
              <p>
                By <span>{author}</span> | <span> {num_comments} </span>Comments
              </p>
              <div className="card-button" target="_blank">
                <a href={url}>Read More</a>
                <a href="#" onClick={() => removePost(objectID)}>
                  Remove
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Stories
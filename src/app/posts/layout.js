
function PostsLayout({ children }) {
  return (
    <section className="container mx-auto my-16 text-left">
    <div class=" bg-zinc-50 p-6 rounded-lg shadow-lg">
      {children}
    </div>
  </section>
  )
}

export default PostsLayout
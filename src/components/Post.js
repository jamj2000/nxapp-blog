

function post({ children, post }) {
    return (
        <div className='p-4 rounded-md hover:shadow-md' >
            <p><strong>{post.author}</strong></p>
            <p><strong>{post.title}</strong></p>
            <p><strong>{new Date(post.created).toLocaleString()}</strong></p>
            
            {children}
        </div>
    )
}

export default post
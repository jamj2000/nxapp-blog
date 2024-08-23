

function category({ children, category }) {
    return (
        <div className='p-4 rounded-md hover:shadow-md' >
            <p><strong>{category.name}</strong></p>
            <p><strong>{category.slug}</strong></p>
            
            {children}
        </div>
    )
}

export default category
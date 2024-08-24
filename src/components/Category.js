import Link from "next/link"


function category({ children, category }) {
    return (
        <div className='flex justify-between p-4 rounded-md hover:shadow-md' >
            <Link href={`/categories/${category.slug}`} className="text-left"> <strong>{category.name}</strong> </Link>
            {/* <p className="justify-start"><strong>{category.name}</strong></p> */}
            {/* <p><strong>{category.slug}</strong></p> */}
            {children}
        </div>
    )
}

export default category
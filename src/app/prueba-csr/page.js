'use client'
import { useState, useEffect, useActionState } from "react";


function Page() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        // fetch('https://dummyjson.com/products')
        //     .then(res => res.json())
        //     .then(data => setProducts(data.products));

        const fetchData = async () => {
            const res = await fetch('https://dummyjson.com/products')
            const data = await res.json()

            setProducts(data.products)
        }
        fetchData()

    }, [])


    return (
        <>
            <ul>
                {
                    products.map(product => (
                        <li key={product.id} className="py-20 text-center">
                            <img src={product.thumbnail} alt="foto" className="mx-auto" />
                            <b>{product.title}:</b> {product.price} € (descuento {product.discountPercentage}% )
                            =&gt; {(product.price * (1 - product.discountPercentage / 100)).toFixed(2)} €
                        </li>
                    ))

                }
            </ul>
        </>
    )
}

export default Page  

function CategoriesLayout ({ children }) {
  return (
      <section className="container mx-auto my-16 text-center ">
        <h1 className="text-3xl font-bold mb-4">Categorías</h1>
        <div class=" bg-zinc-50 p-6 rounded-lg shadow-lg">
          {children}
        </div>
      </section>
  )
}

export default CategoriesLayout
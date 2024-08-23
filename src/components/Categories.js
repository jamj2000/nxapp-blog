import { getPost, getCategories } from '@/lib/actions';

async function Categories({ postId, disabled }) {
    // Variables para almacenar la categoría seleccionada y las categorías
    const categories = await getCategories();
   
    let post = null;
    let selectedCategories =[];

    if (postId) {
        post = await getPost(postId)
        selectedCategories = post.categories.map(cat => cat.id);
    }

    return (
        <fieldset disabled={disabled}>
            <legend><h1>Categorias</h1></legend>
            {categories.map((category) => {
                const idCat = `cat${category.id}`;
                return (
                    <div key={category.id}>
                        <label htmlFor={idCat}>
                            <input type='checkbox' id={idCat} name={category.id.toString()} value={category.id} 
                                defaultChecked={selectedCategories.includes(category.id)} />
                            {category.name}
                        </label>
                    </div>
                );
            })}
        </fieldset>
    );
}

export default Categories;


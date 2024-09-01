import { getPost, getCategories } from '@/lib/actions';

async function Categories({ postId, disabled }) {
    // Variables para almacenar la categoría seleccionada y las categorías
    const categories = await getCategories();

    let post = null;
    let selectedCategories = [];

    if (postId) {
        post = await getPost(postId)
        selectedCategories = post.categories.map(cat => cat.id);
    }

    return (
        <fieldset disabled={disabled}>
            <p className='text-base font-bold'>Categorías</p>
            <div className='flex flex-wrap gap-1'>
            {categories.map((category) => (
                <label key={category.id}>
                    <input
                        className='hidden peer'
                        type='checkbox'
                        name={category.id.toString()}
                        value={category.id}
                        defaultChecked={selectedCategories.includes(category.id)} />
                    <p className='text-xs text-white bg-slate-400 peer-checked:bg-blue-400 w-fit px-4 py-2 rounded-full'>
                        {category.name}
                    </p>
                </label>
            ))}
            </div>
        </fieldset>
    );
}

export default Categories;


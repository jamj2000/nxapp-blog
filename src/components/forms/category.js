import Button from "../button-form"

function Form({ action, title, category, disabled }) {

    return (
        <form action={action} >
            <input type='hidden' name='id' value={category?.id} />
            <fieldset disabled={disabled}>
                <label htmlFor='name'>name</label>
                <input type='text' id='name' name='name'
                    placeholder='name'
                    defaultValue={category?.name} autoFocus ></input>
                <label htmlFor='slug'>slug</label>
                <input type='text' id='slug' name='slug'
                    placeholder='slug'
                    defaultValue={category?.slug} />
            </fieldset>
            <Button title={title} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700 hover:text-gray-100" />
             {/* <button type='submit' className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700 hover:text-gray-100">{title}</button> */}

        </form>
    )
}

export default Form
function Check({ id, name, defaultChecked }) {
    return (
        <label className="checkbox-label px-2 py-1 text-gray-500 rounded-full peer-checked:bg-gray-500 peer-checked:text-gray-100 " >
            {/* la clase checkbox-label la hemos definido en el archivo globals.css*/}
            <input
                id={id}
                type="checkbox"
                name={id}
                value={id}
                defaultChecked={defaultChecked}
                className='hidden' />
            {name}
        </label >
    );
}

export default Check;
function Check2({ id, defaultChecked, label, className }) {
    return (
        <label className={className} >
            <input
                type="checkbox"
                id={id}
                name={id}
                value={id}
                defaultChecked={defaultChecked}
                className='hidden' />
            {label}
        </label >
    );
}

export default Check2;
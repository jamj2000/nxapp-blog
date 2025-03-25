'use client'

import { useState } from "react";
import { MoonLoader } from "react-spinners";


// const styles = {
//     display: "block",
//     margin: "0 auto",
// };

function Spinner({ size, color }) {
    let [loading, setLoading] = useState(true);

    return (
        // <RingLoader
        <MoonLoader
            color={color || 'currentcolor'}
            size={size || 32}
            loading={loading}
            // cssOverride={styles}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
}

export default Spinner;
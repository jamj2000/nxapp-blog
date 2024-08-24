'use client'

import { useState } from "react";
import RingLoader from "react-spinners/RingLoader";

const styles = {
    display: "block",
    margin: "0 auto",
};

function Spinner() {
    let [loading, setLoading] = useState(true);

    return (
        <RingLoader
            color={'blue'}
            loading={loading}
            cssOverride={styles}
            size={32}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
}

export default Spinner;
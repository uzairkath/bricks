import {useLocation} from "react-router-dom";
import {useMemo} from "react";

export default function useQueryParams() {
    const location = useLocation()
    const params = new URLSearchParams(location.search);

    return useMemo(
        () => {
            const values = Object.fromEntries(params)
            return {values, params};
        },
        [location],
    )
}
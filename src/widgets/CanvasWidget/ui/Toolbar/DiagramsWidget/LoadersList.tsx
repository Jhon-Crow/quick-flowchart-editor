import {Loader} from "@/shared/Button";

export const LoadersList = ({loadings}: { loadings: Array<{ loading: boolean, color: string }> }) => {
    return (
        <>
            {
                loadings.map(
                    ({loading, color}) => loading && <Loader style={{borderTopColor: color, marginLeft: '1rem'}} size={"lg"}/>
                )}

        </>
    );
};
import {Loader} from "@/shared/Button";

export const LoadersList = ({loadings}: { loadings: Array<{ loading: boolean, color: string }> }) => {
    return (
        <>
            {
                loadings.map(
                    ({loading, color}, index) => loading && <Loader key={index + color + 'loaderlist-item'} style={{borderTopColor: color, marginLeft: '1rem'}} size={"lg"}/>
                )}

        </>
    );
};
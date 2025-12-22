import type {ErrorLike} from "@apollo/client";

export const ErrorsList = ({errors}: { errors: Array<ErrorLike | undefined> }) => {
    return (
        <>
            {
                errors.map(
                    ( error, index ) => error?.message ?
                        <p key={index + error.message + 'errorlist-item'} style={{color: 'red'}}>{error.message}</p>
                        : null
                )
            }
        </>
    );
};
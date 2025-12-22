import type {ErrorLike} from "@apollo/client";

export const ErrorsList = ({errors}: { errors: Array<ErrorLike | undefined> }) => {
    return (
        <>
            {
                errors.map(
                    error => error?.message ?
                        <p style={{color: 'red'}}>{error.message}</p>
                        : null
                )
            }
        </>
    );
};
import styled from 'styled-components';
import {useQuery} from "@apollo/client/react";
import {ALL_DIAGRAMS} from "@/shared/api/apollo/queries.ts";
import {Loader} from "@/shared/Button/ui/Button/styles.ts";
import {Button} from "@/shared/Button";

const DiagramsWidgetContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  right: 2rem;
  bottom: 2rem;
  z-index: 999;
`;

export const DiagramsWidget = () => {
    const {data, error, loading} = useQuery(ALL_DIAGRAMS);
    return (
        <DiagramsWidgetContainer>
            {loading && <Loader style={{borderTopColor: 'red'}} size={"lg"}/>}
            {error && <p style={{color: 'red'}}>{error.message}</p>}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: '.2rem'
            }}>
                {data && data?.allDiagrams.map((diagram) =>
                    (<div>
                        <Button key={diagram.title + 'del' + diagram.id} variant={'danger'} size={"md"}>del</Button>
                        <Button key={diagram.id + 'diagram' + diagram.title}>
                            {diagram.title}
                        </Button>
                    </div>)
                )}
            </div>
            <Button variant={'secondary'}>Save Diagram in DB</Button>
        </DiagramsWidgetContainer>
    );
};
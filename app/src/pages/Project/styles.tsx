import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color-neutral-dark);
    margin-top: 2.5%;
    padding-bottom: 64px;
`;

export const NewProjectContainer = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 55px;
    width: 80%;
`;

export const Title = styled.h1`
    margin: 0;
`;

export const Subtitle = styled.h4`
    margin: 0;
`;

export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: 300px 300px 300px;
    gap: 16px;
    flex-direction: row;
`;

export const ButtonContainer = styled.div`
    display: flex; 
    flex-direction: row;
    margin-top: 32px; 
`;
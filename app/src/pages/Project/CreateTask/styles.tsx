import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 60vw;
    min-height: 10vw;
    position: absolute;
    top: 10%;
    left: 20%;
    padding: 40px;
    text-align: center;
`;

export const FieldContainer = styled.form`
    min-width: 300; 
    margin-bottom: 16px;
`;

export const Title = styled.h1`
    margin-bottom: 24px;
`;

export const Subtitle = styled.h4`
    margin: 0;
    margin-bottom: 16px;
`;
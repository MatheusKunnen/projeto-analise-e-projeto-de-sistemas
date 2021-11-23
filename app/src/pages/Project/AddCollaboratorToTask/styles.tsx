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
    padding: 40px 0;
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
    margin-top: 16px;
`;
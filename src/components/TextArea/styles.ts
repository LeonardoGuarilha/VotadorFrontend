import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;
  /* margin-bottom: 10px; */
  margin-top: 10px;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  textarea {
    background: transparent;
    flex: 1;
    border: 0;
    color: #f4ede8;
  }

  svg {
    margin-right: 16px;
  }
`;

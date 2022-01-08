import styled from 'styled-components';

const Container = styled.div`
  background-color: #e8eaed;
  color: #3c4043;
  font-size: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Error = ({ message, className }) =>
  <Container className={className}>
    <span>{message}</span>
  </Container>;

export default Error;
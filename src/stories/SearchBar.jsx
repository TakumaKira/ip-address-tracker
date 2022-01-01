import styled from 'styled-components';
import config from '../config.json';
import iconArrow from './assets/icon-arrow.svg';

const Container = styled.div`
  height: 58px;
  @media screen and (max-width: 1120px) {
    width: 327px;
  }
  @media screen and (min-width: 1120px) {
    width: 1110px;
  }
  border-radius: 15px;
  overflow: hidden;

  display: flex;
`;

const Input = styled.input.attrs(props => ({
  type: 'text',
  placeholder: config.labels.PLACEHOLDER
}))`
  flex-grow: 1;
  color: #2C2C2C;
  padding-left: 24px;
  &::placeholder {
    opacity: 0.5;
    @media screen and (max-width: 1120px) {
      font-size: 14px;
    }
  }
`;

const Button = styled.button`
  width: 58px;
  background-color: hsl(0, 0%, 17%);
  &:hover {
    background-color: hsl(0, 0%, 59%);
  }
`;

const Icon = styled.img.attrs(props => ({
  src: iconArrow
}))``;

const SearchBar = () => (
  <Container>
    <Input />
    <Button>
      <Icon />
    </Button>
  </Container>
);

export default SearchBar;
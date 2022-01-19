import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import config from '../config.json';
import getLocation from '../services/location';
import iconArrow from './assets/icon-arrow.svg';

const Container = styled.div`
  height: 58px;
  @media screen and (max-width: ${config.responsiveSplitWidth - 1}px) {
    width: 327px;
  }
  @media screen and (min-width: ${config.responsiveSplitWidth}px) {
    width: 555px;
  }
  border-radius: 15px;
  overflow: hidden;

  display: flex;
`;

const BgContainer = styled.div`
  height: 100%;
  flex-grow: 1;
  min-width: 0;
  background-color: #FFFFFF;

  display: flex;
  align-items: center;
`;

const Input = styled.input.attrs(props => ({
  type: 'text',
  placeholder: config.labels.PLACEHOLDER
}))`
  flex-grow: 1;
  min-width: 0;
  color: #2C2C2C;
  padding-left: 24px;
  &::placeholder {
    opacity: 0.5;
    @media screen and (max-width: ${config.responsiveSplitWidth - 1}px) {
      font-size: 14px;
    }
  }
`;

const Error = styled.span`
  color: red;
  margin-right: 10px;
  white-space: nowrap;
`;

const Button = styled.button.attrs(props => ({
  ariaLabel: 'Search',
}))`
  flex-shrink: 0;
  width: 58px;
  height: 100%;
  background-color: hsl(0, 0%, 17%);
  &:hover {
    background-color: hsl(0, 0%, 59%);
  }
`;

const Icon = styled.img.attrs(props => ({
  src: iconArrow,
  alt: 'arrow icon',
}))``;

const SearchBar = (props) => {
  const {
    setLocation,
    setLocationError,
    setMapError,
    className,
  } = props;

  const [inputValue, setInputValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleInput = e => {
    setErrorMessage('');
    setInputValue(e.target.value);
  };
  const handleSearch = async () => {
    setMapError(false);
    if (!inputValue) {
      return;
    }
    try {
      const newLocation = await getLocation(inputValue);
      setLocation(newLocation);
      setLocationError(false);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Container
      className={className}
      data-cy="searchBar"
    >
      <BgContainer>
        <Input
          onChange={handleInput}
          onKeyUp={e => e.key === 'Enter' && handleSearch()}
        />
        {errorMessage && <Error>{errorMessage}</Error>}
      </BgContainer>
      <Button
        onClick={handleSearch}
        data-cy="submit"
      >
        <Icon />
      </Button>
    </Container>
  )
};

SearchBar.propTypes = {
  setLocation: PropTypes.func,
  setLocationError: PropTypes.func,
  setMapError: PropTypes.func,
  className: PropTypes.string,
}

export default SearchBar;
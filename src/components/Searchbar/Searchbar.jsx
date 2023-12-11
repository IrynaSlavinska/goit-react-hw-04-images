import Notiflix from 'notiflix';

import { CiSearch } from 'react-icons/ci';
import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { useState } from 'react';

Notiflix.Notify.init({
  position: 'right-top',
  timeout: 5000,
});

const SearchBarForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      return Notiflix.Notify.failure('Enter something and try again.');
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleFormSubmit}>
        <SearchFormButton type="submit">
          <CiSearch /> Search
        </SearchFormButton>

        <SearchFormInput
          type="text"
          name="query"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleQueryChange}
        />
      </SearchForm>
    </SearchBar>
  );
};

export default SearchBarForm;

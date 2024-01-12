import React from 'react';
import Select from 'react-select';

const starOptions = [
  { value: "", label: 'Choose' },
  { value: 1, label: '1 ⭐' },
  { value: 2, label: '2 ⭐' },
  { value: 3, label: '3 ⭐' },
  { value: 4, label: '4 ⭐' },
  { value: 5, label: '5 ⭐' },
];

const StarRatingSelect = ({ value, onChange }) => {
  const handleChange = (selectedOption) => {
    onChange(selectedOption);
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      options={starOptions}
      isSearchable={false}
    />
  );
};

export default StarRatingSelect;

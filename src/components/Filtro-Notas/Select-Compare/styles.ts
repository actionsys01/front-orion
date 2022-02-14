import styled from 'styled-components';
import SelectCompare from '.';

export const SelectCustom = styled(SelectCompare).attrs(props => ({
  styles: {
    menu: provided => ({
      ...provided,
      backgroundColor: '#fff',
      fontSize: 12,
      textAlign: 'left',
      color: '#1C496A',
    }),
    control: () => ({
      borderColor: props.theme.palette.foreground,
      '&:hover': {
        borderColor: props.theme.palette.foreground,
      },
      border: `1px solid ${props.theme.palette.foreground}`,
      boxShadow: 'none',
      backgroundColor: '#fff',
      fontSize: 12,
      height: 28,
      display: 'flex',
      borderRadius: 5,
      cursor: 'pointer',
      color: '#1C496A',
    }),

    placeholder: provided => ({
      ...provided,
      color: '#1C496A',
      fontSize: 12,
    }),
    option: provided => ({
      ...provided,
      zIndex: 1010,
      cursor: 'pointer',
      color: '#1C496A',
      backgroundColor: '#fff',
      '&:hover': {
        backgroundColor: '#1C496A',
        color: '#fff',
      },
    }),
    input: provided => ({
      ...provided,
      color: '#1C496A',
    }),

    dropdownIndicator: provided => ({
      ...provided,
      color: '#1C496A',
      '&:hover': {
        color: '#1C496A',
      },
    }),
    singleValue: provided => ({
      ...provided,
      color: '#1C496A',
    }),
  },
  isSearchable: false,
  noOptionsMessage: () => 'Nenhum registro',
  name: props.name,
  options: props.options,
  components: {
    IndicatorSeparator: () => null,
  },
  // defaultValue: props.options[0],
}))``;

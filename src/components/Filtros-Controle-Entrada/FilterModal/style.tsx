import Select from '@components/Filtros-Controle-Entrada/Select-Control';
import styled from 'styled-components';

export const CustomSelect = styled(Select).attrs(props => ({
  styles: {
    menu: provided => ({
      ...provided,
      backgroundColor: props.theme.palette.foreground,
      fontSize: 12,
      textAlign: 'left',
      color: '#fff',
    }),
    control: provided => ({
      borderColor: props.theme.palette.foreground,
      '&:hover': {
        borderColor: props.theme.palette.foreground,
      },
      border: `1px solid ${props.theme.palette.foreground}`,
      boxShadow: 'none',
      backgroundColor: props.theme.palette.foreground,
      fontSize: 12,
      height: 24,
      display: 'flex',
      borderRadius: 5,
      cursor: 'pointer',
      color: '#fff',
    }),

    placeholder: provided => ({
      ...provided,
      color: '#fff',
      fontSize: 12,
    }),
    option: provided => ({
      ...provided,
      zIndex: 1010,
      backgroundColor: props.theme.palette.foreground,
      '&:hover': {
        backgroundColor: props.theme.palette.foreground,
      },
    }),
    input: provided => ({
      ...provided,
      color: '#fff',
    }),

    dropdownIndicator: provided => ({
      ...provided,
      color: '#fff',
      '&:hover': {
        color: '#fff',
      },
    }),
    singleValue: provided => ({
      ...provided,
      color: '#fff',
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

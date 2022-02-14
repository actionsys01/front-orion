import styled from 'styled-components';
import { X } from '@geist-ui/react-icons';
import MaskedInputDate from '@components/Masked-Input-Date';
import { Scope } from '@unform/core';
import Select from '../Filtro-Components/Select';
import SelectCompare from '../Select-Compare';
import Input from '../Filtro-Components/Input-Basic';

export const Container = styled(Scope)`

`;

export const SelectCustomizado = styled(Select).attrs(props => ({
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
      height: 28,
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



export const CustomDateMask = styled(MaskedInputDate)`
  font-size: 12px;
  /* padding: 10px; */
  border-radius: 5px;
  border: ${props => `1px solid  ${props.theme.palette.foreground}`};
  background-color: ${props => props.theme.palette.foreground};
  height: 28px;
  color: #fff;
  /* padding-inline-start: 18px; */
  text-align: center;
`;

export const InputCustomizado = styled(Input)`
  font-size: 12px;
  /* padding: 10px; */
  border-radius: 5px;
  border: ${props => `1px solid  ${props.theme.palette.foreground}`};
  background-color: ${props => props.theme.palette.foreground};
  height: 24px;
  color: #fff;
`;

export const BotaoRemover = styled(X)`
  cursor: pointer;
`;
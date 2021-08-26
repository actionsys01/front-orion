import { X } from "@geist-ui/react-icons";
import styled from "styled-components";
import Input from "../Input";
import Select from "../Select";

interface IModal {
  visivel: boolean;
}
export const Modal = styled.div<IModal>`
  background-color: #fff;
  padding: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 500px;
  max-height: 500px;
  width: auto;
  max-width: 100%;
  display: ${({ visivel }) => (visivel ? "block" : "none")};
  border-radius: 5px;
  z-index: 1010;
  overflow-y: auto;
`;

export const ModalBackground = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ContainerFiltro = styled.div`
  display: grid;
  gap: 5px;
  margin-top: 0.5rem;
  grid-template-columns: 150px 150px 20px;
  justify-content: center;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

export const InputCustomizado = styled(Input)`
  font-size: 12px;
  padding: 10px;
  border-radius: 5px;
  border: ${(props) => `1px solid  ${props.theme.palette.foreground}`};
  background-color: ${(props) => props.theme.palette.foreground};
  height: 24px;
  color: #fff;
`;
export const BotaoRemover = styled(X)`
  cursor: pointer;
`;
export const BotaoIncluir = styled.button`
  font-size: 10px;
  font-weight: bold;
  align-items: fle;
  background-color: transparent;
  justify-content: center;
  display: flex;
  border-width: 0;
  cursor: pointer;

  text {
    margin-left: 5px;
  }
`;

interface ISelect {
  name: string;
  options: [];
}

export const SelectCustomizado = styled(Select).attrs((props) => ({
  styles: {
    menu: (provided) => ({
      ...provided,
      backgroundColor: props.theme.palette.foreground,
      fontSize: 12,
      textAlign: "left",
      color: "#fff",
    }),
    control: (provided) => ({
      borderColor: props.theme.palette.foreground,
      "&:hover": {
        borderColor: props.theme.palette.foreground,
      },
      border: `1px solid ${props.theme.palette.foreground}`,
      boxShadow: "none",
      backgroundColor: props.theme.palette.foreground,
      fontSize: 12,
      height: 24,
      display: "flex",
      borderRadius: 5,
      cursor: "pointer",
      color: "#fff",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "#fff",
      fontSize: 12,
    }),
    option: (provided) => ({
      ...provided,
      zIndex: 1010,
      backgroundColor: props.theme.palette.foreground,
      "&:hover": {
        backgroundColor: props.theme.palette.foreground,
      },
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#fff",
      "&:hover": {
        color: "#fff",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
  },
  isSearchable: false,
  noOptionsMessage: () => "Nenhum registro",
  name: props.name,
  options: props.options,
  components: {
    IndicatorSeparator: () => null,
  },
  defaultValue: props.options[0],
}))``;

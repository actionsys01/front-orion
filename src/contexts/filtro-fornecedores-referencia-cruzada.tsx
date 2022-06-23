import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { createContext } from 'react';
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react';
import colunas from '@utils/filtros/colunas/controle-pessoas-filtro-ref-cruzada'


interface IUnformCompare {
    campo: string;
    valor: string | number;
    compare: string;
}


interface IFilter {
    dadosFornecedores: IUnformCompare[];
    cadastrarFornecedores(fitro: IUnformCompare[]): void;
    scopeIgnition(filtro: IUnformCompare[]): IUnformCompare[];
    scopeIgnitionCompare(filtro: IUnformCompare[]): IUnformCompare[];
    limpar(): void;
}

interface IFiltroProps {
    children: ReactNode;
}

export const FiltroFornecedoresDadosContext = createContext({} as IFilter);

export function useFiltro() {
    return useContext(FiltroFornecedoresDadosContext);
}

export default function FiltroContextProvider({ children }: IFiltroProps) {
    const [dadosFornecedores, setDadosFornecedores] = useState<IUnformCompare[]>([]);
    useEffect(() => {
        async function carregarStorage() {
        const FornecedoresStorage = localStorage.getItem('@orion:fornecedores');
        if (FornecedoresStorage) {
            setDadosFornecedores(JSON.parse(FornecedoresStorage));
        }
        }
        carregarStorage();
    }, []);
    
    function cadastrarFornecedores(dados: IUnformCompare[]) {
        setDadosFornecedores(dados);
        localStorage.setItem('@orion:fornecedores', JSON.stringify(dados));
    }


    function scopeIgnition(array: IUnformCompare[]): IUnformCompare[] {
        const filtro = array.map(({ campo, valor, compare }) => {
        const coluna = colunas.find(option => option.value === campo);
        if (coluna) {
            return { campo, valor, compare };
        }
        });
    
        return filtro;
    }

    function scopeIgnitionCompare(array: IUnformCompare[]): IUnformCompare[] {
        const filtro = array.map(({ campo, valor, compare }) => {
        const coluna = colunas.find(option => option.value === campo);
        if (coluna) {
            return { campo, valor, compare };
        }
        });
    
        return filtro;
    }

    async function limpar() {
        localStorage.setItem('@orion:fornecedores', JSON.stringify([]));
    }
    
    return (
        <FiltroFornecedoresDadosContext.Provider
            value={{
                dadosFornecedores,
                cadastrarFornecedores,
                scopeIgnition,
                scopeIgnitionCompare,
                limpar
                
            }}
        >
        {children}
        </FiltroFornecedoresDadosContext.Provider>
    );
    }


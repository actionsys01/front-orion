import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { createContext } from 'react';
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react';
import colunas from '@utils/filtros/colunas/controle-regras-busca'


interface IUnformCompare {
    campo: string;
    valor: string | number;
    compare: string;
}


interface IFilter {
    dadosRegrasBusca: IUnformCompare[];
    cadastrarRegrasBusca(fitro: IUnformCompare[]): void;
    scopeIgnition(filtro: IUnformCompare[]): IUnformCompare[];
    scopeIgnitionCompare(filtro: IUnformCompare[]): IUnformCompare[];
    limpar(): void;
}

interface IFiltroProps {
    children: ReactNode;
}

export const FiltroRegrasBuscaDadosContext = createContext({} as IFilter);

export function useFiltro() {
    return useContext(FiltroRegrasBuscaDadosContext);
}

export default function FiltroContextProvider({ children }: IFiltroProps) {
    const [dadosRegrasBusca, setDadosRegrasBusca] = useState<IUnformCompare[]>([]);
    useEffect(() => {
        async function carregarStorage() {
        const RegrasBuscaStorage = localStorage.getItem('@orion:regrasBusca');
        if (RegrasBuscaStorage) {
            setDadosRegrasBusca(JSON.parse(RegrasBuscaStorage));
        }
        }
        carregarStorage();
    }, []);
    
    function cadastrarRegrasBusca(dados: IUnformCompare[]) {
        setDadosRegrasBusca(dados);
        localStorage.setItem('@orion:regrasBusca', JSON.stringify(dados));
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
        localStorage.setItem('@orion:regrasBusca', JSON.stringify([]));
    }
    
    return (
        <FiltroRegrasBuscaDadosContext.Provider
            value={{
                dadosRegrasBusca,
                cadastrarRegrasBusca,
                scopeIgnition,
                scopeIgnitionCompare,
                limpar
                
            }}
        >
        {children}
        </FiltroRegrasBuscaDadosContext.Provider>
    );
    }


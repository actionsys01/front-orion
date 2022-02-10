import { useEffect} from 'react';
import { useContext, useState } from 'react';
import { createContext } from 'react';
import nfse_colunas from '@utils/controle-nfse-filtros';
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react';


interface IUnformCompare {
    campo: string;
    valor: string;
    compare: string;
}

interface FiltroContextType {
    nfes: IUnformCompare[];
    ctes: IUnformCompare[];
    nfses: IUnformCompare[];
    cadastrarNfe(nfes: IUnformCompare[]): void;
    cadastrarCte(ctes: IUnformCompare[]): void;
    cadastrarNfse(nfses: IUnformCompare[]): void;
    scopeIgnitionCompare(filtro: IUnformCompare[]): IUnformCompare[];
    limpar(): void;
}

interface IFiltroProps {
    children: ReactNode;
}

export const FiltroContext = createContext({} as FiltroContextType);

export function useFiltro() {
    return useContext(FiltroContext);
}

export default function FiltroProvider({ children }: IFiltroProps) {
    const [nfes, setNfes] = useState<IUnformCompare[]>([]);
    const [ctes, setCtes] = useState<IUnformCompare[]>([]);
    const [nfses, setNfses] = useState<IUnformCompare[]>([]);

    useEffect(() => {
        async function carregarStorage() {
            const nfesStorage = localStorage.getItem('@orions:nfes');
            const ctesStorage = localStorage.getItem('@orion:ctes');
            const nfsesStorage = localStorage.getItem('@orions:nfses');
            if (nfesStorage) setNfes(JSON.parse(nfesStorage));
            if (ctesStorage) setCtes(JSON.parse(ctesStorage));
            if (nfsesStorage) setNfses(JSON.parse(nfsesStorage));
        }

        carregarStorage();
    }, []);

    // useEffect(() => {

    //   console.log("FILTRO" , nfes)

    // }, [nfes])

    function cadastrarNfe(nfes: IUnformCompare[]) {
        setNfes(nfes);
        localStorage.setItem('@orions:nfes', JSON.stringify(nfes));
    }

    function cadastrarCte(ctes: IUnformCompare[]) {
        setCtes(ctes);
        localStorage.setItem('@orion:ctes', JSON.stringify(ctes));
    }

    function cadastrarNfse(nfses: IUnformCompare[]) {
        setNfses(nfses);
        localStorage.setItem('@orions:nfses', JSON.stringify(nfses));
    }


    function scopeIgnitionCompare(array: IUnformCompare[]): IUnformCompare[] {
        console.log('array', array);
        const filtro = array.map(({ campo, valor, compare }) => {
            const coluna = nfse_colunas.find(option => option.value === campo);
            if (coluna) {
                return { campo, valor, compare };
            }
        });

        return filtro;
    }

    async function limpar() {
        localStorage.setItem('@orion:ctes', JSON.stringify([]));
        localStorage.setItem('@orions:nfes', JSON.stringify([]));
        localStorage.setItem('@orions:nfses', JSON.stringify([]));
    }

    return (
        <FiltroContext.Provider
            value={{
                nfes,
                ctes,
                nfses,
                cadastrarCte,
                cadastrarNfe,
                cadastrarNfse,
                scopeIgnitionCompare,
                limpar,
            }}
        >
            {children}
        </FiltroContext.Provider>
    );
}

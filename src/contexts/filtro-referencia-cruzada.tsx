import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { createContext } from 'react';
// import { InitalDados, ILabels } from '@utils/filtros/colunas/colunas_dados';
// import colunas_dados from '@components/Filtro-Dados'
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react';
import { IDados } from '@services/cadastros/types';
import * as request from '@services/referencia-cruzada';
import { ICreateReferenciaCruzada, InitialDadosRef,  } from '@utils/filtros/colunas/colunas_referencia_cruzada';
import colunas from '@utils/filtros/colunas/controle-refCruzada-filtros'
import refC_colunas from '@utils/filtros/colunas/controle-refCruzada-filtros';
import {  ILabels } from '@utils/filtros/colunas/colunas_referencia_cruzada';
interface IUnformCompare {
    campo: string;
    valor: string | number;
    compare: string;
}

interface ILabelProps {
    value: string;
    label: any;
}

interface IFilter {
    dadosRefCruzada: IUnformCompare[];
    cadastrarRefCruzada(refCruzada: IUnformCompare[]): void;
    scopeIgnition(filtro: IUnformCompare[]): IUnformCompare[];
    scopeIgnitionCompare(filtro: IUnformCompare[]): IUnformCompare[];
    limpar(): void;
    dataLabels: ILabels;
    colunas_dados: ILabelProps[];
    
}

interface IFiltroProps {
    children: ReactNode;
}

export const FiltroRefCruzadaDadosContext = createContext({} as IFilter);

export function useFiltro() {
    return useContext(FiltroRefCruzadaDadosContext);
}

export default function FiltroContextProvider({ children }: IFiltroProps) {
    const [dadosRefCruzada, setDadosRefCruzada] = useState<IUnformCompare[]>([]);
    const [dataLabels, setDataLabels] = useState({ ...InitialDadosRef });

    const colunas_dados = [
        { value: 'id', label: dataLabels?.id },
        { value: 'item_fornecedor', label: dataLabels?.item_fornecedor },
        { value: 'um_fornecedor', label: dataLabels?.um_fornecedor },
        { value: 'item_cliente', label: dataLabels?.item_cliente },
        { value: 'um_cliente', label: dataLabels?.um_cliente },
        { value: 'fator_conversao', label: dataLabels?.fator_conversao },
    ];



    useEffect(() => {
        async function carregarStorage() {
        const refCruzadaStorage = localStorage.getItem('@orion:refDados');
        if (refCruzadaStorage) {
            setDadosRefCruzada(JSON.parse(refCruzadaStorage));
        }
        }
        carregarStorage();
    }, []);
    
    function cadastrarRefCruzada(dados: IUnformCompare[]) {
        setDadosRefCruzada(dados);
        localStorage.setItem('@orion:refDados', JSON.stringify(dados));
    }


    function scopeIgnition(array: IUnformCompare[]): IUnformCompare[] {
        const filtro = array.map(({ campo, valor, compare }) => {
        const coluna = colunas_dados.find(option => option.value === campo);
        if (coluna) {
            return { campo, valor, compare };
        }
        });
    
        return filtro;
    }

    function scopeIgnitionCompare(array: IUnformCompare[]): IUnformCompare[] {
        const filtro = array.map(({ campo, valor, compare }) => {
        const coluna = colunas_dados.find(option => option.value === campo);
        if (coluna) {
            return { campo, valor, compare };
        }
        });
    
        return filtro;
    }

    async function limpar() {
        localStorage.setItem('@orion:refDados', JSON.stringify([]));
    }

    useEffect(() => {
        console.log('dadosRefCruzada 120', dadosRefCruzada)
    
    }, [dadosRefCruzada])
    
    
    return (
        <FiltroRefCruzadaDadosContext.Provider
            value={{
                dadosRefCruzada,
                cadastrarRefCruzada,
                scopeIgnition,
                scopeIgnitionCompare,
                limpar,
                dataLabels,
                colunas_dados
            }}
        >
        {children}
        </FiltroRefCruzadaDadosContext.Provider>
    );
    }


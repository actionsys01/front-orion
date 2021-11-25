import React, { useState, useMemo, useEffect, useCallback, Dispatch, SetStateAction} from 'react';
import { useSession } from "next-auth/client";
import { useToasts } from "@geist-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FilterModalStyle, ModalLines, AddRow, ButtonsRow } from "./style"
import { PlusCircle, X } from '@geist-ui/react-icons'

interface ModalProps {
    modalUFilterHandler: () => void
    setUFilterModal: Dispatch<SetStateAction<boolean>>
    setStatusQuery: Dispatch<SetStateAction<string>>
    setEntranceQuery: Dispatch<SetStateAction<string>>
    setExitQuery: Dispatch<SetStateAction<string>>
    setKeyQuery: Dispatch<SetStateAction<string>> 
    exitQuery: string
    statusQuery: string
    entranceQuery: string
    keyQuery: string
    sendToLocal: () => void
}

const FilterModal = ({modalUFilterHandler, sendToLocal,
     setStatusQuery, statusQuery,
     setEntranceQuery, entranceQuery,
    setExitQuery, exitQuery, keyQuery,
    setKeyQuery, setUFilterModal} : ModalProps) => {
    const [ firstLine, setFirstLine] = useState(false)
    const [ secondLine, setSecondLine ] = useState(false)
    const [ thirdLine, setThirdLine ] = useState(false)
    const [ fourthLine, setFourthLine ] = useState(false)

    const [ control, setControl] = useState(false)

    const [ firstItem, setFirstItem] = useState(false)

    const [ test, setTest] = useState("")

    const selectOptions = [ "Data de Entrada", "Data de Saída", "Status" , "Chave de Acesso"]

    // function getLocalData() {
    //     let filtersObj =  JSON.parse(localStorage.getItem("filtersObj"))
    //     console.log(`filters`, filtersObj)
    //         for (var i in filtersObj) {
    //         if (!filtersObj[i]) {
    //             delete filtersObj[i];
    //         }
    //         }
            
    //         console.log("truthy",Object.values(filtersObj));
    //         console.log("truthy 2", Object.keys(filtersObj))
    //         console.log("truthy 3", Object.entries(filtersObj))
    //         return filtersObj;
        
    // }

    const getLocal = useMemo(() => {
        let filtersObj =  JSON.parse(localStorage.getItem("filtersObj"))
        if(filtersObj) {

        
        for (var i in filtersObj) {
            if (!filtersObj[i]) {
                delete filtersObj[i];
            }
            }
            const val = Object.values(filtersObj)
            const trully = Object.keys(filtersObj)
            return {filtersObj, val, trully}
        }
    }, [])

    useEffect(() => {
        // getLocalData()
        console.log(`getLocal`, getLocal)
    }, [])

    function addRows() {
        if(!firstLine) {
            setFirstLine(true)
        }
        if(firstLine && !secondLine){
            setSecondLine(true)
        }
        if(firstLine && secondLine && !thirdLine){
            setThirdLine(true)
        }
        if(firstLine && secondLine && thirdLine && !fourthLine) {
            setFourthLine(true)
        }
    }

    function getFilter(e) {
        e.preventDefault()
        // console.log(`e`, e)
        if(e.target[0].value === "Status") {
            setStatusQuery(e.target[1].value)
            
        }
        if(e.target[0].value === "Data de Entrada") {
            const string = e.target[1].value
            const [dia, mes, ano] = string.split("/")
             setEntranceQuery(`${ano}-${mes}-${dia}`)
        }
        if(e.target[0].value === "Data de Saída") {
            const string = e.target[1].value
            const [dia, mes, ano] = string.split("/")
             setExitQuery(`${ano}-${mes}-${dia}`)
            // console.log(`saida`, (e.target[1].value))
        }
        if(e.target[0].value === "Chave de Acesso") {
            setKeyQuery(e.target[1].value)
        }
        if(e.target[2].type != "button" && e.target[2].value === "Status") {
            setStatusQuery(e.target[3].value)
        }
        if(e.target[2].type != "button" && e.target[2].value === "Data de Entrada") {
            const string = e.target[3].value
            const [dia, mes, ano] = string.split("/")
            const newStr = `${ano}-${mes}-${dia}`
            setEntranceQuery(newStr)
            // console.log(`entrance`, (e.target[3].value))
        }
        if(e.target[2].type != "button" && e.target[2].value === "Data de Saída") {
            const string = e.target[3].value
            const [dia, mes, ano] = string.split("/")
             setExitQuery(`${ano}-${mes}-${dia}`)
            // console.log(`saida`,(e.target[3].value) )
        }
        if(e.target[2].type != "button" && e.target[2].value === "Chave de Acesso") {
            setKeyQuery(e.target[3].value)
        }
        if(e.target[4] && e.target[4].type != "button" && e.target[4].value === "Status") {
            setStatusQuery(e.target[5].value) 
        }
        if(e.target[4] && e.target[4].type != "button" && e.target[4].value === "Data de Entrada") {
            const string = e.target[5].value
            const [dia, mes, ano] = string.split("/")
            setEntranceQuery(`${ano}-${mes}-${dia}`)
            // console.log(`entrance`,(e.target[5].value) )
        }
        if(e.target[4] && e.target[4].type != "button" && e.target[4].value === "Data de Saída") {
            const string = e.target[5].value
            const [dia, mes, ano] = string.split("/")
             setExitQuery(`${ano}-${mes}-${dia}`)
            // console.log(`saida`, (e.target[5].value))
        }
        if(e.target[4] && e.target[4].type != "button" && e.target[4].value === "Chave de Acesso") {
            setKeyQuery(e.target[5].value) 
        }
        if(e.target[6] && e.target[6].type != "button" && e.target[6].value === "Status") {
            setStatusQuery(e.target[7].value)
        }
        if(e.target[6] && e.target[6].type != "button" && e.target[6].value === "Data de Entrada") {
            const string = e.target[7].value
            const [dia, mes, ano] = string.split("/")
            setEntranceQuery(`${ano}-${mes}-${dia}`)
            // console.log(`entrance`,(e.target[7].value))
        }
        if(e.target[6] && e.target[6].type != "button" && e.target[6].value === "Data de Saída") {
            const string = e.target[7].value
            const [dia, mes, ano] = string.split("/")
             setExitQuery(`${ano}-${mes}-${dia}`)
            // console.log(`saida`,(e.target[7].value) )
        }
        if(e.target[6] && e.target[6].type != "button" && e.target[6].value === "Chave de Acesso") {
            setKeyQuery(e.target[7].value)
        }
        sendToLocal()
        modalUFilterHandler()
    }




    function closeModal() {
        if(!firstLine && !secondLine && !thirdLine && !fourthLine){
            // console.log("heyOO")
            localStorage.removeItem("filtersObj")
        }
         modalUFilterHandler()
    }

    

    return <FilterModalStyle>
        <div>
            <form action="" onSubmit={ getFilter}>
            <h6>Filtrar</h6>
            <ModalLines>
                {firstLine &&
                <>
                    <select name="0" id="0">
                        <option defaultValue=""></option>
                        {selectOptions.map((item, i ) => 
                        <option key={i} value={item}>{item}</option>
                        )}
                    </select>
                    <input type="text" name="1" id="1" onChange={(e) => setTest(e.target.value)} />
                    <X onClick={() => setFirstLine(false)}/>
                </>}
                {secondLine &&
                <>
                    <select name="2" id="2">
                        <option defaultValue=""></option>
                        {selectOptions.map((item, i ) => 
                        <option key={i} value={item}>{item}</option>
                        )}
                    </select>
                    <input type="text" name="3" id="3"/>
                    <X onClick={() => setSecondLine(false)}/>
                </>}
                {thirdLine &&
                <>
                    <select name="4" id="4">
                        <option defaultValue=""></option>
                        {selectOptions.map((item, i ) => 
                        <option key={i} value={item}>{item}</option>
                        )}
                    </select>
                    <input type="text" name="5" id="5"/>
                    <X onClick={() => setThirdLine(false)}/>
                </>}
                {fourthLine &&
                <>
                    <select name="6" id="6">
                        <option defaultValue=""></option>
                        {selectOptions.map((item, i ) => 
                        <option key={i} value={item}>{item}</option>
                        )}
                    </select>
                <input type="text" name="7" id="7"/>
                <X onClick={() => setFourthLine(false)}/>
                </>}
                <AddRow onClick={addRows} type="button">
                    <PlusCircle />
                    <p>Incluir linha</p>
                </AddRow>
            </ModalLines>
            <ButtonsRow>
                <button type="button" onClick={closeModal }>Cancelar</button>
                <button type="submit" /* onClick={() => replaceString(test)}  *//* onClick={() => setReload(!reload)} */ disabled={!firstLine ? true : false}>Confirmar</button>
            </ButtonsRow>
            </form>
        </div>

    </FilterModalStyle>
}

export default FilterModal
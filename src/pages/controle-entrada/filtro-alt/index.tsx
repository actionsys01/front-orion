import React, { Dispatch, SetStateAction, useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { FilterModal, 
    ModalTitle, 
    ModalLines,
    ButtonLine,
    AddButton
} from '../filtro-modal/style';
import { useSession } from "next-auth/client";
import { Plus } from "@geist-ui/react-icons";
import { X  } from '@geist-ui/react-icons'
import { AltInputStyle, ModalContent } from './style';

interface ModalProps {
    modalAltFilterHandler: () => void
    setStatusQuery: Dispatch<SetStateAction<string>>
    setEntranceQuery: Dispatch<SetStateAction<string>>
    setExitQuery: Dispatch<SetStateAction<string>>
    setKeyQuery: Dispatch<SetStateAction<string>> 
    reload: boolean
    setReload: Dispatch<SetStateAction<boolean>>
    getEntranceDataByPage: (page, company_id, filters) => Promise<void>
    filters:{ [k: string] : string}
}

const AltModal = ({modalAltFilterHandler, 
    setStatusQuery, 
    setEntranceQuery, 
    setExitQuery, 
    setKeyQuery,
    setReload, reload, filters,
    getEntranceDataByPage} : ModalProps) => {
    const [ secondLine, setSecondLine ] = useState(false)
    const [ thirdLine, setThirdLine ] = useState(false)
    const [ fourthLine, setFourthLine ] = useState(false)
    const [session] = useSession();

    // const [ firstInput, setFirstInput] = useState("")
    // const [ secondInput, setSecondInput] = useState("")
    // const [ thirdInput, setThirdInput] = useState("")
    // const [ fourthInput, setFourthInput] = useState("")

    

    function getFilter (string : string) {
        if(string === "Data de Entrada") {
            console.log("Data de Entrada")
        
        }
        if(string === "Data de Saída") {
            console.log("Data de Saída")
        }
        if(string === "Status") {
            console.log("Status")
        }
        if(string === "Chave de Acesso") {
            console.log("Chave de Acesso")
        }
    }

    const selectOptions = [ "Data de Entrada", "Data de Saída", "Status" , "Chave de Acesso"]

    function addRows() {
        if(!secondLine){
            setSecondLine(true)
        }
        if(secondLine && !thirdLine){
            setThirdLine(true)
        }
        if(secondLine && thirdLine && !fourthLine) {
            setFourthLine(true)
        }
    }

    function testSubmit(e) {
        e.preventDefault()
        console.log(`e.target.value`, e)
        if(e.target[1].value === "Status") {
            setStatusQuery(e.target[2].value)
        }
        if(e.target[1].value === "Data de Entrada") {
            setEntranceQuery(e.target[2].value)
        }
        if(e.target[1].value === "Data de Saída") {
            setExitQuery(e.target[2].value)
        }
        if(e.target[1].value === "Chave de Acesso") {
            setKeyQuery(e.target[2].value)
        }
        if(e.target[3].type != "button" && e.target[3].value === "Status") {
            setStatusQuery(e.target[4].value)
        }
        if(e.target[3].type != "button" && e.target[3].value === "Data de Entrada") {
            setEntranceQuery(e.target[4].value)
        }
        if(e.target[3].type != "button" && e.target[3].value === "Data de Saída") {
            // console.log(`e.target[4].value`, e.target[4].value)
            setExitQuery(e.target[4].value)
        }
        if(e.target[3].type != "button" && e.target[3].value === "Chave de Acesso") {
            setKeyQuery(e.target[4].value)
        }
        if(e.target[5] && e.target[5].type != "button" && e.target[5].value === "Status") {
            setStatusQuery(e.target[6].value)
        }
        if(e.target[5] && e.target[5].type != "button" && e.target[5].value === "Data de Entrada") {
            setEntranceQuery(e.target[6].value)
        }
        if(e.target[5] && e.target[5].type != "button" && e.target[5].value === "Data de Saída") {
            setExitQuery(e.target[6].value)
        }
        if(e.target[5] && e.target[5].type != "button" && e.target[5].value === "Chave de Acesso") {
            setKeyQuery(e.target[6].value)
        }
        if(e.target[7] && e.target[7].type != "button" && e.target[7].value === "Status") {
            setStatusQuery(e.target[8].value)
        }
        if(e.target[7] && e.target[7].type != "button" && e.target[7].value === "Data de Entrada") {
            setEntranceQuery(e.target[8].value)
        }
        if(e.target[7] && e.target[7].type != "button" && e.target[7].value === "Data de Saída") {
            setExitQuery(e.target[8].value)
        }
        if(e.target[7] && e.target[7].type != "button" && e.target[7].value === "Chave de Acesso") {
            setKeyQuery(e.target[8].value)
        }
        getEntranceDataByPage(1, Number(session?.usuario.empresa.id), filters)
        modalAltFilterHandler()
    } 

    return <FilterModal>
        <div>
            <form  onSubmit={testSubmit}>
        <ModalTitle>
        <h6>Filtrar</h6>
            <AddButton>
                <button type="button" onClick={addRows}>
                    <span>
                        <Plus /> 
                    </span>
                    Adicionar
                </button>
            </AddButton>
        </ModalTitle>
        <ModalContent>
            <AltInputStyle >
                <div>
                    <label htmlFor="campo">Filtro</label>
                    <select  id="first select" onChange={(e) => e.target.value}>
                        <option defaultValue=""></option>
                        {selectOptions.map((item, i ) => 
                            <option key={i} value={item}>{item}</option>
                        )}
                        
                    </select>
                </div>
                <div>
                    <label htmlFor="campo">Campo</label>
                    <input type="text" id="campo 1"  />
                </div>
                <div>
                {/* <X /> */}
                </div>
            </AltInputStyle>
            {secondLine &&
                <AltInputStyle>
                <div>
                    <label htmlFor="campo">Filtro</label>
                    <select  id="second select" onChange={(e) => e.target.value} >
                    <option value="" selected></option>
                        {selectOptions.map((item, i ) => 
                            <option key={i} value={item}>{item}</option>
                        )}
                        
                    </select>
                </div>
                <div>
                    <label htmlFor="campo">Campo</label>
                    <input type="text" id="campo 2"/>
                </div>
                <div>
                    <X onClick={() => setSecondLine(false)}/>
                </div>
            </AltInputStyle>}
            {thirdLine && 
                <AltInputStyle>
                <div>
                    <label htmlFor="campo">Filtro</label>
                    <select  id="third select">
                        <option value="" selected></option>
                        {selectOptions.map((item, i ) => 
                            <option key={i} value={item}>{item}</option>
                        )}
                        
                    </select>
                </div>
                <div>
                    <label htmlFor="campo">Campo</label>
                    <input type="text" id="campo 3"/>
                </div>
                <div>
                    <X onClick={() => setThirdLine(false)}/>
                </div>
            </AltInputStyle>}
            {fourthLine &&
                <AltInputStyle>
                <div>
                    <label htmlFor="campo">Filtro</label>
                    <select  id="last select">
                        <option defaultValue=""></option>
                        {selectOptions.map((item, i ) => 
                            <option key={i} value={item}>{item}</option>
                        )}
                        
                    </select>
                </div>
                <div>
                    <label htmlFor="campo">Campo</label>
                    <input type="text" id="campo 4"/>
                </div>
                <div>
                    <X onClick={() => setFourthLine(false)}/>
                </div>
            </AltInputStyle>}
        </ModalContent>
        <ButtonLine>
            <button type="button" onClick={() => modalAltFilterHandler()} >Cancelar</button>
            <button type="submit">Confirmar</button>
        </ButtonLine>
        </form>
        </div>

    </FilterModal>
}

export default AltModal
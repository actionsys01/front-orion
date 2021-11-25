import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { FilterModal, 
    ModalTitle, 
    ModalContent, 
    ModalLines,
    ButtonLine,
    AddButton
} from './style';
import { X  } from '@geist-ui/react-icons'
import { Plus } from "@geist-ui/react-icons";

interface ModalProps {
    modalFilterHandler: () => void;
}

const FilttroModal = ({modalFilterHandler} : ModalProps) => {
    const [ secondLine, setSecondLine ] = useState(false)
    const [ thirdLine, setThirdLine ] = useState(false)
    const [ fourthLine, setFourthLine ] = useState(false)

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
    

    return <FilterModal> 
        <div>
        <ModalTitle>
            <h6>Filtrar</h6>
            <AddButton>
                <button onClick={addRows}>
                    <span>
                        <Plus /> 
                    </span>
                    Adicionar
                </button>
            </AddButton>
            
        </ModalTitle>
        <ModalContent>
            <ModalLines>
                <div>
                    <label htmlFor="campo">Campo</label>
                    <input type="text" id="campo"/>
                </div>
                <div>
                    <label htmlFor="campo">Comparação</label>
                    <input type="text" id="campo"/>
                </div>
                <div>
                    <label htmlFor="campo">Valor / Data</label>
                    <input type="text" id="campo"/>
                </div>
                <div>
                    {/* <X /> */}
                </div>
            </ModalLines>
            {secondLine &&
                <ModalLines>
                <div>
                    <label htmlFor="campo">Campo</label>
                    <input type="text" id="campo"/>
                </div>
                <div>
                    <label htmlFor="campo">Comparação</label>
                    <input type="text" id="campo"/>
                </div>
                <div>
                    <label htmlFor="campo">Valor / Data</label>
                    <input type="text" id="campo"/>
                </div>
                <div>
                    <X onClick={() => setSecondLine(false)} />
                </div>
            </ModalLines>}
            {thirdLine &&
                <ModalLines>
                <div>
                    <label htmlFor="campo">Campo</label>
                    <input type="text" id="campo"/>
                </div>
                <div>
                    <label htmlFor="campo">Comparação</label>
                    <input type="text" id="campo"/>
                </div>
                <div>
                    <label htmlFor="campo">Valor / Data</label>
                    <input type="text" id="campo"/>
                </div>
                <div>
                    <X onClick={() => setThirdLine(false)}/>
                </div>
            </ModalLines>}
            {fourthLine &&
                <ModalLines>
                <div>
                    <label htmlFor="campo">Campo</label>
                    <input type="text" id="campo"/>
                </div>
                <div>
                    <label htmlFor="campo">Comparação</label>
                    <input type="text" id="campo"/>
                </div>
                <div>
                    <label htmlFor="campo">Valor / Data</label>
                    <input type="text" id="campo"/>
                </div>
                <div>
                    <X onClick={() => setFourthLine(false)}/>
                </div>
            </ModalLines>}
        </ModalContent>
        <ButtonLine>
            <button onClick={() => modalFilterHandler()} >Cancelar</button>
            <button>Confirmar</button>
        </ButtonLine>
        </div>

    </FilterModal>
}

export default FilttroModal
import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { useSession } from "next-auth/client";
import { useToasts } from "@geist-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";



export default function Nfse() {
    const  [ test, setTest] = useState([])

    useEffect(() => {
      fetch("api/nfse").then(response => response.json()).then(json => console.log(json))
    }, [])

    return <>
        
            
        </>
    
}


Nfse.auth = true
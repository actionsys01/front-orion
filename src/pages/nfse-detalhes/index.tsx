import React, { useState, useMemo, useEffect, useCallback, useRef} from 'react';
import { useSession } from "next-auth/client";
import { useToasts } from "@geist-ui/react";
import BotaoVoltar from "@components/BotaoVoltar";
import Head from "next/head";
import { NfseDetailStyle } from "./style"
import { useRouter } from "next/router";

export default function NfseDetalhes() {
    const router = useRouter()
console.log(`curry`, router.query)


    return <>
            <Head>
                <title>Orion | Detalhes NFS-e</title>
            </Head>
            <BotaoVoltar />
            


        </>
    
}

NfseDetalhes.auth = true

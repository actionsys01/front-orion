import React, { useState, useMemo, useEffect} from 'react'; 
import { SelectStyle } from './style';
import {
    Button,
    Loading,
    Popover,
    Row,
    Spacer,
    Table,
    Select,
    Text,
  } from "@geist-ui/react";
  import { Calendar } from '@geist-ui/react-icons'
import { useSession } from "next-auth/client";
import Head from "next/head";

interface SelectProps {
    className: string
}

export default function Dashboard({className}: SelectProps) {

   
 
const input = [<Calendar size="32px" className="field"/>, "Ano" ]

    return  <>
    <Head>
        <title>Orion | Dashboard</title>
    </Head>
    <Text h2>Dashboard</Text>
    <SelectStyle>
  <select title="Ano" name="Ano" id="ano">
      <option value="" disabled selected>Ano</option>
     {ano.map((item, i) => 
         <option key={i} value={item}>{item}</option>
     )}
  </select>
    </SelectStyle>
    </>
}

Dashboard.auth = true 
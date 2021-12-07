export interface NfseProps {
    id: number,
    chave_nota: string,
    empresa_id: number,
    nota: string,
    emit_cnpj: string,
    emit_nome: string,
    dest_cnpj: string,
    dest_nome: string,
    serie: number,
    prefeitura_status: number,
    dt_hr_emi: string,
    dt_hr_receb: string
}

export interface NfseFormattedProps {
    versao: string,
    Id: string,
    Numero: string,
    CodigoVerificacao: string,
    DtEmissao: string
    NumeroNFSeSubstituida: string,
    Serie: string,
    DtPrestacaoServico:string,
    Exigibilidade: string,
    DadosTomador: {
      //  Cpf: ,
       Cnpj: string,
       InscricaoMunicipal: string,
       InscricaoEstadual: string,
       Nome: string,
       RazaoSocial: string,
       NomeFantasia: string,
       Endereco: {
          Endereco: string,
          Numero: string,
          Complemento: string,
          Bairro:string,
          Cep: string,
          Municipio: string,
          Uf: string,
          Pais: string,
          CodigoIBGE: string
       },
       Contato: {
          Telefone: string,
          Email: string
       },
       Regime: string
       CodigoMobiliario: string
    },
    DadosPrestador: {
      //  Cpf: [],
       Cnpj: string,
       InscricaoMunicipal: string,
       InscricaoEstadual: string,
       Nome: string,
       RazaoSocial: string,
       NomeFantasia: string,
       Endereco: {
          Endereco:string
          Numero: string
          Complemento: string
          Bairro: string
          Cep: string
          Municipio: string
          Uf: string
          Pais: string,
          CodigoIBGE: string
       },
       Contato: {
          Telefone: string,
          Email: string
       },
       Regime: string,
       CodigoMobiliario: string
    },
    DadosIntermediario: {
      //  Cpf: [],
       Cnpj: string,
       InscricaoMunicipal: string,
       InscricaoEstadual: string,
       Nome: string ,
       RazaoSocial: string ,
       NomeFantasia: string ,
       Endereco: {
          Endereco:string,
          Numero: string,
          Complemento:string ,
          Bairro: string,
          Cep: string,
          Municipio: string,
          Uf: string,
          Pais: string,
          CodigoIBGE: string
       },
       Contato: {
          Telefone: string,
          Email:string
       },
       Regime: string,
       CodigoMobiliario: string
    },
    Itens: string,
    DiscriminacaoServico: string,
    OutrasInformacoes: string,
    ImpostosRetidos: {
       AlqCsll: string,
       VlrCsll: string,
       AlqCofins: string,
       VlrCofins: string,
       AlqPisPasep: string,
       VlrPisPasep: string,
       AlqIrrf: string,
       VlrIrrf: string,
       AlqIssRetido: string,
       VlrIssRetido: string,
       AlqInss: string,
       VlrInss: string
    },
    Iss: {
       BaseCalculo: string,
       Aliquota: string,
       Vlr: string,
       DtVenc: string
    },
    Rps: {
       Numero: string,
       Serie: string,
       Tipo: string,
       DtEmissao: string
    },
    ConstrucaoCivil: {
       Art: string,
       CodigoObra: string
    },
    VlrTotal: string,
    VlrServicos: string,
    VlrLiquido: string,
    VlrDeducoes: string,
    VlrCredito: string,
    VlrDesconto: string,
    VlrRetencoesFederais: string,
    VlrOutrasRetencoes: string,
    DescontoCondicionado: string,
    DescontoIncondicionado: string,
    MesCompetencia:string,
    MunicipioIncidencia: string,
    Recolhimento: string,
    Tributacao: string,
    CNAE: string,
    DescricaoAtividade: string,
    DescricaoTipoServico: string,
    LocalPrestacao: string,
    NaturezaOperacao: string,
    OptanteSimplesNacional:string,
    IncentivadorCultural: string,
    RegimeEspecialTributacao: string,
    DtPagamento: string,
    NumeroGuia: string,
    ItemListaServico: string,
    CodigoTributacaoMunicipio: string,
    PedidoCompra: {
       Numero: string,
       Itens: string
    },
    Particularidades: string,
    emissionDate: string,
    chave_nota: string
    status_prefeitura: string,
    expiringIssDate: string
 }

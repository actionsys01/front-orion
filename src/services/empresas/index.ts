import getAllCompaniesByPage from "./empresa-api/getAllCompaniesByPage";
import create from "./empresa-api/create";
import update from "./empresa-api/update";
import deletar from "./empresa-api/delete";
import sendCertificate from "./certificado-api/sendCertificate";
import dashboardRequest from "./dashboard-api/dashboard-request";
import getCertificate from "./certificado-api/getCertificate";
import getCnpj from "./cnpj-api/getCompanyCnpj";
import createCnpj from "./cnpj-api/createCnpj";
import deleteCnpj from "./cnpj-api/deleteCnpj";
import updateCnpj from "./cnpj-api/updateCnpj";
import deleteCertificate from "./certificado-api/deleteCertificate";
import uploadLogo from "./logo/upload";

export { // empresas requests
        getAllCompaniesByPage, create, update, deletar,
        // dashboard request
        dashboardRequest, 
        // certificados requests
        getCertificate, sendCertificate, deleteCertificate,
        // CNPJ requests
        getCnpj, createCnpj, deleteCnpj, updateCnpj,
        // LOGO
        uploadLogo
}
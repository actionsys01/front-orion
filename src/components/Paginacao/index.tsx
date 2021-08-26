import { Pagination } from "@geist-ui/react";
import { ChevronLeftCircle, ChevronRightCircle } from "@geist-ui/react-icons";

interface IProps {
  totalPagina: number | undefined;
  setPagina(pagina: number): void;
}
export default function Paginacao({ totalPagina, setPagina }: IProps) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 10,
        }}
      >
        <Pagination
          size="small"
          onChange={(pagina) => setPagina(pagina)}
          count={totalPagina}
        >
          <Pagination.Next>
            <ChevronRightCircle />
          </Pagination.Next>
          <Pagination.Previous>
            <ChevronLeftCircle />
          </Pagination.Previous>
        </Pagination>
      </div>
    </>
  );
}

export const productsPageWayBack = {
  page_1: false,
  page_4: false,
};

export interface IPageBack {
  page_1: boolean;
  page_4: boolean;
}

export const inputValues = {
  input_1: '',
  input_2: '',
  input_3: '',
  input_4: '',
  input_5: '',
};

export const inputId = {
  input_1: '',
  input_2: '',
  input_3: '',
  input_4: '',
  input_5: '',
};

const Modalpaginate = (items: any) => {
  const itemsPerPage = 3;
  const pages = Math.ceil(items.length / itemsPerPage);

  const newItems = Array.from({ length: pages }, (_, index) => {
    const start = index * itemsPerPage;

    return items.slice(start, start + itemsPerPage);
  });

  return newItems;
};

export default Modalpaginate;

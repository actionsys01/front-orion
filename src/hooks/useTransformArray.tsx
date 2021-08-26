import { useState, useEffect } from "react";

export default function useTransformArray(data: [] | object) {
  const [array, setArray] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setArray(data);
    } else {
      setArray(data ? [data] : []);
    }
  });

  return array;
}

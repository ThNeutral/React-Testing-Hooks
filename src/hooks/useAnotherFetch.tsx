import { useState, useEffect } from "react";
import { useAppSelector } from "../store/store";

export default function useAnotherFetch(url: string) {
  const [data, setData] = useState<{ data: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const { params } = useAppSelector((store) => store.inputReducer);
  const { anotherParams } = useAppSelector(
    (store) => store.anotherInputReducer
  );

  useEffect(() => {
    setIsLoading(true);
    const p = [...params, ...anotherParams];
    fetchMock(url, p)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, [url, params, anotherParams]);

  return { data, isLoading };
}

type Mock = {
  json: () => Promise<{ data: string }>;
};

function fetchMock(url: string, params: string[]) {
  return new Promise<Mock>((resolve) =>
    setTimeout(() => {
      resolve({
        json: () =>
          Promise.resolve({
            data: `${url}${params.length !== 0 ? " " + params.join(", ") : ""}`,
          }),
      });
    }, 1000 + Math.random() * 3000)
  );
}

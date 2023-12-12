import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useAppDispatch } from "../store/store";
import { setParams } from "../store/inputReducer";

const testUrl = "https://https.https";

function App() {
  const dispatch = useAppDispatch();

  const [url, setUrl] = useState(testUrl);

  const { data, isLoading } = useFetch(url);

  return (
    <>
      <form
        style={{ display: "flex", flexDirection: "column", width: "20%" }}
        onSubmit={(e) => {
          e.preventDefault();
          setUrl(((e.target as HTMLFormElement)[0] as HTMLInputElement).value);
          dispatch(
            setParams(
              (
                (e.target as HTMLFormElement)[1] as HTMLInputElement
              ).value.split(", ")
            )
          );
        }}
      >
        <input />
        <input />
        <button type="submit">Fetch data from new url</button>
      </form>
      {isLoading ? <p>Loading...</p> : null}
      <p>{data?.data}</p>
    </>
  );
}

export default App;

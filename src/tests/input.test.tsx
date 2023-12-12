import { expect } from "@jest/globals";
import { act, renderHook, waitFor } from "@testing-library/react";
import useFetch from "../hooks/useFetch";
import { Provider } from "react-redux";
import { setParams } from "../store/inputReducer";
import { Action, Store } from "@reduxjs/toolkit/react";
import { store } from "../store/store";
import useAnotherFetch from "../hooks/useAnotherFetch";
import { setAnotherParams } from "../store/anotherInputReducer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getWrapper(store: Store<any, Action>): React.FC {
  return ({ children }: { children?: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
}

test("hook test", async () => {
  const wrapper = getWrapper(store);

  const { result: fetchResult } = renderHook(useFetch, {
    wrapper: wrapper,
    initialProps: "https://https.https",
  });

  const { result: anotherFetchResult } = renderHook(useAnotherFetch, {
    wrapper: wrapper,
    initialProps: "http://http.http",
  });

  expect(
    fetchResult.current.isLoading && anotherFetchResult.current.isLoading
  ).toBe(true);
  await waitFor(
    () =>
      expect(
        fetchResult.current.isLoading || anotherFetchResult.current.isLoading
      ).toBe(false),
    {
      timeout: 4500,
      interval: 100,
    }
  );

  expect(fetchResult.current.data?.data).toBe("https://https.https");
  expect(anotherFetchResult.current.data?.data).toBe("http://http.http");

  act(() => store.dispatch(setParams(["param1", "param2"])));
  act(() => store.dispatch(setAnotherParams(["param3", "param4"])));

  expect(
    fetchResult.current.isLoading && anotherFetchResult.current.isLoading
  ).toBe(true);
  await waitFor(
    () =>
      expect(
        fetchResult.current.isLoading || anotherFetchResult.current.isLoading
      ).toBe(false),
    {
      timeout: 4500,
      interval: 100,
    }
  );

  expect(fetchResult.current.data?.data).toBe(
    "https://https.https param1, param2"
  );
  expect(anotherFetchResult.current.data?.data).toBe(
    "http://http.http param1, param2, param3, param4"
  );
}, 15000);

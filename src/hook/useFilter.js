import { useState } from "react";
import { useLocalStorare } from "./useLocalStorage";

export function useFilter( dataList, callback) {
  const [query, setQuery] = useLocalStorare("query", "");

  const filteredData = dataList.filter((data) =>
    callback(data).toLowerCase().includes(query)
  );


  return [filteredData, setQuery];
}

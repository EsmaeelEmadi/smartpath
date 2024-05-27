import { FC, useEffect } from "react";
import { useGet } from "../lib/API/hooks";

export const App: FC = () => {
  const { data, error, onHold, fetch } = useGet({
    url: "https://min-api.cryptocompare.com/data/exchange/histohour",
    withCache: true,
  });

  useEffect(() => {
    fetch({ params: { tsym: "BTC", limit: "10" } });
  }, []);
  // tsym=BTC&limit=10

  useEffect(() => {
    console.log({ data, error, onHold });
  }, [data, error, onHold]);

  return null;
};

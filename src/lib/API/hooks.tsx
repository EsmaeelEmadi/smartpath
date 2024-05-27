import { useState } from "react";
import { GetRequest, TParams, IGetConstructorProps, THeaders } from "./AIP";


export function useGet<Res = unknown, Params extends TParams = TParams>({
  url,
  withCache,
}: IGetConstructorProps) {
  const [onHold, setOnHold] = useState(false);
  const [data, setData] = useState<Res>();
  const [error, setError] = useState<Error>();

  const getRequest = new GetRequest<Res>({ url, withCache });

  const fetch = ({
    headers,
    params,
  }: {
    headers?: THeaders;
    params?: Params;
  }): void => {
    setOnHold(true);

    getRequest.headers = headers;
    getRequest.params = params;
    getRequest
      .exec()
      .then((res) => {
        setData(res);
        setError(undefined);
      })
      .catch((error) => {
        setData(undefined);
        setError(error);
      })
      .finally(() => setOnHold(false));
  };

  return {
    onHold,
    data,
    error,
    fetch,
  };
}

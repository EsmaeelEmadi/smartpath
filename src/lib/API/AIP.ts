export type TURL = string;
export type TParams = Record<string, string>;
// TODO: create strict types for standard headers, developer should be able to extend it later
export type THeaders = Record<string, string>;
export type TCache<Res> = Map<string, Res>;

export abstract class AbstractAPI<Res> {
  protected abstract _url: TURL;
  protected abstract _params?: TParams;
  protected abstract _headers?: THeaders;
  public abstract exec(): Promise<Res>;
}

export abstract class AbstractGet<Res> extends AbstractAPI<Res> {
  protected abstract _cache: TCache<Res>;
  protected abstract _withCache: boolean;
}

export interface IGetConstructorProps {
  url: string;
  withCache: boolean;
}

export class GetRequest<
  Res = unknown,
  Params extends TParams = TParams,
> extends AbstractGet<Res> {
  protected readonly _cache: Map<string, Res>;
  protected readonly _withCache: boolean;
  protected _url: string;
  protected _params?: Params;
  protected _headers?: THeaders;

  // ── getters and settesr ─────────────────────────────────────────────
  public get cache(): Map<string, Res> {
    return this._cache;
  }

  public get shouldCache(): boolean {
    return this._withCache;
  }

  public get url(): string {
    return this._url;
  }

  public set headers(arg: THeaders | undefined) {
    this._headers = arg;
  }
  public get headers(): THeaders | undefined {
    return this._headers;
  }

  public set params(arg: Params | undefined) {
    this._params = arg;
  }
  public get params(): Params | undefined {
    return this._params;
  }

  // ── methods ─────────────────────────────────────────────────────────
  public async exec(): Promise<Res> {
    try {
      console.log({ _params: this._params });
      let params: string | undefined;
      if (this._params) {
        params = new URLSearchParams(this._params).toString();
      }

      // const paramsString = params ? params.toString() : undefined;
      console.log({ params });
      const cachedRequest =
        this._withCache && params ? this._cache.get(params) : undefined;

      if (this._withCache && cachedRequest) {
        return cachedRequest;
      } else {
        const urlWithParams = params ? this._url + `?${params}` : this._url;

        console.log({ urlWithParams });

        const reqBody: { [key: string]: unknown } = {};
        if (this._headers) reqBody["headers"] = this._headers;

        const req = await fetch(urlWithParams, reqBody);

        if (!req.ok) {
          throw new Error(`Failed to fetch: ${req.status} ${req.statusText}`);
        }

        const res = await req.json();

        if (this._withCache) this._cache.set(params ?? "", res);

        return res as Res;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(String(error));
      }
    }
  }

  // ── constructor ─────────────────────────────────────────────────────
  constructor({ url, withCache = false }: IGetConstructorProps) {
    super();

    this._withCache = withCache;
    this._url = url;
    this._cache = new Map();
  }
}

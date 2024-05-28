// ── errors
const shouldProvideCacheConfig = 'when withCache is true you should pass a cacheConfig';

// ── types
export type TURL = string;
export type TParams = Record<string, string>;
// TODO: create strict types for standard headers, developer should be able to extend it later
export type THeaders = Record<string, string>;
export type TCacheRes<Res> = { time: number; value: Res; key: string };
export type TCache<Res> = Map<string, TCacheRes<Res>>;

export interface ICacheConfig {
  address: string;
  revalidationTime: number;
}

export interface IGetConstructorProps {
  url: string;
  withCache?: boolean;
  cacheConfig?: ICacheConfig;
}

// ── abstract
export abstract class AbstractAPI<Res> {
  protected abstract _url: TURL;
  protected abstract _params?: TParams;
  protected abstract _headers?: THeaders;
  public abstract exec(): Promise<Res>;
}

export abstract class AbstractGet<Res> extends AbstractAPI<Res> {
  protected abstract _cache: TCache<Res>;
  protected abstract _withCache: boolean;
  protected abstract _cacheConfig?: ICacheConfig;
}

/**
 * TODO:
 *  - create a seperate class for cache storage
 */
export class GetRequest<Res = unknown, Params extends TParams = TParams> extends AbstractGet<Res> {
  protected readonly _cache: TCache<Res>;
  protected readonly _withCache: boolean;
  protected _url: string;
  protected _params?: Params;
  protected _headers?: THeaders;
  protected _cacheConfig?: ICacheConfig;

  // ── getters and settesr ─────────────────────────────────────────────
  public get cache(): TCache<Res> {
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
  protected checkConfig() {
    if (this._withCache && !this._cacheConfig) {
      throw new Error(shouldProvideCacheConfig);
    }
  }

  private updateCache() {
    if (this._cache.size) {
      localStorage.setItem(
        this._cacheConfig!.address,
        JSON.stringify(Array.from(this._cache.values())),
      );
    } else {
      localStorage.removeItem(this._cacheConfig!.address);
    }
  }

  private storeInCache(key: string, value: Res): void {
    this.checkConfig();

    const cacheValue = { value, time: new Date().getTime(), key: key };

    this._cache.set(key, cacheValue);

    this.updateCache();
  }

  private readFromStorage() {
    this.checkConfig();

    const storageCache = localStorage.getItem(this._cacheConfig!.address);

    if (storageCache) {
      const parsedStorageCache: TCacheRes<Res>[] = JSON.parse(storageCache);

      const now = new Date().getTime();

      if (parsedStorageCache) {
        for (const item of parsedStorageCache) {
          /**
           * revalidating expored cache
           */
          if (item.time + this._cacheConfig!.revalidationTime > now) {
            this._cache.set(item.key, item);
          }
        }
      }

      /**
       * if there are expired items in cache
       * update the cache
       */
      if (this._cache.size !== parsedStorageCache.length) {
        this.updateCache();
      }
    }
  }

  private getFromCache(key: string): TCacheRes<Res> | undefined {
    this.checkConfig();

    const cachedItem = this._cache.get(key);

    if (cachedItem) {
      if (cachedItem.time + this._cacheConfig!.revalidationTime > new Date().getTime()) {
        return cachedItem;
      } else {
        /**
         * removing cache and updating storage
         */
        this._cache.delete(key);
        this.updateCache();
      }
    }
  }

  public async exec(): Promise<Res> {
    try {
      let params: string | undefined;

      if (this._params) {
        params = new URLSearchParams(this._params).toString();
      }

      const urlWithParams = params ? this._url + `?${params}` : this._url;

      if (this._withCache) {
        if (this._withCache) {
          /**
           * NOTE: I am using `params ?? ""` because a request may not
           *       hanve any params but still needs to be cached
           */
          const cachedValue = this.getFromCache(urlWithParams);
          console.log({ cachedValue });
          if (cachedValue) return cachedValue.value;
        }
      }

      const reqBody: { [key: string]: unknown } = {};
      if (this._headers) reqBody['headers'] = this._headers;

      const req = await fetch(urlWithParams, reqBody);

      if (!req.ok) {
        throw new Error(`Failed to fetch: ${req.status} ${req.statusText}`);
      }

      const res = await req.json();

      if (this._withCache) this.storeInCache(urlWithParams, res);

      return res as Res;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(String(error));
      }
    }
  }

  // ── constructor ─────────────────────────────────────────────────────
  constructor({ url, withCache = false, cacheConfig }: IGetConstructorProps) {
    super();

    if (withCache === true && !cacheConfig) {
      throw new Error(shouldProvideCacheConfig);
    }

    this._withCache = withCache;
    this._url = url;
    this._cache = new Map();
    this._cacheConfig = cacheConfig;

    /**
     * fill the cache from storage
     */
    this.readFromStorage();
  }
}

export interface IHourlyExchangeVolume {
  time: number;
  volume: number;
}

export interface IHourlyExchangeVolumeResponse {
  Data: IHourlyExchangeVolume[];
  ConversionType: string;
  FirstValueInArray: boolean;
  HasWarning: boolean;
  Message: string;
  RateLimit: Record<string, unknown>;
  TimeFrom: number;
  TimeTo: number;
  type: number;
}

export interface IHourlyPairOHLCV {
  close: number;
  conversionSymbol: string;
  conversionType: string;
  high: number;
  low: number;
  open: number;
  time: number;
  volumefrom: number;
  volumeto: number;
}

export interface IHourlyPairOHLCVResponse {
  Data: {
    Data: IHourlyPairOHLCV[];
    Aggregated: boolean;
    TimeFrom: number;
    TimeTo: number;
  };
  HasWarning: boolean;
  Message: string;
  RateLimit: Record<string, unknown>;
  Response: string;
  Type: number;
}

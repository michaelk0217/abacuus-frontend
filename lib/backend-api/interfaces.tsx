//for "/get_favorite_symbol_list/"
export interface FavSymbolData {
  ticker_symbol: string;
  current_price: number;
  price_change: number;
  price_change_percentage: number;
  market_closed: boolean | null;

  volume_15m: number;
  volume_1h: number;
  volume_1d: number;

  macd_15m_percentage: number;
  macd_1h_percentage: number;
  macd_1d_percentage: number;

  bband_pos_15m: number;
  bband_pos_1h: number;
  bband_pos_1d: number;

  bband_breadth_ratio_15m: number;
  bband_breadth_ratio_1h: number;
  bband_breadth_ratio_1d: number;

  macd_15m_hist_color_index: number;
  macd_1h_hist_color_index: number;
  macd_1d_hist_color_index: number;

  action_1h: string;
  action_1d: string;
  action_15m: string;

  notification_enabled: boolean | null;
  confirm_pending: boolean;

  candle_15m_list: SmallCandleData[];
}

//for "/get_symbol_info/"
export interface SymbolInfo {
  current_price: number;
  updated_at_timestamp: number;
  price_change: number;
  price_change_percentage: number;
  market_closed: boolean;
  macd_15m_percentage: number;
  macd_1h_percentage: number;
  macd_1d_percentage: number;
  volume_15m: number;
  volume_1h: number;
  volume_1d: number;
  volume_percentage: number;
  action_15m: string;
  action_1h: string;
  action_1d: string;
  bband_ratio_15m: number;
  bband_ratio_1h: number;
  bband_ratio_1d: number;
  bband_upper_15m: number;
  bband_upper_1h: number;
  bband_upper_1d: number;
  bband_lower_15m: number;
  bband_lower_1h: number;
  bband_lower_1d: number;
  hist_color_15m: number;
  hist_color_1h: number;
  hist_color_1d: number;
  macd_15m_hist_list: number[];
  macd_1h_hist_list: number[];
  macd_1d_hist_list: number[];
  macd_15m_hist_color_list: number[];
  macd_1h_hist_color_list: number[];
  macd_1d_hist_color_list: number[];
  candle_15m_data_list: CandleData[];
  candle_1h_data_list: CandleData[];
  candle_1d_data_list: CandleData[];
  confirm_pending: boolean;
}

export interface SmallCandleData {
  close: number;
  timestamp: number;
}

export interface CandleData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  bband_upper: number;
  bband_middle: number;
  bband_lower: number;
}

export interface TradingEvent {
  ticker_symbol: string;
  price: number;
  datetime_timestamp: number;
  action_type: string;
  interval: string;
  is_confirmed: boolean;
  push_notification_id: number;
}

export interface TradingEventResponse {
  trading_event_list: TradingEvent[];
}

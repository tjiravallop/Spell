const bodyRamps = {
  fire:      ['#66362B', '#BF6137', '#ECA66E'],
  ice:       ['#305673', '#629EB6', '#C0E7ED'],
  lightning: ['#615137', '#B09649', '#F1DA83'],
  earth:     ['#514032', '#967049', '#CCAB79'],
  water:     ['#244969', '#427EAF', '#89BDE0'],
  wind:      ['#31594D', '#6B9A79', '#B4D8A7'],
  akki:      ['#58203B', '#BE3D4F', '#FF9379'],
  heman:     ['#393869', '#766BC4', '#B9B7F0'],
  asani:     ['#462B67', '#955BB9', '#ECC6EE'],
  pathaphi:  ['#533B43', '#AB6553', '#E9AE75'],
  wari:      ['#235365', '#379C9E', '#94E0CF'],
  vayu:      ['#245344', '#569B59', '#C9E88A'],
};

export const SUMMON_BODY_PALETTES = Object.freeze(Object.fromEntries(
  Object.entries(bodyRamps).map(([id, [shadow, midtone, highlight]]) => [
    id, Object.freeze({ shadow, midtone, highlight }),
  ]),
));

const ramps = {
  // Shadow, midtone, highlight, accent, mark edge, aura, rim, optional mark fill.
  magma:        ['#30252B', '#92402E', '#E87938', '#FFD369', '#FF9D49', '#D95C35', '#F5A75A'],
  mudmire:      ['#302E23', '#716747', '#AAA06A', '#C5E5A0', '#8BC081', '#756E44', '#A4BD77'],
  dust:         ['#594A3B', '#AD9975', '#E5D4AE', '#FFF1D0', '#856A4D', '#BEA37A', '#E3C99E'],
  permafrost:   ['#293E51', '#63859B', '#B8D6E3', '#DAFAFF', '#82CCD8', '#6795AA', '#A0D7E6'],
  magnet:       ['#292736', '#625F78', '#A3A9BC', '#FF729C', '#D2B1E7', '#8C83A7', '#C58BB7', '#FFB7D0'],
  mist:         ['#536C70', '#9DBDB7', '#DDECE7', '#F5FFF9', '#5D8C82', '#94BCB1', '#C4DDD2'],
  hail:         ['#4B729D', '#A2C5E6', '#F0F8FF', '#B9F5FF', '#B9F5FF', '#8EB6DD', '#C6EBFF', '#24365C'],
  monsoon:      ['#153D50', '#287F8B', '#69CBD0', '#A3FFE9', '#62DFBC', '#389AA6', '#7AE9D3'],
  shockstream:  ['#242B69', '#345EBE', '#53BFFF', '#E8FF85', '#76ECF4', '#487FE2', '#6AD5FF'],
  thunderstorm: ['#272D40', '#515D78', '#9DA6C2', '#D8FF72', '#9EC85E', '#687596', '#A7B97E'],
  heatwave:     ['#713028', '#CC7339', '#F4C16C', '#FFF2B0', '#9B4232', '#DA834A', '#F5B961'],
  chillgale:    ['#30555D', '#62A9AF', '#ADE8E7', '#E5FFFF', '#42918E', '#68B5B7', '#A1DBD1'],
  plasma:       ['#351A55', '#8D39B0', '#D96EEA', '#FFB5F8', '#EE88CD', '#AB55CC', '#DE8EE7'],
  scald:        ['#65394B', '#C76B63', '#E9B3A6', '#FFF1DE', '#A6485C', '#CC7D79', '#E8A798'],
  frostvolt:    ['#303C79', '#727DD0', '#B2B9F5', '#E6D5FF', '#C39AF0', '#8188D7', '#B3A9F0'],
};

export const FUSION_SUMMON_PALETTES = Object.freeze(Object.fromEntries(
  Object.entries(ramps).map(([id, [shadow, midtone, highlight, accent, markEdge, aura, rim, markFill = accent]]) => [id,
    Object.freeze({
      shadow, midtone, highlight, spark: accent, core: accent, aura, rim,
      markColors: Object.freeze({ '#': markFill, '+': markEdge }),
    }),
  ]),
));

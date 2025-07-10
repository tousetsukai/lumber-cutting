import { type RgbaColor } from 'colord';

import { lumberSize } from '../constants';

export type Cut = {
  id: number;
  label: string;
  size: number;
  color: RgbaColor; // Don't use Colord here to avoid method deep copy issues
};

export function defaultCut(id: number): Cut {
  return {
    id,
    label: `支柱${id}`,
    size: lumberSize,
    color: {
      r: 240,
      g: 225,
      b: 170,
      a: 1,
    },
  };
}

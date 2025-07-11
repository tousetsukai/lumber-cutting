import { parse } from 'csv-parse/browser/esm/sync';
import { stringify } from 'csv-stringify/browser/esm/sync';

import { type Cut, defaultCut } from '../data/cut';

export function cutsToCsv(cuts: Cut[]): string {
  const data = cuts.map((cut) => ({
    label: cut.label,
    size: cut.size,
    r: cut.color.r,
    g: cut.color.g,
    b: cut.color.b,
    a: cut.color.a,
  }));
  const options = {
    header: true,
  };
  return stringify(data, options);
}

export function csvToCuts(csv: string): Cut[] {
  const options = {
    columns: true,
  };
  const data: Cut[] = parse(csv, options);
  return data.map((cut: Cut, id: number) => {
    const d = defaultCut(id);
    return {
      id,
      label: cut.label || d.label,
      size: cut.size || d.size,
      color: {
        r: (cut.color.r || d.color.r) * 1,
        g: (cut.color.g || d.color.g) * 1,
        b: (cut.color.b || d.color.b) * 1,
        a: (cut.color.a || d.color.a) * 1,
      },
    };
  });
}

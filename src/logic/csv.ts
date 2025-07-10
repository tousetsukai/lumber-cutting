import { stringify } from 'csv-stringify/browser/esm/sync';
import { parse } from 'csv-parse/browser/esm/sync';

import { defaultCut, type Cut } from '../data/cut';

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
  const data: any[] = parse(csv, options);
  return data.map((cut: any, id: number) => {
    const d = defaultCut(id);
    return {
      id,
      label: cut.label || d.label,
      size: cut.size || d.size,
      color: {
        r: (cut.r || d.color.r) * 1,
        g: (cut.g || d.color.g) * 1,
        b: (cut.b || d.color.b) * 1,
        a: (cut.a || d.color.a) * 1,
      },
    };
  });
}

import { colord, extend, type RgbaColor } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';

import { calc } from '../logic/calc';
import { lumberSize } from '../constants';
import { useCutStore } from '../states/cut-store';
import type { Cut } from '../data/cut';

extend([a11yPlugin]);

function Lumber({ rest, cuts }: { rest: number; cuts: Cut[] }) {
  const cutStyles = (cut: Cut) => {
    const l = colord(cut.color).luminance();
    const bc = Math.floor(l * 200);
    return {
      width: `${(cut.size / lumberSize) * 100}%`,
      backgroundColor: colord(cut.color).toRgbString(),
      borderColor: `rgb(${bc} ${bc} ${bc})`,
    };
  };
  const cutSizeStyles = (color: RgbaColor) => {
    const l = colord(color).luminance();
    const bc = Math.floor(l >= 0.5 ? l * 256 - 128 : 243);
    return {
      color: `rgb(${bc} ${bc} ${bc})`,
    };
  };
  const cutColorStyle = (color: RgbaColor) => ({
    backgroundColor: colord(color).toRgbString(),
  });
  return (
    <div className="mt-[3px]">
      <p className="m-0 p-0">
        {cuts.map((cut) => (
          <span key={cut.id} className="mr-[10px]">
            <span
              style={cutColorStyle(cut.color)}
              className="inline-block w-[18px] h-[18px] border-2 border-gray-100 rounded-lg relative top-[3px]"
            ></span>
            <span className="text-[15px]">{cut.label}</span>
            <span className="text-[12px] text-gray-500">({cut.size}mm)</span>
          </span>
        ))}
        <span className="text-[12px] text-gray-500">残り{rest}mm</span>
      </p>
      <div className="w-full h-[22px] leading-[14px] bg-[#f7f1d7] flex">
        {cuts.map((cut) => {
          return (
            <div
              key={cut.id}
              style={cutStyles(cut)}
              className="border-1 border-gray-300 text-center"
            >
              <span
                style={cutSizeStyles(cut.color)}
                className="text-[12px] align-middle"
              >
                {cut.size}mm
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CutOutputs() {
  const store = useCutStore();
  const lumbers = calc(store.all());
  return (
    <ol className="result">
      {lumbers.map((lumber, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Using index as key is acceptable here since the list is static and does not change.
        <li key={i}>
          <p className=" mt-[20px] w-[40px] h-[32px] leading-[32px] text-center text-2xl font-bold text-white bg-[rgb(0,200,200)] rounded-xs">
            {i + 1}
          </p>
          <Lumber {...lumber} />
        </li>
      ))}
    </ol>
  );
}

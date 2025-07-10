import { colord, type RgbaColor } from 'colord';
import { useState } from 'react';
import { SwatchesPicker } from 'react-color';

import { type Cut } from '../data/cut';
import { useCutStore } from '../states/cut-store';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';

function ColorPicker({
  display,
  setDisplay,
  color,
  setColor,
}: {
  display: boolean;
  setDisplay: (display: boolean) => void;
  color: RgbaColor;
  setColor: (color: RgbaColor) => void;
}) {
  return (
    display && (
      <div className="absolute z-2" onClick={() => setDisplay(false)}>
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-transparent" />
        <SwatchesPicker
          className="color-picker"
          onChange={(color) => setColor(colord(color.hex).toRgb())}
          onChangeComplete={(color) => setColor(colord(color.hex).toRgb())}
          color={colord(color).toRgbString()}
        />
      </div>
    )
  );
}

function CutInput({ cut }: { cut: Cut }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const store = useCutStore();
  return (
    <div className="flex gap-2 m-2">
      <div
        style={{ backgroundColor: colord(cut.color).toRgbString() }} // tailwind does not support dynamic class names
        className={`shrink-0 rounded-full w-8 h-8 border-gray-200 border-4 cursor-pointer`}
        onClick={() => setDisplayColorPicker(true)}
      />
      <ColorPicker
        display={displayColorPicker}
        setDisplay={setDisplayColorPicker}
        color={cut.color}
        setColor={(color) => store.updateColor(cut.id, color)}
      />
      <Label className="shrink-0" htmlFor={`label-${cut.id}`}>
        名前
      </Label>
      <Input
        className="max-w-60"
        type="text"
        value={cut.label}
        id={`label-${cut.id}`}
        onChange={(e) => store.updateLabel(cut.id, e.target.value)}
      />
      <Label className="shrink-0" htmlFor={`size-${cut.id}`}>
        長さ(mm)
      </Label>
      <Input
        className="max-w-20"
        type="number"
        value={cut.size}
        id={`size-${cut.id}`}
        min={10}
        max={3650}
        onChange={(e) => store.updateSize(cut.id, Number(e.target.value))}
      />
      <Button className="cursor-pointer text-black bg-gray-100 hover:bg-gray-300" onClick={() => store.copy(cut.id)}>
        コピー
      </Button>
      <Button className="cursor-pointer text-black bg-gray-100 hover:bg-gray-300" onClick={() => store.remove(cut.id)}>
        ✕
      </Button>
    </div>
  );
}

export function CutInputs() {
  const store = useCutStore();
  return (
    <div>
      {store.all().map((cut) => (
        <CutInput key={cut.id} cut={cut} />
      ))}
      <Button className="mt-[10px] cursor-pointer bg-cyan-600 hover:bg-cyan-800" onClick={() => store.add()}>
        追加
      </Button>
    </div>
  );
}

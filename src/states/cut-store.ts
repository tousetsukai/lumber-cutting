import { create } from 'zustand';
import type { RgbaColor } from 'colord';

import { type Cut, defaultCut } from '../data/cut';
import { csvToCuts, cutsToCsv } from '../logic/csv';

type CutStore = {
  nextId: number;
  cuts: Cut[];

  add: () => void;
  remove: (id: number) => void;
  copy: (id: number) => void;
  all: () => Cut[];
  updateLabel: (id: number, label: string) => void;
  updateSize: (id: number, size: number) => void;
  updateColor: (id: number, color: RgbaColor) => void;
  importCsv: (csv: string) => void;
  exportCsv: () => string;
};

export const useCutStore = create<CutStore>((set, get) => ({
  nextId: 1, // 1-origin for high-school students :)
  cuts: [],

  add: () =>
    set((state) => {
      const newCut = defaultCut(state.nextId);
      return {
        nextId: state.nextId + 1,
        cuts: [...state.cuts, newCut],
      };
    }),
  remove: (id) =>
    set((state) => ({
      cuts: state.cuts.filter((cut) => cut.id !== id),
    })),
  copy: (id) =>
    set((state) => {
      const cutToCopy = state.cuts.find((cut) => cut.id === id);
      if (!cutToCopy) return state; // If the cut doesn't exist, do nothing
      const newCut = { ...cutToCopy, id: state.nextId };
      return {
        nextId: state.nextId + 1,
        cuts: [...state.cuts, newCut],
      };
    }),
  all: () => structuredClone(get().cuts),
  updateLabel: (id, label) =>
    set((state) => ({
      cuts: state.cuts.map((cut) => {
        if (cut.id === id) {
          return { ...cut, label };
        }
        return cut;
      }),
    })),
  updateSize: (id, size) =>
    set((state) => ({
      cuts: state.cuts.map((cut) => {
        if (cut.id === id) {
          return { ...cut, size };
        }
        return cut;
      }),
    })),
  updateColor: (id, color) =>
    set((state) => ({
      cuts: state.cuts.map((cut) => {
        if (cut.id === id) {
          return { ...cut, color };
        }
        return cut;
      }),
    })),
  importCsv: (csv) =>
    set((state) => {
      const cuts = csvToCuts(csv);
      return {
        nextId:
          cuts.length > 0
            ? Math.max(...cuts.map((cut) => cut.id)) + 1
            : state.nextId,
        cuts: cuts,
      };
    }),
  exportCsv: () => {
    const cuts = get().cuts;
    return cutsToCsv(cuts);
  },
}));

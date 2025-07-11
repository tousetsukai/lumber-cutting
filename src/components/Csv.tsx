import { useState } from 'react';
import { useCutStore } from '@/states/cut-store';
import { Button } from './ui/button';

export function Csv() {
  const [importArea, setImportArea] = useState('');
  const [completed, setCompleted] = useState(false);
  const cutStore = useCutStore();
  const importCsv = () => {
    cutStore.importCsv(importArea);
    setCompleted(true);
  };
  const exportArea = cutStore.exportCsv();
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImportArea(e.target.value);
    setCompleted(false);
  };

  return (
    <div>
      <div className="mb-[30px]">
        <h2 className="text-2xl mb-4">インポート</h2>
        <p>
          保存したデータを貼り付けて読み込むことができます。データ形式はCSVです
          (Excelなどで作成する場合はヘッダーを label, size, r, g, b, a
          としてください)。
        </p>
        <textarea
          className="w-full h-[200px] border-2 border-gray-300 rounded-sm p-1"
          placeholder={`label,size,r,g,b,a
土台縦,2700,200,230,201,1
...
          `}
          onChange={onChange}
        />
        <div className="mt-[20px]">
          <Button onClick={importCsv}>読み込む</Button>
          {completed && <p>読み込みが完了しました</p>}
        </div>
      </div>
      <hr />
      <div className="mt-[30px]">
        <h2 className="text-2xl mb-4">エクスポート</h2>
        <p>現在の入力データです。コピーして保存してください。</p>
        <textarea
          value={exportArea}
          className="w-full h-[200px] border-2 border-gray-300 rounded-sm p-1"
          readOnly
        />
      </div>
    </div>
  );
}

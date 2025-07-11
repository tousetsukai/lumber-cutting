import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Csv } from './components/Csv';
import { CutInputs } from './components/CutInputs';
import { CutOutputs } from './components/CutOutputs';

function App() {
  return (
    <div className="p-6">
      <Tabs defaultValue="input">
        <TabsList>
          <TabsTrigger value="input">入力</TabsTrigger>
          <TabsTrigger value="output">計算結果</TabsTrigger>
          <TabsTrigger value="csv">インポート/エクスポート</TabsTrigger>
        </TabsList>
        <TabsContent value="input">
          <CutInputs />
        </TabsContent>
        <TabsContent value="output">
          <CutOutputs />
        </TabsContent>
        <TabsContent value="csv">
          <Csv />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;

import Table from '@/app/ui/datasets/table';
import Pagination from '@/app/ui/pagination';
import { fetchDatasets } from '@/app/lib/data';


export default async function Page() {
  const datasets = await fetchDatasets();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Datasets</h1>
      </div>
      <Table />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={datasets.length} />
      </div>
    </div>
  );
}
import Table from '@/app/ui/dataset/table';
import Pagination from '@/app/ui/pagination';
import { fetchDatasetById, fetchQuestionsByPageNum, fetchQuestionsCount } from '@/app/lib/data';


export default async function Page() {
  const dataset = await fetchDatasetById();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>
          Model: {dataset.name}
        </h1>
      </div>
      <Table questions={await fetchQuestionsByPageNum(0)} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={await fetchQuestionsCount()} />
      </div>
    </div>
  );
}
import Table from '@/app/ui/dataset/table';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchDatasetById, fetchQuestionsByPageNum, fetchQuestionsCount } from '@/app/lib/data';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const dataset = await fetchDatasetById();
  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dataset', href: '/datasets' },
          {
            label: 'Dataset',
            href: '',
            active: true,
          },
        ]}
      />
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>
          Dataset: {dataset.name}
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search ..." />
      </div>
      <Table questions={await fetchQuestionsByPageNum(currentPage, query)} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={await fetchQuestionsCount()} />
      </div>
    </div>
  );
}
import Table from '@/app/ui/test/executionsTable';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import { fetchTestById, fetchInstancesByPageNum, fetchExecutionsByPageNum, fetchModelById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { UpdateTest, ViewExecutions, ExecuteTest } from '@/app/ui/tests/buttons';


export default async function Page({
  searchParams, params
}: {
  searchParams?: {
    query?: string;
    page?: string;
  }, params: { id: string };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const test = await fetchTestById(Number(params.id));
  return (
    <div className="w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tests', href: '/tests' },
          {
            label: 'Test Details',
            href: '',
            active: true,
          },
        ]}
      />
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>
          {test.name}
        </h1>
        {/* <UpdateTest id={params.id} type="tests" /> */}
        <ExecuteTest id={params.id} />
      </div>
      <div className="mt-2 flex w-full items-center justify-between">
        <p>
          Model: {(await fetchModelById(test.model)).name}
        </p>
      </div>
      <div className="mt-2 flex w-full items-center justify-between">
        <p>
          Dimensions:
          {test.dimensions.map(dimension => (
            <span
              key={dimension}
              className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 mb-1">
              {dimension}
            </span>
          ))}
        </p>
      </div>
      <div className="mt-4 flex w-full items-center justify-between">
        <h1 className={`text-xl`}>
          Executions:
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search ..." />
      </div>
      <Table executions={await fetchExecutionsByPageNum(currentPage)} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={1} />
      </div>
    </div>
  );
}
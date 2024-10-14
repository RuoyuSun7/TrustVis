import Table from '@/app/ui/tests/table';
import Pagination from '@/app/ui/pagination';
import { fetchTestsByPageNumAndQuery } from '@/app/lib/data';
import { CreateTest } from '@/app/ui/tests/buttons';
import Search from '@/app/ui/search';

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

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Tests</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Test Name..." />
        <CreateTest />
      </div>
      <Table tests={await fetchTestsByPageNumAndQuery(currentPage, query)} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={1} />
      </div>
    </div>
  );
}
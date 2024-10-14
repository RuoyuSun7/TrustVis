import { ViewDetail, UpdateDetail } from '@/app/ui/datasets/buttons';
import { fetchModels } from '@/app/lib/data';
import { redirect } from 'next/navigation';
import { dirname } from 'path';
import { Test } from '@/app/lib/definitions';
import { formatDate } from '@/app/lib/utils';

export default async function TestsTable(
  { tests }: { tests: any[] }

) {
  const models = await fetchModels();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-table-bg-color p-2 md:pt-0">
          <div className="md:hidden">
            {tests?.map((test) => (
              <div
                key={test.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                  </div>
                </div>
                <div className="flex invoiceitems-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium">
                  ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Model
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Dimensions
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Last Executed At
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Results
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Details
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tests?.map((test) => (
                <tr
                  key={test.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {test.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {test.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {models.filter(model => model.id.toString() == test.model)[0].name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {test.dimensions.map(dimension => (
                      <p
                        key={dimension}
                        className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 mb-1">
                        {dimension}
                      </p>
                    ))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDate(new Date(test.lastExecutionDate))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {test.lastExecutionResult}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>Passed {test.lastExecutionTestResultCount.PASSED ?? 0}</p>
                    <p>Failed {test.lastExecutionTestResultCount.FAILED ?? 0}</p>
                    <p>Error {test.lastExecutionTestResultCount.ERROR ?? 0}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateDetail id={test.id} type="tests" />
                      <ViewDetail id={test.id} type="reports" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


import { formatDate } from '@/app/lib/utils';
import { ViewDetail } from '@/app/ui/datasets/buttons';
export default async function ExecutionsTable(
  { executions }: { executions: any }
) {

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-table-bg-color p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium">
                  ID
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Executed At
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Metric
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {executions?.map((execution: any) => (
                <tr
                  key={execution.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {execution.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDate(new Date(execution.executedAt))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {execution.status}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {execution.metric}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex justify-end gap-3">
                      <ViewDetail id={execution.id} type="reports" />
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

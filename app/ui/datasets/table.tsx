import Image from 'next/image';
import { ViewDetail } from '@/app/ui/datasets/buttons';

import { fetchDatasets } from '@/app/lib/data';

export default async function DatasetsTable() {
  const datasets = await fetchDatasets();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-table-bg-color p-2 md:pt-0">
          <div className="md:hidden">
            {datasets?.map((dataset) => (
              <div
                key={dataset.id}
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
                  Created At
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {datasets?.map((dataset) => (
                <tr
                  key={dataset.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {dataset.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {dataset.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {dataset.createdAt}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ViewDetail id={dataset.id} type="datasets" />
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

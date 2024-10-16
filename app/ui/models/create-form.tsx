import { DatasetField, ModelField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CubeIcon,
  BookOpenIcon,
  TableCellsIcon,
  ClockIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createModel } from '@/app/lib/actions';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';

export default function Form({ models }: { models: ModelField[] }) {
  return (
    <form action={createModel}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Set a name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                step="0.01"
                placeholder="Model name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Huggingface Name */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Set the huggingface name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="huggingfaceName"
                name="huggingfaceName"
                type="string"
                step="0.01"
                placeholder="Huggingface name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/models"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add</Button>
      </div>
    </form>
  );
}

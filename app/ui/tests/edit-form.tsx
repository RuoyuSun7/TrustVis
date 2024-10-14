import { ModelField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CubeIcon,
  BookOpenIcon,
  TableCellsIcon,
  ClockIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { updateTest } from '@/app/lib/actions';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid } from '@mui/material';

export default function Form({ model, test }: { model: ModelField, test: any }) {

  const updateTestWithId = updateTest.bind(null, test.id);
  return (
    <form action={updateTestWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Test Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                step="0.01"
                placeholder="Test name"
                defaultValue={test.name}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Model */}
        <div className="mb-4">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <label htmlFor="model" className="mb-2 block text-sm font-medium">
                Model
              </label>
            </Grid>
          </Grid>
          <div className="relative">
            <select
              id="model"
              name="modelId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={test.modelId}
              disabled={true}
            >
              <option value="" disabled>
                Select a Model
              </option>
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            </select>
            <CubeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        {/* Dimension */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Dimensions
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="Safety"
                  name="safety"
                  type="checkbox"
                  value="safety"
                  defaultChecked={test.dimensions.includes('safety')}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  disabled={true}
                />
                <label
                  htmlFor="safety"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Safety <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="robustness"
                  name="robustness"
                  type="checkbox"
                  value="robustness"
                  defaultChecked={test.dimensions.includes('robustness')}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  disabled={true}
                />
                <label
                  htmlFor="robustness"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Robustness <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="hallucination"
                  name="hallucination"
                  type="checkbox"
                  value="hallucination"
                  defaultChecked={test.dimensions.includes('hallucination')}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  disabled={true}
                />
                <label
                  htmlFor="hallucination"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Hallucination <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/tests"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
}

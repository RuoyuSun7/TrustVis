import { EyeIcon, PencilIcon, PlusIcon, TrashIcon, CogIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateTest() {
  return (
    <Link
      href="/tests/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Test</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function ViewExecutions({ id }: { id: string }) {
  return (
    <Link
      href={`/tests/${id}/executions`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">View Executions</span>{' '}
      <EyeIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateTest({ id, type }: { id: string, type: string }) {
  return (
    <Link
      href={"/" + type + "/" + id + "/edit"}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Update</span>{' '}
      <PencilIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function ExecuteTest({ id }: { id: string }) {
  return (
    <Link
      href={"/tests/" + id + "/execute"}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Execute</span>{' '}
      <CogIcon className="h-5 md:ml-4" />
    </Link>
  );
}

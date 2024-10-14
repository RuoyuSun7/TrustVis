import { ArrowRightIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function ViewDetail({ id, type }: { id: number, type: string }) {
  return (
    <Link
      href={"/" + type + "/" + id}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <ArrowRightIcon className="w-5" />
    </Link>
  );
}

export function UpdateDetail({ id, type }: { id: number, type: string }) {
  return (
    <Link
      href={"/" + type + "/" + id + "/edit"}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
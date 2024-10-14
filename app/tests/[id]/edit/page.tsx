import Form from '@/app/ui/tests/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchTestById, fetchModelById } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const [test, model] = await Promise.all([
    fetchTestById(id),
    fetchModelById(),
  ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tests', href: '/tests' },
          {
            label: 'Edit',
            href: `/tests/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form test={test} model={model} />
    </main>
  );
}
import Form from '@/app/ui/tests/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchDatasets, fetchModels } from '@/app/lib/data';

export default async function Page() {
  const datasets = await fetchDatasets();
  const models = await fetchModels();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tests', href: '/tests' },
          {
            label: 'Create Test',
            href: '',
            active: true,
          },
        ]}
      />
      <Form datasets={datasets} models={models} />
    </main>
  );
}
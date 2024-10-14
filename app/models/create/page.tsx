import Form from '@/app/ui/models/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchModels } from '@/app/lib/data';

export default async function Page() {
  const models = await fetchModels();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Models', href: '/models' },
          {
            label: 'Add model',
            href: '',
            active: true,
          },
        ]}
      />
      <Form models={models} />
    </main>
  );
}
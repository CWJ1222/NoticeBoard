'use client';

import ArticleForm from '@/components/ArticleForm';
import BaseLayout from '@/components/BaseLayout';

export default function Create() {
  return (
    <BaseLayout>
      <h1 className='text-2xl font-bold mb-8'>글쓰기</h1>

      <ArticleForm initialValues={{ subject: '', content: '' }} />
    </BaseLayout>
  );
}

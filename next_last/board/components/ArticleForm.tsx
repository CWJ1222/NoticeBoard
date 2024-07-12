'use client';

import BaseLayout from '@/components/BaseLayout';
import auth from '@/net/auth';
import db from '@/net/db';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ArticleFormProps {
  initialValues?: {
    subject?: string;
    content?: string;
  };
}

export default function ArticleForm({ initialValues }: ArticleFormProps) {
  const [subject, setSubject] = useState<string>(initialValues?.subject || '');
  const [content, setContent] = useState<string>(initialValues?.content || '');
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const submit = async () => {
    if (user) {
      await addDoc(collection(db, 'articles'), {
        subject,
        content,
        author: user.email,
        created_at: new Date().getTime(),
      });
      alert('저장되었습니다.');
      setSubject('');
      setContent('');
      router.push('/');
    } else {
      alert('사용자가 인증되지 않았습니다.');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <div className='mb-4'>
          <input
            className='border-b w-full'
            type='text'
            placeholder='제목을 입력하세요.'
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
        </div>

        <div className='mb-4'>
          <textarea
            className='border-b w-full'
            placeholder='내용을 입력하세요.'
            value={content}
            onChange={(event) => setContent(event.target.value)}
          ></textarea>
        </div>
        <div>
          <button className='border p-2' type='button' onClick={submit}>
            전송
          </button>
        </div>
      </form>
    </div>
  );
}

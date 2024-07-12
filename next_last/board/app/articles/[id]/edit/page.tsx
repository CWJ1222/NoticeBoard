'use client';

import BaseLayout from '@/components/BaseLayout';
import db from '@/net/db';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Firestore 문서 데이터 타입 정의
interface Article {
  id: string;
  subject: string;
  author: string;
  created_at: number;
  content: string;
  point?: number;
}

export default function Edit() {
  const [article, setArticle] = useState<Article | null>(null);
  const [subject, setSubject] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      if (!params || !params.id) {
        console.error('No article ID provided');
        return;
      }
      const docRef = doc(db, `articles/${params.id}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as Omit<Article, 'id'>;
        setArticle({ id: docSnap.id, ...data });
        setSubject(data.subject);
        setContent(data.content);
      }
    };

    fetchArticle();
  }, [params.id]);

  const updateArticle = async () => {
    if (article) {
      const docRef = doc(db, `articles/${article.id}`);
      await updateDoc(docRef, {
        subject,
        content,
      });
      alert('수정되었습니다.');
      router.push('/'); // 메인 페이지로 이동
    }
  };

  return (
    <BaseLayout>
      <div>
        <h1>게시물 수정</h1>
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
          <button className='border p-2' onClick={updateArticle}>
            수정
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}

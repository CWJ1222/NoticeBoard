'use client';

import BaseLayout from '@/components/BaseLayout';
import db from '@/net/db';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Firestore 문서 데이터 타입 정의
interface Article {
  id?: string;
  subject?: string;
  author?: string;
  created_at?: number;
  content?: string | number;
  point?: number; // Firestore 타임스탬프는 milliseconds로 처리
}

type Params = { params: { id: string } };
export default function Articles({ params }: Params) {
  const [list, setList] = useState<Article[]>([]);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('created_at', 'desc'));
    const unsubscribe = onSnapshot(q, (results) => {
      const newList: Article[] = [];
      results.forEach((doc) => {
        const data = doc.data() as Omit<Article, 'id'>; // 문서 데이터를 가져오면서 id를 제외한 타입 적용
        newList.push({
          id: doc.id,
          ...data,
        });
      });
      setList(newList);
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, []);

  const finalData = list.find((object: Article) => object.id === params.id);

  const handleDelete = async () => {
    if (!finalData || !finalData.id) return;

    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const docRef = doc(db, 'articles', finalData.id);
      await deleteDoc(docRef);
      router.push('/'); // 삭제 후 메인 페이지로 이동
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  return (
    <BaseLayout>
      <ul>
        <>
          <h1>게시글</h1>
          <h1>제목: {finalData?.subject}</h1>
          <h2>작성자: {finalData?.author}</h2>
          <h3>내용:</h3>
          <div className='border border-solid'>{finalData?.content}</div>
          <div className='mb-8 w-full flex justify-end'>
            <Link href={`/articles/${finalData?.id}/edit`}>
              <button>수정하기</button>
            </Link>
            <button onClick={handleDelete}>삭제하기</button>
          </div>
        </>
      </ul>
    </BaseLayout>
  );
}

# 📌 NoticeBoard

**NoticeBoard**는 사용자가 자유롭게 게시글을 작성하고 관리할 수 있는 **게시판 웹 애플리케이션**입니다.  
게시글을 작성할 때 **코인을 사용하며**, 시간이 지나면 코인이 자동으로 감소합니다.  
또한, **회원가입/로그인 시스템, 결제 시스템(TossPayments), 실시간 데이터 반영** 기능을 포함하고 있습니다.

---

## 🚀 주요 기능

| 기능명            | 설명                                     |
| ----------------- | ---------------------------------------- |
| 회원가입 / 로그인 | 이메일 인증을 통한 사용자 가입 및 로그인 |
| 게시글 작성       | 코인을 소모하여 게시글 작성              |
| 게시글 자동 갱신  | 1분마다 게시글의 코인이 자동 감소        |
| 댓글 및 좋아요    | 게시글에 댓글을 달고 좋아요 추가 가능    |
| 코인 충전         | TossPayments를 이용한 결제 시스템        |
| 실시간 반영       | API 요청을 통해 데이터 즉시 업데이트     |

---

## 🏗 프로젝트 폴더 구조

```sh
src/
│── app/                    # Next.js App Router (최신 방식 적용)
│── components/              # UI 및 기능별 컴포넌트
│   ├── Auth/                # 로그인 / 회원가입 관련 UI
│   ├── Board/               # 게시판 관련 UI
│   ├── Layout/              # 헤더 및 레이아웃
│── hooks/                   # 커스텀 훅 (ex: useAuth)
│── middleware/              # 인증 미들웨어
│── pages/                   # Next.js Pages Router
│   ├── api/                 # API 라우트 (백엔드 기능)
│   │   ├── auth/            # 인증 API
│   │   ├── board/           # 게시판 API
│   │   ├── payments/        # 결제 API
│── services/                # API 호출을 처리하는 서비스 계층
│── types/                   # 공통 타입 정의
│── utils/                   # 공통 유틸리티 함수 (DB, Auth 등)
│── public/                  # 정적 파일 (이미지, 아이콘)
│── styles/                  # CSS 및 Tailwind 설정
│── .env                     # 환경 변수 파일
│── package.json             # 프로젝트 패키지 설정
```

---

## 💾 데이터베이스 테이블 구조

### 1️⃣ `users` (사용자 테이블)

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(50) UNIQUE NOT NULL,
    coin INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2️⃣ `posts` (게시글 테이블)

```sql
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    coin INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 3️⃣ 코인 자동 차감 이벤트

```sql
CREATE EVENT decrease_coin_event
ON SCHEDULE EVERY 1 MINUTE
DO
BEGIN
    UPDATE posts
    SET coin = coin - 1
    WHERE coin > 0;
END;
```

---

## 🛠 실행 방법

### 1️⃣ 환경 변수 설정

`.env` 파일을 프로젝트 루트에 생성하고, 정보를 입력하세요.

### 2️⃣ 프로젝트 실행

✅ Yarn 사용

```sh
yarn install
yarn dev
```

✅ PM2를 이용한 실행 (서버 유지)

```sh
pm2 start npm --name "NoticeBoard" -- run dev
```

### PM2 프로세스 관리

```sh
pm2 stop NoticeBoard   # 실행 중지
pm2 delete NoticeBoard # 프로세스 삭제
```

---

## 📌 결제 시스템 (TossPayments)

사용자는 TossPayments API를 통해 코인을 충전할 수 있습니다.

```js
const tossPayments = await loadTossPayments(clientKey);
await tossPayments.requestPayment('카드', {
  amount: 3000,
  orderId: 'random-order-id',
  orderName: '300코인',
  successUrl: `${window.location.origin}/api/payments/payments?email=${user?.email}`,
  failUrl: `${window.location.origin}/api/payments/fail`,
});
```

---

## 📌 기타 참고 사항

- `BoardList.tsx`에서는 페이지네이션이 적용되어 있으며, 10개씩 게시글을 불러옵니다.
- `authMiddleware.ts`를 통해 API 호출 시 JWT 인증을 체크합니다.
- `update-coin.tsx`는 API 라우트로 잘못된 확장자 (`.tsx → .ts` 변경 필요).
- 불필요한 페이지 및 폴더를 정리하며 프로젝트 주고 개선 예정.

---

## 📢 발표자료 링크

[프로젝트 발표자료 보기](https://www.canva.com/design/DAGLkLZDbwI/3SH81PzVFhnq-v3eldi3VA/view?utm_content=DAGLkLZDbwI&utm_campaign=share_your_design&utm_medium=link&utm_source=shareyourdesignpanel)

---

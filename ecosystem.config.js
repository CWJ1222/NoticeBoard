module.exports = {
  apps: [
    {
      name: 'NoticeBoard',
      script: 'yarn',
      args: 'dev',
      watch: true, // 파일 변경 감지하여 자동 재시작
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
    },
  ],
};

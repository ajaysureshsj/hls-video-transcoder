# 🎞️ HLS Transcoder Service

A production-ready, containerized backend service that listens to AWS SQS for new video uploads in S3 and automatically triggers an ECS Fargate task to transcode the video into HLS format.

---

## 🚀 Overview

This service is designed to be a scalable **video processing pipeline** for adaptive streaming. When a raw video is uploaded to S3, an S3 event is sent to an SQS queue. This app polls the queue, extracts the event, and launches a transcoding ECS task with appropriate metadata.

**Built with:**
- **TypeScript (ES Modules)**
- **AWS SDK v3**
- **SQS + S3 + ECS Fargate**
- **Node.js v18+**
- **Modular OOP Architecture**

---

## 🧱 Architecture

```txt
[S3 Upload]
     ⬇️
[SQS Queue ← S3 Event]
     ⬇️
[hls-transcoder-service (this app)]
     ⬇️
[ECS Fargate Task: FFmpeg Worker Container]
     ⬇️
[Output stored in S3 (HLS .m3u8 + .ts)]
````

---

## 📁 Project Structure

```
hls-transcoder-service/
├── src/
│   ├── app/                 # App orchestrator
│   ├── services/            # SQS and ECS clients
│   ├── utils/               # Event parser
│   └── index.ts             # Entry point
├── dist/                    # Compiled output
├── .env                     # Environment config
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Setup & Usage

### 1. 🧬 Clone the repo

```bash
git clone https://github.com/your-username/hls-transcoder-service.git
cd hls-transcoder-service
```

### 2. 🛠️ Install dependencies

```bash
npm install
```

### 3. 🔐 Configure environment variables

Create a `.env` file in the root:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

SQS_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/123456789012/your-queue-name
ECS_TASK_DEFINITION=arn:aws:ecs:us-east-1:123456789012:task-definition/video-transcoder
ECS_CLUSTER=arn:aws:ecs:us-east-1:123456789012:cluster/your-cluster
SECURITY_GROUPS=sg-0123456789abcdef0
SUBNETS=subnet-abc123,subnet-def456
CONTAINER_NAME=video-transcoder
```

> ✅ Use IAM Roles or Secrets Manager in production environments.

### 4. 🧪 Run in development

```bash
npm run dev
```

### 5. 🚀 Build & Run in production

```bash
npm run build
npm start
```

---

## 🧪 Example Output

```bash
Message received: { MessageId: 'abc-123' }
Spawning ECS task for: s3://my-bucket/input.mp4
Transcode task started.
```

---

## 🧰 Scripts

| Command         | Description                 |
| --------------- | --------------------------- |
| `npm run dev`   | Watch + compile on save     |
| `npm run build` | Compile TS to JS in `/dist` |
| `npm start`     | Run the compiled app        |

---

## 📦 Future Improvements

* ✅ Retry mechanism for failed ECS tasks
* ✅ Dead-letter queue support
* ⏳ Health check endpoint
* ⏳ Monitoring with CloudWatch
* ⏳ Multi-resolution HLS support

---

## 👨‍💻 Author

**Ajay Suresh SJ**
B.Tech, NIT Calicut
Backend Engineering | DevOps | Distributed Systems
[LinkedIn](https://linkedin.com/in/ajaysureshsj)

---



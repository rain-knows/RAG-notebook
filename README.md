# Personal AI Agent Notebook

一个面向个人知识管理场景的 AI Agent 项目。它把「笔记」「知识库」「长期记忆」「每日回顾」和「Agent 工具调用」整合到同一个工作台里，让 AI 不只是回答问题，而是能围绕个人资料、个人笔记和个人学习节奏持续工作。

这个项目由前端应用、FastAPI Agent/RAG 服务、Django 用户服务组成，重点展示我在 AI 应用工程中的完整实践：RAG 检索增强、LangChain Agent、流式响应、用户级数据隔离、知识库管理、AI 写作辅助、间隔重复回顾和前后端工程化落地。

## 项目定位

**Personal AI Agent Notebook** 是我的个人 AI Agent 知识工作台。

它解决的问题不是「上传文档然后问答」这么简单，而是把个人知识沉淀成可被 Agent 调用的长期上下文：

- 写笔记时，AI 可以续写、扩写、总结和推荐相关内容。
- 查资料时，Agent 可以同时检索知识库文档和个人笔记。
- 学习后，系统会按间隔重复机制提醒回顾。
- 对话时，Agent 可以调用工具查询笔记、创建笔记、获取今日回顾、检索知识库并生成带来源的回答。

## 核心亮点

### AI Agent 工具系统

后端通过 LangChain `AgentExecutor` 构建可扩展的工具调用 Agent，并将当前用户上下文注入工具链中。Agent 默认具备以下能力：

- RAG 摘要与知识库问答
- 当前时间查询
- 用户信息解析
- 个人笔记语义搜索
- 笔记统计
- 今日待回顾笔记查询
- 标记笔记已回顾
- 创建新笔记
- 获取关联笔记和知识库片段

Agent 支持 SSE 流式输出，并能把检索、HyDE、重排序、总结等中间过程实时推送到前端。

### 个人 RAG 知识库

项目支持将个人文档接入向量数据库，形成用户私有知识库：

- 支持 `txt`、`pdf`、`md`、`pptx`、`docx`
- 基于 ChromaDB 存储知识向量
- 使用 HyDE 生成假设性回答增强召回
- 支持向量检索与 BM25 混合检索
- 通过重排序模型提升中文检索质量
- 回答结果保留知识来源，方便追溯

### 笔记即长期记忆

笔记不是静态文本，而是 Agent 可以使用的长期记忆层：

- Markdown / 富文本编辑
- 自动标签和分类
- 语义搜索
- 关联内容推荐
- AI 续写、扩写、总结
- 创建后自动进入向量索引
- 与知识库文档共同参与 RAG 检索

### 每日回顾系统

项目内置基于艾宾浩斯遗忘曲线的回顾机制，让个人知识管理从「记录」走向「复习」：

- 生成每日待回顾笔记
- 记录回顾次数
- 按 1 / 2 / 4 / 7 / 15 / 30 天推进下次回顾时间
- Agent 可以查询和标记回顾状态

### 用户隔离与工程闭环

系统以用户为边界组织数据：

- Django 用户服务负责注册、登录和 JWT 鉴权
- FastAPI 服务通过 JWT 获取当前用户
- 知识库、笔记、会话和回顾数据按用户隔离
- MySQL 存储业务数据和会话历史
- Redis 用于缓存、限流和异步任务支撑

## 功能预览

| 模块 | 说明 | 截图 |
| --- | --- | --- |
| AI 对话 | Agent 流式问答、工具调用、知识库引用 | ![AI Chat](./images/aichat.png) |
| 笔记编辑 | AI 写作辅助、关联推荐、Markdown 编辑 | ![Note Editor](./images/editor_note.png) |
| 笔记管理 | 标签、分类、语义搜索、列表管理 | ![Notes](./images/note.png) |
| 知识库 | 文档上传、切片管理、检索增强 | ![Knowledge Base](./images/knowledge_manager.png) |

## 技术架构

```text
Personal AI Agent Notebook
├── front                    React + TypeScript 前端工作台
├── backend                  FastAPI + LangChain Agent/RAG 服务
├── DjangoUserService        Django 用户与文件服务
├── MySQL                    用户、笔记、回顾、会话数据
├── Redis                    缓存、限流、异步任务
├── ChromaDB                 知识库与笔记向量存储
└── LLM Provider             DashScope / Ollama
```

### 后端 Agent/RAG 服务

- FastAPI 提供核心 API
- LangChain 负责 Agent、工具调用和模型编排
- ChromaDB 管理向量数据
- SQLAlchemy 异步 ORM 管理业务数据
- DashScope / Ollama 支持云端与本地模型切换
- Hugging Face / ModelScope 支持重排序模型

### 前端工作台

- React 19 + TypeScript + Vite
- Tailwind CSS 构建界面
- Tiptap 提供编辑器能力
- Zustand 管理用户、会话、主题和语言状态
- i18next 支持中英文切换
- SSE 实现 Agent 流式响应

### 用户服务

- Django 提供注册、登录、用户信息和头像上传
- JWT 与 FastAPI 服务打通
- MySQL 存储用户数据
- Redis / Celery 支撑异步和缓存能力

## 项目结构

```text
.
├── backend/
│   ├── app/
│   │   ├── agent/                 # Agent 工厂、工具、中间件
│   │   ├── rag/                   # RAG、检索器、向量库、文档处理
│   │   ├── router/                # FastAPI 路由
│   │   ├── services/              # 笔记、回顾、会话等业务服务
│   │   ├── models/                # SQLAlchemy 模型
│   │   ├── prompt/                # Agent/RAG/写作提示词
│   │   ├── config/                # RAG、Chroma、Prompt 配置
│   │   └── utils/                 # 文件、模型、鉴权等工具
│   ├── main.py
│   └── pyproject.toml
├── DjangoUserService/
│   ├── apps/user/                 # 注册、登录、认证
│   ├── apps/file/                 # 文件与头像服务
│   └── manage.py
├── front/
│   ├── src/api/                   # API 请求层
│   ├── src/components/            # 通用、笔记、知识库组件
│   ├── src/pages/                 # 页面
│   ├── src/stores/                # Zustand 状态
│   ├── src/router/                # 路由
│   └── package.json
├── docs/                          # 补充文档
└── images/                        # 项目截图
```

## 快速启动

### 环境要求

| 依赖 | 建议版本 |
| --- | --- |
| Python | 3.12+ |
| uv | 0.11+ |
| Node.js | 18+ |
| MySQL | 8.x |
| Redis | 6.x+ |
| Ollama | 可选，本地模型模式需要 |

### 1. 启动基础服务

请先确保 MySQL、Redis 已启动。如果使用本地模型，还需要启动 Ollama：

```bash
ollama serve
```

### 2. 配置 FastAPI 服务

在 `backend/.env` 中配置模型、数据库和用户服务地址：

```env
LLM_TYPE=ALIYUN
ALIYUN_ACCESS_KEY_SECRET=your_dashscope_key
ALIYUN_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
ALIYUN_MODEL_NAME=qwen3-max

OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL_NAME=qwen3.5:0.8b

MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=chat_history

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0

DJANGO_API_URL=http://127.0.0.1:8001
SECRET_KEY=your_jwt_secret
ALGORITHM=HS256
RERANKER_MODEL_PATH=D:\models\bge-reranker-v2-m3
```

安装并启动：

```bash
cd backend
uv sync
uv run uvicorn main:app --reload --port 8000
```

### 3. 配置 Django 用户服务

在 `DjangoUserService/.env` 中配置：

```env
JWT_SECRET_KEY=your_jwt_secret

DB_HOST=localhost
DB_PORT=3306
DB_NAME=user_service
DB_USER=root
DB_PASSWORD=root

CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0
REDIS_CACHE_URL=redis://localhost:6379/1
```

初始化数据库并启动：

```bash
cd DjangoUserService
uv sync
uv run python manage.py makemigrations
uv run python manage.py migrate
uv run python manage.py runserver 8001
```

### 4. 启动前端

```bash
cd front
npm install
npm run dev
```

默认访问地址：

- 前端应用：http://localhost:3000
- FastAPI 文档：http://localhost:8000/docs
- Django 用户服务：http://localhost:8001

## API 入口

| 能力 | 路径 |
| --- | --- |
| Agent 流式对话 | `POST /chat/agent/query/stream` |
| RAG 问答 | `POST /chat/rag/query` |
| 会话历史 | `GET /chat/session/{session_id}` |
| 知识库管理 | `/knowledge/*` |
| 笔记管理 | `/notes/*` |
| 每日回顾 | `/review/*` |
| 用户认证 | `DjangoUserService/apps/user` |

完整接口可查看：

- [FastAPI OpenAPI](./backend/openapi.json)
- [Django 用户服务 API](./DjangoUserService/api.md)

## 适合作品集展示的能力点

- 从 0 到 1 搭建可运行的 AI Agent 产品
- 将 RAG 从 demo 扩展为个人知识管理场景
- 设计 Agent 工具集，并处理用户上下文隔离
- 实现 SSE 流式响应和思考过程可视化
- 接入 HyDE、混合检索、重排序和来源追溯
- 将笔记系统、知识库系统、回顾系统统一到 Agent 工作流
- 使用 FastAPI、Django、React、MySQL、Redis、ChromaDB 完成完整工程闭环

## 后续计划

- 增加更多 Agent 工具，例如任务拆解、学习计划、自动日报
- 增强文档解析质量，优化 PDF 图文混合场景
- 增加多知识库空间和分享机制
- 引入更细粒度的权限与审计
- 完善自动化测试和部署脚本

## License

本项目基于 MIT 协议开源，详见 [LICENSE](./LICENSE)。

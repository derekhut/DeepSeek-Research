# AI Camp 深度研究助手

一个基于DeepSeek模型的现代化交互式研究助手网页界面。该项目利用Next.js和shadcn/ui构建，为用户提供直观、美观的研究体验。

## 概述

AI Camp 深度研究助手是一个AI驱动的研究工具，专为教学和研究目的设计。该项目基于Next.js和shadcn/ui构建现代网页界面，可使用自己的API密钥托管和使用。

系统结合了搜索引擎、网页抓取和大型语言模型（通过DeepSeek和OpenAI）来对任何主题进行深入研究。主要功能包括：

- **智能研究流程:**

  - 通过递归深入探索主题执行迭代研究
  - 使用大型语言模型根据研究目标生成有针对性的搜索查询
  - 创建后续问题以更好地理解研究需求
  - 并行处理多个搜索和结果以提高效率
  - 可配置深度和广度参数以控制研究范围

- **研究输出:**

  - 生成包含发现和来源的详细markdown报告
  - 实时跟踪研究步骤的进度
  - 内置markdown查看器用于审阅结果
  - 可下载的研究报告

- **现代界面:**
  - 用于调整研究参数的交互式控件
  - 提供研究进度的可视化反馈
  - 使用HTTP-only cookie安全存储API密钥

系统提供了直观的可视化界面来控制和监控研究过程，使研究变得更加高效和易于理解。

## 支持模型

本项目支持多种AI模型：

- **OpenAI模型** - 包括GPT-4o和GPT-3.5 Turbo
- **DeepSeek模型** - 集成DeepSeek V3

## Getting Started

### 前提条件

- Node.js v14或更高版本
- OpenAI、DeepSeek和FireCrawl的API密钥

### Installation

1. **Clone and Install**

   ```bash
   git clone https://github.com/SCLS-AI-Camp/DeepSeek-Research.git
   cd open-deep-research
   npm install
   ```

2. **配置环境**

   创建`.env.local`文件并添加：

   ```bash
   OPENAI_API_KEY=your-openai-api-key
   DEEPSEEK_API_KEY=your-deepseek-api-key
   FIRECRAWL_KEY=your-firecrawl-api-key
   NEXT_PUBLIC_ENABLE_API_KEYS=false  # 设置为false禁用API密钥对话框
   ```

3. **Run the App**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000)

## API密钥管理

默认情况下（`NEXT_PUBLIC_ENABLE_API_KEYS=true`），应用程序包含一个API密钥输入对话框，允许用户使用自己的API密钥直接在浏览器中试用研究助手。密钥安全地存储在HTTP-only cookie中，不会暴露给客户端JavaScript。

对于自己的部署，可以通过设置`NEXT_PUBLIC_ENABLE_API_KEYS=false`来禁用此对话框，并在`.env.local`文件中直接配置API密钥。

## 许可证

MIT许可证。您可以根据需要自由使用和修改代码用于自己的项目。

## 致谢

- **工具:** Next.js, shadcn/ui, Vercel AI SDK
- **模型集成:** OpenAI, DeepSeek

祝您研究愉快！

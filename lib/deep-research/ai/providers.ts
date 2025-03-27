import { createOpenAI } from "@ai-sdk/openai";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { getEncoding } from "js-tiktoken";

import { RecursiveCharacterTextSplitter } from "./text-splitter";

// Model Display Information
export const AI_MODEL_DISPLAY = {
  "gpt-4o": {
    id: "gpt-4o",
    name: "GPT-4o",
    logo: "/providers/openai.webp",
    vision: true,
    provider: "openai",
  },
  "gpt-4o-mini": {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    logo: "/providers/openai.webp",
    vision: true,
    provider: "openai",
  },
  "o3-mini": {
    id: "o3-mini",
    name: "o3 mini",
    logo: "/providers/openai.webp",
    vision: false,
    provider: "openai",
  },
  // DeepSeek Models
  "deepseek-chat": {
    id: "deepseek-chat",
    name: "DeepSeek V3",
    logo: "/providers/openai.webp",
    vision: false,
    provider: "deepseek",
  },
} as const;

// 每个模型都包含provider属性

export type AIModel = keyof typeof AI_MODEL_DISPLAY;
export type AIModelDisplayInfo = (typeof AI_MODEL_DISPLAY)[AIModel];
export const availableModels = Object.values(AI_MODEL_DISPLAY);

// OpenAI Client
const openai = createOpenAI({
  apiKey: process.env.OPENAI_KEY!,
});

// DeepSeek Client
const deepseekClient = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY || "",
});

// Create model instances with configurations
export function createModel(modelId: AIModel, apiKey?: string) {
  const modelInfo = AI_MODEL_DISPLAY[modelId];

  // Handle DeepSeek models
  if (modelInfo?.provider === "deepseek") {
    return deepseekClient(modelId as any);
  }

  // Handle OpenAI models
  const client = createOpenAI({
    apiKey: apiKey || process.env.OPENAI_KEY!,
  });

  return client(modelId, {
    structuredOutputs: true,
    ...(modelId === "o3-mini" ? { reasoningEffort: "medium" } : {}),
  });
}

// Token handling
const MinChunkSize = 140;
const encoder = getEncoding("o200k_base");

// trim prompt to maximum context size
export function trimPrompt(prompt: string, contextSize = 120_000) {
  if (!prompt) {
    return "";
  }

  const length = encoder.encode(prompt).length;
  if (length <= contextSize) {
    return prompt;
  }

  const overflowTokens = length - contextSize;
  // on average it's 3 characters per token, so multiply by 3 to get a rough estimate of the number of characters
  const chunkSize = prompt.length - overflowTokens * 3;
  if (chunkSize < MinChunkSize) {
    return prompt.slice(0, MinChunkSize);
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap: 0,
  });
  const trimmedPrompt = splitter.splitText(prompt)[0] ?? "";

  // last catch, there's a chance that the trimmed prompt is same length as the original prompt, due to how tokens are split & innerworkings of the splitter, handle this case by just doing a hard cut
  if (trimmedPrompt.length === prompt.length) {
    return trimPrompt(prompt.slice(0, chunkSize), contextSize);
  }

  // recursively trim until the prompt is within the context size
  return trimPrompt(trimmedPrompt, contextSize);
}

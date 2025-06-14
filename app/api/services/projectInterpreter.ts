import { ChatCompletionMessageParam } from 'openai/resources';
import { GenerationPlan } from '../types/generation';
import openai from '../openai';

export async function interpretProjectRequirements(
  projectName: string,
  description: string,
  options: Record<string, unknown> = {}
) {
  const systemMessage = `You are an expert software architect specializing in React and TypeScript applications.
Your task is to create a detailed project generation plan.
Analyze the requirements and create a structured response that includes:
1. Project overview and core features
2. File structure modifications needed
3. New files to be created
4. Existing files to be modified
5. Dependencies to be added/updated

Format your response as a markdown document with clear sections.`;

  const userMessage = `Create a project plan for:
Project Name: ${projectName}
Description: ${description}
Options: ${JSON.stringify(options, null, 2)}

Base template: vite-shadcn (React + TypeScript + Tailwind CSS)`;

  const messages: ChatCompletionMessageParam[] = [
    { role: 'system', content: systemMessage },
    { role: 'user', content: userMessage },
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages,
    temperature: 0.7,
    max_tokens: 1500,
  });

  return completion.choices[0]?.message?.content || null;
}

export async function generateCodePlan(interpretedPlan: string) {
  const systemMessage = `You are an expert code generator specialized in React and TypeScript.
Analyze the provided project plan and create specific code generation steps.
For each file:
1. Specify exact path relative to project root
2. Provide complete file content or required modifications
3. Include clear descriptions of changes
4. List any new dependencies needed

Format your response as a JSON object matching the GenerationPlan type.`;

  const messages: ChatCompletionMessageParam[] = [
    { role: 'system', content: systemMessage },
    { role: 'user', content: interpretedPlan },
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages,
    temperature: 0.2,
    max_tokens: 2000,
  });

  try {
    const content = completion.choices[0]?.message?.content || '';
    return JSON.parse(content) as GenerationPlan;
  } catch (e) {
    console.error('Failed to parse generation plan:', e);
    throw new Error('Invalid generation plan format');
  }
}

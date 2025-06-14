import { NextRequest, NextResponse } from 'next/server';
import { interpretProjectRequirements, generateCodePlan } from './services/projectInterpreter';
// import type { GenerationPlan } from './types/generation';

// This endpoint acts as middleware to connect project generation requests to the vite-shadcn template
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectName, description, options } = body;

    if (!projectName || !description) {
      return NextResponse.json(
        { status: 'error', error: 'Project name and description are required' },
        { status: 400 }
      );
    }

    // Step 1: Interpret the project requirements
    const interpretedPlan = await interpretProjectRequirements(projectName, description, options);

    if (!interpretedPlan) {
      return NextResponse.json(
        { status: 'error', error: 'Failed to generate project plan' },
        { status: 500 }
      );
    }

    // Step 2: Generate specific code plan
    const generationPlan = await generateCodePlan(interpretedPlan);

    // TODO: Step 3 - Implement the actual template modifications based on generationPlan

    return NextResponse.json({
      status: 'success',
      message: `Project '${projectName}' plan generated successfully`,
      interpretedPlan,
      generationPlan,
    });
  } catch (error) {
    console.error('Project generation error:', error);
    return NextResponse.json({ status: 'error', error: String(error) }, { status: 500 });
  }
}

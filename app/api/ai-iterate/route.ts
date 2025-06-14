import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// This API route serves as middleware for AI iterations of projects
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Get authentication session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const { projectId, iterationPrompt } = body;

    if (!projectId || !iterationPrompt) {
      return NextResponse.json(
        { error: 'Missing required fields: projectId and iterationPrompt' },
        { status: 400 }
      );
    }

    // Fetch the project to verify ownership
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .eq('user_id', session.user.id)
      .single();

    if (projectError || !project) {
      return NextResponse.json({ error: 'Project not found or not owned by you' }, { status: 404 });
    }

    // Record the iteration request in the database
    const { data: iteration, error: iterationError } = await supabase
      .from('project_iterations')
      .insert({
        project_id: projectId,
        prompt: iterationPrompt,
        status: 'pending',
        user_id: session.user.id,
      })
      .select()
      .single();

    if (iterationError) {
      console.error('Error creating iteration:', iterationError);
      return NextResponse.json({ error: 'Failed to create iteration' }, { status: 500 });
    }

    // In a real implementation, you would:
    // 1. Queue the iteration job (using a task queue like Celery, Bull, etc.)
    // 2. Return immediately with a job ID for the client to poll

    // For demo purposes, we'll simulate a successful iteration
    const { data: updatedIteration, error: updateError } = await supabase
      .from('project_iterations')
      .update({
        status: 'completed',
        result: JSON.stringify({
          changes: [
            { file: 'src/App.jsx', change: 'Updated component structure' },
            { file: 'src/styles.css', change: 'Improved styling based on feedback' },
          ],
          summary: `Applied changes for: ${iterationPrompt}`,
        }),
        completed_at: new Date().toISOString(),
      })
      .eq('id', iteration.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating iteration:', updateError);
      return NextResponse.json({ error: 'Failed to process iteration' }, { status: 500 });
    }

    // Return success response
    return NextResponse.json({
      message: 'Project iteration successful',
      iteration: updatedIteration,
      project: {
        id: project.id,
        title: project.title,
        preview_url: project.preview_url || `/api/preview/${project.id}`,
      },
    });
  } catch (error) {
    console.error('Error in AI iteration:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

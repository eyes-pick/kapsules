import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

// This API route serves project previews in an iframe
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;

  try {
    const projectId = params.id;
    if (!projectId) {
      return new NextResponse('Project ID is required', { status: 400 });
    }

    const supabase = await createClient();

    // Get project data
    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (error || !project) {
      console.error('Error fetching project:', error);
      return new NextResponse('Project not found', { status: 404 });
    }

    // If project is built and has a Docker container, check if it's running
    if (project.build_status === 'built' && project.docker_image_id) {
      // TODO: In a real implementation, check if Docker container is running
      // and proxy to it if available. For now, we'll still show the preview.

      // If there's a specific preview URL (e.g., from Docker container), redirect to it
      if (project.preview_url && project.preview_url.startsWith('http')) {
        return NextResponse.redirect(project.preview_url);
      }
    }

    // If project is still building, show building status
    if (project.build_status === 'building') {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Building ${project.title}...</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .container {
              text-align: center;
              padding: 2rem;
            }
            .spinner {
              border: 4px solid rgba(255,255,255,0.3);
              border-radius: 50%;
              border-top: 4px solid #fff;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin: 0 auto 1rem;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            h1 { margin-bottom: 1rem; }
            p { opacity: 0.9; }
          </style>
          <script>
            // Auto-refresh every 5 seconds while building
            setTimeout(() => location.reload(), 5000);
          </script>
        </head>
        <body>
          <div class="container">
            <div class="spinner"></div>
            <h1>Building ${project.title}</h1>
            <p>Your project is being built and deployed...</p>
            <p>This page will refresh automatically.</p>
          </div>
        </body>
        </html>
      `,
        {
          headers: { 'Content-Type': 'text/html' },
        }
      );
    }

    // If build failed, show error page
    if (project.build_status === 'failed') {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Build Failed - ${project.title}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
              color: white;
            }
            .container {
              text-align: center;
              padding: 2rem;
              max-width: 600px;
            }
            .icon {
              font-size: 4rem;
              margin-bottom: 1rem;
            }
            h1 { margin-bottom: 1rem; }
            p { opacity: 0.9; margin-bottom: 1rem; }
            .logs {
              background: rgba(0,0,0,0.3);
              padding: 1rem;
              border-radius: 8px;
              margin: 1rem 0;
              text-align: left;
              font-family: monospace;
              font-size: 0.9rem;
              max-height: 200px;
              overflow-y: auto;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon">⚠️</div>
            <h1>Build Failed</h1>
            <p>There was an error building ${project.title}.</p>
            ${project.build_logs ? `<div class="logs">${project.build_logs}</div>` : ''}
            <p>Please try regenerating the project or contact support if the issue persists.</p>
          </div>
        </body>
        </html>
      `,
        {
          headers: { 'Content-Type': 'text/html' },
        }
      );
    }
    // For built projects, show the enhanced preview
    const previewHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${project.title || 'Project Preview'}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
            color: #333;
          }
          header {
            border-bottom: 1px solid #eaeaea;
            padding-bottom: 1rem;
            margin-bottom: 2rem;
          }
          .card {
            border: 1px solid #eaeaea;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            background-color: #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }
          .card-title {
            margin-top: 0;
            color: #0070f3;
          }
          .badge {
            display: inline-block;
            background-color: #eaf5ff;
            color: #0070f3;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.875rem;
            margin-right: 0.5rem;
          }
          .timestamp {
            color: #666;
            font-size: 0.875rem;
          }
          .description {
            color: #666;
            line-height: 1.5;
          }
          .source-code {
            background-color: #f7f7f7;
            border-radius: 6px;
            padding: 1rem;
            overflow: auto;
            font-family: monospace;
            margin: 1rem 0;
          }
          .footer {
            margin-top: 3rem;
            text-align: center;
            color: #666;
            font-size: 0.875rem;
          }
          button {
            background-color: #0070f3;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.875rem;
          }
          button:hover {
            background-color: #0051cc;
          }
          .files {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>${project.title || 'Project Preview'}</h1>
          <p class="timestamp">Generated on ${new Date(project.created_at).toLocaleString()}</p>
          <div>
            ${(project.tags || []).map((tag: string) => `<span class="badge">${tag}</span>`).join('')}
          </div>
        </header>

        <main>
          <div class="card">
            <h2 class="card-title">Project Description</h2>
            <p class="description">${project.description || 'No description available'}</p>
          </div>

          <div class="card">
            <h2 class="card-title">Project Structure</h2>
            <div class="source-code">
              <pre>├── public/
├── src/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── Navigation.jsx
│   ├── pages/
│   │   ├── index.jsx
│   │   └── about.jsx
│   ├── styles/
│   │   └── main.css
│   └── App.jsx
├── package.json
└── README.md</pre>
            </div>
          </div>

          <div class="card">
            <h2 class="card-title">Generated Files</h2>
            <div class="files">
              <div class="card">
                <h3 class="card-title">App.jsx</h3>
                <div class="source-code">
                  <pre>import React from 'react';
import Navigation from './components/Navigation';
import Card from './components/Card';
import './styles/main.css';

function App() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <h1>Welcome to ${project.title}</h1>
        <p>This project was built with AI assistance</p>
        <div className="card-container">
          <Card title="Feature 1" description="Amazing feature" />
          <Card title="Feature 2" description="Even better feature" />
        </div>
      </main>
    </div>
  );
}

export default App;</pre>
                </div>
              </div>
              
              <div class="card">
                <h3 class="card-title">Card.jsx</h3>
                <div class="source-code">
                  <pre>import React from 'react';

function Card({ title, description }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <button>Learn More</button>
    </div>
  );
}

export default Card;</pre>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer class="footer">
          <p>Generated by Kapsules AI • ${new Date().getFullYear()}</p>
          <p>Project ID: ${project.id}</p>
        </footer>
      </body>
      </html>
    `;

    return new NextResponse(previewHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error serving project preview:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

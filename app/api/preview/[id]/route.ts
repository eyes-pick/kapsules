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

    // For a simple demo, we'll return a basic HTML preview
    // In a real application, this would render the actual project files
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

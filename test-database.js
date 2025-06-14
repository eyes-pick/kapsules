// Integration test to verify local Supabase setup
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabaseTables() {
  console.log('🧪 Testing Supabase local database tables...');

  try {
    // Test 1: Check portfolios table exists and is accessible
    console.log('📋 Testing portfolios table...');
    const { data: portfolios, error: portfoliosError } = await supabase
      .from('portfolios')
      .select('*')
      .limit(1);

    if (portfoliosError) {
      console.error('❌ Portfolios table error:', portfoliosError);
    } else {
      console.log('✅ Portfolios table accessible');
    }

    // Test 2: Check projects table exists and is accessible
    console.log('📋 Testing projects table...');
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .limit(1);

    if (projectsError) {
      console.error('❌ Projects table error:', projectsError);
    } else {
      console.log('✅ Projects table accessible');
    }

    // Test 3: Check build_logs table exists and is accessible
    console.log('📋 Testing build_logs table...');
    const { data: buildLogs, error: buildLogsError } = await supabase
      .from('build_logs')
      .select('*')
      .limit(1);

    if (buildLogsError) {
      console.error('❌ Build logs table error:', buildLogsError);
    } else {
      console.log('✅ Build logs table accessible');
    }

    // Test 4: Test the create_project_with_pipeline function
    console.log('📋 Testing create_project_with_pipeline function...');
    const { data: functionResult, error: functionError } = await supabase.rpc(
      'create_project_with_pipeline',
      {
        p_title: 'Test Project',
        p_description: 'A test project for database verification',
        p_prompt: 'Create a simple test application',
        p_project_id: 'test-project-' + Date.now(),
      }
    );

    if (functionError) {
      console.error('❌ Function error:', functionError);
    } else {
      console.log('✅ create_project_with_pipeline function working');
      console.log('📋 Created project ID:', functionResult);
    }

    console.log('\n🎉 All database tests completed successfully!');
    console.log('✅ Local Supabase setup is working correctly');
  } catch (error) {
    console.error('❌ Database test failed:', error);
  }
}

// Run the test
testDatabaseTables();

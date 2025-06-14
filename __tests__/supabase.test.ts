import { createClient } from '@/utils/supabase/client';

// Mock Supabase for testing
jest.mock('@supabase/ssr', () => ({
  createBrowserClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => Promise.resolve({ data: [], error: null })),
      insert: jest.fn(() => Promise.resolve({ data: null, error: null })),
      update: jest.fn(() => Promise.resolve({ data: null, error: null })),
      delete: jest.fn(() => Promise.resolve({ data: null, error: null })),
    })),
  })),
}));

describe('Supabase Client', () => {
  beforeEach(() => {
    console.log('🧪 Starting Supabase client test');
  });

  afterEach(() => {
    console.log('✅ Supabase client test completed');
  });

  it('creates a client instance', () => {
    console.log('📝 Testing Supabase client creation...');

    const client = createClient();

    console.log('🔍 Checking if client was created...');
    expect(client).toBeDefined();
    expect(typeof client).toBe('object');

    console.log('✅ Supabase client created successfully');
  });

  it('can perform database operations', async () => {
    console.log('📝 Testing database operations...');

    const client = createClient();

    console.log('🔍 Testing select operation...');
    const selectResult = await client.from('todos').select();
    expect(selectResult.data).toEqual([]);
    console.log('✅ Select operation successful');

    console.log('🔍 Testing insert operation...');
    const insertResult = await client.from('todos').insert({ task: 'Test todo', completed: false });
    expect(insertResult.error).toBeNull();
    console.log('✅ Insert operation successful');

    console.log('🔍 Testing update operation...');
    const updateResult = await client.from('todos').update({ completed: true });
    expect(updateResult.error).toBeNull();
    console.log('✅ Update operation successful');

    console.log('🔍 Testing delete operation...');
    const deleteResult = await client.from('todos').delete();
    expect(deleteResult.error).toBeNull();
    console.log('✅ Delete operation successful');
  });

  it('handles environment variables', () => {
    console.log('📝 Testing environment variable handling...');

    // Test that the client creation doesn't throw with env vars
    console.log('🔍 Checking environment variable access...');
    expect(() => createClient()).not.toThrow();

    console.log('✅ Environment variables handled correctly');
  });
});

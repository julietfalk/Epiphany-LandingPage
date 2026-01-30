import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

// Lazy initialization to prevent crashes when env vars are missing
export const getSupabase = () => {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase environment variables not configured');
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
};

// For backwards compatibility
export const supabase = {
  get client() {
    return getSupabase();
  }
};

// Database types
export interface Subscriber {
  id: string;
  email: string;
  created_at: string;
  user_agent?: string;
  ip_address?: string;
  status: 'active' | 'unsubscribed';
}

// Database functions
export async function addSubscriber(email: string, userAgent?: string, ipAddress?: string) {
  try {
    const { data, error } = await getSupabase()
      .from('subscribers')
      .insert([
        {
          email,
          user_agent: userAgent,
          ip_address: ipAddress,
          status: 'active'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Add subscriber error:', error);
    return { success: false, error: 'Failed to add subscriber' };
  }
}

export async function getSubscribers() {
  try {
    const { data, error } = await getSupabase()
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Get subscribers error:', error);
    return { success: false, error: 'Failed to get subscribers' };
  }
}

export async function getSubscriberCount() {
  try {
    const { count, error } = await getSupabase()
      .from('subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    if (error) {
      console.error('Supabase error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, count: count || 0 };
  } catch (error) {
    console.error('Get subscriber count error:', error);
    return { success: false, error: 'Failed to get subscriber count' };
  }
}

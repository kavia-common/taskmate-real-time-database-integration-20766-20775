import { getSupabaseClient } from '../lib/supabaseClient';

const TABLE_NAME = 'tasks';

/**
 * PUBLIC_INTERFACE
 * Task Service for handling all Supabase task operations
 */
export class TaskService {
  constructor() {
    this.supabase = getSupabaseClient();
    this.listeners = new Set();
  }

  /**
   * PUBLIC_INTERFACE
   * Subscribe to real-time task updates
   * @param {Function} callback - Function to call when tasks are updated
   * @returns {Function} Cleanup function to unsubscribe
   */
  subscribeToTasks(callback) {
    this.listeners.add(callback);

    // Set up real-time subscription
    const channel = this.supabase
      .channel('tasks_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: TABLE_NAME
        },
        () => this.fetchTasks().then(callback)
      )
      .subscribe();

    // Return cleanup function
    return () => {
      this.listeners.delete(callback);
      channel.unsubscribe();
    };
  }

  /**
   * PUBLIC_INTERFACE
   * Fetch all tasks
   * @returns {Promise<Array>} Array of tasks
   */
  async fetchTasks() {
    try {
      const { data, error } = await this.supabase
        .from(TABLE_NAME)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
      throw error;
    }
  }

  /**
   * PUBLIC_INTERFACE
   * Create a new task
   * @param {Object} task - Task object with title and description
   * @returns {Promise<Object>} Created task
   */
  async createTask(task) {
    try {
      // Validate required fields
      if (!task.title || !task.description) {
        throw new Error('Title and description are required');
      }

      // Check if Supabase is properly initialized
      if (!this.supabase || !process.env.REACT_APP_SUPABASE_URL || !process.env.REACT_APP_SUPABASE_KEY) {
        throw new Error('Supabase client is not properly initialized. Please check your environment variables.');
      }

      const { data, error } = await this.supabase
        .from(TABLE_NAME)
        .insert({
          title: task.title.trim(),
          description: task.description.trim()
          // Let Supabase handle id and created_at with default values
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error details:', error);
        throw new Error(`Failed to create task: ${error.message}`);
      }

      await this.notifyListeners();
      return data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  /**
   * PUBLIC_INTERFACE
   * Update an existing task
   * @param {string} id - Task ID
   * @param {Object} updates - Object containing fields to update
   * @returns {Promise<Object>} Updated task
   */
  async updateTask(id, updates) {
    try {
      const { data, error } = await this.supabase
        .from(TABLE_NAME)
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      this.notifyListeners();
      return data;
    } catch (error) {
      console.error('Error updating task:', error.message);
      throw error;
    }
  }

  /**
   * PUBLIC_INTERFACE
   * Delete a task
   * @param {string} id - Task ID
   * @returns {Promise<void>}
   */
  async deleteTask(id) {
    try {
      const { error } = await this.supabase
        .from(TABLE_NAME)
        .delete()
        .eq('id', id);

      if (error) throw error;
      this.notifyListeners();
    } catch (error) {
      console.error('Error deleting task:', error.message);
      throw error;
    }
  }

  /**
   * Notify all listeners of changes
   * @private
   */
  async notifyListeners() {
    const tasks = await this.fetchTasks();
    this.listeners.forEach(callback => callback(tasks));
  }
}

// Export singleton instance
export const taskService = new TaskService();

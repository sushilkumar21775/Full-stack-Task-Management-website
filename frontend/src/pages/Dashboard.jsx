import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  CheckCircle2, 
  Circle,
  LayoutDashboard
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { ToastContainer } from '../components/ui/toast';
import { useToast } from '../hooks/use-toast';
import api from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const { toasts, success, error: showError, removeToast } = useToast();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, completed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false
  });

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.getTasks();
      // Backend returns: { success: true, count: X, data: [...tasks] }
      // api.getTasks() returns response.data, so we get { success, count, data }
      const tasksArray = response.data || [];
      setTasks(tasksArray);
    } catch (err) {
      console.error('Fetch tasks error:', err);
      if (err.response?.status === 401) {
        setError('Your session has expired. Please login again.');
      } else {
        setError(err.response?.data?.message || err.response?.data?.error || 'Failed to fetch tasks');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Search and filter effect
  useEffect(() => {
    let result = tasks;

    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus === 'completed') {
      result = result.filter(task => task.completed);
    } else if (filterStatus === 'pending') {
      result = result.filter(task => !task.completed);
    }

    setFilteredTasks(result);
  }, [tasks, searchQuery, filterStatus]);

  // Create task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required');
      showError('Validation Error', 'Title and description are required');
      return;
    }

    try {
      setError('');
      await api.createTask(formData);
      setFormData({ title: '', description: '', completed: false });
      await fetchTasks();
      success('Success', 'Task created successfully!');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Your session has expired. Please login again.');
        showError('Session Expired', 'Please login again.');
      } else {
        const errorMsg = err.response?.data?.error || 'Failed to create task';
        setError(errorMsg);
        showError('Error', errorMsg);
      }
    }
  };

  // Update task
  const handleUpdateTask = async (taskId, updates) => {
    try {
      setError('');
      await api.updateTask(taskId, updates);
      setEditingTask(null);
      await fetchTasks();
      success('Success', 'Task updated successfully!');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Your session has expired. Please login again.');
        showError('Session Expired', 'Please login again.');
      } else {
        const errorMsg = err.response?.data?.error || 'Failed to update task';
        setError(errorMsg);
        showError('Error', errorMsg);
      }
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      setError('');
      await api.deleteTask(taskId);
      await fetchTasks();
      success('Success', 'Task deleted successfully!');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Your session has expired. Please login again.');
        showError('Session Expired', 'Please login again.');
      } else {
        const errorMsg = err.response?.data?.error || 'Failed to delete task';
        setError(errorMsg);
        showError('Error', errorMsg);
      }
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (task) => {
    try {
      // Optimistically update UI
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t._id === task._id ? { ...t, completed: !t.completed } : t
        )
      );
      
      // Update on server
      await handleUpdateTask(task._id, { ...task, completed: !task.completed });
    } catch (err) {
      // Revert on error
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t._id === task._id ? { ...t, completed: task.completed } : t
        )
      );
    }
  };

  // Start editing
  const startEditing = (task) => {
    setEditingTask({ ...task });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTask(null);
  };

  // Save edit
  const saveEdit = async () => {
    if (!editingTask.title.trim() || !editingTask.description.trim()) {
      setError('Title and description are required');
      return;
    }
    await handleUpdateTask(editingTask._id, editingTask);
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <LayoutDashboard className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, <span className="font-semibold text-blue-600 dark:text-blue-400">{user?.name}</span>! 
            Manage your tasks efficiently.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500 dark:border-l-blue-400">
            <CardHeader className="pb-3">
              <CardDescription>Total Tasks</CardDescription>
              <CardTitle className="text-4xl text-blue-600 dark:text-blue-400">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-green-500 dark:border-l-green-400">
            <CardHeader className="pb-3">
              <CardDescription>Completed</CardDescription>
              <CardTitle className="text-4xl text-green-600 dark:text-green-400">{stats.completed}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-yellow-500 dark:border-l-yellow-400">
            <CardHeader className="pb-3">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-4xl text-yellow-600 dark:text-yellow-400">{stats.pending}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Create Task Form */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Task
            </CardTitle>
            <CardDescription>Add a new task to your list</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Task title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="text-lg"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Task description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('all')}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === 'pending' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('pending')}
                  size="sm"
                >
                  Pending
                </Button>
                <Button
                  variant={filterStatus === 'completed' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('completed')}
                  size="sm"
                >
                  Completed
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {loading ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tasks...</p>
              </CardContent>
            </Card>
          ) : filteredTasks.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {searchQuery || filterStatus !== 'all' 
                    ? 'No tasks match your filters' 
                    : 'No tasks yet. Create your first task above!'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <Card key={task._id} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {editingTask?._id === task._id ? (
                    // Edit mode
                    <div className="space-y-4">
                      <Input
                        type="text"
                        value={editingTask.title}
                        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                        className="text-lg font-semibold"
                      />
                      <Input
                        type="text"
                        value={editingTask.description}
                        onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                      />
                      <div className="flex gap-2">
                        <Button onClick={saveEdit} size="sm">
                          <Check className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button onClick={cancelEditing} variant="outline" size="sm">
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View mode
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleTaskCompletion(task)}
                        className="mt-1 flex-shrink-0 transition-colors"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                        ) : (
                          <Circle className="h-6 w-6 text-gray-400 dark:text-gray-600 hover:text-blue-600 dark:hover:text-blue-400" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className={`text-lg font-semibold mb-1 ${
                              task.completed 
                                ? 'line-through text-gray-400 dark:text-gray-600' 
                                : 'text-gray-900 dark:text-gray-100'
                            }`}>
                              {task.title}
                            </h3>
                            <p className={`text-sm mb-2 ${
                              task.completed 
                                ? 'line-through text-gray-400 dark:text-gray-600' 
                                : 'text-gray-600 dark:text-gray-400'
                            }`}>
                              {task.description}
                            </p>
                            <div className="flex gap-2">
                              <Badge variant={task.completed ? 'success' : 'secondary'}>
                                {task.completed ? 'Completed' : 'Pending'}
                              </Badge>
                              <span className="text-xs text-gray-500 dark:text-gray-500">
                                {new Date(task.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <Button
                              onClick={() => startEditing(task)}
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => handleDeleteTask(task._id)}
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default Dashboard;

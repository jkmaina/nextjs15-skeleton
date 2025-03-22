import { Suspense } from 'react';
import { useActionState } from 'react/hooks'; // New in React 19

// Define server action for updating user preferences
async function updateUserPreferences(prevState, formData) {
  'use server';
  
  // Simulate server processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // Extract form data
    const theme = formData.get('theme');
    const notifications = formData.get('notifications') === 'on';
    
    // In a real app, save to database
    // This is just a mock response
    return { 
      success: true, 
      message: 'Preferences updated successfully',
      data: { theme, notifications }
    };
  } catch (error) {
    console.error('Error updating preferences:', error);
    return { 
      success: false, 
      message: 'Failed to update preferences' 
    };
  }
}

// Stats card component
function StatsCard({ title, value, change, trend }) {
  return (
    <div className="card">
      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold">{value}</p>
        <span className={`text-sm flex items-center ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend === 'up' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v3.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
            </svg>
          )}
          {change}
        </span>
      </div>
    </div>
  );
}

// Recent activity component with async data loading
async function RecentActivity() {
  // Simulate fetching activity data
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const activities = [
    { id: 1, type: 'login', timestamp: '2025-03-21T10:30:00Z', location: 'San Francisco, CA' },
    { id: 2, type: 'settings_update', timestamp: '2025-03-20T15:45:00Z', location: 'San Francisco, CA' },
    { id: 3, type: 'login', timestamp: '2025-03-19T08:15:00Z', location: 'New York, NY' },
  ];
  
  return (
    <div className="card">
      <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
      <ul className="space-y-3">
        {activities.map(activity => {
          const date = new Date(activity.timestamp);
          return (
            <li key={activity.id} className="flex items-start pb-3 border-b last:border-b-0 last:pb-0">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                {activity.type === 'login' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">
                  {activity.type === 'login' ? 'Account Login' : 'Settings Updated'}
                </p>
                <p className="text-xs text-gray-500">
                  {date.toLocaleString()} • {activity.location}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Client component for preferences form using useActionState (new in React 19)
function PreferencesForm() {
  'use client';
  
  // Initial state
  const initialState = {
    success: null,
    message: '',
    data: {
      theme: 'light',
      notifications: true
    }
  };
  
  // Use the new useActionState hook from React 19
  const [state, formAction] = useActionState(updateUserPreferences, initialState);
  
  return (
    <div className="card">
      <h3 className="text-lg font-bold mb-4">Preferences</h3>
      
      {/* Display success/error message */}
      {state.message && (
        <div className={`mb-4 p-3 rounded text-sm ${
          state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {state.message}
        </div>
      )}
      
      <form action={formAction}>
        <div className="space-y-4">
          <div>
            <label htmlFor="theme" className="form-label">Theme</label>
            <select 
              id="theme" 
              name="theme" 
              className="form-input"
              defaultValue={state.data.theme}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="notifications"
              name="notifications"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              defaultChecked={state.data.notifications}
            />
            <label htmlFor="notifications" className="ml-2 text-sm text-gray-700">
              Enable notifications
            </label>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}

// Main dashboard page component
export default function DashboardPage() {
  // Mock statistics data
  const stats = [
    { title: 'Total Visits', value: '1,234', change: '+12%', trend: 'up' },
    { title: 'Bounce Rate', value: '24%', change: '-5%', trend: 'up' },
    { title: 'Average Session', value: '1m 45s', change: '+10%', trend: 'up' },
    { title: 'Conversion Rate', value: '3.2%', change: '-0.5%', trend: 'down' },
  ];
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
          />
        ))}
      </div>
      
      {/* Two-column layout for wider screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent activity with Suspense for async data */}
        <div>
          <Suspense fallback={<div className="card h-64 flex items-center justify-center">Loading activity...</div>}>
            <RecentActivity />
          </Suspense>
        </div>
        
        {/* Preferences form with React 19's useActionState */}
        <div>
          <PreferencesForm />
        </div>
      </div>
    </div>
  );
}
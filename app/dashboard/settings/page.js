import { Suspense } from 'react';
import { after } from 'next/server';

// Server action to update settings
async function updateSettings(formData) {
  'use server';
  
  // Simulate server processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Extract form data
  const settings = {
    emailNotifications: formData.get('emailNotifications') === 'on',
    marketingEmails: formData.get('marketingEmails') === 'on',
    language: formData.get('language'),
    timezone: formData.get('timezone'),
  };
  
  // In a real app, update the database
  console.log('Updating settings:', settings);
  
  // Use the new after() API to execute code after the response streams
  after(() => {
    console.log('Settings update completed at:', new Date().toISOString());
    // In a real app, you might send analytics data or trigger other workflows
  });
  
  return { success: true };
}

// Async component to fetch available timezones
async function TimezoneSelector() {
  // Simulate an API call to fetch timezones
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const timezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
  ];
  
  return (
    <div className="mb-4">
      <label htmlFor="timezone" className="form-label">Timezone</label>
      <select id="timezone" name="timezone" className="form-input">
        {timezones.map(tz => (
          <option key={tz.value} value={tz.value}>{tz.label}</option>
        ))}
      </select>
    </div>
  );
}

// Async component to fetch language options
async function LanguageSelector() {
  // Simulate an API call to fetch languages
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'ja', label: 'Japanese' },
    { value: 'zh', label: 'Chinese' },
  ];
  
  return (
    <div className="mb-4">
      <label htmlFor="language" className="form-label">Language</label>
      <select id="language" name="language" className="form-input">
        {languages.map(lang => (
          <option key={lang.value} value={lang.value}>{lang.label}</option>
        ))}
      </select>
    </div>
  );
}

// Client-side form submission component
function SettingsForm() {
  'use client';
  
  return (
    <form action={updateSettings} className="space-y-6">
      <fieldset>
        <legend className="text-lg font-medium mb-4">Notification Preferences</legend>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="emailNotifications"
                name="emailNotifications"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="emailNotifications" className="font-medium text-gray-700">Email Notifications</label>
              <p className="text-gray-500">Receive email notifications for account activity and updates</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="marketingEmails"
                name="marketingEmails"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="marketingEmails" className="font-medium text-gray-700">Marketing Emails</label>
              <p className="text-gray-500">Receive updates about new features and promotions</p>
            </div>
          </div>
        </div>
      </fieldset>
      
      <div className="border-t border-gray-200 pt-6">
        <legend className="text-lg font-medium mb-4">Regional Settings</legend>
        
        <Suspense fallback={<div className="h-10 bg-gray-100 animate-pulse rounded mb-4"></div>}>
          <LanguageSelector />
        </Suspense>
        
        <Suspense fallback={<div className="h-10 bg-gray-100 animate-pulse rounded mb-4"></div>}>
          <TimezoneSelector />
        </Suspense>
      </div>
      
      <div className="pt-4">
        <button type="submit" className="btn btn-primary">Save Settings</button>
      </div>
    </form>
  );
}

// Main settings page component
export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <p className="text-gray-600 mb-6">
          Configure your account preferences and notification settings
        </p>
        
        <SettingsForm />
      </div>
    </div>
  );
}
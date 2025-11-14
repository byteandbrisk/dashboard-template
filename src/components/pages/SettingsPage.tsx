import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { User, Bell, Shield, CreditCard, Globe, Save, Upload, X, RefreshCw, Clock } from 'lucide-react';
import { toast } from 'sonner';

// localStorage key
const STORAGE_KEY = 'adminProSettings';

// Initial default values
const defaultSettings = {
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Product designer and developer',
    company: 'Acme Inc.',
    location: 'San Francisco, CA',
    timezone: 'America/Los_Angeles',
    language: 'en',
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    securityAlerts: true,
    twoFactor: false,
};

// Helper function to format relative time
const getRelativeTime = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return new Date(timestamp).toLocaleDateString();
};

export function SettingsPage() {
  // Profile state with ability to save and cancel
  const [settings, setSettings] = useState(defaultSettings);
  const [savedSettings, setSavedSettings] = useState(defaultSettings);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [savedProfileImage, setSavedProfileImage] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setSettings(data.settings);
        setSavedSettings(data.settings);
        setProfileImage(data.profileImage || null);
        setSavedProfileImage(data.profileImage || null);
        setLastSaved(data.lastSaved || null);
        toast.success('Settings loaded from previous session');
      }
    } catch (error) {
      console.error('Error loading settings from localStorage:', error);
      toast.error('Failed to load saved settings');
    }
  }, []);

  // Check if there are unsaved changes
  const hasUnsavedChanges = JSON.stringify(settings) !== JSON.stringify(savedSettings) || 
                            profileImage !== savedProfileImage;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }

      // Check file type
      if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        toast.error('Please upload a JPG, PNG or GIF image');
        return;
      }

      // Read and preview the image
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setProfileImage(imageUrl);
        toast.success('Image uploaded! Click "Save Changes" to apply');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    // FIX #1: Revert to saved image instead of null
    setProfileImage(savedProfileImage);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (savedProfileImage) {
      toast('Reverted to saved profile image');
    } else {
      toast('Profile image removed. Click "Save Changes" to apply');
    }
  };

  const handleSave = () => {
    try {
      // Save the current state as the new saved state
      setSavedSettings(settings);
      setSavedProfileImage(profileImage);
      
      const now = Date.now();
      setLastSaved(now);
      
      // Save to localStorage
      const dataToSave = {
        settings,
        profileImage,
        lastSaved: now,
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings to localStorage:', error);
      toast.error('Failed to save settings. Storage might be full.');
    }
  };

  const handleCancel = () => {
    // Revert to last saved state
    setSettings(savedSettings);
    setProfileImage(savedProfileImage);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast('Changes discarded');
  };

  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to default values? This cannot be undone.')) {
      try {
        setSettings(defaultSettings);
        setSavedSettings(defaultSettings);
        setProfileImage(null);
        setSavedProfileImage(null);
        setLastSaved(null);
        
        localStorage.removeItem(STORAGE_KEY);
        toast.success('Settings reset to defaults');
      } catch (error) {
        console.error('Error resetting settings:', error);
        toast.error('Failed to reset settings');
      }
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="mb-2">Settings</h1>
        <p className="text-[color:var(--text-muted)]">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <Globe className="w-4 h-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="relative">
                <Avatar className="w-24 h-24">
                    {profileImage ? (
                      <AvatarImage src={profileImage} alt={settings.name} />
                    ) : (
                  <AvatarFallback className="bg-[color:var(--primary)] text-white text-2xl">
                        {settings.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2)}
                  </AvatarFallback>
                    )}
                </Avatar>
                  {/* FIX #2: Only show X button for unsaved images */}
                  {profileImage && profileImage !== savedProfileImage && (
                    <button
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-[color:var(--danger)] text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shadow-lg"
                      title="Revert to saved image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </Button>
                  <p className="text-sm text-[color:var(--text-muted)]">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={settings.company}
                    onChange={(e) => setSettings({ ...settings, company: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={settings.location}
                    onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={settings.bio}
                  onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                  rows={4}
                />
                <p className="text-sm text-[color:var(--text-muted)]">
                  Brief description for your profile
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button 
                  onClick={handleSave} 
                  className="gap-2"
                  disabled={!hasUnsavedChanges}
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  disabled={!hasUnsavedChanges}
                >
                  Cancel
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleResetToDefaults}
                  className="gap-2 text-[color:var(--text-muted)] hover:text-[color:var(--danger)]"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset to Defaults
                </Button>
                
                {lastSaved && !hasUnsavedChanges && (
                  <div className="flex items-center gap-2 text-sm text-[color:var(--text-muted)] ml-auto">
                    <Clock className="w-4 h-4" />
                    <span>Last saved {getRelativeTime(lastSaved)}</span>
                  </div>
                )}
              </div>
              
              {hasUnsavedChanges && (
                <div className="p-3 bg-[color:var(--warning-light)] border border-[color:var(--warning)] rounded-lg">
                  <p className="text-sm text-[color:var(--warning)] flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    You have unsaved changes. Don't forget to save!
                  </p>
                </div>
              )}
              
              {!hasUnsavedChanges && lastSaved && (
                <div className="p-3 bg-[color:var(--success-light)] border border-[color:var(--success)] rounded-lg">
                  <p className="text-sm text-[color:var(--success)] flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    All changes saved • Settings will persist across sessions
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose what emails you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Product Updates</Label>
                  <p className="text-sm text-[color:var(--text-muted)]">
                    News about product updates and features
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, emailNotifications: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-[color:var(--text-muted)]">
                    Promotional emails and special offers
                  </p>
                </div>
                <Switch
                  checked={settings.marketingEmails}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, marketingEmails: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Security Alerts</Label>
                  <p className="text-sm text-[color:var(--text-muted)]">
                    Important security notifications
                  </p>
                </div>
                <Switch
                  checked={settings.securityAlerts}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, securityAlerts: checked })
                  }
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} disabled={!hasUnsavedChanges}>
                  Save Preferences
                </Button>
                {lastSaved && !hasUnsavedChanges && (
                  <div className="flex items-center gap-2 text-sm text-[color:var(--text-muted)] ml-auto">
                    <Clock className="w-4 h-4" />
                    <span>Last saved {getRelativeTime(lastSaved)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>Manage your push notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Push Notifications</Label>
                  <p className="text-sm text-[color:var(--text-muted)]">
                    Receive notifications on your device
                  </p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, pushNotifications: checked })
                  }
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} disabled={!hasUnsavedChanges}>
                  Save Preferences
                </Button>
                {lastSaved && !hasUnsavedChanges && (
                  <div className="flex items-center gap-2 text-sm text-[color:var(--text-muted)] ml-auto">
                    <Clock className="w-4 h-4" />
                    <span>Last saved {getRelativeTime(lastSaved)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={handleSave}>Update Password</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable 2FA</Label>
                  <p className="text-sm text-[color:var(--text-muted)]">
                    Require authentication code in addition to password
                  </p>
                </div>
                <Switch
                  checked={settings.twoFactor}
                  onCheckedChange={(checked) => {
                    setSettings({ ...settings, twoFactor: checked });
                    if (checked) {
                      toast.success('Two-factor authentication enabled');
                    } else {
                      toast('Two-factor authentication disabled');
                    }
                  }}
                />
              </div>

              {settings.twoFactor && (
                <div className="p-4 bg-[color:var(--success-light)] rounded-lg border border-[color:var(--success)]">
                  <p className="text-sm text-[color:var(--success)]">
                    Two-factor authentication is enabled for your account
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Manage your active sessions across devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-[color:var(--border)] rounded-lg">
                <div>
                  <div className="font-medium">Chrome on MacOS</div>
                  <div className="text-sm text-[color:var(--text-muted)]">
                    San Francisco, CA · Active now
                  </div>
                </div>
                <Badge className="bg-[color:var(--success)]">Current</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border border-[color:var(--border)] rounded-lg">
                <div>
                  <div className="font-medium">Safari on iPhone</div>
                  <div className="text-sm text-[color:var(--text-muted)]">
                    San Francisco, CA · 2 hours ago
                  </div>
                </div>
                <Button variant="outline" size="sm">Revoke</Button>
              </div>

              <Button variant="destructive" className="w-full">
                Sign Out All Devices
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Manage your subscription and billing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-[color:var(--primary-light)] to-[color:var(--info-light)] rounded-lg border border-[color:var(--primary)]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3>Pro Plan</h3>
                    <p className="text-[color:var(--text-muted)]">
                      Billed monthly
                    </p>
                  </div>
                  <Badge className="bg-[color:var(--primary)]">Active</Badge>
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold">$49</span>
                  <span className="text-[color:var(--text-muted)]">/month</span>
                </div>
                <Button variant="outline" className="w-full bg-white">
                  Manage Subscription
                </Button>
              </div>

              <Separator />

              <div>
                <h4 className="mb-3">Usage This Month</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>API Calls</span>
                      <span className="text-[color:var(--text-muted)]">45,230 / 100,000</span>
                    </div>
                    <div className="h-2 bg-[color:var(--surface-muted)] rounded-full overflow-hidden">
                      <div className="h-full bg-[color:var(--primary)] rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Storage</span>
                      <span className="text-[color:var(--text-muted)]">12.4 GB / 50 GB</span>
                    </div>
                    <div className="h-2 bg-[color:var(--surface-muted)] rounded-full overflow-hidden">
                      <div className="h-full bg-[color:var(--success)] rounded-full" style={{ width: '25%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your payment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-[color:var(--border)] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--info)] rounded flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">•••• •••• •••• 4242</div>
                    <div className="text-sm text-[color:var(--text-muted)]">Expires 12/24</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>

              <Button variant="outline" className="w-full">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Language & Region</CardTitle>
              <CardDescription>Customize your language and regional settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => setSettings({ ...settings, timezone: value })}>
                  <SelectTrigger id="timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT)</SelectItem>
                    <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button onClick={handleSave} disabled={!hasUnsavedChanges}>
                  Save Preferences
                </Button>
                {lastSaved && !hasUnsavedChanges && (
                  <div className="flex items-center gap-2 text-sm text-[color:var(--text-muted)] ml-auto">
                    <Clock className="w-4 h-4" />
                    <span>Last saved {getRelativeTime(lastSaved)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Irreversible actions for your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-[color:var(--danger)] rounded-lg">
                <h4 className="mb-2 text-[color:var(--danger)]">Delete Account</h4>
                <p className="text-sm text-[color:var(--text-muted)] mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive">Delete My Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

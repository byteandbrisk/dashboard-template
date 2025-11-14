import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Switch } from '../ui/switch';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar as CalendarIcon, Check, X, Search, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '../ui/utils';
import { format } from 'date-fns';

export function FormsPage() {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    bio: '',
    notifications: false,
    newsletter: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setErrors({});
    toast.success('Form submitted successfully!');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="mb-2">Forms & Inputs</h1>
        <p className="text-[color:var(--text-muted)]">
          Comprehensive form components with validation and various input types
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>Input Variants</CardTitle>
            <CardDescription>Text, email, password, and number inputs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text-input">Text Input</Label>
              <Input id="text-input" placeholder="Enter text..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-input">Email Input</Label>
              <Input id="email-input" type="email" placeholder="name@example.com" />
              <p className="text-sm text-[color:var(--text-muted)]">We'll never share your email</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password-input">Password Input</Label>
              <Input id="password-input" type="password" placeholder="Enter password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="number-input">Number Input</Label>
              <Input id="number-input" type="number" placeholder="0" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="disabled-input">Disabled Input</Label>
              <Input id="disabled-input" disabled value="Disabled field" />
            </div>
          </CardContent>
        </Card>

        {/* Input with Icons & Validation */}
        <Card>
          <CardHeader>
            <CardTitle>Input States</CardTitle>
            <CardDescription>With icons, validation, and feedback</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search-input">Search Input</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--text-muted)]" />
                <Input id="search-input" className="pl-10" placeholder="Search..." />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="success-input">Success State</Label>
              <div className="relative">
                <Input 
                  id="success-input" 
                  className="pr-10 border-[color:var(--success)]" 
                  value="valid@email.com" 
                  readOnly
                />
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--success)]" />
              </div>
              <p className="text-sm text-[color:var(--success)]">This email is available</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="error-input">Error State</Label>
              <div className="relative">
                <Input 
                  id="error-input" 
                  className="pr-10 border-[color:var(--danger)]" 
                  value="invalid-email" 
                  readOnly
                />
                <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--danger)]" />
              </div>
              <p className="text-sm text-[color:var(--danger)]">Please enter a valid email address</p>
            </div>
          </CardContent>
        </Card>

        {/* Select & Textarea */}
        <Card>
          <CardHeader>
            <CardTitle>Select & Textarea</CardTitle>
            <CardDescription>Dropdown selects and multi-line text areas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="select">Select Option</Label>
              <Select>
                <SelectTrigger id="select">
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                  <SelectItem value="option4">Option 4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="textarea">Text Area</Label>
              <Textarea 
                id="textarea" 
                placeholder="Enter your message here..." 
                rows={4}
              />
              <p className="text-sm text-[color:var(--text-muted)]">Maximum 500 characters</p>
            </div>
          </CardContent>
        </Card>

        {/* Checkbox & Radio */}
        <Card>
          <CardHeader>
            <CardTitle>Checkbox & Radio</CardTitle>
            <CardDescription>Selection controls for forms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Checkbox Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="check1" defaultChecked />
                  <label htmlFor="check1" className="text-sm cursor-pointer">
                    Enable notifications
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="check2" />
                  <label htmlFor="check2" className="text-sm cursor-pointer">
                    Subscribe to newsletter
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="check3" disabled />
                  <label htmlFor="check3" className="text-sm cursor-pointer opacity-50">
                    Disabled option
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Radio Group</Label>
              <RadioGroup defaultValue="option1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="radio1" />
                  <Label htmlFor="radio1" className="cursor-pointer">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="radio2" />
                  <Label htmlFor="radio2" className="cursor-pointer">Option 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="radio3" />
                  <Label htmlFor="radio3" className="cursor-pointer">Option 3</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Switch & Date Picker */}
        <Card>
          <CardHeader>
            <CardTitle>Switch & Date Picker</CardTitle>
            <CardDescription>Toggle switches and date selection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Toggle Switches</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="switch1">Marketing emails</Label>
                    <p className="text-sm text-[color:var(--text-muted)]">
                      Receive emails about new products
                    </p>
                  </div>
                  <Switch id="switch1" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="switch2">Security alerts</Label>
                    <p className="text-sm text-[color:var(--text-muted)]">
                      Get notified of security issues
                    </p>
                  </div>
                  <Switch id="switch2" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Date Picker</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left",
                      !date && "text-[color:var(--text-muted)]"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Button Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
            <CardDescription>Different button styles and sizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Variants</Label>
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Sizes</Label>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>States</Label>
              <div className="flex flex-wrap gap-2">
                <Button disabled>Disabled</Button>
                <Button>
                  <Search className="mr-2 w-4 h-4" />
                  With Icon
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Full Form Example */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Form Example</CardTitle>
          <CardDescription>A full form with validation and submission</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="form-name">
                  Full Name <span className="text-[color:var(--danger)]">*</span>
                </Label>
                <Input
                  id="form-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? 'border-[color:var(--danger)]' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-[color:var(--danger)]">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="form-email">
                  Email Address <span className="text-[color:var(--danger)]">*</span>
                </Label>
                <Input
                  id="form-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={errors.email ? 'border-[color:var(--danger)]' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-[color:var(--danger)]">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="form-company">Company</Label>
                <Input
                  id="form-company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="form-role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger id="form-role">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="form-bio">Bio</Label>
              <Textarea
                id="form-bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="form-notifications"
                  checked={formData.notifications}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, notifications: checked as boolean })
                  }
                />
                <label htmlFor="form-notifications" className="text-sm cursor-pointer">
                  Send me email notifications
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="form-newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, newsletter: checked as boolean })
                  }
                />
                <label htmlFor="form-newsletter" className="text-sm cursor-pointer">
                  Subscribe to our newsletter
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit">Submit Form</Button>
              <Button type="button" variant="outline">Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

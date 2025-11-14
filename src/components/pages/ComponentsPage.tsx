import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';
import { 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  AlertTriangle, 
  Loader2,
  Bell,
  Settings,
  User,
  Calendar,
  Mail,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';

export function ComponentsPage() {
  const [progress, setProgress] = useState(45);
  const [loadingStates, setLoadingStates] = useState({
    button1: false,
    button2: false,
  });

  const handleAsyncAction = (key: 'button1' | 'button2') => {
    setLoadingStates({ ...loadingStates, [key]: true });
    setTimeout(() => {
      setLoadingStates({ ...loadingStates, [key]: false });
      toast.success('Action completed successfully!');
    }, 2000);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="mb-2">UI Components</h1>
        <p className="text-[color:var(--text-muted)]">
          Complete library of reusable interface components
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts & Notifications</CardTitle>
            <CardDescription>Contextual feedback messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is an informational alert with important details.
              </AlertDescription>
            </Alert>

            <Alert className="border-[color:var(--success)] bg-[color:var(--success-light)]">
              <CheckCircle2 className="h-4 w-4 text-[color:var(--success)]" />
              <AlertTitle className="text-[color:var(--success)]">Success</AlertTitle>
              <AlertDescription className="text-[color:var(--success)]">
                Your changes have been saved successfully.
              </AlertDescription>
            </Alert>

            <Alert className="border-[color:var(--warning)] bg-[color:var(--warning-light)]">
              <AlertTriangle className="h-4 w-4 text-[color:var(--warning)]" />
              <AlertTitle className="text-[color:var(--warning)]">Warning</AlertTitle>
              <AlertDescription className="text-[color:var(--warning)]">
                Please review your input before proceeding.
              </AlertDescription>
            </Alert>

            <Alert className="border-[color:var(--danger)] bg-[color:var(--danger-light)]">
              <AlertCircle className="h-4 w-4 text-[color:var(--danger)]" />
              <AlertTitle className="text-[color:var(--danger)]">Error</AlertTitle>
              <AlertDescription className="text-[color:var(--danger)]">
                An error occurred while processing your request.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges & Tags</CardTitle>
            <CardDescription>Labels and status indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="mb-3">Variants</h4>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="mb-3">Status Badges</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[color:var(--success)]">Active</Badge>
                <Badge className="bg-[color:var(--info)]">Pending</Badge>
                <Badge className="bg-[color:var(--warning)]">Warning</Badge>
                <Badge className="bg-[color:var(--danger)]">Error</Badge>
                <Badge variant="outline">Draft</Badge>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="mb-3">With Icons</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="gap-1">
                  <Bell className="w-3 h-3" />
                  Notifications
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <User className="w-3 h-3" />
                  Profile
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Settings className="w-3 h-3" />
                  Settings
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress & Loading */}
        <Card>
          <CardHeader>
            <CardTitle>Progress & Loading States</CardTitle>
            <CardDescription>Visual feedback for async operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span className="text-[color:var(--text-muted)]">{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>

            <Separator />

            <div className="space-y-3">
              <h4>Loading Buttons</h4>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAsyncAction('button1')}
                  disabled={loadingStates.button1}
                >
                  {loadingStates.button1 && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loadingStates.button1 ? 'Loading...' : 'Click me'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleAsyncAction('button2')}
                  disabled={loadingStates.button2}
                >
                  {loadingStates.button2 && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loadingStates.button2 ? 'Processing...' : 'Process'}
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4>Spinners</h4>
              <div className="flex gap-4 items-center">
                <Loader2 className="h-4 w-4 animate-spin text-[color:var(--primary)]" />
                <Loader2 className="h-6 w-6 animate-spin text-[color:var(--primary)]" />
                <Loader2 className="h-8 w-8 animate-spin text-[color:var(--primary)]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skeletons */}
        <Card>
          <CardHeader>
            <CardTitle>Skeleton Loaders</CardTitle>
            <CardDescription>Placeholder content while loading</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>

            <Separator />

            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Skeleton className="h-32 w-full rounded-lg" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tooltips */}
        <Card>
          <CardHeader>
            <CardTitle>Tooltips</CardTitle>
            <CardDescription>Contextual help on hover</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <TooltipProvider>
              <div className="flex gap-3 flex-wrap">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a tooltip</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>More information</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Bell className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>

            <Separator />

            <div className="text-sm text-[color:var(--text-muted)]">
              <p>Hover over the buttons above to see tooltips in action.</p>
            </div>
          </CardContent>
        </Card>

        {/* Toast Triggers */}
        <Card>
          <CardHeader>
            <CardTitle>Toast Notifications</CardTitle>
            <CardDescription>Temporary notification messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              onClick={() => toast('Default notification')}
              className="w-full justify-start"
            >
              <Info className="mr-2 h-4 w-4" />
              Show Default Toast
            </Button>
            
            <Button
              variant="outline"
              onClick={() => toast.success('Action completed successfully!')}
              className="w-full justify-start"
            >
              <CheckCircle2 className="mr-2 h-4 w-4 text-[color:var(--success)]" />
              Show Success Toast
            </Button>
            
            <Button
              variant="outline"
              onClick={() => toast.error('Something went wrong!')}
              className="w-full justify-start"
            >
              <AlertCircle className="mr-2 h-4 w-4 text-[color:var(--danger)]" />
              Show Error Toast
            </Button>
            
            <Button
              variant="outline"
              onClick={() => toast.warning('Please be careful!')}
              className="w-full justify-start"
            >
              <AlertTriangle className="mr-2 h-4 w-4 text-[color:var(--warning)]" />
              Show Warning Toast
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                toast('Event created', {
                  description: 'Your event has been scheduled for tomorrow at 2pm',
                  action: {
                    label: 'Undo',
                    onClick: () => toast('Event cancelled'),
                  },
                })
              }
              className="w-full justify-start"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Show Toast with Action
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Dialogs & Modals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dialogs</CardTitle>
            <CardDescription>Modal windows for focused content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive">Delete Account</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Form Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Enter the details for your new project below.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Name</label>
                    <input className="w-full px-3 py-2 border rounded-md" placeholder="My Project" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea className="w-full px-3 py-2 border rounded-md" rows={3} placeholder="Project description..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Project</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Drawers</CardTitle>
            <CardDescription>Slide-in panels from screen edges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="w-full">Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Drawer Title</DrawerTitle>
                  <DrawerDescription>
                    This is a drawer that slides in from the bottom.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                  <p className="text-sm text-[color:var(--text-muted)]">
                    Drawers are useful for displaying additional content or forms without
                    navigating away from the current page.
                  </p>
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </CardContent>
        </Card>
      </div>

      {/* Tabs & Accordion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tabs</CardTitle>
            <CardDescription>Organize content in tabbed sections</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="space-y-2">
                  <h4>Overview Content</h4>
                  <p className="text-sm text-[color:var(--text-muted)]">
                    This is the overview tab. You can display any content here.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <div className="space-y-2">
                  <h4>Analytics Content</h4>
                  <p className="text-sm text-[color:var(--text-muted)]">
                    View your analytics and metrics in this section.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                <div className="space-y-2">
                  <h4>Settings Content</h4>
                  <p className="text-sm text-[color:var(--text-muted)]">
                    Manage your preferences and configurations.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accordion</CardTitle>
            <CardDescription>Expandable content sections</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is this component?</AccordionTrigger>
                <AccordionContent>
                  An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How does it work?</AccordionTrigger>
                <AccordionContent>
                  Click on any section header to expand or collapse the content. Only one section can be open at a time in single mode.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>When should I use it?</AccordionTrigger>
                <AccordionContent>
                  Use accordions to organize related information into collapsible sections, especially when you have limited space or want to reduce page scrolling.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Lightbulb, 
  Thermometer, 
  Droplets, 
  Sun, 
  Wind, 
  Camera, 
  Activity,
  Phone,
  MessageSquare,
  Power
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const energyData = [
  { time: '00:00', usage: 2.1 },
  { time: '04:00', usage: 1.8 },
  { time: '08:00', usage: 3.5 },
  { time: '12:00', usage: 4.2 },
  { time: '16:00', usage: 3.8 },
  { time: '20:00', usage: 5.1 },
  { time: '23:59', usage: 2.8 },
];

const temperatureData = [
  { time: '00:00', temp: 20 },
  { time: '04:00', temp: 19 },
  { time: '08:00', temp: 21 },
  { time: '12:00', temp: 23 },
  { time: '16:00', temp: 24 },
  { time: '20:00', temp: 22 },
  { time: '23:59', temp: 21 },
];

interface DeviceCardProps {
  title: string;
  icon: React.ReactNode;
  status: boolean;
  onToggle: () => void;
  metric?: string;
}

function DeviceCard({ title, icon, status, onToggle, metric }: DeviceCardProps) {
  return (
    <Card className="p-6 hover:shadow-[var(--elevation-3)] transition-all" style={{ boxShadow: 'var(--elevation-2)' }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ 
              backgroundColor: status ? 'var(--primary-light)' : 'var(--surface-muted)',
              color: status ? 'var(--primary)' : 'var(--text-muted)'
            }}
          >
            {icon}
          </div>
          <div>
            <h5>{title}</h5>
            <Badge variant={status ? 'default' : 'outline'} className="mt-1">
              {status ? 'On' : 'Off'}
            </Badge>
          </div>
        </div>
        <Switch checked={status} onCheckedChange={onToggle} />
      </div>
      {metric && status && (
        <p className="text-sm text-[color:var(--text-muted)] mt-4">{metric}</p>
      )}
    </Card>
  );
}

export function IoTPage() {
  const [devices, setDevices] = useState({
    lights: true,
    hvac: true,
    security: true,
    appliances: false,
  });

  const [temperature, setTemperature] = useState([22]);
  const [climateMode, setClimateMode] = useState<'temperature' | 'humidity'>('temperature');

  const toggleDevice = (device: keyof typeof devices) => {
    setDevices(prev => ({ ...prev, [device]: !prev[device] }));
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto fade-in">
      {/* Page Header */}
      <div>
        <h2 className="mb-2">IoT Dashboard</h2>
        <p className="text-[color:var(--text-muted)]">
          Monitor and control your smart home devices
        </p>
      </div>

      {/* Device Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DeviceCard
          title="Smart Lights"
          icon={<Lightbulb className="w-6 h-6" />}
          status={devices.lights}
          onToggle={() => toggleDevice('lights')}
          metric="12 lights active"
        />
        <DeviceCard
          title="HVAC System"
          icon={<Thermometer className="w-6 h-6" />}
          status={devices.hvac}
          onToggle={() => toggleDevice('hvac')}
          metric="Climate control active"
        />
        <DeviceCard
          title="Security"
          icon={<Camera className="w-6 h-6" />}
          status={devices.security}
          onToggle={() => toggleDevice('security')}
          metric="All cameras online"
        />
        <DeviceCard
          title="Appliances"
          icon={<Power className="w-6 h-6" />}
          status={devices.appliances}
          onToggle={() => toggleDevice('appliances')}
          metric="3 devices connected"
        />
      </div>

      {/* Climate Control & Energy Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Climate Control */}
        <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
          <h3 className="mb-6">Climate Control</h3>
          
          <Tabs value={climateMode} onValueChange={(v) => setClimateMode(v as any)}>
            <TabsList className="mb-6 w-full">
              <TabsTrigger value="temperature" className="flex-1">
                <Thermometer className="w-4 h-4 mr-2" />
                Temperature
              </TabsTrigger>
              <TabsTrigger value="humidity" className="flex-1">
                <Droplets className="w-4 h-4 mr-2" />
                Humidity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="temperature" className="space-y-6">
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative w-48 h-48 rounded-full border-8 border-[color:var(--primary-light)] flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="tabular-nums" style={{ fontSize: '3rem' }}>{temperature[0]}°C</div>
                    <p className="text-sm text-[color:var(--text-muted)]">Target Temperature</p>
                  </div>
                </div>
                <div className="w-full px-4">
                  <Slider
                    value={temperature}
                    onValueChange={setTemperature}
                    min={16}
                    max={30}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-sm text-[color:var(--text-muted)]">
                    <span>16°C</span>
                    <span>30°C</span>
                  </div>
                </div>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperatureData}>
                    <Line type="monotone" dataKey="temp" stroke="var(--primary)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="humidity">
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative w-48 h-48 rounded-full border-8 border-[color:var(--info-light)] flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="tabular-nums" style={{ fontSize: '3rem' }}>45%</div>
                    <p className="text-sm text-[color:var(--text-muted)]">Current Humidity</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-[color:var(--success-light)] text-[color:var(--success)] border-[color:var(--success)]">
                  Optimal Range
                </Badge>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Energy Usage */}
        <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
          <h3 className="mb-6">Energy Usage</h3>
          
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <h2 className="tabular-nums">24.5</h2>
              <span className="text-[color:var(--text-muted)]">kWh today</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline" className="bg-[color:var(--success-light)] text-[color:var(--success)] border-[color:var(--success)]">
                -12% vs yesterday
              </Badge>
            </div>
          </div>

          <div className="h-48 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyData}>
                <defs>
                  <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} />
                <YAxis stroke="var(--text-muted)" fontSize={12} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="var(--chart-3)" 
                  strokeWidth={2}
                  fill="url(#energyGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[color:var(--surface-muted)] rounded-lg">
              <p className="text-sm text-[color:var(--text-muted)] mb-1">Peak Usage</p>
              <p className="text-lg font-medium tabular-nums">5.1 kWh</p>
            </div>
            <div className="p-4 bg-[color:var(--surface-muted)] rounded-lg">
              <p className="text-sm text-[color:var(--text-muted)] mb-1">Avg. Usage</p>
              <p className="text-lg font-medium tabular-nums">3.2 kWh</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Solar, Weather & Security */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Solar Production */}
        <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
          <h3 className="mb-6">Solar Production</h3>
          <div className="flex flex-col items-center py-6">
            <div className="relative w-32 h-16 mb-4">
              <div 
                className="absolute inset-0 border-8 border-[color:var(--warning-light)] rounded-t-full"
                style={{ 
                  borderBottom: 'none',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                }}
              >
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-[color:var(--warning)] rounded-t-full transition-all"
                  style={{ height: '75%' }}
                />
              </div>
            </div>
            <div className="text-center">
              <h2 className="tabular-nums">18.2 kWh</h2>
              <p className="text-sm text-[color:var(--text-muted)] mt-1">Generated today</p>
              <Badge variant="outline" className="bg-[color:var(--success-light)] text-[color:var(--success)] border-[color:var(--success)] mt-3">
                +8% vs average
              </Badge>
            </div>
          </div>
        </Card>

        {/* Weather */}
        <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
          <h3 className="mb-6">Current Weather</h3>
          <div className="flex flex-col items-center py-6">
            <Sun className="w-16 h-16 text-[color:var(--warning)] mb-4" />
            <h2 className="tabular-nums">24°C</h2>
            <p className="text-sm text-[color:var(--text-muted)] mt-1 mb-6">Clear Sky</p>
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-[color:var(--text-muted)]">
                  <Wind className="w-4 h-4" />
                  <span>Wind</span>
                </div>
                <span className="font-medium">12 km/h</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-[color:var(--text-muted)]">
                  <Droplets className="w-4 h-4" />
                  <span>Humidity</span>
                </div>
                <span className="font-medium">45%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Security Cameras */}
        <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
          <h3 className="mb-6">Security Cameras</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Front Door', 'Backyard', 'Garage', 'Living Room'].map((camera) => (
              <div
                key={camera}
                className="relative aspect-video bg-[color:var(--surface-muted)] rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-[color:var(--primary)] transition-all"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-[color:var(--text-muted)]" />
                </div>
                <Badge 
                  variant="default" 
                  className="absolute top-2 left-2 text-xs bg-[color:var(--danger)]"
                >
                  LIVE
                </Badge>
                <p className="absolute bottom-2 left-2 text-xs bg-black/60 text-white px-2 py-1 rounded">
                  {camera}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Network Traffic & Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Network Traffic */}
        <div className="lg:col-span-2">
          <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
            <h3 className="mb-6">Network Traffic Monitor</h3>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-[color:var(--primary)]" />
                  <span className="text-sm text-[color:var(--text-muted)]">Download</span>
                </div>
                <h3 className="tabular-nums">125.4 Mbps</h3>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-[color:var(--chart-2)]" />
                  <span className="text-sm text-[color:var(--text-muted)]">Upload</span>
                </div>
                <h3 className="tabular-nums">45.2 Mbps</h3>
              </div>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={energyData.map((d, i) => ({ ...d, download: 100 + Math.random() * 50, upload: 30 + Math.random() * 30 }))}>
                  <Line type="monotone" dataKey="download" stroke="var(--primary)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="upload" stroke="var(--chart-2)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Quick Contacts */}
        <Card className="p-6" style={{ boxShadow: 'var(--elevation-2)' }}>
          <h3 className="mb-6">Quick Contacts</h3>
          <div className="space-y-3">
            {['Emergency', 'Security', 'Maintenance', 'Support'].map((contact, index) => (
              <div
                key={contact}
                className="flex items-center justify-between p-3 bg-[color:var(--surface-muted)] rounded-lg hover:bg-[color:var(--border)] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[color:var(--primary-light)] flex items-center justify-center">
                    <span style={{ color: 'var(--primary)' }}>
                      {contact.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium">{contact}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

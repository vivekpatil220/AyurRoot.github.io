import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Leaf, LogIn } from 'lucide-react';

interface LoginFormProps {
  onToggleToRegister?: () => void;
  showRegisterOption?: boolean;
  fixedRole?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onToggleToRegister, 
  showRegisterOption = false,
  fixedRole 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(fixedRole || '');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password, role);
      if (success) {
        toast({
          title: 'Login Successful',
          description: `Welcome to ${role} portal!`,
        });
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid credentials. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during login.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-medium">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-herb-secondary rounded-full">
              <Leaf className="h-8 w-8 text-herb-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-herb-primary-dark">
            {fixedRole ? `${fixedRole.charAt(0).toUpperCase() + fixedRole.slice(1)} Login` : 'Login'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="border-herb-primary/30 focus:border-herb-primary"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="border-herb-primary/30 focus:border-herb-primary"
              />
            </div>
            {!fixedRole && (
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole} required>
                  <SelectTrigger className="border-herb-primary/30 focus:border-herb-primary">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="processor">Processor</SelectItem>
                    <SelectItem value="lab">Lab Technician</SelectItem>
                    <SelectItem value="manufacturer">Manufacturer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-herb-primary hover:bg-herb-primary-light"
              disabled={loading}
            >
              <LogIn className="h-4 w-4 mr-2" />
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          {showRegisterOption && onToggleToRegister && (
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                New farmer?{' '}
                <button
                  onClick={onToggleToRegister}
                  className="text-herb-primary hover:text-herb-primary-light font-medium"
                >
                  Register here
                </button>
              </p>
            </div>
          )}
{/* Demo credentials */}
<div className="mt-6 p-3 bg-muted rounded-lg">
  <p className="text-xs font-medium text-muted-foreground mb-2">Demo Credentials:</p>
  <div className="text-xs space-y-1 text-muted-foreground">
    <p>Admin: admin@herbtrace.com / admin123</p>
    <p>Processor: processor@herbtrace.com / processor123</p>
    <p>Lab: lab@herbtrace.com / lab123</p>
    <p>Manufacturer: manufacturer@herbtrace.com / manufacturer123</p>
    <p>Farmer: farmer@herbtrace.com / farmer123</p> {/* Added Farmer demo login */}
  </div>
</div>

        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
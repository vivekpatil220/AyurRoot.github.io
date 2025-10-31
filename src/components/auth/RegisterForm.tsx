import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Leaf, UserPlus } from 'lucide-react';

interface RegisterFormProps {
  onToggleToLogin: (email?: string, password?: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { register: registerUser } = useAuth(); // Renamed to avoid confusion
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Create user account in localStorage without auto-login
      const users = JSON.parse(localStorage.getItem('herbtrace_users') || '[]');
      
      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        toast({
          title: 'Registration Failed',
          description: 'An account with this email already exists.',
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // Add new user to storage
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        role: 'farmer',
        name
      };

      users.push(newUser);
      localStorage.setItem('herbtrace_users', JSON.stringify(users));

      // Show success message
      toast({
        title: 'Registration Successful!',
        description: 'Account created successfully! Please login with your credentials.',
      });
      
      // Clear form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      
      // Redirect to login form with prefilled email
      onToggleToLogin(email, ''); // Don't prefill password for security
      
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during registration.',
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
            Farmer Registration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="border-herb-primary/30 focus:border-herb-primary"
              />
            </div>
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
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="border-herb-primary/30 focus:border-herb-primary"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-herb-primary hover:bg-herb-primary-light"
              disabled={loading}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              {loading ? 'Registering...' : 'Register as Farmer'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <button
                onClick={() => onToggleToLogin()}
                className="text-herb-primary hover:text-herb-primary-light font-medium"
              >
                Login here
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;

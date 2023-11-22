import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function SignUpForm() {
  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          type="name"
          placeholder="John Doe"
          name="name"
          alt="name"
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          placeholder="example@email.com"
          name="email"
          alt="email"
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="***********"
          alt="password"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Sign up
      </Button>
    </form>
  );
}

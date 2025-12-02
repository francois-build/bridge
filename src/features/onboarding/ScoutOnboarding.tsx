
import { useState } from "react";
import { Share2 } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ScoutOnboarding() {
  const [founderName, setFounderName] = useState("");
  const [founderEmail, setFounderEmail] = useState("");
  const [startupName, setStartupName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInvite = async () => {
    if (!emailRegex.test(founderEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setIsLoading(true);

    // Mock Cloud Function call
    console.log("Inviting founder:", { founderName, founderEmail, startupName });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success(`Invite sent to ${founderEmail}`);

    setFounderName("");
    setFounderEmail("");
    setStartupName("");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Toaster position="top-center" />
      <Card className="w-full max-w-md bg-white p-8 rounded-2xl shadow-levitated border border-slate-100">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-2xl font-bold">Invite a Founder</CardTitle>
          <Share2 className="w-6 h-6 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mt-6">
            <Input
              placeholder="Founder Name"
              value={founderName}
              onChange={(e) => setFounderName(e.target.value)}
              className="shadow-inner bg-gray-100 border-gray-200"
            />
            <Input
              placeholder="Founder Email"
              value={founderEmail}
              onChange={(e) => setFounderEmail(e.target.value)}
              className="shadow-inner bg-gray-100 border-gray-200"
            />
             {error && <p className="text-red-500 text-sm">{error}</p>}
            <Input
              placeholder="Startup Name (Optional)"
              value={startupName}
              onChange={(e) => setStartupName(e.target.value)}
              className="shadow-inner bg-gray-100 border-gray-200"
            />
            <Button onClick={handleInvite} disabled={isLoading} className="mt-4">
              {isLoading ? "Sending..." : "Send Invite"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="w-full max-w-md mt-8">
        <div className="bg-slate-900 text-white p-4 rounded-xl text-center">
            <h3 className="font-semibold">Pro Tool</h3>
            <p>Install Chrome Clipper</p>
        </div>
      </div>
    </div>
  );
}


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Share2, User, Mail, Building2, Loader2, Download, Chrome } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const InviteSchema = z.object({
  founderName: z.string().min(1, "Founder's name is required."),
  founderEmail: z.string().email("A valid email is required."),
  startupName: z.string().optional(),
});

type InviteFormData = z.infer<typeof InviteSchema>;

export default function ScoutOnboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<InviteFormData>({
    resolver: zodResolver(InviteSchema),
    mode: "onChange",
  });

  const handleInvite = async (data: InviteFormData) => {
    // Mock sending invite
    console.log("Inviting founder:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mark scout's onboarding as complete on first successful invite
    if (user) {
        try {
            await setDoc(doc(db, 'users', user.uid), { 
                probationaryStatus: false 
            }, { merge: true });
        } catch (error) {
            console.error("Error updating user profile: ", error);
            toast.error("There was an error updating your profile.");
            return; // Don't proceed if profile update fails
        }
    }

    toast.success(`Invite sent to ${data.founderName}!`);
    reset();

    // Optional: Redirect after first invite
    setTimeout(() => {
        navigate('/marketplace');
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4 text-slate-100">
      <Toaster 
        position="top-center" 
        toastOptions={{
            style: {
                background: '#1e293b', // slate-800
                color: '#f1f5f9', // slate-100
                border: '1px solid #334155' // slate-700
            }
        }}
      />
      <div className="w-full max-w-md mx-auto">
        <div className="w-full p-8 bg-slate-800/50 rounded-3xl border border-slate-700 shadow-2xl shadow-black/20">
            <div className="text-center mb-10">
                <div className="inline-block p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-4 shadow-[0_0_15px_rgba(129,140,248,0.4)]">
                    <Share2 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-slate-200">Invite a Founder</h1>
                <p className="text-slate-400 mt-2">Refer a founder and earn rewards when they succeed.</p>
            </div>

            <form onSubmit={handleSubmit(handleInvite)} className="space-y-6">
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                    {...register("founderName")}
                    placeholder="Founder Name"
                    className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 shadow-inner ring-offset-slate-900 focus:ring-blue-500 pl-12 h-12"
                    />
                    {errors.founderName && <p className="text-red-500 text-xs mt-2 ml-2">{errors.founderName.message}</p>}
                </div>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                    {...register("founderEmail")}
                    placeholder="Founder Email"
                    className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 shadow-inner ring-offset-slate-900 focus:ring-blue-500 pl-12 h-12"
                    />
                    {errors.founderEmail && <p className="text-red-500 text-xs mt-2 ml-2">{errors.founderEmail.message}</p>}
                </div>
                <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                    {...register("startupName")}
                    placeholder="Startup Name (Optional)"
                    className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 shadow-inner ring-offset-slate-900 focus:ring-blue-500 pl-12 h-12"
                    />
                </div>
                <Button 
                    type="submit" 
                    disabled={isSubmitting || !isValid}
                    className="w-full h-12 text-lg font-bold text-white rounded-lg transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500 disabled:from-slate-600 disabled:to-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed"
                    style={{
                        boxShadow: isValid && !isSubmitting ? '0 0 20px rgba(129, 140, 248, 0.4)' : 'none'
                    }}
                >
                    {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : "Send Invite"}
                </Button>
            </form>
        </div>

        <div className="w-full mt-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700 flex items-center justify-between shadow-lg">
            <div>
                <h3 className="font-bold text-slate-200 text-lg flex items-center"><Chrome className="w-5 h-5 mr-3 text-yellow-400"/>Pro Tool</h3>
                <p className="text-slate-400 text-sm mt-1">Install our Chrome Clipper to easily invite founders from LinkedIn.</p>
            </div>
            <Button variant="outline" className="h-10 font-semibold text-slate-300 bg-slate-800 border-slate-600 hover:bg-slate-700 hover:text-white">
                <Download className="w-4 h-4 mr-2" />
                Install
            </Button>
        </div>
      </div>
    </div>
  );
}

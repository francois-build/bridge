import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Linkedin, UserPlus, Send, Download, Building, ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';

type FormValues = {
  linkedInProfile: string;
  founderName: string;
  founderEmail: string;
  startupName: string;
};

export default function ScoutOnboarding() {
  const navigate = useNavigate();
  const [inviteSent, setInviteSent] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm<FormValues>();
  const founderEmailValue = watch('founderEmail');

  const onInviteSubmit = (data: FormValues) => {
    console.log('Sending invite to:', {
      name: data.founderName,
      email: data.founderEmail,
      startup: data.startupName,
    });
    setInviteSent(true);
    setTimeout(() => {
        setInviteSent(false);
        reset({ founderName: '', founderEmail: '', startupName: '' });
    }, 3000);
  };

  const onFinish = () => {
    // In a real app, you might save the linkedin profile url
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 animate-in fade-in duration-500">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-2">Scout Setup</h1>
        <p className="text-slate-500 text-center mb-10">Find and refer the best talent.</p>

        <div className="space-y-8">

          {/* LinkedIn Profile Input */}
          <div className="space-y-2">
            <label htmlFor="linkedInProfile" className="font-semibold text-slate-700 flex items-center"><Linkedin className="w-4 h-4 mr-2"/>Your LinkedIn Profile</label>
            <input
              id="linkedInProfile"
              type="url"
              {...register('linkedInProfile')}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full p-3 bg-white rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Invite a Founder Card */}
          <div className="bg-white p-6 rounded-xl shadow-levitated border border-slate-100">
            <h2 className="font-bold text-slate-800 text-lg flex items-center mb-4"><UserPlus className="w-5 h-5 mr-3 text-blue-600"/>Invite a Founder</h2>
            <form onSubmit={handleSubmit(onInviteSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input {...register('founderName')} placeholder="Founder Name" className="p-3 bg-slate-100 rounded-md border border-slate-200 w-full" />
                 <input {...register('founderEmail')} placeholder="Founder Email" type="email" className="p-3 bg-slate-100 rounded-md border border-slate-200 w-full" />
              </div>
              <input {...register('startupName')} placeholder="Startup Name" className="p-3 bg-slate-100 rounded-md border border-slate-200 w-full" />
              
              {!inviteSent ? (
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Send Invite <Send size={16} />
                </button>
              ) : (
                <div className="w-full flex items-center justify-center gap-2 text-center py-2 px-4 rounded-lg bg-green-100 text-green-800 font-semibold">
                    <CheckCircle size={20} /> Invite Sent to {founderEmailValue}!
                </div>
              )}
            </form>
          </div>

          {/* Asset Download Card */}
          <div className="bg-white p-6 rounded-xl shadow-levitated border border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-800 text-lg flex items-center"><Building className="w-5 h-5 mr-3 text-blue-600"/>Install Chrome Clipper</h2>
              <p className="text-slate-500 text-sm">Quickly save interesting companies you find online.</p>
            </div>
            <button className="bg-slate-100 p-3 rounded-full hover:bg-slate-200 transition-colors">
              <Download className="w-6 h-6 text-slate-600"/>
            </button>
          </div>

          {/* Finish Button */}
           <div className="pt-4">
            <button onClick={onFinish} className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white font-bold py-3 px-6 rounded-lg shadow-levitated hover:bg-slate-900 transition-all transform hover:scale-105">
              Finish Onboarding <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

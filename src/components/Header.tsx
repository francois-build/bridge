import { useState, Fragment, type SVGProps, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown, LogOut } from 'lucide-react';
import type { User } from 'firebase/auth';
import type { UserProfile } from '../lib/schemas';

const Logo = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
        </defs>
        <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="url(#logoGradient)"/>
        <path d="M16 5L27 16L16 27L5 16L16 5Z" fill="#1E293B"/>
        <path d="M16 8L24 16L16 24L8 16L16 8Z" fill="white"/>
    </svg>
);

const HamburgerIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
);

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
);

interface NavLinkProps {
    to: string;
    children: ReactNode;
}

const NavLink = ({ to, children }: NavLinkProps) => (
    <Link to={to} className="text-gray-300 hover:text-white transition-colors duration-200">
        {children}
    </Link>
);

interface ProfileMenuProps {
    user: User;
    userProfile: UserProfile | null;
    signOut: () => void;
}

const ProfileMenu = ({ user, userProfile, signOut }: ProfileMenuProps) => (
    <Menu as="div" className="relative">
        <div>
            <Menu.Button className="flex items-center gap-2 rounded-full bg-white/10 p-1 pr-3 text-sm text-white transition hover:bg-white/20">
                <img 
                    className="h-8 w-8 rounded-full" 
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`}
                    alt="User profile"
                />
                <span className="hidden sm:block font-medium">{userProfile?.displayName || user.displayName}</span>
                <ChevronDown className="h-5 w-5 text-gray-400" />
            </Menu.Button>
        </div>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                onClick={signOut}
                                className={`${active ? 'bg-gray-700' : ''} group flex w-full items-center px-4 py-2 text-sm text-gray-300`}
                            >
                                <LogOut className="mr-2 h-5 w-5" />
                                Sign Out
                            </button>
                        )}
                    </Menu.Item>
                </div>
            </Menu.Items>
        </Transition>
    </Menu>
);

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, userProfile, signOut, loading } = useAuth();

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
                <Link to="/">
                    <Logo />
                </Link>
                <h1 className='text-white text-xl font-bold'>Bridge</h1>
            </div>

            <div className="hidden md:flex items-center space-x-8">
                <NavLink to="/marketplace">Marketplace</NavLink>
                <NavLink to="/seeker-dashboard">Seeker Dashboard</NavLink>
                <NavLink to="/solver-hub">Solver Hub</NavLink>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:block">
                    {!loading && user && (
                        <ProfileMenu user={user} userProfile={userProfile} signOut={signOut} />
                    )}
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white">
                        {isMobileMenuOpen ? <CloseIcon className="h-6 w-6"/> : <HamburgerIcon className="h-6 w-6" />}
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900/95 backdrop-blur-sm shadow-lg">
          <div className="space-y-4 px-2 pt-4 pb-6 sm:px-3">
            <NavLink to="/marketplace">Marketplace</NavLink>
            <NavLink to="/seeker-dashboard">Seeker Dashboard</NavLink>
            <NavLink to="/solver-hub">Solver Hub</NavLink>
            
            <div className="border-t border-gray-700 pt-4">
                {!loading && user && (
                    <ProfileMenu user={user} userProfile={userProfile} signOut={signOut} />
                )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

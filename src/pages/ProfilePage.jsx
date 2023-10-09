import { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState('');
  const [avatarURL, setAvatarURL] = useState('');
  const [avatarURLInput, setAvatarURLInput] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log('auth.currentUser ===', auth.currentUser);

    if (user) {
      // Nustatykite pradinį 'displayName' state reikšmę pagal vartotojo profilio vardą
      setDisplayName(user.displayName || ''); // Jei displayName yra undefined, nustatome tuščią eilutę
      setAvatarURL(user.photoURL || ''); // Nustatykite avataro nuorodą pagal vartotojo profilio nuorodą
    }
  }, []);

  // Funkcija vykdoma, kai vartotojas paspaudžia "Išsaugoti pakeitimus"
  const handleSaveChanges = async (e) => {
    e.preventDefault(); // Sustabdo numatytąjį formos pateikimą
    const auth = getAuth();
    try {
      // Atnaujinti vartotojo vardą
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: avatarURLInput || avatarURL, // Nustatykite photoURL su įvesta nuoroda arba esama nuoroda
      });

      toast.success('Changes saved successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to save changes.');
    }
  };

  // Funkcija vykdoma, kai pasikeičia vartotojo vardas
  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  // Funkcija vykdoma, kai pasikeičia vartotojo avataro nuoroda
  const handleAvatarURLChange = (e) => {
    setAvatarURLInput(e.target.value);
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center py-8'>
      <div className='bg-white mx-auto border-slate-500 p-8 shadow-md rounded-lg w-96'>
        <Toaster />
        <h2 className='text-2xl font-semibold mb-4'>Edit Profile</h2>
        <form onSubmit={handleSaveChanges}>
          <div className='mb-5'>
            <label
              htmlFor='displayName'
              className='block text-sm font-medium text-gray-700'
            >
              Username
            </label>
            <input
              className='text-blue-300 border'
              type='text'
              id='displayName'
              value={displayName}
              onChange={handleDisplayNameChange}
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='avatarURL'
              className='block text-sm font-medium text-gray-700'
            >
              Avatar URL
            </label>
            <input
              className='text-blue-300 border'
              type='text'
              id='avatarURL'
              value={avatarURLInput}
              onChange={handleAvatarURLChange}
            />
            {avatarURL && (
              <div className='mt-2'>
                <h4 className='text-blue-300'>Current avatar</h4>
                <img
                  src={avatarURL}
                  alt='Avatar Preview'
                  style={{ maxWidth: '200px' }}
                />
              </div>
            )}
          </div>
          <button
            type='submit'
            className='bg-slate-300 hover:bg-slate-400 drop-shadow-md px-4 py-2 rounded-md'
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

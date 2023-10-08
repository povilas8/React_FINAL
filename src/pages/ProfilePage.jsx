import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Nustatykite pradinį 'displayName' state reikšmę pagal vartotojo profilio vardą
      setDisplayName(user.displayName || ''); // Jei displayName yra undefined, nustatome tuščią eilutę
    }
  }, []);

  // Funkcija vykdoma, kai vartotojas paspaudžia "Išsaugoti pakeitimus"
  const handleSaveChanges = async () => {
    const auth = getAuth();
    const storage = getStorage(); // Inicializuojame Firebase Storage
    try {
      // Atnaujinti vartotojo vardą
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });

      // Atnaujinti vartotojo avatarą, jei jis pasirinktas
      if (avatarFile) {
        const avatarStorageRef = ref(
          storage,
          `avatars/${auth.currentUser.uid}`
        ); // Sukuriame Storage ref
        await uploadBytes(avatarStorageRef, avatarFile); // Įkelkite failą į Storage
        const avatarDownloadURL = await getDownloadURL(avatarStorageRef); // Gaukite nuotraukos URL

        await updateProfile(auth.currentUser, {
          photoURL: avatarDownloadURL,
        });
      }

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

  // Funkcija vykdoma, kai pasikeičia vartotojo avataras
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatarFile(file);
    const url = URL.createObjectURL(file);
    setAvatarURL(url);
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center py-8'>
      <div className='bg-white mx-auto border-slate-500 p-8 shadow-md rounded-lg w-96'>
        <Toaster />
        <h2 className='text-2xl font-semibold mb-4'>Edit Profile</h2>
        <form>
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
              htmlFor='avatar'
              className='block text-sm font-medium text-gray-700'
            >
              Avatar
            </label>
            <input
              type='file'
              id='avatar'
              accept='image/*'
              onChange={handleAvatarChange}
            />
            {avatarURL && (
              <img
                src={avatarURL}
                alt='Avatar Preview'
                style={{ maxWidth: '100px' }}
              />
            )}
          </div>
          <button
            type='submit'
            onClick={handleSaveChanges}
            className='bg-slate-300 hover:bg-slate-400 drop-shadow-md px-4 py-2 rounded-md'
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

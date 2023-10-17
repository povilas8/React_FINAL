/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { updateProfile, getAuth } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

export default function ProfilePage() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [avatar, setAvatar] = useState(null);
  const [photoURL, setPhotoURL] = useState(
    user.photoURL ||
      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  );
  const storage = getStorage();
  const [loading, setLoading] = useState(false);

  // Storage
  async function upload(file, user, setLoading) {
    const fileRef = ref(storage, user.uid + '');

    setLoading(true);

    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(user, { photoURL, displayName });
    setLoading(false);
    toast.success('Profile has been updated');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  //> Storage

  function handleSaveChanges(e) {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    upload(avatar, user, setLoading);
  }

  useEffect(() => {
    if (user.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [user]);
  console.log('photoURL ===', photoURL);

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center py-8'>
      <div className='bg-white mx-auto border-slate-500 p-8 shadow-md rounded-lg w-96'>
        <Toaster />
        <h2 className='text-2xl font-semibold mb-4'>Edit Profile</h2>
        <form onSubmit={handleClick}>
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
              htmlFor='avatarFile'
              className='block text-sm font-medium text-gray-700'
            >
              Avatar Upload
            </label>
            <input
              type='file'
              id='avatarFile'
              accept='image/*'
              onChange={handleSaveChanges}
            />
          </div>
          {avatar && (
            <div className='mt-2'>
              <h4 className='text-blue-300'>Selected avatar</h4>
              <img
                className='mb-4'
                src={URL.createObjectURL(avatar)}
                alt='Avatar Preview'
                style={{ maxWidth: '200px' }}
              />
            </div>
          )}
          <button
            type='submit'
            className='bg-slate-300 hover.bg-slate-400 drop-shadow-md px-4 py-2 rounded-md'
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

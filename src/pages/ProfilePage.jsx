import React, { useState } from 'react';

export default function ProfilePage() {
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleAvatarChange = (e) => {
    // Čia turėtumėte apdoroti įkeltos nuotraukos failą
    const selectedAvatar = e.target.files[0];
    setAvatar(selectedAvatar);
  };

  const handleSubmit = () => {
    // Čia turėtumėte siųsti nickname ir avataro nuotrauką į serverį
    // Pvz., naudodami Firebase Storage ir Firestore.
    // Po sėkmingo įkėlimo galite atvaizduoti vartotojo informaciją.

    // Išvalyti įvestus duomenis:
    setNickname('');
    setAvatar(null);
  };

  return (
    <div>
      <h1 className='text-3xl mb-8 pt-4 text-center drop-shadow-lg'>
        My Profile
      </h1>
      <div className='container mx-auto'>
        <div className='mb-4'>
          <label className='block mb-2'>Nickname:</label>
          <input
            type='text'
            value={nickname}
            onChange={handleNicknameChange}
            className='border border-gray-400 p-2 w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Avatar:</label>
          <input
            type='file'
            accept='image/*'
            onChange={handleAvatarChange}
            className='border border-gray-400 p-2 w-full'
          />
        </div>
        <button
          onClick={handleSubmit}
          className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}

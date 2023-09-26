/* eslint-disable no-unused-vars */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../store/AuthProvider';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import toast from 'react-hot-toast';
import { useRef } from 'react';

export default function CreateItem() {
  const ctx = useAuth();
  const inputRef = useRef(null);

  const initialValues = {
    title: '',
    description: '',
    price: '',
    stock: '',
    brand: '',
    category: '',
    attachement: '',
    tags: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be a positive number'),
    stock: Yup.number()
      .required('Stock is required')
      .integer('Stock must be an integer')
      .min(0, 'Stock cannot be negative'),
    brand: Yup.string().required('Brand is required'),
    category: Yup.string().required('Category is required'),
    attachement: Yup.mixed()
      .required('Image is required')
      .test('The file is too large', (value) => {
        if (!value.size) return true;
        return value[0].size <= 2000000;
      }),

    tags: Yup.string()
      .required('Tags are required')
      .min(1, 'At least one tag is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newAddObjWithUid = {
        ...values,
        userUid: ctx.userUid,
      };
      sendDataToFireBase(newAddObjWithUid);
      resetForm();
    },
  });
  console.log('formik.errors ===', formik.errors);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2000000) {
        // Pridėti klaidos pranešimą, jei failas yra per didelis
        formik.setFieldError('attachement', 'The file is too large (max 2MB)');
        toast.error('The file is too large (max 2MB');
      } else {
        formik.setFieldError('attachement', ''); // Išvalyti klaidos pranešimą, jei failas yra tinkamas dydžio požiūriu
        const reader = new FileReader();
        reader.onload = (event) => {
          const attachment = event.target.result;
          formik.setFieldValue('attachement', attachment);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const resetFileInput = () => {
    // 👇️ reset input value
    inputRef.current.value = null;
  };

  async function sendDataToFireBase(dataToSend) {
    console.log('creating');
    try {
      const docRef = await addDoc(collection(db, 'shopitems'), dataToSend);
      console.log('Document written with ID: ', docRef.id);
      toast.success('Item has been created');
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('something went wrong');
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center py-8'>
      <div className='bg-white p-8 rounded-lg shadow-md w-3/4'>
        <h2 className='text-2xl font-semibold mb-4'>Sell your BlackBerry</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700'
            >
              Model
            </label>
            <input
              type='text'
              id='title'
              name='title'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.title && formik.errors.title
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.title && formik.errors.title && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.title}
              </div>
            )}
          </div>

          <div className='mb-4'>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700'
            >
              Brand
            </label>
            <input
              type='text'
              id='brand'
              name='brand'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.brand}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.brand && formik.errors.brand
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.brand && formik.errors.brand && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.brand}
              </div>
            )}
          </div>

          <div className='mb-4'>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700'
            >
              Category
            </label>
            <input
              type='text'
              id='tags'
              name='category'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.category && formik.errors.category
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.category && formik.errors.category && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.category}
              </div>
            )}
          </div>

          <div className='mb-4'>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700'
            >
              Description
            </label>
            <textarea
              id='description'
              name='description'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.description && formik.errors.description
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.description && formik.errors.description && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.description}
              </div>
            )}
          </div>

          <div className='mb-4'>
            <label
              htmlFor='price'
              className='block text-sm font-medium text-gray-700'
            >
              Price
            </label>
            <input
              type='number'
              id='price'
              name='price'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.price && formik.errors.price
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.price && formik.errors.price && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.price}
              </div>
            )}
          </div>

          <div className='mb-4'>
            <label
              htmlFor='stock'
              className='block text-sm font-medium text-gray-700'
            >
              Units
            </label>
            <input
              type='number'
              id='stock'
              name='stock'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.stock}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.stock && formik.errors.stock
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.stock && formik.errors.stock && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.stock}
              </div>
            )}
          </div>

          <div className='mb-4'>
            <label
              htmlFor='stock'
              className='block text-sm font-medium text-gray-700'
            >
              Tags
            </label>
            <input
              type='text'
              id='tags'
              name='tags'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tags}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.tags && formik.errors.tags
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.tags && formik.errors.tags && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.tags}
              </div>
            )}
          </div>

          <div className='mb-4'>
            <label
              htmlFor='attachement'
              className='block text-sm font-medium text-gray-700'
            >
              Attach photo (max 2MB)
            </label>
            <input
              ref={inputRef}
              type='file'
              id='attachement'
              name='attachement'
              accept='image/*'
              onChange={handleFileChange}
              onBlur={formik.handleBlur}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.attachement && formik.errors.attachement
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {formik.touched.attachement && formik.errors.attachement && (
              <div className='text-red-500 text-sm mt-1'>
                {formik.errors.attachement}
              </div>
            )}
          </div>

          <div className='mt-4'>
            <button
              onClick={resetFileInput}
              type='submit'
              className='bg-slate-300 hover:bg-slate-400 drop-shadow-md px-4 py-2 rounded-md'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

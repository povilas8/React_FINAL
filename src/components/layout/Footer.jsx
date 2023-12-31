import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer>
      <div>
        <div className='pl-4 pr-4 bg-slate-400 grid grid-cols-2 md:grid-cols-4 gap-4 py-4 md:pl-14'>
          <div>
            <h2 className='font-bold pb-3'>Company information</h2>
            <p>Our Team</p>
            <p>Partners</p>
            <p>Success Stories</p>
          </div>
          <div>
            <h2 className='font-bold pb-3'>Links</h2>
            <ul>
              <li>
                <a href='/'>Home</a>
              </li>
              <li>
                <a href='/products'>Products</a>
              </li>
              <li>
                <a href='/about'>About</a>
              </li>
              <li>
                <a href='/contact'>Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className='font-bold pb-3'>Social Media</h2>
            <ul>
              <li className='pb-2 pl-10'>
                <a href='https://www.facebook.com'>
                  {' '}
                  <FaFacebook />
                </a>
              </li>
              <li className='pb-2 pl-10'>
                <a href='https://www.twitter.com'>
                  {' '}
                  <FaTwitter />
                </a>
              </li>
              <li className='pb-2 pl-10'>
                <a href='https://www.linkedin.com'>
                  <FaLinkedin />
                </a>
              </li>
              <li className='pb-2 pl-10'>
                <a href='https://www.instagram.com'>
                  {' '}
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className='font-bold pb-3'>Contact Us</h2>
            <p>
              Email: blackberry@
              <br />
              bancrupsy.com
            </p>
            <p>Phone: +123 456 789</p>
          </div>
        </div>
      </div>
      <div className='bottom-0 w-full bg-slate-400 text-center py-4 text-gray-300'>
        Copyright &copy; 2023 by BlackBerry
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer>
      <div>
        <div className='pl-24 pr-24 bg-slate-400 grid grid-cols-2 md:grid-cols-4 gap-4 py-4'>
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
              <li>
                <a href='https://www.facebook.com'>Facebook</a>
              </li>
              <li>
                <a href='https://www.twitter.com'>Twitter</a>
              </li>
              <li>
                <a href='https://www.linkedin.com'>LinkedIn</a>
              </li>
              <li>
                <a href='https://www.instagram.com'>Instagram</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className='font-bold pb-3'>Contact Us</h2>
            <p>Email: blackberry@bancrupsy.com</p>
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

/**
  * @author: Joel George Panicker
  * @desc: Specifies the layout of components
*/

import '../App.css';
import Footer from './Footer.js';
import Header from './Header';

export const homeLayout = (Component => (
  props) => (
  <>
    <Header/>
    <div className='m-0 p-0'>
      <Component {...props} />
    </div>
    <Footer />
  </>
)
);
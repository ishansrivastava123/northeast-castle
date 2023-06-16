/**
  * @author: Joel George Panicker
  * @desc: The component which inserts a respective component into a Specific Layout
*/

import LandingPage from './LandingPage';
import InfoPage from './InfoPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ItineraryDetails from './ItineraryDetails';
import ItineraryConfirmation from './ItineraryConfirmation';
import AccountDetails from './AccountDetails';
import {homeLayout} from './Layout';
import CastleDetails from './CastleDetails';
import Demo1 from './demo1';
import Demo2 from './demo2';
import Demo3 from './demo3';
import Demo4 from './demo4';


export const HomeLayout = homeLayout((props) => <LandingPage {...props} />);
export const InfoLayout = homeLayout((props) => <InfoPage {...props} />);
export const LoginLayout = homeLayout((props) => <LoginPage {...props} />);
export const SignupLayout = homeLayout((props) => <SignupPage {...props} />);
export const ItineraryLayout = homeLayout((props) => <ItineraryDetails {...props} />);
export const ItineraryConfirmationLayout = homeLayout((props) => <ItineraryConfirmation {...props} />);
export const AccountDetailsLayout = homeLayout((props) => <AccountDetails {...props} />);
export const Demo1Layout=homeLayout((props)=><Demo1 {...props}/>)
export const Demo2Layout=homeLayout((props)=><Demo2 {...props}/>)
export const Demo3Layout=homeLayout((props)=><Demo3 {...props}/>)
export const Demo4Layout=homeLayout((props)=><Demo4 {...props}/>)
export const CastleDetailLayout = homeLayout((props) => <CastleDetails {...props} />);
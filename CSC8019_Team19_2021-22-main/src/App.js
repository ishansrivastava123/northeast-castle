import './App.css';
import { Router } from "@reach/router";
import { LoginLayout,InfoLayout,HomeLayout,SignupLayout,ItineraryLayout,ItineraryConfirmationLayout,
  AccountDetailsLayout,CastleDetailLayout,Demo1Layout,Demo2Layout,Demo3Layout,Demo4Layout } from './Main/Routes.js';


/**
  * @author: Joel George Panicker
  * @desc: The main component which acts as a container of routing URLs to different layouts of components
*/
function App() {
  return (
    <div className="App">
      <Router>
        <HomeLayout path="/" />
        <HomeLayout path="/home" />
        <InfoLayout path="/castle-info" />
        <LoginLayout path="/signin" />
        <SignupLayout path="/signup" />
        <ItineraryLayout path="/itinerarydetails/:castleId/:stationId/:itineraryIds" />
        <ItineraryConfirmationLayout path="/itineraryConfirmation/:bookingId/:customerId" />
        <AccountDetailsLayout path="/accountDetails/:customerId" />
        <LoginLayout path="/signin/:itineraryId" />
        <SignupLayout path="/signup/:itineraryId" />
        <Demo1Layout path="/alnwick-castle" />
        <Demo2Layout path="/auckland-castle" />
        <Demo3Layout path="/bamburgh-castle" />
        <Demo4Layout path="/barnard-castle" />
        <CastleDetailLayout path="/castleDetail"/>
      </Router>
    </div>
  );
}

export default App;

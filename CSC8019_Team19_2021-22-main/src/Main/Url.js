/**
  * @author: Joel George Panicker
  * @desc: For Fetching all active castles and its details
  * @requestMethod : GET
  * @inputParams : Not needed 
  * @outputParams : List of Castle Details Objects 
*/
export const FetchCastleListUrl = `http://localhost:8080/main/getCastleList`;


/**
  * @author: Joel George Panicker
  * @desc: For Fetching all active stations and its details
  * @requestMethod : GET
  * @inputParams : Not needed 
  * @outputParams : List of Station Details Objects 
*/
export const FetchStationListUrl = `http://localhost:8080/main/getStationList`;


/**
  * @author: Joel George Panicker
  * @desc: For fetching the list of Ids of itineraries according to the params given
  * @requestMethod : POST
  * @inputParams : Form data which includes :
  *                castleId (encrypted)(type: string), 
  *                stationId (encrypted)(type: string), 
  *                passengerNo (type: int), 
  *                dateOfJourney (type: Date), 
  *                timeOfJourney (type: Date)
  * @outputParams : Encrypted List of Itinerary Ids (type: String)
*/
export const FetchItenariesUrl = `http://localhost:8080/main/fetchItinerariesIds`;


/**
  * @author: Joel George Panicker
  * @desc: For fetching the details of itineraries according to the list of itinerary Ids
  * @requestMethod : GET
  * @inputParams : Path variable : Encrypted List of Itinerary Ids (type: String)
  * @outputParams : List of Itineraries Objects 
*/
export const FetchItinerariesListUrl = `http://localhost:8080/main/fetchItinerariesListByIds/`;


/**
  * @author: Joel George Panicker
  * @desc: For fetching the details of castle according to the primary id given
  * @requestMethod : GET
  * @inputParams : Path variable : castleId (encrypted) (type: String)
  * @outputParams : Castle Details Object 
*/
export const FetchCastleDetailsByIdUrl = `http://localhost:8080/main/getCastleDetailsById/`;


/**
  * @author: Joel George Panicker
  * @desc: For fetching the details of station according to the primary id given
  * @requestMethod : GET
  * @inputParams : Path variable : stationId (encrypted) (type: String)
  * @outputParams : Station Details Object 
*/
export const FetchStationDetailsByIdUrl = `http://localhost:8080/main/getStationDetailsById/`;


/**
  * @author: Joel George Panicker
  * @desc: For saving the details of customers when they register
  * @requestMethod : POST
  * @inputParams : Form data which includes :
  *                firstName (type: string), 
  *                surName (type: string), 
  *                email (type: string), 
  *                mobileNo (type: string), 
  *                password (type: string)
  * @outputParams : Customer Details Object 
*/
export const SaveCustomerDetailsUrl = `http://localhost:8080/main/saveCustomerDetails/`;


/**
  * @author: Joel George Panicker
  * @desc: For fetching the details of customers when they try to login
  * @requestMethod : POST
  * @inputParams : Form data which includes :
  *                email (type: string), 
  *                password (type: string)
  * @outputParams : Customer Details Object 
*/
export const FetchLoginFormUrl = `http://localhost:8080/main/fetchCustomerDetails/`;


/**
  * @author: Joel George Panicker
  * @desc: For saving details when customer books a itinerary
  * @requestMethod : POST
  * @inputParams : Form data which includes :
  *                itineraryId (encrypted)(type: string), 
  *                customerId (encrypted)(type: string),
  *                dateOfJourney (type: Date)
  * @outputParams : BookedItineraries Object
*/
export const BookItineraryUrl = `http://localhost:8080/main/bookItineraryForCustomer/`;


/**
  * @author: Joel George Panicker
  * @desc: For fetching the details of customer according to the primary id given
  * @requestMethod : GET
  * @inputParams : Path variable : customerId (encrypted) (type: String)
  * @outputParams : Customer Details Object
*/
export const FetchCustomerDetailsByIdUrl = `http://localhost:8080/main/fetchCustomerDetailsById/`;


/**
  * @author: Joel George Panicker
  * @desc: For fetching the details of a booked itinerary by a customer according to the primary id given
  * @requestMethod : GET
  * @inputParams : Path variable : bookingId (encrypted) (type: String)
  * @outputParams : Form data which includes :
  *                castleName (type: string), 
  *                castleRate (type: string),
  *                routeDetails (type: string)
  *                routeTransport (type: string),
  *                routeRate (type: string),
  *                returnDetails (type: string),
  *                returnTransport (type: string),
  *                returnRate (type: string),
  *                dateOfTravel (type: string),
  *                itineraryDetails (type: string)
*/
export const FetchBookingDetailsByIdUrl = `http://localhost:8080/main/fetchBookingDetailsById/`;


/**
  * @author: Joel George Panicker
  * @desc: For fetching the list of the itineraries a particular customer booked
  * @requestMethod : GET
  * @inputParams : Path variable : customerId (encrypted) (type: String)
  * @outputParams : List of BookedItineraries Objects 
*/
export const GetBookedItinerariesListByCustomerIdUrl = `http://localhost:8080/main/getBookedItinerariesListByCustomerId/`;


/**
  * Example Encrypted Ids For Testing:
  * castleId: 9DlDKv0JLx2g0X969pqmiA==
  * stationId: 9DlDKv0JLx2g0X969pqmiA==
  * List of Itinerary Ids: RyArxF+639mCoHNKY4AYyg==
  * customerId: TXRMQlAjR0A+yDg1qzNR2Q==
  * itineraryId: 9DlDKv0JLx2g0X969pqmiA==
  * bookingId: KTyONOdDXiAIArX8lKC9CQ==
*/
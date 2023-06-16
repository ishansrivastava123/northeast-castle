package edu.team.castle.service;

import edu.team.castle.entities.*;
import edu.team.castle.utility.TransportForm;

import java.text.ParseException;
import java.util.Collection;

/**
 * @author: Joel George Panicker
 * @desc: Interface layer for listing services needed for methods in controller class
 */
public interface MainService {

    Collection<CastleDetails> getCastleList();

    Collection<StationDetails> getStationList();

    CastleDetails getCastleDetailsById(String castleIdEncrypted);

    Collection<CastleImages> getCastleImageListById(String castleIdEncrypted);

    String fetchItinerariesList(TransportForm transportForm) throws ParseException;

    Collection<Itineraries> fetchItinerariesListByIds(String itinerariesIdsEncrypted);

    StationDetails getStationDetailsById(String stationIdEncrypted);

    CustomerDetails saveCustomerDetails(CustomerDetails customerDetails);

    CustomerDetails fetchCustomerDetails(TransportForm transportForm);

    BookedItineraries bookItineraryForCustomer(TransportForm transportForm);

    CustomerDetails fetchCustomerDetailsById(String customerIdEncrypted);

    TransportForm getItineraryDetailsById(String bookingIdEncrypted);

    Collection<BookedItineraries> getBookedItinerariesListByCustomerId(String customerIdEncrypted);

}

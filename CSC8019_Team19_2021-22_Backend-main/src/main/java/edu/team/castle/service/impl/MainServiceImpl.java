package edu.team.castle.service.impl;

import edu.team.castle.entities.*;
import edu.team.castle.repositories.*;
import edu.team.castle.service.MainService;
import edu.team.castle.utility.EncryptDecrypt;
import edu.team.castle.utility.TransportForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author: Joel George Panicker
 * @desc: Class for Implementing all methods specified in the MainService interface and contains the application logic
 *        and also act a communication layer between repository and controller class
 */
@Service
public class MainServiceImpl implements MainService {
    /**
     * @author: Joel George Panicker
     * @desc: Injection of all Repository Classes in this class
     */
    @Autowired
    private CastleDetailsRepository castleDetailsRepository;
    @Autowired
    private StationDetailsRepository stationDetailsRepository;
    @Autowired
    private CastleImagesRepository castleImagesRepository;
    @Autowired
    private RouteMappingRepository routeMappingRepository;
    @Autowired
    private ItinerariesRepository itinerariesRepository;
    @Autowired
    private CustomerDetailsRepository customerDetailsRepository;
    @Autowired
    private BookedItinerariesRepository bookedItinerariesRepository;
    /**
     * @author: Joel George Panicker
     * @desc: Method for fetching all active castles from database and return it
     */
    @Override
    public Collection<CastleDetails> getCastleList() {
        Collection<CastleDetails> castleList = castleDetailsRepository.getCastleList();
        for(CastleDetails castleDetails: castleList) {
            castleDetails.setIdEncrypted(new EncryptDecrypt().encrypt(castleDetails.getCastleId()+""));//Code to encrypt the id and set it each castle entity
        }
        return castleList;
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for fetching all active stations from database and return it
     */
    @Override
    public Collection<StationDetails> getStationList() {
        Collection<StationDetails> stationList = stationDetailsRepository.getStationList();
        for(StationDetails stationDetails: stationList) {
            stationDetails.setIdEncrypted(new EncryptDecrypt().encrypt(stationDetails.getId()+""));
        }
        return stationList;
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for fetching the details of the castle
     * @inputParams: Encrypted castle id
     */
    @Override
    public CastleDetails getCastleDetailsById(String castleIdEncrypted) {
        Long castleId = Long.parseLong(new EncryptDecrypt().decrypt(castleIdEncrypted));
        CastleDetails castleDetails = castleDetailsRepository.findByCastleId(castleId);
        castleDetails.setIdEncrypted(new EncryptDecrypt().encrypt(castleDetails.getCastleId()+""));
        return castleDetails;
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for fetching all images of a castle listed
     * @inputParams: Encrypted castle id
     */
    @Override
    public Collection<CastleImages> getCastleImageListById(String castleIdEncrypted) {
        String castleIdStr = new EncryptDecrypt().decrypt(castleIdEncrypted);
        Long castleId = Long.parseLong(castleIdStr);
        Collection<CastleImages> imagesList = castleImagesRepository.findByCastleDetailsCastleId(castleId);
        return imagesList;
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for fetching encrypted list of itinerary ids
     * @inputParams: Transport Form (DTO)
     */
    @Override
    public String fetchItinerariesList(TransportForm transportForm) throws ParseException {
        Calendar c = Calendar.getInstance();
        c.setTime(transportForm.getDateOfJourney());
        String timeOfJourney = new SimpleDateFormat("HH:mm").format(transportForm.getTimeOfJourney());
        String castleId = new EncryptDecrypt().decrypt(transportForm.getCastleId());
        String stationId = new EncryptDecrypt().decrypt(transportForm.getStationId());
        Collection<Long> routeIds = routeMappingRepository.getRouteListByDayOfWeekAndStationId(c.get(Calendar.DAY_OF_WEEK), Long.parseLong(stationId));
        Collection<Itineraries> itineraries = itinerariesRepository.getItinerariesByParameters(transportForm.getPassengerNo(), Long.parseLong(castleId), routeIds);
        List<Long> itinerariesIds = new ArrayList<>();
        for(Itineraries itinerary : itineraries) {
            if(new SimpleDateFormat("HH:mm").parse(timeOfJourney).after(itinerary.getStartTime())) {
                continue;
            }
            itinerariesIds.add(itinerary.getId());
        }
        return new EncryptDecrypt().encrypt(itinerariesIds+"");
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for fetching list of itineraries
     * @inputParams: Encrypted list of itinerary ids
     */
    @Override
    public Collection<Itineraries> fetchItinerariesListByIds(String itinerariesIdsEncrypted) {
        String itinerariesIds = new EncryptDecrypt().decrypt(itinerariesIdsEncrypted);
        itinerariesIds = itinerariesIds.replace("[","");
        itinerariesIds = itinerariesIds.replace("]","");
        itinerariesIds = itinerariesIds.replace(" ","");
        List<String> itinerariesStringList = new ArrayList<>(Arrays.asList(itinerariesIds.split(",")));
        List<Long> itinerariesIdList = new ArrayList<>();
        for (String itinerariesId:itinerariesStringList) {
            itinerariesIdList.add(Long.parseLong(itinerariesId));
        }
        Collection<Itineraries> itineraryList = itinerariesRepository.getItinerariesByIds(itinerariesIdList);
        for (Itineraries itinerary : itineraryList) {
            int noPeople = itinerary.getMaxPeople();
            itinerary.setTotalPrice((noPeople * itinerary.getCastleId().getTicketPrices())
                    + (noPeople * itinerary.getRouteId().getPrice())
                    + (noPeople * itinerary.getReturnId().getPrice())
                    + itinerary.getAdditionalPrice());
            String itineraryDuration = new SimpleDateFormat("HH:mm").format(itinerary.getStartTime());
            itineraryDuration+= " --> ";
            itineraryDuration += new SimpleDateFormat("HH:mm").format(itinerary.getReturnId().getArrivalTime());
            itinerary.setDuration(itineraryDuration);
            itinerary.setIdEncrypted(new EncryptDecrypt().encrypt(itinerary.getId()+""));
        }
        return  itineraryList;
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for fetching the details of the station
     * @inputParams: Encrypted station id
     */
    @Override
    public StationDetails getStationDetailsById(String stationIdEncrypted) {
        Long stationId = Long.parseLong(new EncryptDecrypt().decrypt(stationIdEncrypted));
        StationDetails stationDetails = stationDetailsRepository.findByStationId(stationId);
        stationDetails.setIdEncrypted(new EncryptDecrypt().encrypt(stationDetails.getId()+""));
        return stationDetails;
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for saving the details of the customer
     * @inputParams: CustomerDetails object
     */
    @Override
    public CustomerDetails saveCustomerDetails(CustomerDetails customerDetails) {
        CustomerDetails customerProxy = customerDetailsRepository.findByEmail(customerDetails.getEmail());
        if(customerProxy==null || customerDetails.getId()!=null) {
            if(customerDetails.getId()==null) {
                String passwordEnc = new EncryptDecrypt().encrypt(customerDetails.getPassword()+"");
                customerDetails.setPassword(passwordEnc);
            } else {
                CustomerDetails customerProxy2 = customerDetailsRepository.findById(customerDetails.getId()).get();
                customerDetails.setPassword(customerProxy2.getPassword());
            }
            customerDetails = customerDetailsRepository.save(customerDetails);
            customerDetails.setIdEncrypted(new EncryptDecrypt().encrypt(customerDetails.getId()+""));
            return  customerDetails;
        }
        return null;
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for fetching the details of the customer
     * @inputParams: Transport Form (DTO)
     */
    @Override
    public CustomerDetails fetchCustomerDetails(TransportForm transportForm) {
        String passwordEnc = new EncryptDecrypt().encrypt(transportForm.getPassword());
        CustomerDetails customerDetails = customerDetailsRepository.findByEmailAndPassword(transportForm.getEmail(),passwordEnc);
        if(customerDetails==null) {
            CustomerDetails customerEmail = customerDetailsRepository.findByEmail(transportForm.getEmail());
            if(customerEmail!=null){
                customerDetails = new CustomerDetails();
                customerDetails.setErrorFlag("P");
            } else {
                customerDetails = new CustomerDetails();
                customerDetails.setErrorFlag("E");
            }
        } else {
            customerDetails.setIdEncrypted(new EncryptDecrypt().encrypt(customerDetails.getId()+""));
            customerDetails.setErrorFlag("N");
        }
        return customerDetails;
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for saving the details of the booking itineraries
     * @inputParams: BookedItineraries object
     */
    @Override
    public BookedItineraries bookItineraryForCustomer(TransportForm transportForm) {
        BookedItineraries bookedItineraries = new BookedItineraries();
        Long itineraryId = Long.parseLong(new EncryptDecrypt().decrypt(transportForm.getItineraryId()));
        Long customerId = Long.parseLong(new EncryptDecrypt().decrypt(transportForm.getCustomerId()));
        Optional<Itineraries> itineraries = itinerariesRepository.findById(itineraryId);
        bookedItineraries.setItineraryId(itineraries.get());
        Optional<CustomerDetails> customerDetails = customerDetailsRepository.findById(customerId);
        bookedItineraries.setCustomerId(customerDetails.get());
        bookedItineraries.setDateOfTravel(transportForm.getDateOfJourney());
        bookedItineraries = bookedItinerariesRepository.save(bookedItineraries);
        bookedItineraries.setIdEncrypted(new EncryptDecrypt().encrypt(bookedItineraries.getId()+""));
        return bookedItineraries;
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for fetching the details of the customer
     * @inputParams: Encrypted customer id
     */
    @Override
    public CustomerDetails fetchCustomerDetailsById(String customerIdEncrypted) {
        Long customerId = Long.parseLong(new EncryptDecrypt().decrypt(customerIdEncrypted));
        CustomerDetails customerDetails = customerDetailsRepository.findById(customerId).get();
        customerDetails.setIdEncrypted(new EncryptDecrypt().encrypt(customerDetails.getId()+""));
        return customerDetails;
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for fetching the details of the booking of itinerary made by customer
     * @inputParams: Encrypted BookedItineraries id
     */
    @Override
    public TransportForm getItineraryDetailsById(String bookingIdEncrypted) {
        if(bookingIdEncrypted!=null) {
            Long bookingId = Long.parseLong(new EncryptDecrypt().decrypt(bookingIdEncrypted));
            BookedItineraries bookedItineraries = bookedItinerariesRepository.findById(bookingId).get();
            Itineraries itineraries = bookedItineraries.getItineraryId();
            TransportForm transportForm = new TransportForm();
            transportForm.setCastleName(itineraries.getCastleId().getCastleName());
            transportForm.setCastleId(itineraries.getCastleId().getCastleId() + "");
            transportForm.setCastleRate(itineraries.getCastleId().getTicketPrices() + "");
            String routeDetails = itineraries.getRouteId().getStationId().getStationName();
            routeDetails += "(" + new SimpleDateFormat("HH:mm").format(itineraries.getRouteId().getDepartureTime()) + ")";
            routeDetails += " --> " + itineraries.getRouteId().getDestination().getStationName();
            routeDetails += "(" + new SimpleDateFormat("HH:mm").format(itineraries.getRouteId().getArrivalTime()) + ")";
            transportForm.setRouteDetails(routeDetails);
            transportForm.setRouteTransport(itineraries.getRouteId().getTransportId().getTransportName() + " (" +
                    itineraries.getRouteId().getTransportId().getOperator() + ")");
            String returnDetails = itineraries.getReturnId().getStationId().getStationName();
            returnDetails += "(" + new SimpleDateFormat("HH:mm").format(itineraries.getReturnId().getDepartureTime()) + ")";
            returnDetails += " --> " + itineraries.getReturnId().getDestination().getStationName();
            returnDetails += "(" + new SimpleDateFormat("HH:mm").format(itineraries.getReturnId().getArrivalTime()) + ")";
            transportForm.setReturnDetails(returnDetails);
            transportForm.setReturnTransport(itineraries.getReturnId().getTransportId().getTransportName() + " (" +
                    itineraries.getReturnId().getTransportId().getOperator() + ")");
            transportForm.setDateOfTravel(new SimpleDateFormat("dd/MM/yyyy").format(bookedItineraries.getDateOfTravel()));
            transportForm.setItineraryDetails(itineraries.getItineraryDetails());
            transportForm.setAdditionalPrice(itineraries.getAdditionalPrice() + "");
            transportForm.setRouteRate(itineraries.getRouteId().getPrice() + "");
            transportForm.setReturnRate(itineraries.getReturnId().getPrice() + "");
            return transportForm;
        }
        return null;
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for fetching the list of the bookings made by a customer
     * @inputParams: Encrypted CustomerDetails id
     */
    @Override
    public Collection<BookedItineraries> getBookedItinerariesListByCustomerId(String customerIdEncrypted) {
        String customerId = new EncryptDecrypt().decrypt(customerIdEncrypted);
        Collection<BookedItineraries> bookedItinerariesList =  bookedItinerariesRepository.findByCustomerId(Long.parseLong(customerId));
        for (BookedItineraries bookedItineraries : bookedItinerariesList) {
            bookedItineraries.setCastleName(bookedItineraries.getItineraryId().getCastleId().getCastleName());
            bookedItineraries.setStartingStation(bookedItineraries.getItineraryId().getRouteId().getStationId().getStationName());
            bookedItineraries.setDateOfTravelStr(new SimpleDateFormat("dd/MM/yyyy").format(bookedItineraries.getDateOfTravel()));
            bookedItineraries.setIdEncrypted(new EncryptDecrypt().encrypt(bookedItineraries.getId()+""));
        }
        return bookedItinerariesList;
    }
}

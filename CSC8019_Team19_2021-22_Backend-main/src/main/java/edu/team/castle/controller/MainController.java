package edu.team.castle.controller;

import edu.team.castle.entities.*;
import edu.team.castle.service.MainService;
import edu.team.castle.utility.TransportForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Collection;

/**
 * @author: Joel George Panicker
 * @desc: Controller Class for Mapping all HTTP requests from Web Application
 */
@Controller
@CrossOrigin
@RequestMapping(path="/main")
public class MainController {

    @Autowired
    private MainService mainService;//Automatically injected the main service class

    /**
     * @author: Joel George Panicker
     * @desc: Method for Mapping an HTTP request for fetching all active castles
     */
    @GetMapping(path="/getCastleList")
    public @ResponseBody Collection<CastleDetails> getCastleList () {
        return mainService.getCastleList();
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for Mapping an HTTP request for fetching all active bus and train stations
     */
    @GetMapping(path="/getStationList")
    public @ResponseBody Collection<StationDetails> getStationList () {
        return mainService.getStationList();
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for Mapping an HTTP request for fetching the details of castle according to the castle id
     */
    @GetMapping(path="/getCastleDetailsById/{castleIdEncrypted}")
    public @ResponseBody CastleDetails getCastleDetailsById(@PathVariable String castleIdEncrypted) {
        return mainService.getCastleDetailsById(castleIdEncrypted);
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for Mapping an HTTP request for fetching images of castle according to the castle id
     */
    @GetMapping(path="/getCastleImageListById/{castleIdEncrypted}")
    public @ResponseBody Collection<CastleImages> getCastleImageListById(@PathVariable String castleIdEncrypted) {
        return mainService.getCastleImageListById(castleIdEncrypted);
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for Mapping an HTTP request for returning encrypted list of itinerary Ids which matches with
     *        parameters given
     */
    @PostMapping(path="/fetchItinerariesIds")
    public ResponseEntity<?> fetchItinerariesList(@ModelAttribute TransportForm transportForm) throws ParseException {
        return new ResponseEntity<>(mainService.fetchItinerariesList(transportForm), HttpStatus.OK);
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for Mapping an HTTP request for fetching list of itineraries which matches with
     *        given id list
     */
    @GetMapping(path="/fetchItinerariesListByIds/{itinerariesIdsEncrypted}")
    public @ResponseBody Collection<Itineraries> fetchItinerariesListByIds(@PathVariable String itinerariesIdsEncrypted) {
        return mainService.fetchItinerariesListByIds(itinerariesIdsEncrypted);
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for Mapping an HTTP request for fetching the details of station according to the station id
     */
    @GetMapping(path="/getStationDetailsById/{stationIdEncrypted}")
    public @ResponseBody StationDetails getStationDetailsById(@PathVariable String stationIdEncrypted) {
        return mainService.getStationDetailsById(stationIdEncrypted);
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for Mapping an HTTP request for saving the customer details
     */
    @PostMapping(path="/saveCustomerDetails")
    public ResponseEntity<?> saveCustomerDetails(@ModelAttribute CustomerDetails customerDetails) {
        return new ResponseEntity<>(mainService.saveCustomerDetails(customerDetails), HttpStatus.OK);
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for Mapping an HTTP request for fetching the customer details with email and password as input
     */
    @PostMapping(path="/fetchCustomerDetails")
    public ResponseEntity<?> fetchCustomerDetails(@ModelAttribute TransportForm transportForm) {
        return new ResponseEntity<>(mainService.fetchCustomerDetails(transportForm), HttpStatus.OK);
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for Mapping an HTTP request for fetching the details of customer according to the customer id
     */
    @GetMapping(path="/fetchCustomerDetailsById/{customerIdEncrypted}")
    public @ResponseBody CustomerDetails fetchCustomerDetailsById(@PathVariable String customerIdEncrypted) {
        return mainService.fetchCustomerDetailsById(customerIdEncrypted);
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for Mapping an HTTP request for saving the booking details
     */
    @PostMapping(path="/bookItineraryForCustomer")
    public ResponseEntity<?> bookItineraryForCustomer(@ModelAttribute TransportForm transportForm) {
        return new ResponseEntity<>(mainService.bookItineraryForCustomer(transportForm), HttpStatus.OK);
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for Mapping an HTTP request for fetching the details of booking
     *        according to the bookedItineraries id
     */
    @GetMapping(path="/fetchBookingDetailsById/{bookingIdEncrypted}")
    public @ResponseBody TransportForm getItineraryDetailsById(@PathVariable String bookingIdEncrypted) {
        return mainService.getItineraryDetailsById(bookingIdEncrypted);
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for Mapping an HTTP request for fetching the list booked itineraries with customerId as input
     */
    @GetMapping(path="/getBookedItinerariesListByCustomerId/{customerIdEncrypted}")
    public @ResponseBody Collection<BookedItineraries> getBookedItinerariesListByCustomerId(@PathVariable String customerIdEncrypted) {
        return mainService.getBookedItinerariesListByCustomerId(customerIdEncrypted);
    }
}


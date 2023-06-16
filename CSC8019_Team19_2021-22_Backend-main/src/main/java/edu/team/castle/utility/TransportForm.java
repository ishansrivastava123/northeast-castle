package edu.team.castle.utility;
import lombok.Data;

import java.util.Date;

/**
 * @author: Joel George Panicker
 * @desc: Data transfer object that is used for this application
 */
@Data
public class TransportForm {
    private String castleId;
    private String stationId;
    private String customerId;
    private String itineraryId;
    private int passengerNo;
    private Date dateOfJourney;
    private Date timeOfJourney;
    private String email;
    private String password;
    private String castleName;
    private String castleRate;
    private String routeDetails;
    private String routeTransport;
    private String routeRate;
    private String returnDetails;
    private String returnTransport;
    private String returnRate;
    private String dateOfTravel;
    private String itineraryDetails;
    private String additionalPrice;
}

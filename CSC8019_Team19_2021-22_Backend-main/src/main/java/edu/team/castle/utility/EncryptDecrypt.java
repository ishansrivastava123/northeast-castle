package edu.team.castle.utility;

/**
 * @author: Joel George Panicker
 * @desc: Class for encrypting and decrypting the values using AES and a secret key
 *        and also to remove special character '/' from encrypted value for avoiding URL detection errors
 */
public class EncryptDecrypt {

    private final String SECRET_KEY = "team 19";

    /**
     * @author: Joel George Panicker
     * @desc: Method for encrypting the string value using the secretKey and replace '/' with '$' if present
     * @inputParams: String value that needs to be encrypted
     */
    public String encrypt(String data) {
        String encryptValue = new AES().encrypt(data, SECRET_KEY);
        encryptValue = encryptValue.replace("/", "$");
        return encryptValue;
    }

    /**
     * @author: Joel George Panicker
     * @desc: Method for decrypting the string value using the secretKey and replace '$' with '/' if present
     * @inputParams: String value that needs to be decrypted
     */
    public String decrypt(String data) {
        data = data.replace("$", "/");
        data = data.replace(" ", "+");
        String decryptValue = new AES().decrypt(data, SECRET_KEY);
        return decryptValue;
    }
}

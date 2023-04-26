# DLPFS - Server Side


> To check DLFPS- Client Side [click here](https://github.com/Tripathiaman2511/DLPFS-client) 

# About the Project
Data leakage prevention (DLP) is a technique used by organizations to prevent the loss of sensitive or confidential data. A key aspect of DLP is the de-identification of personal identifiable information (PII) before sharing it with third parties or stakeholders. De-identification techniques such as masking and replacement are used to remove or hide PII data. Masking involves masking specific words or characters such as names or addresses, with generic placeholders like "<PERSON>" or "*". Replacement involves replacing sensitive data with similar but fictitious data, such as replacing the name "Aman" with "Rishi". In addition to de-identification, DLP also provides access control for uploading and reviewing files. This ensures that only authorized individuals can access and view the data. Furthermore, DLP systems store data in an encrypted format to prevent data breaches. This means that even if the data is stolen, it cannot be accessed without the correct decryption key. The use of DLP technology is becoming increasingly important in today's data-driven world, as organizations are required to share information with multiple parties. As such, DLP technology is critical for maintaining the privacy and security of sensitive data while allowing organizations to share information with relevant stakeholders.

## Server Side: About
Serve Side works with the API designed to convert the confidential data into public data by using techniques like *MASKING* or *REPALCEMENT*

### Text Extraction 
![Text Extraction](https://github.com/Tripathiaman2511/DLPFS-server/blob/main/serverImage/text%20Extract.png)
### Text Anonymizer
![Text Anonymizer](https://github.com/Tripathiaman2511/DLPFS-server/blob/main/serverImage/Anonymizer.png)


# How to Work on this project?
1. Fork this Project - [https://github.com/Tripathiaman2511/DLPFS-client](https://github.com/Tripathiaman2511/DLPFS-server)
2. Clone the Forked Project. 
3. Create new branch. 
4. Perform the changes and then commit the changes.
5. First pull the remote Project and then push.


# How to Run this Project
> After running server, run the [client](https://github.com/Tripathiaman2511/DLPFS-client)
1. Come to server directory
2. Open terminal and run `npm i` or `npm install`
3. Add env file which will contain the MONGO_ID and SECRET_KEY
3. Now run the command `npm start` and you will see your server will run at port `localhost:5000`. 

---
Hope you find this doc helpful :sweat_smile:.

For any changes create a pull request :exclamation:
